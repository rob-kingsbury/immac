// Walks docs/**/*.md, pulls frontmatter title (or first H1) plus a short
// excerpt, and writes a flat JSON index consumed by SearchBox.vue at runtime.
// Runs automatically via the predocs:build/predocs:dev npm hooks, so the index
// is always regenerated from current content, never hand-maintained.
import { readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs'
import { join, relative, extname } from 'node:path'

const DOCS_ROOT = join(import.meta.dirname, '..', 'docs')
const OUT_FILE = join(DOCS_ROOT, '.vuepress', 'public', 'search-index.json')

function walk(dir, out) {
  for (const entry of readdirSync(dir)) {
    if (entry === '.vuepress' || entry.startsWith('.')) continue
    const full = join(dir, entry)
    const stat = statSync(full)
    if (stat.isDirectory()) {
      walk(full, out)
    } else if (extname(entry) === '.md') {
      out.push(full)
    }
  }
}

function frontmatterTitle(src) {
  const m = src.match(/^---\s*\n([\s\S]*?)\n---/)
  if (m) {
    const titleLine = m[1].split('\n').find((l) => l.trim().startsWith('title:'))
    if (titleLine) {
      return titleLine.split('title:')[1].trim().replace(/^['"]|['"]$/g, '')
    }
  }
  const h1 = src.match(/^#\s+(.+)$/m)
  return h1 ? h1[1].trim() : null
}

function excerpt(src) {
  const body = src.replace(/^---[\s\S]*?---/, '').replace(/^#.*$/m, '')
  const firstPara = body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .find((p) => p && !p.startsWith('#') && !p.startsWith('<') && !p.startsWith('```'))
  if (!firstPara) return ''
  return firstPara.replace(/[*_`]/g, '').slice(0, 160)
}

function headings(src) {
  const matches = [...src.matchAll(/^##\s+(.+)$/gm)]
  return matches.map((m) => m[1].trim())
}

const files = []
walk(DOCS_ROOT, files)

const index = files
  .map((file) => {
    const src = readFileSync(file, 'utf8')
    const title = frontmatterTitle(src)
    if (!title) return null
    const route = '/' + relative(DOCS_ROOT, file).replace(/\\/g, '/')
    return {
      title,
      route,
      excerpt: excerpt(src),
      headings: headings(src),
    }
  })
  .filter(Boolean)

writeFileSync(OUT_FILE, JSON.stringify(index, null, 2))
console.log(`Wrote ${index.length} pages to ${relative(process.cwd(), OUT_FILE)}`)
