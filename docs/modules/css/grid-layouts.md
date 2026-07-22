---
title: CSS Grid Layouts
---

# CSS Grid Layouts

Flexbox arranges things in a line. **Grid** arranges things in rows *and* columns at the same time, which makes it the tool for page-level layout: a header across the top, a sidebar beside a main column, a footer along the bottom, a gallery in a tidy matrix.

The two are not rivals. Flexbox is one-dimensional, Grid is two-dimensional, and real sites use both, usually with Grid handling the overall page and Flexbox handling the contents of each region. This chapter covers Grid on its own, then shows them working together.

Everything here is hand-coded. This course deliberately does not use a layout framework, because a framework hides exactly the mechanics you're here to learn.

## Rows and columns

As with Flexbox, you set a property on a container and its direct children become items. Here it's `display: grid`, plus a definition of what the columns should be.

<CssDemo>

```html
<div class="grid">
  <div class="cell">One</div>
  <div class="cell">Two</div>
  <div class="cell">Three</div>
  <div class="cell">Four</div>
  <div class="cell">Five</div>
  <div class="cell">Six</div>
</div>
```

```css
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
}
.cell {
  background-color: #dbeafe;
  border: 1px solid #60a5fa;
  padding: 16px;
  font-family: system-ui, sans-serif;
  text-align: center;
}
```

</CssDemo>

`grid-template-columns` defines the columns. Three values means three columns, and the items flow into them automatically, wrapping to a new row when they run out. You never told it how many rows to make. It created them as needed.

### The `fr` unit

That `1fr` is new. **`fr` means "fraction of the leftover space,"** and it exists specifically for Grid. `1fr 1fr 1fr` gives three equal columns. `2fr 1fr` gives two columns where the first is twice as wide as the second.

<CssDemo>

```html
<div class="grid">
  <div class="cell">2fr, the main column</div>
  <div class="cell">1fr, the sidebar</div>
</div>
```

```css
.grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 10px;
}
.cell {
  background-color: #dcfce7;
  border: 1px solid #4ade80;
  padding: 16px;
  font-family: system-ui, sans-serif;
}
```

</CssDemo>

You can mix `fr` with fixed units, which is how you build the classic fixed sidebar beside a flexible main area:

```css
grid-template-columns: 250px 1fr;
```

The sidebar stays 250 pixels wide at every screen size, and the main column absorbs everything left over.

### `repeat()` and `minmax()`

Writing `1fr 1fr 1fr 1fr 1fr 1fr` gets old. `repeat()` shortens it:

```css
grid-template-columns: repeat(6, 1fr);
```

`minmax()` sets a floor and a ceiling for a track's size. Combined with the `auto-fit` keyword, it produces a genuinely responsive grid with no media query at all:

<CssDemo>

```html
<div class="grid">
  <div class="cell">One</div>
  <div class="cell">Two</div>
  <div class="cell">Three</div>
  <div class="cell">Four</div>
  <div class="cell">Five</div>
</div>
```

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
}
.cell {
  background-color: #ede9fe;
  border: 1px solid #a78bfa;
  padding: 18px;
  font-family: system-ui, sans-serif;
  text-align: center;
}
```

</CssDemo>

Read that declaration as an instruction: fit as many columns as you can, where each is at least 160 pixels and otherwise shares the space equally. Narrow the browser window and the column count drops on its own. This one line replaces what used to take several media queries, and it's worth committing to memory.

## Rows

`grid-template-rows` works the same way for rows, though you need it less often, because rows are usually happy to size themselves to their content.

```css
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 100px 200px;
}
```

Rows you define explicitly are the **explicit grid**. Rows the browser creates automatically when there are more items than defined space are the **implicit grid**, and you can control their size with `grid-auto-rows`.

## Placing items deliberately

So far items have flowed into the next available cell. You can also place them exactly, using line numbers. Grid lines are numbered starting at 1 on the left and top edges.

<CssDemo>

```html
<div class="grid">
  <div class="cell wide">Spans two columns</div>
  <div class="cell">Two</div>
  <div class="cell">Three</div>
  <div class="cell tall">Spans two rows</div>
  <div class="cell">Five</div>
</div>
```

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
.cell {
  background-color: #fef3c7;
  border: 1px solid #fbbf24;
  padding: 16px;
  font-family: system-ui, sans-serif;
  text-align: center;
}
.wide {
  grid-column: 1 / 3;
}
.tall {
  grid-row: 2 / 4;
}
```

</CssDemo>

`grid-column: 1 / 3` means "start at line 1, end at line 3," which covers two columns. The `span` keyword says the same thing more readably when you don't care where it starts: `grid-column: span 2`.

## Named areas

Line numbers work, but there's a more readable way to describe a page layout. `grid-template-areas` lets you draw the layout as text, then assign each item to a named region.

<CssDemo>

```html
<div class="page">
  <header class="head">Header</header>
  <nav class="side">Sidebar</nav>
  <main class="main">Main content</main>
  <footer class="foot">Footer</footer>
</div>
```

```css
.page {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-areas:
    "head head"
    "side main"
    "foot foot";
  gap: 10px;
  font-family: system-ui, sans-serif;
}
.head { grid-area: head; background-color: #cffafe; }
.side { grid-area: side; background-color: #fce7f3; }
.main { grid-area: main; background-color: #dcfce7; }
.foot { grid-area: foot; background-color: #e2e8f0; }
.page > * {
  padding: 16px;
  border: 1px solid #94a3b8;
}
```

</CssDemo>

The value of `grid-template-areas` is that the CSS looks like the layout it produces. Someone reading it sees the shape immediately, with no mental arithmetic about line numbers. Repeating a name across cells makes an area span them, which is how `head` stretches across both columns.

Two rules to follow. Every row string needs the same number of names, or the whole declaration is invalid. And an area has to form a rectangle; you can't make an L-shape.

A period stands for a deliberately empty cell:

```css
grid-template-areas:
  "head head"
  "side ."
  "foot foot";
```

## Aligning inside the grid

Grid has the same alignment vocabulary as Flexbox, applied to both axes. `justify-items` and `align-items` position content within each cell. `justify-content` and `align-content` position the whole grid within its container when the tracks don't fill it.

The shorthand `place-items: center` sets both at once, which is the shortest way to centre something in CSS:

<CssDemo>

```html
<div class="centre">
  <p>Centred with two words.</p>
</div>
```

```css
.centre {
  display: grid;
  place-items: center;
  height: 150px;
  border: 2px dashed #94a3b8;
  font-family: system-ui, sans-serif;
}
.centre p {
  background-color: #cffafe;
  padding: 12px 18px;
  margin: 0;
}
```

</CssDemo>

## Grid and Flexbox together

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

## Inspecting a grid

Developer tools have a dedicated Grid inspector, and it's much better than guessing. Inspect a grid container and a small **grid** badge appears next to it in the elements panel. Click it and the browser overlays the grid on the page, drawing every track and numbering every line.

Turn it on whenever a grid item lands somewhere unexpected. Seeing the actual line numbers makes a wrong `grid-column` value obvious in seconds, where reading the CSS might not.

## Common mistakes to avoid

- **Uneven strings in `grid-template-areas`.** Every row needs the same number of names, or the entire declaration is thrown out silently.
- **A non-rectangular area.** Grid areas must be rectangles. An L-shape invalidates the declaration.
- **Using `px` for every column.** Fixed columns don't adapt. Use `fr` for anything that should flex, and reserve fixed units for things with a genuine fixed size.
- **Reaching for Grid when a line would do.** A row of buttons is one-dimensional. Flexbox is simpler for it.
- **Forgetting that `gap` is not a margin.** It only applies between tracks, which is usually what you want, but it means the outer edge spacing has to come from padding on the container.
- **Placing every item by line number.** Auto-placement handles most cases. Explicit placement is for the exceptions, and hand-placing everything makes a grid that breaks whenever the content changes.

## Keep learning

- [MDN: CSS grid layout](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Grids). The full beginner walkthrough.
- [CSS-Tricks: A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/). The reference chart to keep open while writing Grid.
- [Grid Garden](https://cssgridgarden.com/). A short game that drills placement and track sizing.
- [Chrome DevTools: Inspect CSS Grid](https://developer.chrome.com/docs/devtools/css/grid). How to use the overlay described above.
- [Video: Learn CSS Grid in 20 Minutes, by Web Dev Simplified](https://www.youtube.com/watch?v=9zBsdzdE4sM). A practical run through the same ground.

## Try it yourself

Rebuild your page's overall structure with Grid. Define a layout with a header, a main content area, and a footer using `grid-template-areas`, and make the CSS read like the shape it produces. Add a sidebar as a second column at a fixed width, with the main area on `1fr`.

Inside the main area, build a card gallery using `repeat(auto-fit, minmax(200px, 1fr))`. Narrow the browser slowly and watch the column count change with no media query written. Note how many columns you get at full width and at half width.

Make one card span two columns with `grid-column`, then turn on the grid overlay in developer tools and confirm the line numbers match what you wrote.

Finally, keep Flexbox where it belongs. Your header's contents and your navigation links should still be Flexbox inside the Grid regions, not Grid within Grid. Write a comment at the top of each rule saying which system you chose and why, because being able to justify the choice is most of what this week is teaching.
