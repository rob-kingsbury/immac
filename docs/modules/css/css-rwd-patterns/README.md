---
title: Layouts That Respond Without a Query
prerequisites:
  - css/css-flexbox
  - css/css-grid
---

# Layouts That Respond Without a Query

Some of the best responsive behaviour needs no media query at all, and reaching for one first is a habit worth resisting.

You've already built two examples. Flexbox with `flex-wrap: wrap` reflows items onto new lines as space runs out. Grid with `repeat(auto-fit, minmax(200px, 1fr))` changes its column count on its own (see [CSS Grid Layouts](/modules/css/css-grid/README.md) for exactly why, including what changes if you swap in `auto-fill` instead).

<CssDemo>

```html
<div class="auto-grid">
  <div class="c">One</div><div class="c">Two</div>
  <div class="c">Three</div><div class="c">Four</div>
</div>
```

```css
.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 10px;
}
.c {
  background-color: #dbeafe;
  border: 1px solid #60a5fa;
  padding: 18px;
  text-align: center;
  font-family: system-ui, sans-serif;
}
```

</CssDemo>

Resize this page and that grid rearranges itself. No breakpoint was chosen and no query was written.

## Common mistakes to avoid

- **Reaching for a media query before checking whether `flex-wrap` or `repeat(auto-fit, minmax())` already solves it.** Both patterns above adapt to available space with no query written at all, and they need less code to keep in sync than an equivalent set of breakpoints.

## The checklist

Run this over your layout before you move on:

- Checked whether `flex-wrap: wrap` or a Grid `auto-fit`/`auto-fill` pattern already gives you the responsive behaviour you're about to write a media query for

## Keep learning

- [MDN: Responsive design](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design). Covers query-free responsive patterns alongside media queries.
