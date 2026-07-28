---
title: Skip Navigation
prerequisites:
  - html/html-semantics
---

# Skip Navigation

## Skip navigation

Keyboard and screen reader users move through a page in order. Without help, that means tabbing through every navigation link on every page before reaching the content. A skip link solves this. It's the first focusable thing on the page, usually hidden until focused, and it jumps straight to the main content.

```html
<body>
  <a href="#main" class="skip-link">Skip to main content</a>
  <header>...</header>
  <main id="main">
    ...
  </main>
</body>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<p><a href="#demo-main">Skip to main content</a></p>
<p><em>(header)</em></p>
<p id="demo-main"><em>(main content starts here)</em></p>
</div>
</details>

The skip link above is shown in place so you can see and click it. In a finished site it's usually hidden with CSS until a keyboard user tabs to it, a technique covered in [Visually Hidden](/modules/accessibility/visually-hidden/README.md). The HTML pattern belongs here: a link to the `id` of your `<main>`, placed as the very first thing in `<body>`.

<div class="diagram">
<svg viewBox="0 0 640 300" role="img" aria-label="A diagram of keyboard tab order through a page. Four stops appear in a row: a skip link, which is the first stop and is normally hidden until it receives focus, then the header and navigation, then the main content, then the footer. Solid arrows connect the four stops in that order, showing the default path a keyboard user tabs through without using the skip link. A second, curved arrow below shows that activating the skip link with Enter jumps focus straight from the skip link to the main content, skipping the header and navigation entirely.">
  <text x="14" y="20" class="d-lbl">Default tab order</text>

  <rect x="12" y="40" width="130" height="70" rx="6" class="d-surface d-border" stroke-width="1.5" stroke-dasharray="4 3"/>
  <text x="77" y="66" text-anchor="middle" class="d-lbl">1. Skip link</text>
  <text x="77" y="84" text-anchor="middle" class="d-lbl-muted">hidden until</text>
  <text x="77" y="97" text-anchor="middle" class="d-lbl-muted">focused</text>

  <rect x="176" y="40" width="130" height="70" rx="6" class="d-surface d-border" stroke-width="1.5"/>
  <text x="241" y="70" text-anchor="middle" class="d-lbl">2. Header</text>
  <text x="241" y="88" text-anchor="middle" class="d-lbl">and nav</text>

  <rect x="340" y="40" width="130" height="70" rx="6" class="d-accent-soft d-accent-stroke" stroke-width="1.5"/>
  <text x="405" y="70" text-anchor="middle" class="d-lbl">3. Main</text>
  <text x="405" y="88" text-anchor="middle" class="d-lbl">content</text>

  <rect x="504" y="40" width="124" height="70" rx="6" class="d-surface d-border" stroke-width="1.5"/>
  <text x="566" y="70" text-anchor="middle" class="d-lbl">4. Footer</text>

  <line x1="142" y1="75" x2="172" y2="75" class="d-muted-stroke" stroke-width="2"/>
  <path d="M 166 70 L 176 75 L 166 80 Z" class="d-accent"/>

  <line x1="306" y1="75" x2="336" y2="75" class="d-muted-stroke" stroke-width="2"/>
  <path d="M 330 70 L 340 75 L 330 80 Z" class="d-accent"/>

  <line x1="470" y1="75" x2="500" y2="75" class="d-muted-stroke" stroke-width="2"/>
  <path d="M 494 70 L 504 75 L 494 80 Z" class="d-accent"/>

  <text x="14" y="150" class="d-lbl">When the skip link is activated</text>
  <path d="M 77 110 C 77 190, 405 190, 405 116" fill="none" class="d-accent-stroke" stroke-width="2" stroke-dasharray="5 4"/>
  <path d="M 397 108 L 405 120 L 414 108 Z" class="d-accent"/>
  <text x="241" y="215" text-anchor="middle" class="d-lbl-mono">Enter on the skip link</text>
  <text x="241" y="233" text-anchor="middle" class="d-lbl-muted">jumps straight to main, past the nav</text>
</svg>
<figcaption>Four stops, two paths. Tabbing without the skip link moves through all four stops in order. Activating the skip link jumps from stop 1 straight to stop 3, which is exactly what "skip navigation" means in practice.</figcaption>
</div>

## The checklist

Run this over your page before you move on:

- Skip link present as the first focusable element in `<body>`
- Skip link's `href` targets the `id` of your `<main>` element

## Keep learning

- [WebAIM: Keyboard Accessibility](https://webaim.org/techniques/keyboard/). Covers skip links alongside the rest of keyboard navigation.
