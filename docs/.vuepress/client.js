import { defineClientConfig, onContentUpdated } from 'vuepress/client'
import { onMounted } from 'vue'
import CssDemo from './components/CssDemo.vue'
import SearchBox from './components/SearchBox.vue'
import SkipLinkLayout from './layouts/Layout.vue'

// The skip-to-content link itself lives in .vuepress/layouts/Layout.vue (so
// it's part of the server-rendered HTML and sits before the navbar in the
// DOM). What's left to wire up here is its target: both page layouts
// (VPPage and VPHome) render their content inside a real <main>, but neither
// gives it an id, and VuePress swaps the whole <main> element on navigation
// between the two layouts (home <-> regular page), so the id and tabindex
// have to be reapplied after every route change, not just once on load.
function ensureMainIsSkipTarget() {
  const main = document.querySelector('main')
  if (!main) return
  if (!main.id) main.id = 'main-content'
  if (!main.hasAttribute('tabindex')) main.setAttribute('tabindex', '-1')
}

// axe-core's "scrollable-region-focusable" rule: any region that scrolls
// (prismjs's syntax-highlighted code blocks on a narrow viewport, and our
// own .diagram boxes, both use overflow-x: auto) has to be reachable by
// keyboard, or a mouse-only user's content is trapped for anyone tabbing
// through the page. Neither prismjs's plugin output nor our own markup sets
// tabindex, so scrollable elements with no tabindex get one here -- but
// only the ones that actually overflow (checked at runtime, since that
// depends on rendered width, not something knowable from source).
function ensureScrollableRegionsAreFocusable() {
  const candidates = document.querySelectorAll('pre, .diagram, .demo-render')
  candidates.forEach((el) => {
    if (el.hasAttribute('tabindex')) return
    const style = getComputedStyle(el)
    const scrollsX = /(auto|scroll)/.test(style.overflowX) && el.scrollWidth > el.clientWidth
    const scrollsY = /(auto|scroll)/.test(style.overflowY) && el.scrollHeight > el.clientHeight
    if (scrollsX || scrollsY) el.setAttribute('tabindex', '0')
  })
}

export default defineClientConfig({
  enhance({ app }) {
    app.component('CssDemo', CssDemo)
    app.component('SearchBox', SearchBox)
  },
  // Overrides the theme's default page layout with a thin wrapper that adds
  // the skip link ahead of it. See layouts/Layout.vue for why this has to be
  // a layout override rather than a client-mounted DOM node.
  layouts: {
    Layout: SkipLinkLayout,
  },
  setup() {
    const runChecks = () => {
      ensureMainIsSkipTarget()
      // One frame late so layout (fonts, CssDemo's own onMounted) has
      // settled before measuring scrollWidth/scrollHeight.
      requestAnimationFrame(ensureScrollableRegionsAreFocusable)
    }
    onMounted(runChecks)
    onContentUpdated(runChecks)
  },
})
