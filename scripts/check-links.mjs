// Dead-link checker for the built site.
//
// VuePress does NOT verify internal links. A build passing proves the pages
// compiled, not that they point anywhere real. This walks the rendered output
// and resolves every anchor against actual files.
//
// Two things worth knowing, both learned the hard way:
//
//   1. Follow EVERY anchor, not just ones carrying the site base prefix. An
//      earlier version of this check only followed /immac/-prefixed hrefs, and
//      a bare root-relative link sat dead in the corpus for five batches
//      because it fell straight through the filter.
//
//   2. A root-relative link missing the base prefix is reported even when the
//      target happens to exist locally. It will break on the deployed site,
//      where everything lives under /immac/.
//
// Markdown that renders raw HTML (a `demo-render` block, for instance) produces
// genuinely clickable links, so sample navigation inside one must use href="#"
// rather than a realistic path. Fenced code samples are escaped and safe.
//
// Requires a build first:
//
//   npm run docs:build && node scripts/check-links.mjs
//
// Exits non-zero if anything is dead, so it is CI-safe.

import fs from 'node:fs'
import path from 'node:path'

const DIST = 'docs/.vuepress/dist'
const BASE = '/immac'
const ASSET = /\.(js|css|png|jpe?g|gif|svg|json|ico|webp|woff2?|map|txt|xml|pdf)$/i

if (!fs.existsSync(DIST)) {
  console.error(`No ${DIST}. Run "npm run docs:build" first.`)
  process.exit(2)
}

const pages = []
;(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(p)
    else if (entry.name.endsWith('.html')) pages.push(p)
  }
})(DIST)

const dead = new Map()
const missingBase = new Map()
let checked = 0

for (const page of pages) {
  const html = fs.readFileSync(page, 'utf8')
  const from = path.relative(DIST, page).split(path.sep).join('/')

  for (const match of html.matchAll(/<a\b[^>]*\shref="([^"]+)"/g)) {
    let href = match[1]
    if (/^(https?:|mailto:|tel:|#|data:|javascript:)/i.test(href)) continue
    if (!href.startsWith('/')) continue // relative links resolved by the bundler

    const clean = href.split('#')[0].split('?')[0]
    if (!clean || ASSET.test(clean)) continue
    checked++

    const hasBase = clean === BASE || clean.startsWith(`${BASE}/`)
    const rel = hasBase ? clean.slice(BASE.length) || '/' : clean

    let target = path.join(DIST, rel)
    if (rel.endsWith('/')) target = path.join(DIST, rel, 'index.html')
    const resolves = fs.existsSync(target) || fs.existsSync(`${target}.html`)

    if (!resolves) {
      if (!dead.has(href)) dead.set(href, [])
      dead.get(href).push(from)
    } else if (!hasBase) {
      // Resolves locally but omits the base prefix, so it breaks once deployed.
      if (!missingBase.has(href)) missingBase.set(href, [])
      missingBase.get(href).push(from)
    }
  }
}

console.log(`pages:   ${pages.length}`)
console.log(`anchors: ${checked}`)

const report = (label, map) => {
  console.error(`\n${label} (${map.size}):`)
  for (const [href, where] of map) {
    console.error(`   ${href}`)
    console.error(`       on: ${where.slice(0, 4).join(', ')}${where.length > 4 ? ` (+${where.length - 4} more)` : ''}`)
  }
}

let failed = false

if (dead.size) {
  report('DEAD LINKS', dead)
  failed = true
} else {
  console.log('dead:    0')
}

if (missingBase.size) {
  report('MISSING BASE PREFIX (resolves locally, breaks when deployed)', missingBase)
  failed = true
} else {
  console.log('base:    all internal links carry the site base')
}

if (failed) {
  console.error('\nFAILED')
  process.exit(1)
}
console.log('\nOK: every internal link resolves.')
