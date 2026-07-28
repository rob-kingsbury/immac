---
title: Subgrid
prerequisites:
  - css/css-grid
---

# Nested Grids, and When They Won't Line Up

Worth knowing before you read any further: you won't need what this page teaches on every layout. It solves one specific, recognisable problem, and a plain nested grid is simpler and correct for everything else.

Put a grid inside a grid item, and you get an ordinary **nested grid**: the inner grid defines its own tracks from scratch, with no relationship to the outer one.

<CssDemo>

```html
<div class="outer">
  <div class="card">
    <h4>Lakeside Loop</h4>
    <p class="meta">4 km</p>
    <p class="badge">Easy</p>
  </div>
  <div class="card">
    <h4>Ridge Trail, a longer name</h4>
    <p class="meta">9 km</p>
    <p class="badge">Moderate</p>
  </div>
</div>
```

```css
.outer {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
  font-family: system-ui, sans-serif;
}
.card {
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 3;
  background-color: #f1f5f9;
  border: 1px solid #94a3b8;
  border-radius: 6px;
  padding: 10px 14px;
}
.card h4 { margin: 0; }
.meta { margin: 0; color: #5b6b85; }
.badge { margin: 0; font-weight: 600; }
```

</CssDemo>

Look closely at the two cards. Even though the first card's heading is much shorter, its "Easy" badge lines up exactly with the second card's "Moderate" badge, on the same row. That's not a coincidence, it's `grid-template-rows: subgrid` on `.card`. Without it, each card's three rows would size to its own content independently, and a short heading in one card would leave its badge sitting higher than its neighbour's.

**Subgrid tells a nested grid to reuse its parent's track sizing instead of inventing its own.** Set `grid-row: span 3` so the card knows how many parent rows it occupies, then `grid-template-rows: subgrid` so it divides that exact space using the parent's row lines rather than its own.

This solves a specific, recognisable problem: a row of cards where a short piece of content in one card should still line up with the corresponding content in every other card, the way a well-set table's columns line up even though the text in each cell is a different length. Before subgrid, this needed either JavaScript to measure and match heights, or accepting the misalignment.

Reach for it specifically when independent cards need to line up internally, as the opening note said, not as a default for every nested grid.

## Common mistakes to avoid

- **Reaching for subgrid when a plain nested grid would do.** It solves one specific problem, cards whose internal rows need to align with their siblings. Most nested grids don't need it.

## The checklist

Run this over your nested grids before you move on:

- Knows when `subgrid` solves a real alignment problem across siblings, and when a plain nested grid is enough

## Keep learning

- [MDN: Subgrid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Subgrid). The property reference, with more worked examples.
