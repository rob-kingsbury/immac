// Validates the navigation layer: the discipline sidebars in config.js and the
// two course weekly-content pages.
//
// Four properties, each of which broke something real:
//
//   1. NO MODULE APPEARS TWICE IN ONE SIDEBAR. The default theme resolves
//      prev/next by finding the current page among its siblings and taking the
//      neighbour. A page listed under two groups resolves against whichever
//      copy the walk reaches first, so both Prev and Next can land on the same
//      page. Ten modules were listed under two weeks each in the week-nested
//      sidebars, and every one of them rendered that way on the live site.
//      Course content pages are exempt: they are prose, they carry no
//      prev/next, and a module genuinely taught twice belongs under both weeks.
//
//   2. NO MODULE IS IN TWO DISCIPLINE SIDEBARS. Two sidebars listing the same
//      module means a student sees different navigation depending on the route
//      in, which is the whole failure the discipline split removes.
//
//   3. EVERY MODULE IS REACHABLE FROM ITS DISCIPLINE INDEX PAGE. The sidebar
//      and the index page are separate lists that have to agree, and the index
//      is the one a search engine and a linkless mobile reader see.
//
//   4. NO MODULE FILE MENTIONS A WEEK OR AN ASSESSMENT. Modules are reusable
//      only while they stay week-unaware. This catches a chronology reference
//      creeping back in during an edit.
//
// Runs on source; no build required.
//
//   node scripts/check-nav.mjs
//
// Exits non-zero on any violation, so it is CI-safe.

import fs from 'node:fs'
import path from 'node:path'

const MODULES = 'docs/modules'
const CONFIG = 'docs/.vuepress/config.js'
const COURSES = ['mtm1511', 'mtm1544']

// Course-layer pages that live in the pool but are not modules. They carry a
// week's worth of housekeeping rather than a topic, and are linked from the
// course content pages only.
const PLACEHOLDERS = new Set([
  'reading-week',
  'project/project-development',
  'project/project-work-lab',
  'css/reading-week',
  'css/project-development',
  'css/project-work-lab',
])

const problems = []
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n')

// ---------------------------------------------------------------- module list
/** Every module file on disk, as an id like `html/html-text/quotations`. */
const moduleIds = []
/** Discipline index pages, one per discipline folder. */
const indexIds = []
;(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(p)
    else if (entry.name.endsWith('.md')) {
      const rel = path.relative(MODULES, p).split(path.sep).join('/')
      const id = rel.replace(/\/README\.md$/, '').replace(/\.md$/, '')
      if (rel.split('/').length === 2 && rel.endsWith('/README.md')) indexIds.push(id)
      else moduleIds.push(id)
    }
  }
})(MODULES)

const disciplines = indexIds.slice().sort()

// ---------------------------------------------------------------- sidebars
const config = read(CONFIG)

/** Pull every `link: '...'` out of one `const <name> = [ ... ]` declaration. */
function sidebarLinks(name) {
  const start = config.indexOf(`const ${name} = [`)
  if (start === -1) return null
  let depth = 0
  let i = config.indexOf('[', start)
  const from = i
  for (; i < config.length; i++) {
    if (config[i] === '[') depth++
    else if (config[i] === ']') {
      depth--
      if (depth === 0) break
    }
  }
  const block = config.slice(from, i + 1)
  return [...block.matchAll(/link:\s*'([^']+)'/g)].map((m) => m[1])
}

const camel = (s) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
const linkToId = (link) =>
  link.replace(/^\/modules\//, '').replace(/\/README\.md$/, '').replace(/\.md$/, '')

const seenInDiscipline = new Map() // id -> discipline

for (const d of disciplines) {
  const name = `${camel(d)}Sidebar`
  const links = sidebarLinks(name)
  if (!links) {
    problems.push(`config.js has no ${name} for discipline ${d}/`)
    continue
  }
  if (!config.includes(`'/modules/${d}/': ${name}`)) {
    problems.push(`config.js does not key '/modules/${d}/' to ${name}`)
  }

  const within = new Set()
  for (const link of links) {
    if (within.has(link)) problems.push(`${name} lists ${link} more than once`)
    within.add(link)

    if (!link.startsWith('/modules/')) {
      problems.push(`${name} links outside the module pool: ${link}`)
      continue
    }
    const id = linkToId(link)
    if (id === d) continue // the discipline's own index page
    if (seenInDiscipline.has(id)) {
      problems.push(`${id} is in two discipline sidebars: ${seenInDiscipline.get(id)} and ${d}`)
    }
    seenInDiscipline.set(id, d)
    if (!moduleIds.includes(id)) problems.push(`${name} links a module that does not exist: ${id}`)
  }
}

for (const id of moduleIds) {
  if (PLACEHOLDERS.has(id)) continue
  if (!seenInDiscipline.has(id)) problems.push(`module in no discipline sidebar: ${id}`)
}

// ---------------------------------------------------------------- index pages
for (const d of disciplines) {
  const src = read(path.join(MODULES, d, 'README.md'))
  const listed = new Set(
    [...src.matchAll(/\]\((\/modules\/[^)]+)\)/g)].map((m) => linkToId(m[1])),
  )
  for (const [id, disc] of seenInDiscipline) {
    if (disc !== d) continue
    if (!listed.has(id)) problems.push(`${d}/README.md does not link ${id}`)
  }
}

// ---------------------------------------------------------------- week pages
const inAWeek = new Set()
for (const course of COURSES) {
  const f = `docs/${course}/content/README.md`
  if (!fs.existsSync(f)) {
    problems.push(`missing ${f}`)
    continue
  }
  const src = read(f)
  // Weeks are <details> blocks, not headings, so a week can be collapsed. The
  // id on the summary is written by hand rather than generated from the
  // heading text, so it is checked against the visible number: an id saying
  // week-4 above text saying Week 5 would silently send every assessment link
  // pointing at that anchor to the wrong week.
  const summaries = [...src.matchAll(/^<summary id="week-(\d+)-[^"]*">Week (\d+): /gm)]
  const weeks = summaries.map((m) => Number(m[2]))
  const expected = Array.from({ length: 15 }, (_, i) => i + 1)
  if (weeks.join(',') !== expected.join(',')) {
    problems.push(`${f} has weeks [${weeks.join(', ')}], expected 1 through 15 in order`)
  }
  for (const m of summaries) {
    if (m[1] !== m[2]) problems.push(`${f} summary id says week ${m[1]} but the text says Week ${m[2]}`)
  }
  const wrappers = (src.match(/^<details class="week" open>$/gm) ?? []).length
  if (wrappers !== weeks.length) {
    problems.push(`${f} has ${weeks.length} week summaries but ${wrappers} details wrappers`)
  }
  for (const m of src.matchAll(/\]\((\/modules\/[^)]+)\)/g)) {
    const id = linkToId(m[1])
    inAWeek.add(id)
    if (!moduleIds.includes(id)) problems.push(`${f} links a module that does not exist: ${id}`)
  }
}

// ---------------------------------------------------------------- module hygiene
const WEEK_WORDS = /\b(week \d+|weeks \d+|worklab|reading week)\b/i
// "mark" and "marks" are deliberately absent: they are far more common as
// ordinary verbs here ("<q> marks a short quote", "markup") than as grading
// language, and every hit was a false positive.
const ASSESS_WORDS = /\b(assignments?|quiz|quizzes|rubrics?|graded|grading|midterm|final project|due date|worth \d+ ?%|out of \d+ marks)\b/i

for (const id of moduleIds) {
  if (PLACEHOLDERS.has(id)) continue
  const f = fs.existsSync(path.join(MODULES, `${id}.md`))
    ? path.join(MODULES, `${id}.md`)
    : path.join(MODULES, id, 'README.md')
  const src = read(f)

  if (!/^---\n[\s\S]*?\ntitle:|^---\ntitle:/m.test(src)) {
    if (!/^---\n([\s\S]*?)\n---/.exec(src)?.[1]?.includes('title:')) {
      problems.push(`${id} has no frontmatter title, so it drops out of the search index`)
    }
  }

  const body = src.replace(/^---\n[\s\S]*?\n---\n/, '')
  const w = body.match(WEEK_WORDS)
  if (w) problems.push(`${id} refers to a week: "${w[0]}"`)
  const a = body.match(ASSESS_WORDS)
  if (a) problems.push(`${id} refers to an assessment: "${a[0]}"`)

  const last = src.trimEnd().split('\n').pop().trim()
  if (/^#{1,6}\s/.test(last) || last.startsWith('```')) {
    problems.push(`${id} ends on "${last}" rather than finished prose`)
  }
}

// ---------------------------------------------------------------- report
console.log(`modules:            ${moduleIds.length - PLACEHOLDERS.size}`)
console.log(`disciplines:        ${disciplines.length}`)
console.log(`in a discipline:    ${seenInDiscipline.size}`)
console.log(`placed in a week:   ${[...inAWeek].filter((id) => !PLACEHOLDERS.has(id)).length}`)

const orphans = [...seenInDiscipline.keys()].filter((id) => !inAWeek.has(id))
if (orphans.length) {
  console.log(`\nReachable from a discipline index but in no course week (${orphans.length}):`)
  for (const id of orphans) console.log(`   ${id}`)
}

if (problems.length) {
  console.error(`\nFAILED (${problems.length}):`)
  for (const p of problems) console.error(`   ${p}`)
  process.exit(1)
}
console.log('\nOK: every module sits in exactly one discipline sidebar and index, and no module names a week or an assessment.')
