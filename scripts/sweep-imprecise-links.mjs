// Read-only diagnostic for #30: a link whose text names something narrower
// than the page it points at (a heading on that page) but carries no
// fragment, so it lands the reader on the page in general rather than the
// specific thing the link text promised. Not wired into `npm run verify` --
// the [fuzzy] tier below still needs a human to read the surrounding
// sentence, not just the slug. Most [fuzzy] hits found while writing this
// were the opposite of the bug: a link whose text IS the target page's own
// title (a correct, page-level reference) happening to share a word with
// one of that page's own subheadings. [exact] hits (link text matches a
// heading's text after stripping a leading "the/a/an") are the reliable
// signal; keep [fuzzy] for spot-checking after a content pass, not as a gate.
//
// Scans both course content pages and every module page. Excludes a link
// whose text matches the target's own frontmatter title -- that's a correct
// page-level reference, not the bug this looks for.
//
// node scripts/sweep-imprecise-links.mjs

import fs from 'node:fs'
import path from 'node:path'

const DOCS = 'docs'
const MODULES = 'docs/modules'

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/`/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')

function stripInlineMarkdown(text) {
  return text
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .trim()
}

// Every markdown file that can be a link target: modules plus the two course
// content pages plus the glossary.
const allFiles = []
;(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(p)
    else if (entry.name.endsWith('.md')) allFiles.push(p)
  }
})(DOCS)

const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n')

// path -> { title, headings: [{text, slug}] }
const pageIndex = new Map()
for (const file of allFiles) {
  const src = read(file)
  const headings = [...src.matchAll(/^(#{2,4})\s+(.+)$/gm)].map((m) => {
    const text = stripInlineMarkdown(m[2].trim())
    return { level: m[1].length, text, slug: slugify(text) }
  })
  // The frontmatter title, not the body H1: every link site-wide (navbar,
  // sidebar, other modules' prose) is written against the frontmatter title
  // -- e.g. "Pseudo-Classes" -- while the body H1 is free to stylize it
  // further ("# Pseudo-Classes: Selecting by State"), so comparing against
  // the H1 missed real title-only links entirely.
  const fm = src.match(/^---\n([\s\S]*?)\n---/)
  const titleMatch = fm?.[1].match(/^title:\s*(.+)$/m)
  const title = titleMatch ? stripInlineMarkdown(titleMatch[1].trim().replace(/^'|'$/g, '')) : null
  const rel = path.relative(DOCS, file).split(path.sep).join('/')
  pageIndex.set(rel, { title, headings })
}

const resolveLink = (fromFile, link) => {
  if (!link.startsWith('/')) return null // external or unresolvable relative form
  const clean = link.split('#')[0]
  let rel = clean.replace(/^\//, '')
  if (rel.endsWith('/')) rel += 'README.md'
  else if (!rel.endsWith('.md')) rel += '.md' // shouldn't happen, links use .md already
  return rel
}

const findings = []

for (const file of allFiles) {
  const src = read(file)
  const fromRel = path.relative(DOCS, file).split(path.sep).join('/')
  for (const m of src.matchAll(/\[([^\]]+)\]\((\/[^)]+)\)/g)) {
    const linkText = stripInlineMarkdown(m[1])
    const href = m[2]
    if (href.includes('#')) continue // already anchored, not this shape
    const targetRel = resolveLink(file, href)
    if (!targetRel || !pageIndex.has(targetRel)) continue
    const target = pageIndex.get(targetRel)

    // Drop a leading article before comparing -- "the three-click guideline"
    // (link text) and "The three-click guideline" (heading) name the same
    // thing, and an exact-slug match would miss it over one word.
    const norm = (text) => slugify(text).replace(/^(the|a|an)-/, '')

    // A link text that just repeats the target page's own title is fine --
    // that's what pointing at "the page" should look like.
    if (target.title && norm(linkText) === norm(target.title)) continue
    // Too short to mean anything as a substring test below (e.g. "CSS").
    if (linkText.length < 8) continue

    const linkNorm = norm(linkText)
    const exact = target.headings.find((h) => norm(h.text) === linkNorm)
    if (exact) {
      findings.push({
        from: fromRel, linkText, target: targetRel,
        headingText: exact.text, suggestedHref: `${href}#${exact.slug}`, confidence: 'exact',
      })
      continue
    }
    // Weaker signal: the link text names a phrase that also appears,
    // word-for-word, inside one specific heading (not just anywhere on the
    // page) -- worth a human look, not an auto-fix.
    const fuzzy = target.headings.find(
      (h) => norm(h.text).includes(linkNorm) || linkNorm.includes(norm(h.text))
    )
    if (fuzzy) {
      findings.push({
        from: fromRel, linkText, target: targetRel,
        headingText: fuzzy.text, suggestedHref: `${href}#${fuzzy.slug}`, confidence: 'fuzzy',
      })
    }
  }
}

console.log(`files scanned: ${allFiles.length}`)
console.log(`findings: ${findings.length}\n`)
for (const f of findings) {
  console.log(`[${f.confidence}] ${f.from}`)
  console.log(`  link text: "${f.linkText}" -> ${f.target}`)
  console.log(`  matches heading: "${f.headingText}"`)
  console.log(`  suggest: ${f.suggestedHref}\n`)
}
