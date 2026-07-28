---
title: Theming
prerequisites:
  - css/css-design-tokens
  - accessibility/colour-contrast
---

# Theming

Scoping a set of design tokens leads directly to themes. Declare an alternative set of values under a selector, and everything inside it switches.

<CssDemo>

```html
<div class="theme-light">
  <h4>Light</h4>
  <p>Surface and text from variables.</p>
</div>
<div class="theme-dark">
  <h4>Dark</h4>
  <p>Identical rules, different variables.</p>
</div>
```

```css
.theme-light, .theme-dark {
  font-family: system-ui, sans-serif;
  background-color: var(--surface);
  color: var(--text);
  padding: 14px 18px;
  border-radius: 8px;
  margin-bottom: 10px;
}
.theme-light h4, .theme-dark h4 {
  color: var(--heading);
  margin: 0 0 4px 0;
}
.theme-light {
  --surface: #ffffff;
  --text: #1e293b;
  --heading: #0e7490;
}
.theme-dark {
  --surface: #0f172a;
  --text: #cbd5e1;
  --heading: #67e8f9;
}
```

</CssDemo>

The styling rules are written once and shared. Only the values differ.

The same approach handles a system dark mode preference, using a media query in the same family as `prefers-reduced-motion` from [Reduced Motion](/modules/accessibility/reduced-motion/README.md):

```css
:root {
  --surface: #ffffff;
  --text: #1e293b;
}

@media (prefers-color-scheme: dark) {
  :root {
    --surface: #0f172a;
    --text: #cbd5e1;
  }
}
```

Every rule in your stylesheet stays exactly as it was. Only the variable block changes, and the whole page follows.

One requirement carries over from [Colour Contrast](/modules/accessibility/colour-contrast/README.md): **check contrast in both themes.** A palette that passes on white frequently fails on dark, and vice versa. A dark theme is not an excuse to skip the contrast checker; it's a second set of pairs to run through it.

A newer function, `light-dark()`, does the same job with less repetition, once you've told the page which schemes it supports:

```css
:root {
  color-scheme: light dark;
  --surface: light-dark(#ffffff, #0f172a);
  --text: light-dark(#1e293b, #cbd5e1);
}
```

`color-scheme: light dark` tells the browser this page supports both, and `light-dark()` picks its first argument in light mode and its second in dark mode, automatically, without a separate `@media` block duplicating the variable names. It's newer than the rest of this module and worth knowing, but the `@media (prefers-color-scheme: dark)` pattern above works everywhere and is what this course expects you to reach for by default.

## Common mistakes to avoid

- **Building a dark theme without rechecking contrast.** Different pairs, different ratios.

## The checklist

Run this over your stylesheet before you move on:

- At least one theme, dark mode or a component variant, is built using only variable overrides
- Contrast has been checked separately in every theme, not just the default one

## Keep learning

- [MDN: prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme). Reading the visitor's light or dark preference.
- [MDN: light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark). The function reference for the newer theming shortcut.
