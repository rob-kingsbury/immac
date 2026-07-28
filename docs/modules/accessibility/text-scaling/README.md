---
title: Text Scaling
prerequisites:
  - css/css-units
---

# Relative Units and Text Scaling

## Relative units and text scaling

Some people run their browser with a larger default text size. It's a setting, it's common, and honouring it costs nothing if your units are right.

Use `rem` for font sizes. `rem` is relative to the browser's root font size, so when a visitor raises that from 16px to 24px, your whole page scales with it. A size in `px` ignores the setting entirely.

The same reasoning extends past font size. Padding, margins, and `max-width` set in `rem` grow along with the text, so a box sized to hold two lines still holds two lines when the text gets bigger. Set in `px`, the box stays put and the enlarged text overflows or clips.

```css
/* Scales with the visitor's text preference */
.card {
  padding: 1.5rem;
  max-width: 40rem;
  font-size: 1rem;
}
```

A useful rule of thumb: **`rem` for anything tied to text, `px` only for things that genuinely shouldn't scale**, such as a hairline border.

There's a related requirement in WCAG worth knowing by name. A page must remain usable when text is scaled to **200%**. Test it: press `Ctrl` and `+` (or `Cmd` and `+`) several times and look for text that gets cut off, overlapping elements, or content that becomes unreachable. Fixed heights on text containers are the usual culprit.

## The checklist

Run this over your stylesheet before you move on:

- Font sizes set in `rem`, not `px`
- Padding, margin, and `max-width` on text containers set in `rem`
- Page checked at 200% zoom, with no clipping, overlap, or unreachable content
- No fixed heights on containers holding text

## Keep learning

- [WebAIM: Introduction to Web Accessibility](https://webaim.org/intro/). Covers text resizing alongside the wider set of accessibility requirements.
