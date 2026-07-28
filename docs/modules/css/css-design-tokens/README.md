---
title: CSS Design Tokens
prerequisites:
  - css/css-custom-properties
  - css/css-colors
---

# Building a Design System

A handful of variables declared as you need them is useful. The real payoff comes from declaring a whole set at the top of your stylesheet, so the file opens with the design decisions rather than burying them.

```css
:root {
  /* Colour */
  --colour-brand: hsl(190 80% 30%);
  --colour-brand-light: hsl(190 80% 92%);
  --colour-text: hsl(215 25% 20%);
  --colour-muted: hsl(215 15% 45%);
  --colour-surface: hsl(0 0% 100%);

  /* Type */
  --font-body: system-ui, sans-serif;
  --font-heading: Georgia, serif;
  --size-small: 0.875rem;
  --size-body: 1rem;
  --size-large: 1.5rem;

  /* Spacing, on a consistent scale */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 2rem;

  /* Other */
  --radius: 8px;
  --border: 1px solid hsl(215, 15%, 85%);
}
```

That block is worth building carefully, because it becomes the vocabulary for the rest of the file. Three habits make it work.

**Name for meaning, not appearance.** `--colour-brand` survives a rebrand. `--colour-blue` becomes a lie the day the brand turns green, and you end up with `--colour-blue: red;` which is how stylesheets become unreadable.

**Use a scale rather than arbitrary numbers.** Four or five spacing values used consistently produce a page that looks deliberate. Twenty ad-hoc pixel values produce one that looks approximate, and the difference is visible even to people who can't name it.

**Pair custom properties with <abbr title="Hue, Saturation, Lightness">HSL</abbr>.** [Colour Values](/modules/css/css-colors/README.md) showed how changing one lightness value generates a matched palette. Doing that inside variables means your whole colour system is a few numbers you can adjust together.

A set of tokens like this is also what makes [Theming](/modules/css/css-theming/README.md) possible: the styling rules stay fixed, and only this block changes.

## Common mistakes to avoid

- **Naming for appearance.** `--blue` outlives its accuracy. `--brand` doesn't.
- **Twenty spacing variables.** A scale of four or five used consistently beats a long list used approximately.

## The checklist

Check your token set against this list before you move on.

- Variables are named for what they mean, not what they currently look like
- Spacing comes from a small scale, not ad-hoc numbers typed by feel
- Colours are declared in HSL so a matched palette can be adjusted from one number

## Keep learning

- [MDN: Using CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascading_variables/Using_CSS_custom_properties). Covers declaring a whole set of variables, not just one.
