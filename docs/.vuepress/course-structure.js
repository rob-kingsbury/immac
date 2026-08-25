// Reads the two course content pages and derives the week structure from them,
// so the sidebar and the prev/next chain cannot drift from what a week actually
// lists. The content page stays the single source of truth: edit a week there
// and navigation follows on the next build.
//
// Why the sidebar and prev/next are built separately:
//
// The theme resolves prev/next by looking for the current page among its
// SIBLINGS, and only recurses into a group's children if the page was not found
// at the current level (see useRelatedLinks, function `l`). So nesting modules
// under week groups, which is what makes the sidebar readable, would end the
// chain at every week boundary: the last module of Week 4 has no sibling after
// it, and its Next would be empty. Fifteen dead ends per course.
//
// Frontmatter prev/next is checked BEFORE that sibling lookup, so setting it
// from the flattened course order overrides the boundary problem entirely. It
// is applied by the extendsPage hook in config.js rather than written into the
// module files, which keeps module source week-unaware: a module still says
// nothing about which course or week it belongs to.

import fs from 'node:fs'
import path from 'node:path'

export const COURSES = ['mtm1511', 'mtm1544']

const COURSE_TITLES = {
  mtm1511: 'MTM1511',
  mtm1544: 'MTM1544',
}

// "/modules/html/html-basics/README.md" -> "/modules/html/html-basics/"
// "/modules/html/html-text/quotations.md" -> "/modules/html/html-text/quotations.html"
const toRoute = (link) =>
  link.endsWith('/README.md') ? link.slice(0, -'README.md'.length) : link.replace(/\.md$/, '.html')

// The directory a module page lives in. Used as a sidebar key, so that a module
// and its sub-pages resolve to the same course.
const toDir = (route) => (route.endsWith('/') ? route : route.replace(/[^/]+$/, ''))

function parseCourse(docsDir, course) {
  const file = path.resolve(docsDir, course, 'content', 'README.md')
  const src = fs.readFileSync(file, 'utf8')

  const weeks = []
  const blocks = src.matchAll(
    /<summary id="(week-(\d+)-[^"]*)">Week \d+: ([^<]+)<\/summary>([\s\S]*?)<\/details>/g
  )
  for (const [, anchor, number, title, body] of blocks) {
    // Bullet list items only. Links inside exercise prose mention a module
    // without placing it in the week's reading order.
    const modules = []
    for (const [, text, link] of body.matchAll(/^- \[([^\]]+)\]\((\/modules\/[^)]+)\)/gm)) {
      const route = toRoute(link)
      if (!modules.some((m) => m.link === route)) modules.push({ text, link: route })
    }
    weeks.push({ number: Number(number), title: title.trim(), anchor, modules })
  }

  if (weeks.length !== 15) {
    throw new Error(`${course}: parsed ${weeks.length} weeks from ${file}, expected 15`)
  }
  if (weeks.every((w) => w.modules.length === 0)) {
    throw new Error(`${course}: parsed 15 weeks but no modules, the bullet pattern stopped matching`)
  }
  return weeks
}

export function readCourseStructure(docsDir) {
  const byCourse = {}
  for (const course of COURSES) byCourse[course] = parseCourse(docsDir, course)

  // A module is owned by the first course, and the first week within it, that
  // lists it. Listing the same page twice in one sidebar makes the theme
  // resolve prev/next against whichever copy it finds first, so each module
  // appears exactly once even though a week's prose may reference it again.
  const owner = new Map()
  for (const course of COURSES) {
    for (const week of byCourse[course]) {
      for (const mod of week.modules) {
        if (!owner.has(mod.link)) owner.set(mod.link, { course, week: week.number, text: mod.text })
      }
    }
  }

  // Per-course reading order, each module once, in week order.
  const order = {}
  for (const course of COURSES) {
    order[course] = []
    for (const week of byCourse[course]) {
      for (const mod of week.modules) {
        if (owner.get(mod.link).course === course && !order[course].some((m) => m.link === mod.link)) {
          order[course].push(mod)
        }
      }
    }
  }

  // route -> { prev, next } across the whole course, so the chain runs from the
  // first module of Week 1 to the last of Week 15 without stopping at a week.
  const chain = new Map()
  for (const course of COURSES) {
    order[course].forEach((mod, i) => {
      chain.set(mod.link, {
        prev: order[course][i - 1] ?? null,
        next: order[course][i + 1] ?? null,
      })
    })
  }

  // Module directory -> course, for sidebar keys. A sub-page inherits its
  // parent's course even when the sub-page itself is not listed in a week.
  const dirToCourse = new Map()
  for (const [route, info] of owner) {
    const dir = toDir(route)
    if (!dirToCourse.has(dir)) dirToCourse.set(dir, info.course)
  }

  // route -> every (course, week) that lists it, in course then week order.
  //
  // This is the same week->modules data the sidebar is built from, inverted. It
  // exists because a module page cannot say where it sits on its own: module
  // source is deliberately week-unaware (see the header of this file), and the
  // sidebar can only ever show ONE course, because VuePress resolves a single
  // sidebar per URL path. Five modules are listed by both courses and all five
  // resolve to mtm1511, so a mtm1544 reader following a link from their own
  // week lands on a page wearing the other course's sidebar. Eight more are
  // revisited in a later week of the same course and land the reader on a week
  // group they did not click from.
  //
  // Inverting here rather than in the page means nothing is written into any
  // module file, and a module added to a week in /<course>/content/ picks this
  // up on the next build with no further edit.
  const whereUsed = new Map()
  for (const course of COURSES) {
    for (const week of byCourse[course]) {
      for (const mod of week.modules) {
        if (!whereUsed.has(mod.link)) whereUsed.set(mod.link, [])
        const list = whereUsed.get(mod.link)
        // A week may name the same module twice in prose; parsing already
        // deduplicates within a week, so a duplicate here would be a bug.
        if (!list.some((u) => u.course === course && u.week === week.number)) {
          list.push({
            course,
            courseTitle: COURSE_TITLES[course],
            week: week.number,
            weekTitle: week.title,
            link: `/${course}/content/#${week.anchor}`,
          })
        }
      }
    }
  }

  return { byCourse, owner, order, chain, dirToCourse, whereUsed }
}

// Course sidebar: the course's own pages, with Weekly Content holding one group
// per week. Weeks are collapsible so fifteen of them stay scannable; the theme
// expands whichever group contains the current page.
export function courseSidebar(course, structure) {
  const weeks = structure.byCourse[course]
    .filter((w) => w.modules.length > 0)
    .map((w) => ({
      text: `Week ${w.number}: ${w.title}`,
      // The week's section on the course content page, which carries the
      // exercises and the framing the module list alone does not.
      link: `/${course}/content/#${w.anchor}`,
      collapsible: true,
      // Every module this week's content page actually lists, including a
      // deliberate revisit of a module owned (for prev/next purposes) by an
      // earlier week -- the reader came to Week 12 to see "HTML Validation"
      // again, and a sidebar that silently drops it because Week 2 "owns" it
      // is wrong, not tidy. `structure.owner` is for the prev/next chain
      // only (see readCourseStructure); it has no say over what a week's own
      // sidebar shows. w.modules is already deduplicated within this single
      // week during parsing, so no further filtering belongs here.
      children: w.modules.map((m) => ({ text: m.text, link: m.link })),
    }))
    .filter((w) => w.children.length > 0)

  return [
    { text: 'Course Home', link: `/${course}/` },
    { text: 'Overview', link: `/${course}/overview/` },
    {
      text: 'Weekly Content',
      link: `/${course}/content/`,
      collapsible: false,
      children: weeks,
    },
    { text: 'Resources', link: `/${course}/resources/` },
    { text: 'Glossary', link: '/glossary/' },
  ]
}

export { COURSE_TITLES }
