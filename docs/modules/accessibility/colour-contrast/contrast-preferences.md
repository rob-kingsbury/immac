---
title: Contrast Preferences and Forced Colors
prerequisites:
  - accessibility/colour-contrast
---

# Contrast Preferences and Forced Colors

*Optional. This extends the reduced-motion pattern from [Reduced Motion](/modules/accessibility/reduced-motion/README.md) to two related settings: a visitor asking for more contrast, and an operating system taking colour control away from you entirely. Both are worth recognising the first time you meet them in a real project, rather than the first time a bug report mentions them.*

## `prefers-contrast`

Some visitors set their operating system to increase contrast, for low vision or light sensitivity, the same way others set reduced motion. CSS can read that preference, and the media query works the same way `prefers-reduced-motion` does, just testing a different setting:

```css
.card {
  border: 1px solid #d1d5db;
}

@media (prefers-contrast: more) {
  .card {
    border: 2px solid #111827;
  }
}
```

The two values worth knowing are `more`, for someone who has asked for stronger contrast, and `less`, for someone who has asked for less, which is rarer but real for light sensitivity. A `custom` value also exists, for a visitor running the forced colors mode covered next. Baseline status: widely available since May 2022, verified against MDN, a couple of months ahead of `prefers-reduced-motion`'s own widely-available date and the same safe tier to build on.

## `forced-colors` (forced colour modes)

This one is different in kind, not just in what it detects. When a visitor turns on a forced colour mode, the high contrast setting their operating system offers, the browser stops using most of your author colours and repaints the page with a small palette the visitor chose: one background, one text colour, one link colour, and so on. `color`, `background-color`, and `border-color` are among the properties the browser overrides at paint time, no matter what your stylesheet says.

```css
@media (forced-colors: active) {
  /* your rules here run alongside the browser's own colour overrides */
}
```

Most students in this course will never need to build specifically for forced colors mode. What's worth knowing is the one thing that commonly breaks, because it follows directly from techniques already covered elsewhere in this course:

A focus indicator built with `box-shadow`, an older technique you'll see in other people's code, disappears completely, because forced colors mode sets `box-shadow` to `none` outright. The `outline`-based focus ring taught in [Keyboard Access](/modules/accessibility/keyboard-access/README.md) survives, because `outline` keeps rendering. Its colour just gets replaced with whichever system colour the browser judges legible, which is the feature working as intended, not a bug in your CSS.

A border used only to separate two areas by background colour, with no actual `border` property set, can lose that separation. Forced colors mode flattens backgrounds to the visitor's chosen palette, and without a real border to protect it, two areas that used to look distinct can end up painted the same.

```css
/* Fragile: the separation exists only because the backgrounds differ */
.sidebar {
  background-color: #f3f4f6;
}
.main {
  background-color: #ffffff;
}

/* Sturdy: an explicit border survives forced colors mode */
.sidebar {
  background-color: #f3f4f6;
  border-right: 1px solid #d1d5db;
}
```

And an icon delivered as a `background-image`, an SVG file for example, is not itself touched by forced colors mode. The problem is what happens around it: the colours it was tuned to sit on top of get replaced, so an icon that depended on a specific background for contrast can end up hard to see or effectively meaningless, even though the file loaded correctly.

One property and a set of keywords exist for the rare case where you need to opt an element back into your own colours deliberately. `forced-color-adjust: none` tells the browser to leave that element alone. System colour keywords such as `CanvasText`, `LinkText`, and `ButtonFace` let you style something that still adapts to whichever palette the visitor chose, instead of opting out entirely. Reach for either only when the browser's own override genuinely breaks something. The setting exists to protect the visitors who turned it on, not to be worked around by default.

## Keep learning

- [MDN: prefers-contrast](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast). The full list of values, including `custom`.
- [MDN: forced-colors](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors). What gets overridden, and how to opt back in with `forced-color-adjust`.
