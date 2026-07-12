# immac

Course content site for Algonquin College IMM (Interactive Media Management) —
**MTM1511** (Web Components / HTML) and **MTM1544** (Web Styles / CSS).

Built with [VuePress 2](https://v2.vuejs.press/), following the same
modules-plus-courses information architecture as the IMD program's site
(imdac.github.io): topic-based lesson modules under `docs/modules/`, shared
across courses, with each course folder (`docs/mtm1511/`, `docs/mtm1544/`)
providing its own overview, weekly content, and resource pages that link
into the shared modules.

This site is a reference/textbook resource only — no assignments, projects,
or submissions are hosted here. Assignments live in Brightspace and (per the
GitHub Pages submission model) in their own per-assignment student repos.

All content in this repo is original — no material was copied from the IMD
site, only the folder/navigation structure.

## Development

```
npm install
npm run docs:dev
```

## Build

```
npm run docs:build
```
