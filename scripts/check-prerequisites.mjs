// Validates the module pool's prerequisite graph.
//
// Every module declares `prerequisites:` in its frontmatter as other module
// paths relative to docs/modules, without the .md extension. This script checks
// two properties that have to hold for the pool to be usable:
//
//   1. Every prerequisite resolves to a module that actually exists.
//   2. The graph is acyclic.
//
// The second matters more than it looks. A cycle means no course can order the
// modules into weeks at all, and cycles are easy to introduce accidentally when
// two modules each cross-reference the other. Neither the VuePress build nor a
// link checker catches it.
//
// Runs on source; no build required.
//
//   node scripts/check-prerequisites.mjs
//
// Exits non-zero on any unresolved reference or cycle, so it is CI-safe.

import fs from 'node:fs'
import path from 'node:path'

const ROOT = 'docs/modules'

if (!fs.existsSync(ROOT)) {
  console.error(`No ${ROOT} directory. Run from the repository root.`)
  process.exit(2)
}

const files = []
;(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(p)
    else if (entry.name.endsWith('.md')) files.push(p)
  }
})(ROOT)

/** moduleId -> array of prerequisite moduleIds */
const graph = {}
const problems = []

for (const file of files) {
  const rel = path.relative(ROOT, file).split(path.sep).join('/')

  // A discipline index (docs/modules/<discipline>/README.md) is navigation, not
  // a module: it declares no prerequisites and nothing can depend on it.
  // Counting it would quietly inflate the module total.
  if (rel.split('/').length === 2 && rel.endsWith('/README.md')) continue

  // Normalise line endings before matching. git is configured with
  // core.autocrlf=true on Windows, so a fresh checkout hands this script CRLF
  // files, `^---\n` never matches, and the whole graph comes back all but
  // empty while still exiting zero. That is worse than a failure: it reports
  // "0 unresolved, 0 cycles" over almost no modules and reads as a pass.
  const src = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n')
  const frontmatter = src.match(/^---\n([\s\S]*?)\n---/)
  if (!frontmatter) {
    problems.push(`${rel} has no frontmatter`)
    continue
  }

  let id = rel
  id = id.replace(/\/README\.md$/, '').replace(/\.md$/, '')

  const block = frontmatter[1].match(/prerequisites:\n((?:[ \t]+-[ \t].*\n?)+)/)
  graph[id] = block
    ? block[1]
        .split('\n')
        .map((line) => line.replace(/^[ \t]*-[ \t]*/, '').trim())
        .filter(Boolean)
    : []
}

const ids = Object.keys(graph)

// 1. Unresolved references
const unresolved = []
for (const [id, prereqs] of Object.entries(graph)) {
  for (const p of prereqs) {
    const exists =
      fs.existsSync(path.join(ROOT, `${p}.md`)) ||
      fs.existsSync(path.join(ROOT, p, 'README.md'))
    if (!exists) unresolved.push({ from: id, to: p })
  }
}

// 2. Cycles, via DFS colouring
const WHITE = 0
const GREY = 1
const BLACK = 2
const colour = {}
const cycles = []

function visit(node, stack) {
  colour[node] = GREY
  stack.push(node)
  for (const next of graph[node] || []) {
    if (!(next in graph)) continue // unresolved, reported separately
    if (colour[next] === GREY) {
      cycles.push([...stack.slice(stack.indexOf(next)), next].join(' -> '))
    } else if ((colour[next] ?? WHITE) === WHITE) {
      visit(next, stack)
    }
  }
  colour[node] = BLACK
  stack.pop()
}
for (const id of ids) if ((colour[id] ?? WHITE) === WHITE) visit(id, [])

const edgeCount = Object.values(graph).reduce((n, p) => n + p.length, 0)
const roots = ids.filter((id) => graph[id].length === 0)

console.log(`modules:      ${ids.length}`)
console.log(`dependencies: ${edgeCount}`)
console.log(`entry points: ${roots.length} (no prerequisites)`)

if (unresolved.length) {
  problems.push(`${unresolved.length} unresolved prerequisite reference(s)`)
  console.error(`\nUNRESOLVED (${unresolved.length}):`)
  for (const u of unresolved) console.error(`   ${u.from}  ->  ${u.to}   (target does not exist)`)
} else {
  console.log('unresolved:   0')
}

if (cycles.length) {
  problems.push(`${cycles.length} cycle(s)`)
  console.error(`\nCYCLES (${cycles.length}):`)
  for (const c of cycles) console.error(`   ${c}`)
} else {
  console.log('cycles:       0')
}

if (problems.length) {
  console.error(`\nFAILED: ${problems.join(', ')}`)
  process.exit(1)
}
console.log('\nOK: prerequisite graph resolves and is acyclic.')
