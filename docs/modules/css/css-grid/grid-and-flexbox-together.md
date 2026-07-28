---
title: Grid and Flexbox Together
prerequisites:
  - css/css-grid
  - css/css-flexbox
---

# Grid and Flexbox Together

Real layouts use both. The rule of thumb is simple: **Grid for the page skeleton, Flexbox for the contents of each region.** Grid decides where the header, sidebar, and main area sit. Flexbox arranges the links inside the header and the cards inside the main area.

<CssDemo>

```html
<div class="layout">
  <header class="bar">
    <span class="brand">TrailGuide</span>
    <nav class="links"><a href="#">Routes</a><a href="#">About</a></nav>
  </header>
  <main class="body">
    <div class="card">Lakeside</div>
    <div class="card">Ridge</div>
    <div class="card">Summit</div>
  </main>
</div>
```

```css
.layout {
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 12px;
  font-family: system-ui, sans-serif;
}
.bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0f172a;
  padding: 12px 16px;
}
.brand { color: #ffffff; font-weight: 700; }
.links { display: flex; gap: 16px; }
.links a { color: #cbd5e1; text-decoration: none; }
.body {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
}
.card {
  background-color: #e0e7ff;
  border: 1px solid #818cf8;
  padding: 20px;
  text-align: center;
}
```

</CssDemo>

Three layout systems nested in one small example, each doing the job it's best at. That's what production CSS actually looks like.

## The checklist

Run this over your layout before you move on:

- Knows when Grid should handle the whole layout and when a region inside it should switch to Flexbox

## Keep learning

- [MDN: CSS grid layout](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Grids). Covers Grid and Flexbox working together alongside the rest of Grid.
