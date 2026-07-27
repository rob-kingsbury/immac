<script setup>
import { ref, onMounted, nextTick } from 'vue'

// A live CSS example. Author it as one or more fenced code blocks inside the
// component in Markdown:
//
//   <CssDemo>
//
//   ```html
//   <p class="note">Hello</p>
//   ```
//
//   ```css
//   .note { color: crimson; }
//   ```
//
//   </CssDemo>
//
// The fences render normally (with highlighting) as the shown source. On the
// client, the SAME text is read back out of those fences and executed inside a
// shadow root under the Result panel. Two consequences fall out of that: the
// code a student reads is exactly what renders (no separate hidden copy to
// drift), and each example is isolated, so the many demos on one page can never
// style each other. This runs in onMounted (client only), so it survives Vue's
// hydration, unlike an inline <style> block in Markdown, which hydration strips.

defineProps({
  open: { type: Boolean, default: true },
  summary: { type: String, default: 'Result' },
  // Render the example but hide its source fences. Used for a motivating
  // before/after where the point is the visual result, not code the student
  // has not been taught yet. The fences still exist in the DOM and are read to
  // run the demo; they are only visually hidden.
  hideSource: { type: Boolean, default: false },
})

const source = ref(null)
const host = ref(null)

function read(lang) {
  let out = ''
  source.value
    .querySelectorAll(`[class*="language-${lang}"] code`)
    .forEach((code) => {
      out += code.textContent + '\n'
    })
  return out
}

onMounted(async () => {
  await nextTick()
  if (!source.value || !host.value) return
  let css = read('css')
  const html = read('html')

  // Lessons on custom properties teach `:root { --brand: ...; }`, exactly
  // as you'd write it in a real project. Inside a shadow root that's silent
  // dead code: :root only ever matches the outer document's <html>, never
  // anything in a shadow tree (:host is the shadow-tree equivalent), so
  // every var(--brand) reference in the demo would fall through to its
  // inherited/initial value instead of the taught colour (confirmed via
  // axe-core: a .tag meant to show white-on-brand-teal was rendering
  // white text on the demo box's own background, at ~1.1:1 contrast,
  // because --brand was never actually in scope). Rewriting :root to
  // :host on the way in makes the demo match what the fenced source
  // teaches, without changing the fenced source itself.
  css = css.replace(/:root\b/g, ':host')

  const shadow = host.value.attachShadow({ mode: 'open' })
  shadow.innerHTML = `<style>:host{display:block;color:#1a1a1a}${css}</style>${html}`

  // Some lessons (CSS Grid, layout demos, card examples) teach real semantic
  // markup -- <header>, <nav>, <main>, <aside>, <footer>, and heading levels
  // like <h4> -- as the example itself. Shadow DOM isolates style, but NOT
  // the accessibility tree: those tags still register as page-level ARIA
  // landmarks and headings (axe-core's landmark-no-duplicate-main /
  // landmark-main-is-top-level / landmark-unique / heading-order rules catch
  // this -- a page can end up with two <main> regions, one buried three
  // levels deep inside a demo widget, or an <h4> that reads as a level-skip
  // against the page's real heading outline). The teaching point is the tag
  // itself, visible in the source fence above (screen-reader students learn
  // the structure by reading that, same as sighted students), not that this
  // one small preview box participates in the page's actual landmark/heading
  // outline, so role="none" strips just the implicit semantics from the
  // live-rendered copy without touching the markup students actually read.
  //
  // <main> is a special case: the ARIA-in-HTML spec doesn't allow role="none"
  // on it at all (axe's aria-allowed-role rule catches that), so it's swapped
  // for a plain <div> with the same class/attributes instead of re-roled --
  // same effect (no landmark, nothing for a screen reader to trip on), just
  // reached a different way since the role override itself isn't legal here.
  shadow.querySelectorAll('main').forEach((el) => {
    const div = document.createElement('div')
    for (const attr of el.attributes) div.setAttribute(attr.name, attr.value)
    while (el.firstChild) div.appendChild(el.firstChild)
    el.replaceWith(div)
  })

  const structuralTags = 'header, footer, aside, nav, h1, h2, h3, h4, h5, h6'
  shadow.querySelectorAll(structuralTags).forEach((el) => {
    el.setAttribute('role', 'none')
    // A presentational role conflicts with a global ARIA attribute like
    // aria-label (axe-core's presentation-role-conflict rule) -- and per the
    // ARIA spec, that conflict doesn't just get flagged, it makes the
    // browser ignore role="none" entirely and fall back to the element's
    // normal landmark semantics, silently undoing this whole fix. A
    // labelled <nav> teaching a real navigation pattern is exactly the kind
    // of example that hits this, so aria-label/aria-labelledby have to go
    // too once the landmark role itself is gone.
    el.removeAttribute('aria-label')
    el.removeAttribute('aria-labelledby')
  })
})
</script>

<template>
  <div class="css-demo" :class="{ 'css-demo-nosource': hideSource }">
    <div ref="source" class="css-demo-source"><slot /></div>
    <details class="demo" :open="open">
      <summary>{{ summary }}</summary>
      <div class="demo-render"><div ref="host"></div></div>
    </details>
  </div>
</template>
