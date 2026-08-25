<script setup>
// One line at the top of a placed module page saying which course and week the
// reader is reading for, with each week linking back to its section of that
// course's content page.
//
// Why this exists. Module pages are shared: eight are revisited in a later week
// of the same course, and five are listed by both courses. Following a link out
// of Week 12 to a module first listed in Week 2 lands the reader on a page whose
// sidebar has jumped to Week 2, and following a link out of MTM1544 to a shared
// accessibility module lands them on a page wearing the MTM1511 sidebar. Neither
// is recoverable from anything on screen, and a reviewer reported reading a page
// twice before noticing they had been moved.
//
// The sidebar cannot fix the second case: VuePress resolves exactly one sidebar
// per URL path, so a page listed by both courses has to pick one. This line is
// the only place a shared page can tell a reader from the other course that the
// page belongs to their week too, and give them a way back into it.
//
// The data comes from frontmatter.whereUsed, set by extendsPage in config.js
// from the inverted week map in course-structure.js. Nothing is written into a
// module file, so a module stays week-unaware and adding one to a week in
// /<course>/content/ picks this up on the next build.

import { computed } from 'vue'
import { usePageFrontmatter } from 'vuepress/client'

const frontmatter = usePageFrontmatter()

const used = computed(() => frontmatter.value.whereUsed ?? [])

// Group by course so a page shared across both reads as two labelled rows
// rather than one run-on list where the course codes are easy to miss.
const byCourse = computed(() => {
  const groups = []
  for (const entry of used.value) {
    let group = groups.find((g) => g.course === entry.course)
    if (!group) {
      group = { course: entry.course, courseTitle: entry.courseTitle, weeks: [] }
      groups.push(group)
    }
    group.weeks.push(entry)
  }
  return groups
})

const shared = computed(() => byCourse.value.length > 1)
</script>

<template>
  <aside v-if="used.length" class="module-week-context" aria-label="Where this page is used">
    <p class="mwc-label">{{ shared ? 'Used in both courses' : 'Used in' }}</p>
    <ul class="mwc-list">
      <li v-for="group in byCourse" :key="group.course" class="mwc-row">
        <span class="mwc-course">{{ group.courseTitle }}</span>
        <span class="mwc-weeks">
          <template v-for="(w, i) in group.weeks" :key="w.link">
            <RouteLink :to="w.link" class="mwc-week">Week {{ w.week }}: {{ w.weekTitle }}</RouteLink>
            <span v-if="i < group.weeks.length - 1" class="mwc-sep" aria-hidden="true">·</span>
          </template>
        </span>
      </li>
    </ul>
  </aside>
</template>

<style lang="scss">
.module-week-context {
  margin: 0 0 2rem;
  padding: 0.7rem 0 0.8rem;
  border-block: 1px solid var(--vp-c-divider);
  font-size: 0.85rem;
  line-height: 1.5;
}

// Reads as a label, never as a link.
.module-week-context .mwc-label {
  margin: 0 0 0.35rem;
  color: var(--vp-c-text-mute);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.module-week-context .mwc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.module-week-context .mwc-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.15rem 0.6rem;
  align-items: baseline;
  margin: 0;
}

.module-week-context .mwc-row + .mwc-row {
  margin-top: 0.15rem;
}

// 24px minimum tap target. The course's own Touch Targets module sets that
// floor, and at 13.6px these links come out 18px tall on their own. Padding
// rather than a larger font, which is what that module tells students to do.
// The row gap above is reduced to absorb the extra height.
.module-week-context .mwc-week {
  display: inline-block;
  padding-block: 0.2rem;
}

// Fixed gutter so two course rows line their weeks up instead of going ragged.
.module-week-context .mwc-course {
  flex: none;
  min-width: 5rem;
  color: var(--vp-c-text);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.module-week-context .mwc-weeks {
  flex: 1;
  min-width: 0;
}

.module-week-context .mwc-sep {
  margin-inline: 0.35rem;
  color: var(--vp-c-text-mute);
}

@media (max-width: 419px) {
  .module-week-context .mwc-row {
    display: block;
  }

  .module-week-context .mwc-course {
    display: block;
    margin-bottom: 0.1rem;
  }

  // Each week takes its own line at this width, so the interpunct that
  // separates them inline is left dangling at the end of a line. One week per
  // line is the separator.
  .module-week-context .mwc-week {
    display: block;
  }

  .module-week-context .mwc-sep {
    display: none;
  }
}
</style>
