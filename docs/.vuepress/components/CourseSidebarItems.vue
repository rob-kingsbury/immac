<script setup>
// Replaces the theme's sidebar list (aliased over @theme/VPSidebarItems.vue in
// config.js) with a two-panel drill-down for the course sidebars.
//
// Panel 1 is the term: the course's own pages, then Week 1 through Week 15.
// Choosing a week slides to panel 2, which is that week's modules, with the
// current module expanded to its own headings the way the theme normally does.
// The back arrow returns to the term.
//
// Fifteen weeks of six modules each is around ninety rows. Shown at once, the
// week a student is actually in is a needle in that. One week at a time is the
// whole point, and a panel does it without asking anyone to close what they
// opened.
//
// Anything that is not a course sidebar (the module pool, the glossary, a
// module in no week) renders as the flat list it always was. The panels only
// appear where there is a term to walk.

import { computed, ref, watch, nextTick, useTemplateRef } from 'vue'
import { useRoute } from 'vuepress/client'

import { useSidebarItems } from '@theme/useSidebarItems'
import VPSidebarItem from '@theme/VPSidebarItem.vue'

const route = useRoute()
const sidebarItems = useSidebarItems()
const backButton = useTemplateRef('backButton')
const weekList = useTemplateRef('weekList')

// The group config.js builds for a course. Identified by text because the
// sidebar resolver rebuilds these objects and drops anything it does not know
// about, so a custom flag would not survive. check-nav.mjs asserts both course
// sidebars still carry a group with exactly this text.
const weekly = computed(() =>
  sidebarItems.value.find((item) => item.text === 'Weekly Content' && item.children?.length)
)
const weeks = computed(() => weekly.value?.children ?? [])
const coursePages = computed(() => sidebarItems.value.filter((item) => item !== weekly.value))

const samePage = (link) => typeof link === 'string' && link.split('#')[0] === route.path

// A week is current when the open page is one of its modules, or one of that
// module's own headings.
const activeWeek = computed(() =>
  weeks.value.findIndex((week) =>
    (week.children ?? []).some(
      (mod) => samePage(mod.link) || (mod.children ?? []).some((h) => samePage(h.link))
    )
  )
)

const open = ref(null)
const direction = ref('forward')

// Follow the reader: landing on a module opens its week. Only path changes
// count, so backing out to the term list is not undone by an in-page jump.
watch(
  () => route.path,
  () => {
    open.value = activeWeek.value >= 0 ? activeWeek.value : null
  },
  { immediate: true }
)

const openedWeek = computed(() => (open.value === null ? null : weeks.value[open.value] ?? null))

// Focus follows a deliberate press so a keyboard user is not left on a control
// that no longer exists. Route-driven changes leave focus alone, since the
// reader is already reading.
async function drillInto(index) {
  direction.value = 'forward'
  open.value = index
  await nextTick()
  backButton.value?.focus()
}

async function backToWeeks() {
  direction.value = 'back'
  const returningTo = open.value
  open.value = null
  await nextTick()
  weekList.value?.querySelectorAll('.week-row')[returningTo]?.focus()
}

const weekNumber = (text) => text.match(/^Week (\d+)/)?.[1] ?? ''
const weekTitle = (text) => text.replace(/^Week \d+:\s*/, '')
</script>

<template>
  <div v-if="weekly" class="course-sidebar" :class="`is-${direction}`">
    <!-- Panel 1: the term -->
    <div v-if="open === null" key="weeks" class="panel">
      <p class="panel-label">Course</p>
      <ul class="plain">
        <VPSidebarItem v-for="item in coursePages" :key="item.text" :item="item" />
      </ul>

      <p class="panel-label">Weekly Content</p>
      <ul ref="weekList" class="plain">
        <li v-for="(week, index) in weeks" :key="week.text">
          <button type="button" class="week-row" @click="drillInto(index)">
            <span class="week-num" aria-hidden="true">{{ weekNumber(week.text) }}</span>
            <span class="week-name">{{ weekTitle(week.text) }}</span>
            <span class="week-count">{{ (week.children ?? []).length }}</span>
            <svg class="chev" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" />
            </svg>
            <span class="sr-only">, week {{ weekNumber(week.text) }}, {{ (week.children ?? []).length }} modules</span>
          </button>
        </li>
      </ul>
    </div>

    <!-- Panel 2: one week -->
    <div v-else key="week" class="panel">
      <button ref="backButton" type="button" class="back-row" @click="backToWeeks">
        <svg class="chev back" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2" />
        </svg>
        <span>All weeks</span>
      </button>

      <p class="panel-label">Week {{ weekNumber(openedWeek.text) }}</p>
      <h2 class="week-heading">{{ weekTitle(openedWeek.text) }}</h2>

      <ul class="plain module-list">
        <!-- depth 1, not 0: the theme styles depth 0 as a section heading, so
             leaving it default rendered every module bold and flattened the
             week into another list of headings. -->
        <VPSidebarItem
          v-for="mod in openedWeek.children ?? []"
          :key="`${mod.text}${mod.link}`"
          :item="mod"
          :depth="1"
        />
      </ul>

      <!-- RouteLink, not a bare <a>: the site is served from /immac/, and an
           unprefixed href resolves in dev then 404s on the deployed site.
           check-links.mjs caught exactly that here. -->
      <RouteLink v-if="openedWeek.link" class="see-all" :to="openedWeek.link">
        See this week in full
      </RouteLink>
    </div>
  </div>

  <!-- Every other sidebar, unchanged -->
  <ul v-else-if="sidebarItems.length" class="vp-sidebar-items">
    <VPSidebarItem
      v-for="item in sidebarItems"
      :key="`${item.text}${item.link}`"
      :item="item"
    />
  </ul>
</template>

<style lang="scss">
.vp-sidebar-items,
.course-sidebar {
  margin: 0;
  padding: 1.25rem 0;
  list-style-type: none;

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
}

.course-sidebar .plain {
  margin: 0 0 0.5rem;
  padding: 0;
  list-style: none;
}

// Section label. Not a link, and styled so it never reads as one.
.course-sidebar .panel-label {
  margin: 1rem 0 0.4rem;
  padding-inline: 1.5rem;
  color: var(--vp-c-text-quote, #6a7683);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.course-sidebar .panel-label:first-child {
  margin-top: 0;
}

// ------------------------------------------------------------ panel 1: weeks
.course-sidebar .week-row {
  display: flex;
  gap: 0.65rem;
  align-items: center;
  width: 100%;
  padding: 0.5rem 1.1rem 0.5rem 1.5rem;
  border: 0;
  background: none;
  color: var(--vp-c-text, #213547);
  font-family: inherit;
  font-size: 0.95rem;
  line-height: 1.3;
  text-align: start;
  cursor: pointer;
  transition: background-color 120ms ease, color 120ms ease;
}

.course-sidebar .week-row:hover {
  background-color: var(--vp-c-bg-alt, #f6f6f7);
  color: var(--vp-c-accent, #3eaf7c);
}

.course-sidebar .week-row:focus-visible {
  outline: 2px solid var(--vp-c-accent, #3eaf7c);
  outline-offset: -2px;
}

// Fixed-width gutter, so weeks scan as a numbered column instead of ragged text.
.course-sidebar .week-num {
  flex: none;
  width: 1.5rem;
  color: var(--vp-c-text-quote, #6a7683);
  font-size: 0.8rem;
  font-variant-numeric: tabular-nums;
  font-weight: 700;
  text-align: end;
}

.course-sidebar .week-name {
  flex: 1;
}

.course-sidebar .week-count {
  flex: none;
  min-width: 1.25rem;
  padding: 0.05rem 0.3rem;
  border-radius: 999px;
  background-color: var(--vp-c-bg-alt, #f1f2f3);
  color: var(--vp-c-text-quote, #6a7683);
  font-size: 0.7rem;
  font-variant-numeric: tabular-nums;
  text-align: center;
}

.course-sidebar .chev {
  flex: none;
  width: 0.85rem;
  height: 0.85rem;
  opacity: 0.5;
}

// ------------------------------------------------------------ panel 2: a week
.course-sidebar .back-row {
  display: flex;
  gap: 0.4rem;
  align-items: center;
  width: 100%;
  padding: 0.35rem 1.5rem;
  border: 0;
  background: none;
  color: var(--vp-c-text-quote, #6a7683);
  font-family: inherit;
  font-size: 0.85rem;
  font-weight: 600;
  text-align: start;
  cursor: pointer;
}

.course-sidebar .back-row:hover {
  color: var(--vp-c-accent, #3eaf7c);
}

.course-sidebar .back-row:focus-visible {
  outline: 2px solid var(--vp-c-accent, #3eaf7c);
  outline-offset: -2px;
}

.course-sidebar .chev.back {
  opacity: 0.7;
}

.course-sidebar .week-heading {
  margin: 0 0 0.75rem;
  padding-inline: 1.5rem;
  border: 0;
  color: var(--vp-c-text, #213547);
  font-size: 1.05rem;
  font-weight: 600;
  line-height: 1.3;
}

// The rail is what makes the week's modules read as one group rather than a
// second flat list.
.course-sidebar .module-list {
  margin-inline-start: 1.5rem;
  border-inline-start: 1px solid var(--vp-c-divider, #e2e2e3);
}

.course-sidebar .module-list .vp-sidebar-item {
  padding-inline-start: 0.85rem;
  border-inline-start: 2px solid transparent;
  margin-inline-start: -1px;
}

.course-sidebar .module-list > li > .vp-sidebar-item.active {
  border-inline-start-color: var(--vp-c-accent, #3eaf7c);
  background-color: var(--vp-c-bg-alt, #f6f6f7);
  font-weight: 600;
}

.course-sidebar .see-all {
  display: inline-block;
  margin: 0.9rem 0 0;
  padding-inline: 1.5rem;
  color: var(--vp-c-accent, #3eaf7c);
  font-size: 0.85rem;
  font-weight: 600;
}

.course-sidebar .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

// Panels slide in from the side they came from. Distance is small on purpose:
// this is an orientation cue, not an effect.
.course-sidebar .panel {
  animation: course-sidebar-in 180ms ease;
}

.course-sidebar.is-back .panel {
  animation-name: course-sidebar-in-back;
}

@keyframes course-sidebar-in {
  from {
    opacity: 0;
    transform: translateX(12px);
  }
}

@keyframes course-sidebar-in-back {
  from {
    opacity: 0;
    transform: translateX(-12px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .course-sidebar .panel {
    animation: none;
  }
}
</style>
