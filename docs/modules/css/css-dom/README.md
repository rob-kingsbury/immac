---
title: The DOM
prerequisites:
  - css/css-selectors
---

# The <abbr title="Document Object Model">DOM</abbr> and <abbr title="Cascading Style Sheets">CSS</abbr> Targeting

You've been writing selectors since [CSS Selectors](/modules/css/css-selectors/README.md) without a precise picture of what they're selecting *from*. This module supplies it. The browser doesn't apply your CSS to a text file. It applies it to a structure it built in memory called the **DOM**, and once you can see that structure, targeting stops being trial and error.

This is diagnostic groundwork. By the end of it you should be able to work out why any rule on your page is or isn't applying, without changing anything at random to find out.

## What the DOM is

**DOM** stands for Document Object Model. When a browser receives your <abbr title="HyperText Markup Language">HTML</abbr>, it doesn't keep the text. It parses it and builds a tree of objects in memory, one for each element, nested exactly as your tags were nested. That tree is the DOM, and it's what your CSS actually styles.

Take this markup:

```html
<body>
  <header>
    <h1>TrailGuide</h1>
    <nav>
      <a href="#">Routes</a>
      <a href="#">About</a>
    </nav>
  </header>
  <main>
    <p>Three routes to choose from.</p>
  </main>
</body>
```

The browser builds it as a tree:

```
body
├── header
│   ├── h1
│   └── nav
│       ├── a
│       └── a
└── main
    └── p
```

The vocabulary of that tree is the vocabulary of CSS targeting. `header` is the **parent** of `h1` and `nav`. Those two are **children** of `header`, and **siblings** of each other. The two `<a>` elements are **descendants** of `header`, though not its children, because they're two levels down. And `header` is an **ancestor** of everything beneath it.

The tree above shows nesting, but it doesn't show how those relationships change depending on which element you're asking about. The diagram below picks one element, `<nav>`, and colours the rest of the tree relative to it.

<div class="diagram">
<svg viewBox="0 0 640 300" role="img" aria-label="The same DOM tree, coloured relative to the nav element. Body is marked as an ancestor. Header, nav's parent, is also an ancestor. H1 is marked as nav's sibling, because it shares the same parent. The two a elements are marked as nav's children. Main and p are marked unrelated to nav, even though main is a sibling of header, because a sibling relationship only holds between elements that share the same direct parent, and main's parent is body, not header.">
  <line x1="320" y1="56" x2="170" y2="94" class="d-muted-stroke" stroke-width="1.5"/>
  <line x1="320" y1="56" x2="470" y2="94" class="d-muted-stroke" stroke-width="1.5"/>
  <line x1="170" y1="130" x2="100" y2="168" class="d-accent-stroke" stroke-width="1.5"/>
  <line x1="170" y1="130" x2="240" y2="168" class="d-accent-stroke" stroke-width="2"/>
  <line x1="470" y1="130" x2="470" y2="168" class="d-muted-stroke" stroke-width="1.5"/>
  <line x1="240" y1="204" x2="195" y2="242" class="d-accent-stroke" stroke-width="1.5"/>
  <line x1="240" y1="204" x2="300" y2="242" class="d-accent-stroke" stroke-width="1.5"/>

  <rect x="270" y="20" width="100" height="36" rx="6" class="d-surface" stroke="var(--vp-c-text-mute)" stroke-width="1.5" stroke-dasharray="4 3"/>
  <text x="320" y="43" text-anchor="middle" class="d-lbl-mono">body</text>
  <text x="320" y="14" text-anchor="middle" class="d-lbl-muted">ancestor</text>

  <rect x="120" y="94" width="100" height="36" rx="6" class="d-surface d-accent-stroke" stroke-width="1.5" stroke-dasharray="4 3"/>
  <text x="170" y="117" text-anchor="middle" class="d-lbl-mono">header</text>
  <text x="170" y="88" text-anchor="middle" class="d-lbl-muted">parent</text>

  <rect x="420" y="94" width="100" height="36" rx="6" class="d-surface d-border" stroke-width="1"/>
  <text x="470" y="117" text-anchor="middle" class="d-lbl-mono">main</text>
  <text x="470" y="88" text-anchor="middle" class="d-lbl-muted">unrelated</text>

  <rect x="50" y="168" width="100" height="36" rx="6" class="d-surface" stroke="var(--vp-c-text-mute)" stroke-width="1.5" stroke-dasharray="2 2"/>
  <text x="100" y="191" text-anchor="middle" class="d-lbl-mono">h1</text>
  <text x="100" y="162" text-anchor="middle" class="d-lbl-muted">sibling</text>

  <rect x="190" y="168" width="100" height="36" rx="6" class="d-accent-soft d-accent-stroke" stroke-width="2"/>
  <text x="240" y="191" text-anchor="middle" class="d-lbl-mono">nav</text>
  <text x="240" y="162" text-anchor="middle" class="d-lbl-muted">this element</text>

  <rect x="420" y="168" width="100" height="36" rx="6" class="d-surface d-border" stroke-width="1"/>
  <text x="470" y="191" text-anchor="middle" class="d-lbl-mono">p</text>
  <text x="470" y="162" text-anchor="middle" class="d-lbl-muted">unrelated</text>

  <rect x="145" y="242" width="100" height="36" rx="6" class="d-accent-soft d-accent-stroke" stroke-width="1"/>
  <text x="195" y="265" text-anchor="middle" class="d-lbl-mono">a</text>
  <text x="195" y="236" text-anchor="middle" class="d-lbl-muted">child</text>

  <rect x="250" y="242" width="100" height="36" rx="6" class="d-accent-soft d-accent-stroke" stroke-width="1"/>
  <text x="300" y="265" text-anchor="middle" class="d-lbl-mono">a</text>
  <text x="300" y="236" text-anchor="middle" class="d-lbl-muted">child</text>
</svg>
<figcaption>Relationships are always relative to one element, here nav. Notice main: it's a sibling of header, but not of nav, because a sibling relationship only exists between elements sharing the same direct parent.</figcaption>
</div>

That last point is worth sitting with. `header` and `main` are siblings of each other, both children of `body`. But `main` is not a sibling of `nav`, because `nav`'s parent is `header`, not `body`. "Sibling" is always relative to a specific element and a specific parent, never a property an element has on its own. The same goes for "descendant" and "ancestor": they only mean something once you've said descendant *of what*.

Two consequences matter beyond the vocabulary. First, **the DOM is the live structure, not your source file.** Fix a typo in your HTML and save, and the browser rebuilds the tree. Second, **the browser repairs broken markup while building it.** Forget a closing tag and the browser will guess where it should have gone, which means the tree it built may not be the tree you intended. That's a common cause of a selector that should match and doesn't, and the inspector is where you catch it.

## Common mistakes to avoid

- **Reading the source instead of the DOM.** The browser repairs broken markup, so the tree can differ from your file. Inspect, don't assume.

## The checklist

Run this over your own diagnosis before you move on:

- Understands that the DOM is the live tree the browser built, not the source file you wrote
- Can read the Elements panel and the Styles panel, including what the Computed tab shows
- Works through the [six-step diagnostic routine](/modules/tools/browsers/diagnosing-rendering-problems.md) instead of editing at random

## Keep learning

- [MDN: Introduction to the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction). What the tree is and how the browser builds it.
- [Video: Introduction to the DOM, by Steve Griffith](https://www.youtube.com/watch?v=O6BNfJz3rgs). A practical look at the tree a selector actually matches against.
