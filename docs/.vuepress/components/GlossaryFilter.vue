<script setup>
// Filters the glossary in place as you type, rather than sending the reader
// back up to site search, which returns whole pages, not the one definition
// wanted.
//
// Deliberately plain: the whole glossary is already rendered on the page (see
// docs/glossary/README.md), so this filters that existing markup instead of
// building a second copy of it from an index. Every term is a <p> whose first
// child is a <strong>, one letter section (<h2>) per group -- exactly what
// the markdown source produces. Walked from this component's own element
// forward through its siblings, so it needs no theme-specific class name to
// find the content, just a fixed position at the top of the glossary body.
//
// Hiding is pure client JS (onMounted never runs during the static render),
// so with no JS at all the full list is simply what's already there -- the
// filtering never activates rather than half-activating with no way to
// clear it.

import { ref, computed, watch, onMounted, useTemplateRef } from 'vue'

const root = useTemplateRef('root')
const query = ref('')
const groups = ref([]) // { heading: Element, items: Element[] }
const totalCount = ref(0)
const visibleCount = ref(0)

function collectGroups() {
  const found = []
  let current = null
  let el = root.value?.nextElementSibling
  while (el) {
    if (el.tagName === 'H2') {
      current = { heading: el, items: [] }
      found.push(current)
    } else if (current && el.tagName === 'P' && el.firstElementChild?.tagName === 'STRONG') {
      current.items.push(el)
    }
    el = el.nextElementSibling
  }
  groups.value = found
  totalCount.value = found.reduce((n, g) => n + g.items.length, 0)
  visibleCount.value = totalCount.value
}

const normalizedQuery = computed(() => query.value.trim().toLowerCase())

function applyFilter() {
  const q = normalizedQuery.value
  let shown = 0
  for (const group of groups.value) {
    let groupShown = 0
    for (const entry of group.items) {
      const matches = !q || entry.textContent.toLowerCase().includes(q)
      entry.hidden = !matches
      if (matches) groupShown++
    }
    group.heading.hidden = groupShown === 0
    shown += groupShown
  }
  visibleCount.value = shown
}

onMounted(collectGroups)
watch(query, applyFilter)
</script>

<template>
  <div ref="root" class="glossary-filter">
    <label for="glossary-filter-input">Filter terms</label>
    <input
      id="glossary-filter-input"
      v-model="query"
      type="search"
      autocomplete="off"
      placeholder="Start typing a term…"
    >
    <p class="glossary-filter-status" role="status">
      {{ visibleCount }} of {{ totalCount }} terms shown
    </p>
  </div>
</template>

<style scoped>
.glossary-filter {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.6rem;
  margin: 0 0 1.5rem;
}

.glossary-filter label {
  font-weight: 600;
  font-size: 0.9rem;
}

.glossary-filter input {
  flex: 1 1 16rem;
  min-width: 0;
  padding: 0.4rem 0.7rem;
  border: 1px solid var(--vp-c-divider, #e2e2e3);
  border-radius: 6px;
  background: var(--vp-c-bg, #fff);
  color: var(--vp-c-text, #213547);
  font-size: 0.95rem;
}

.glossary-filter input:focus-visible {
  outline: 2px solid var(--vp-c-accent, #3eaf7c);
  outline-offset: 1px;
}

.glossary-filter-status {
  flex: 1 0 100%;
  margin: 0;
  color: var(--vp-c-text-mute, #6a7683);
  font-size: 0.82rem;
}
</style>
