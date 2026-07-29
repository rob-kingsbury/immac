---
title: CSS Grid Layouts
prerequisites:
  - css/css-flexbox
  - css/css-box-model
---

# <abbr title="Cascading Style Sheets">CSS</abbr> Grid Layouts

[Flexbox Layouts](/modules/css/css-flexbox/README.md) arranges things in a line. **Grid** arranges things in rows *and* columns at the same time, which makes it the tool for page-level layout: a header across the top, a sidebar beside a main column, a footer along the bottom, a gallery in a tidy matrix.

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

Writing `1fr 1fr 1fr 1fr 1fr 1fr` is repetitive. `repeat()` shortens it:

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

That's the behaviour with five items filling the row. Here's the same rule with only two:

<CssDemo>

```html
<div class="grid">
  <div class="cell">One</div>
  <div class="cell">Two</div>
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

The two cells stretch to fill the whole row, not because you told them to, but because of what `auto-fit` actually does. It computes how many tracks of at least 160 pixels can fit in the container, creates exactly that many, and then hands every leftover pixel of space to the tracks that exist. With room for five and only two items, three tracks' worth of space gets split between the two you have.

Sometimes that's not what you want. If two items should stay at their minimum width and leave visible empty space instead of stretching, swap in `auto-fill`:

```css
grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
```

`auto-fill` creates the same number of tracks `auto-fit` would, but it leaves the extra ones in place as empty columns instead of collapsing them into the tracks holding content, so your two real items stay at 160 pixels instead of growing. Reach for `auto-fit` when you want content to grow and fill the space, and `auto-fill` when you want consistently sized items with gaps left over, a photo grid where every thumbnail should stay the same size is a common case for it.

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

Real layouts use both Grid and Flexbox, usually with Grid handling the page skeleton and Flexbox handling the contents of each region. See [Grid and Flexbox Together](/modules/css/css-grid/grid-and-flexbox-together.md) for a worked example.

Put a grid inside a grid item, and you get an ordinary **nested grid**: the inner grid defines its own tracks from scratch, with no relationship to the outer one. When a row of independent cards needs their internal content to line up with each other, a plain nested grid isn't quite enough, and that's the specific, recognisable problem [Subgrid](/modules/css/css-grid/subgrid.md) solves.

## Common mistakes to avoid

- **Uneven strings in `grid-template-areas`.** Every row needs the same number of names, or the entire declaration is thrown out silently.
- **A non-rectangular area.** Grid areas must be rectangles. An L-shape invalidates the declaration.
- **Using `px` for every column.** Fixed columns don't adapt. Use `fr` for anything that should flex, and reserve fixed units for things with a genuine fixed size.
- **Reaching for Grid when a line would do.** A row of buttons is one-dimensional. Flexbox is simpler for it.
- **Forgetting that `gap` is not a margin.** It only applies between tracks, which is usually what you want, but it means the outer edge spacing has to come from padding on the container.
- **Placing every item by line number.** Auto-placement handles most cases. Explicit placement is for the exceptions, and hand-placing everything makes a grid that breaks whenever the content changes.
- **Reaching for subgrid when a plain nested grid would do.** It solves one specific problem, cards whose internal rows need to align with their siblings. Most nested grids don't need it.

## The checklist

Run this over your layout choices before you move on:

- Can explain the difference between Grid's two-dimensional layout and Flexbox's one-dimensional layout
- Comfortable writing `grid-template-columns` and `grid-template-rows` with track sizing, including `fr` units and `repeat()`/`minmax()`
- Uses `gap` for spacing between tracks, not margin on individual items
- Can place an item deliberately, either with grid line numbers or with `grid-template-areas`
- Knows when Grid should handle the whole layout and when a region inside it should switch to Flexbox
- Used the developer tools grid overlay to confirm line numbers when an item landed somewhere unexpected

## Keep learning

- [MDN: CSS grid layout](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Grids). The full beginner walkthrough.
- [CSS-Tricks: A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/). The reference chart to keep open while writing Grid.
- [Grid Garden](https://cssgridgarden.com/). A short game that drills placement and track sizing.
- [Video: Intro to CSS Grid, by Steve Griffith](https://www.youtube.com/watch?v=yHLGbnOOtfQ). A practical run through the same ground.
