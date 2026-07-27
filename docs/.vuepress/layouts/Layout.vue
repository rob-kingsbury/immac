<script setup>
// Wraps the theme's real Layout to add a skip-to-content link. Files under
// .vuepress/layouts are auto-registered by filename, so naming this
// "Layout.vue" overrides the default layout every page resolves to, without
// touching @vuepress/theme-default itself (which lives in node_modules and
// would lose any direct edit on the next install).
//
// This has to be a wrapping layout, not a client-injected DOM node, for two
// reasons: it needs to render before the navbar in the *server-rendered*
// HTML (a skip link only helps if it's the first focusable thing before any
// keyboard user has to tab past the navbar/sidebar), and VuePress
// pre-renders each route to static HTML, so anything added only in
// onMounted never appears in that static markup at all.
import Layout from '@vuepress/theme-default/layouts/Layout.vue'

function focusMain() {
  // Let the native href="#main-content" fragment jump happen, then also
  // move focus there directly. A plain anchor jump changes scroll position
  // but doesn't reliably move keyboard focus in every browser, and focus is
  // the part that actually matters for a skip link.
  requestAnimationFrame(() => {
    document.getElementById('main-content')?.focus()
  })
}
</script>

<template>
  <a id="skip-to-content" href="#main-content" class="skip-link" @click="focusMain">
    Skip to main content
  </a>
  <Layout />
</template>
