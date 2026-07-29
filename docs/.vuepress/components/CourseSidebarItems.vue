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

import { computed, ref, watch, nextTick, onMounted, onBeforeUnmount, useTemplateRef } from 'vue'
import { useRoute, useRouter } from 'vuepress/client'

import { useSidebarItems } from '@theme/useSidebarItems'
import VPSidebarItem from '@theme/VPSidebarItem.vue'

const route = useRoute()
const router = useRouter()
const sidebarItems = useSidebarItems()
const backButton = useTemplateRef('backButton')
const weekList = useTemplateRef('weekList')
const moduleList = useTemplateRef('moduleList')
const sidebarRoot = useTemplateRef('sidebarRoot')

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

// The 'Weekly Content' group's own link is the course content page itself
// (course-structure.js sets it to /<course>/content/), which is where a
// shared "Week 3" link, in the Brightspace sense, actually points: the week's
// own section, not any one module.
const contentPagePath = computed(() => weekly.value?.link ?? null)

// A week is current in either of two ways. The reader may be on one of its
// modules (or one of that module's own headings) -- the original case. Or
// they may have landed on the course content page with a hash naming a week
// directly, which is what happens the moment a week becomes linkable on its
// own rather than only reachable by drilling in. Both have to open the same
// panel, or a shared link and a sidebar click would disagree about what
// "viewing Week 3" means.
function weekIndexForHash(hash) {
  if (!hash) return -1
  return weeks.value.findIndex((week) => week.link?.endsWith(hash))
}

const activeWeek = computed(() => {
  if (contentPagePath.value && route.path === contentPagePath.value) {
    const byHash = weekIndexForHash(route.hash)
    if (byHash >= 0) return byHash
  }
  return weeks.value.findIndex((week) =>
    (week.children ?? []).some(
      (mod) => samePage(mod.link) || (mod.children ?? []).some((h) => samePage(h.link))
    )
  )
})

const open = ref(null)
const direction = ref('forward')

// Follow the reader: landing on a module, or on a week's own link, opens that
// week. Watches fullPath rather than path, because choosing a different week
// from the sidebar now navigates by hash alone (see drillInto) -- the course
// content page's path never changes, only which week's anchor is current --
// and a path-only watch would miss that entirely.
watch(
  () => route.fullPath,
  () => {
    open.value = activeWeek.value >= 0 ? activeWeek.value : null
  },
  { immediate: true }
)

const openedWeek = computed(() => (open.value === null ? null : weeks.value[open.value] ?? null))

// Focus follows a deliberate press so a keyboard user is not left on a control
// that no longer exists. Route-driven changes leave focus alone, since the
// reader is already reading.
//
// Choosing a week navigates, not just flips a sidebar panel. Before this, the
// sidebar could show Week 3's panel while the main pane sat wherever it
// already was -- nothing had told it Week 3 existed. Every week already has
// a real, linkable page (week.link, the course content page's own anchor for
// that week), so opening the panel and visiting it are the same action, the
// way choosing a chapter takes you to that chapter rather than just
// highlighting its name in a menu.
async function drillInto(index) {
  direction.value = 'forward'
  open.value = index
  const week = weeks.value[index]
  if (week?.link) await router.push(week.link)
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

// The module list's rail was a straight CSS border, and a page's own headings
// got a second, separate rail nested inside it with a small arrow standing in
// for "you are here." Two parallel lines is why the arrow read as a mark
// sitting beside the rail rather than part of it. This draws one line for the
// whole week: straight past every module, except the one whose headings are
// showing, where it steps in, runs a node past each heading, and steps back
// out. Built from the real laid-out rows via getBoundingClientRect, the same
// way the demo this was prototyped from was, because the run of each diagonal
// depends on the gap it crosses and a wrapped heading changes every row below
// it -- no fixed number survives that.
//
// This only runs in the browser. onMounted never fires during VuePress's
// static-site render, so the DOM measurement here never executes on a server
// that has no DOM to measure.
function drawWeekRail() {
  const list = moduleList.value
  if (!list) return

  // On a cold load of a week deep link, the server renders panel 1 and the
  // client immediately swaps to panel 2. Vue reuses the server's <ul> through
  // that hydration patch and keeps its attributes, so this list arrives
  // without its own class, and every rule below that depends on it, including
  // the positioning this SVG is placed against, silently does not apply.
  // Clicking a week never hits it, because no hydration is involved by then.
  // Asserting the class here costs nothing and does not care why it is absent.
  list.classList.add('module-list')

  list.querySelector(':scope > svg.week-rail')?.remove()

  const box = list.getBoundingClientRect()
  if (box.height === 0) return

  const X = 0.5 // main rail x
  const IN = 21 // how far the branch steps in
  const R = 3.4 // node radius

  const rel = (y) => y - box.top
  const items = [...list.children]
  let d = `M${X} 0`
  const circles = []
  const current = []

  items.forEach((li, i) => {
    const modLink = li.querySelector(':scope > a, :scope > p')

    // The current module is marked by turning its own stretch of rail green,
    // rather than by a border on the row. A border would sit beside the rail
    // as a second, thicker bar, and the rail is an absolutely positioned SVG
    // so it paints over static content and would hide a 1px one anyway.
    // Drawn here, at the rail's own x and width, that length of line simply
    // is green.
    if (modLink?.classList.contains('active')) {
      const r = modLink.getBoundingClientRect()
      current.push(
        `<path d="M${X} ${rel(r.top)} L${X} ${rel(r.bottom)}" fill="none" stroke="var(--vp-c-accent, #3eaf7c)" stroke-width="1"/>`
      )
    }

    const childList = li.querySelector(':scope > ul.vp-sidebar-children')
    const headings = childList && childList.offsetParent !== null ? [...childList.children] : []
    if (!modLink || headings.length === 0) return

    const inTop = rel(modLink.getBoundingClientRect().bottom)
    const inBottom = rel(headings[0].firstElementChild.getBoundingClientRect().top)
    const outTop = rel(headings.at(-1).firstElementChild.getBoundingClientRect().bottom)
    const nextLink = items[i + 1]?.querySelector(':scope > a, :scope > p')
    const outBottom = nextLink ? rel(nextLink.getBoundingClientRect().top) : box.height

    d += ` L${X} ${inTop} L${X + IN} ${inBottom} L${X + IN} ${outTop} L${X} ${outBottom}`

    for (const h of headings) {
      const a = h.firstElementChild
      const r = a.getBoundingClientRect()
      const y = rel(r.top) + r.height / 2
      circles.push(
        a.classList.contains('active')
          ? `<circle cx="${X + IN}" cy="${y}" r="${R + 0.6}" fill="var(--vp-c-accent, #3eaf7c)"/>`
          : `<circle cx="${X + IN}" cy="${y}" r="${R}" fill="var(--vp-sidebar-c-bg, #fff)" stroke="var(--week-node-ring)" stroke-width="1.25"/>`
      )
    }
  })

  d += ` L${X} ${box.height}`

  list.insertAdjacentHTML(
    'afterbegin',
    `<svg class="week-rail" width="${box.width}" height="${box.height}" viewBox="0 0 ${box.width} ${box.height}" aria-hidden="true">
       <path d="${d}" fill="none" stroke="var(--vp-c-divider, #e2e2e3)" stroke-width="1" stroke-linejoin="round"/>
       ${current.join('')}
       ${circles.join('')}
     </svg>`
  )
}

onMounted(() => {
  let frame = null
  const redraw = () => {
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(drawWeekRail)
  }
  redraw()

  // fullPath, so drillInto's hash-only navigation between weeks and any
  // in-page module change both trigger a redraw, not just a path change.
  const stopRoute = watch(() => route.fullPath, () => nextTick(redraw))
  const stopOpen = watch(open, () => nextTick(redraw))

  // Catches what the route watchers can't: a reader manually toggling a
  // heading list open or closed via its own collapse arrow, with no
  // navigation involved at all.
  const resize = new ResizeObserver(redraw)
  if (sidebarRoot.value) resize.observe(sidebarRoot.value)

  onBeforeUnmount(() => {
    cancelAnimationFrame(frame)
    stopRoute()
    stopOpen()
    resize.disconnect()
  })
})
</script>

<template>
  <div v-if="weekly" ref="sidebarRoot" class="course-sidebar" :class="`is-${direction}`">
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

      <!-- :key forces a fresh element per week rather than letting Vue reuse
           one. On a cold load of a deep link the server renders panel 1 and
           the client immediately wants panel 2, and in that hydration patch
           Vue reused the server's <ul> and kept its attributes, so this list
           silently rendered without its own module-list class -- and the
           rail's absolute positioning depends on that class. Clicking a week
           never hit it, because there is no hydration involved by then. -->
      <ul ref="moduleList" class="plain module-list">
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

// The rail used to be a static CSS border the whole way down, with a second,
// separate border nested inside it for whichever module's headings were
// showing, plus a small arrow standing in for "you are here." Two parallel
// lines is why the arrow read as a mark beside the rail instead of part of
// it. drawWeekRail() replaces both with one SVG line for the whole list: it
// runs straight past every module and steps in and back out only around the
// one whose headings are open, a hollow node against each heading, filled for
// the active one -- a branching timeline rather than a second rail.
//
//   |  How the Web Works
//   |  HTML Basics
//    \
//     o  What HTML is
//     ●  What an HTML element actually is
//     o  The checklist
//    /
//   |  Setting Up Your Development Environment
//
.course-sidebar .module-list {
  position: relative;
  margin-inline-start: 1.5rem;
}

.course-sidebar .week-rail {
  position: absolute;
  inset-inline-start: 0;
  top: 0;
  overflow: visible;
  pointer-events: none;
}

.course-sidebar .module-list .vp-sidebar-item {
  padding-inline-start: 0.85rem;
}

// The current module. No background, and no border: the rail carries the mark
// now, drawn green over exactly this row's height in drawWeekRail, so that
// stretch of line reads as green rather than a separate bar sitting beside it.
// The theme's accent text colour still applies.
.course-sidebar .module-list > li > .vp-sidebar-item.active {
  border-inline-start-color: transparent;
  background: none;
  font-weight: 600;
}

// A page's own headings. The theme's own default gives every active sidebar
// item a coloured left border, headings included -- fine at the module level,
// where nothing else is competing for that spot, but wrong here, where the
// node on the rail already marks the active heading. Only the border is
// unset; colour and weight stay the theme's own active styling.
// The gap the diagonals actually run in. Without it the module row's bottom
// and the first heading's top are the same y, so the branch steps sideways
// with no vertical run at all and reads as a flat jog rather than an angle.
// drawWeekRail measures this at runtime rather than assuming a number, so the
// line fills whatever gap is set here.
.course-sidebar .module-list .vp-sidebar-children {
  margin-block: 7px 9px;
}

.course-sidebar .module-list .vp-sidebar-children .vp-sidebar-item {
  padding-inline-start: 2.5rem;
  font-size: 0.9rem;
}

.course-sidebar .module-list .vp-sidebar-children .vp-sidebar-item.active {
  border-inline-start-color: transparent;
}

.course-sidebar {
  // One step darker than --vp-c-divider: a hairline rail reads fine at 1px,
  // but a hollow node that faint disappears at real sidebar size. Mixed from
  // the theme's own variables, not a fixed hex, so it self-adjusts in dark
  // mode instead of staying a light-mode grey against a dark background.
  --week-node-ring: color-mix(in srgb, var(--vp-c-divider, #e2e2e3) 60%, var(--vp-c-text, #213547) 40%);
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
