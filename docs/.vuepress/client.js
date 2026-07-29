import { defineClientConfig, onContentUpdated, useRouter } from 'vuepress/client'
import { onMounted } from 'vue'
import CssDemo from './components/CssDemo.vue'
import GlossaryFilter from './components/GlossaryFilter.vue'
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
    app.component('GlossaryFilter', GlossaryFilter)
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

    // A week's anchor id lives on its <summary> (styles/index.scss gives it
    // scroll-margin-top for exactly this), which a fixed navbar would
    // otherwise cover. That CSS property is respected by a native browser
    // fragment scroll -- a full page load of a bare URL, which is what every
    // Source: link in the assessments repo is -- and needs nothing further
    // there. Clicking a week in this site's own sidebar is different: it is
    // a programmatic router.push with no native scroll involved at all, so
    // it depends entirely on Vue Router's own scrollBehavior, and that
    // resolves an `{ el }` target with plain getBoundingClientRect math: no
    // CSS property, scroll-margin-top included, factors in.
    //
    // Scoped to <summary> specifically, not every hash target: a real
    // heading (h1-h6) already gets its own, different fix from the theme (a
    // negative-margin/padding-top trick in normalize.scss that shifts the
    // heading's actual box position, so both a native jump and Vue Router's
    // plain math already land it correctly with no scroll-margin-top
    // involved at all). Verified live that routing every hash through
    // scrollIntoView() as well double-compensates on top of that and
    // overshoots badly, so this only ever touches the one element that has
    // no existing fix of its own.
    function correctWeekAnchorScroll(hash) {
      if (!hash) return
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el?.tagName !== 'SUMMARY') return
      // Nothing has scrolled yet when this runs from the wrapper below (its
      // own scroll is suppressed by returning false), so the target usually
      // sits far down an untouched page -- there's no "is it already
      // misplaced" check to make here, just scroll it into place. Two
      // requestAnimationFrame callbacks land reliably on a later frame than
      // a single nextTick, which is what the router's own scroll (for the
      // cold-load case below) resolves through, so this wins that race
      // instead of being overwritten by it.
      requestAnimationFrame(() => requestAnimationFrame(() => el.scrollIntoView()))
    }

    // Installed from a mounted component rather than from enhance() (which
    // does receive the live router and looks like the obvious hook):
    // enhance() runs once per clientConfig, in an order this file does not
    // control, and the theme's own enhance() also wraps
    // router.options.scrollBehavior -- whichever runs second overwrites the
    // other outright, since it is a single function property, not an event
    // list. Vue's lifecycle already guarantees an order that needs no
    // guessing: every clientConfig's enhance() (VuePress's own, the theme's,
    // this file's) finishes before the root component's setup() runs, and
    // setup() finishes before onMounted fires, so wrapping here is
    // unconditionally the last write.
    const router = useRouter()
    onMounted(() => {
      const priorScrollBehavior = router.options.scrollBehavior
      router.options.scrollBehavior = async (to, from, savedPosition) => {
        const position = await priorScrollBehavior?.(to, from, savedPosition)
        const hash = position && 'el' in position && (typeof position.el === 'string' ? position.el : `#${position.el?.id ?? ''}`)
        const target = hash && !savedPosition && document.getElementById(decodeURIComponent(hash.slice(1)))
        if (target?.tagName === 'SUMMARY') {
          correctWeekAnchorScroll(hash)
          return false
        }
        return position
      }
      // The very first navigation -- a cold load of a URL that already
      // carries a week anchor, the other half of the assessments Source:
      // link case -- is already under way by the time onMounted fires, and
      // its own handleScroll call resolves against whatever scrollBehavior
      // existed before the wrapper above installs. This is the same
      // correction, run once more for that one navigation the wrapper
      // couldn't reach in time.
      correctWeekAnchorScroll(window.location.hash)
    })
  },
})
