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
  const css = read('css')
  const html = read('html')
  const shadow = host.value.attachShadow({ mode: 'open' })
  shadow.innerHTML = `<style>:host{display:block}${css}</style>${html}`
})
</script>

<template>
  <div class="css-demo">
    <div ref="source" class="css-demo-source"><slot /></div>
    <details class="demo" :open="open">
      <summary>{{ summary }}</summary>
      <div class="demo-render"><div ref="host"></div></div>
    </details>
  </div>
</template>
