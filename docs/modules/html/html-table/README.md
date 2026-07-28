---
title: HTML Table
prerequisites:
  - html/html-basics
---

# <abbr title="HyperText Markup Language">HTML</abbr> Table

Tables are for tabular data (rows and columns of related values), never for page layout. Using a table to position things visually is an old, broken habit from before <abbr title="Cascading Style Sheets">CSS</abbr> could lay out a page, and it wrecks accessibility, because a screen reader tries to read a layout table as if it were real data and produces nonsense.

A table is built from several elements that nest inside one another. Rather than look at a finished table and try to reverse-engineer it, build one from scratch, one element at a time, the same way you'll build your own.

## The table container

Everything in a table lives between an opening `<table>` and a closing `</table>`. On its own it renders nothing visible yet, but it's the container every other piece goes inside.

```html
<table>
  <!-- everything else goes in here -->
</table>
```

## Adding a caption

`<caption>` names the table. It's the first thing inside `<table>`, right after the opening tag, and it should describe what the table contains.

```html
<table>
  <caption>Store hours</caption>
</table>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<table>
  <caption>Store hours</caption>
</table>
</div>
</details>

## Adding the header row

`<thead>` marks the header section of the table. Inside it, `<tr>` starts a table row, and `<th>` marks a heading cell within that row. Give each `<th>` a `scope="col"`, which tells a screen reader this heading labels a column.

```html
<table>
  <caption>Store hours</caption>
  <thead>
    <tr>
      <th scope="col">Day</th>
      <th scope="col">Opens</th>
      <th scope="col">Closes</th>
    </tr>
  </thead>
</table>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<table>
  <caption>Store hours</caption>
  <thead>
    <tr>
      <th scope="col">Day</th>
      <th scope="col">Opens</th>
      <th scope="col">Closes</th>
    </tr>
  </thead>
</table>
</div>
</details>

## Adding the data rows

`<tbody>` holds the actual data, as a sibling of `<thead>`, not nested inside it. Each row is another `<tr>`. Inside a data row, the first cell is usually a `<th scope="row">` naming that row, and the rest are `<td>` cells holding the values.

```html
<table>
  <caption>Store hours</caption>
  <thead>
    <tr>
      <th scope="col">Day</th>
      <th scope="col">Opens</th>
      <th scope="col">Closes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Monday</th>
      <td>9:00</td>
      <td>17:00</td>
    </tr>
  </tbody>
</table>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<table>
  <caption>Store hours</caption>
  <thead>
    <tr>
      <th scope="col">Day</th>
      <th scope="col">Opens</th>
      <th scope="col">Closes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Monday</th>
      <td>9:00</td>
      <td>17:00</td>
    </tr>
  </tbody>
</table>
</div>
</details>

One row is rarely the whole story. Add the rest of the week the same way, one more `<tr>` per day:

```html
<table>
  <caption>Store hours</caption>
  <thead>
    <tr>
      <th scope="col">Day</th>
      <th scope="col">Opens</th>
      <th scope="col">Closes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Monday</th>
      <td>9:00</td>
      <td>17:00</td>
    </tr>
    <tr>
      <th scope="row">Tuesday</th>
      <td>9:00</td>
      <td>17:00</td>
    </tr>
    <tr>
      <th scope="row">Saturday</th>
      <td>10:00</td>
      <td>15:00</td>
    </tr>
  </tbody>
</table>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<table>
  <caption>Store hours</caption>
  <thead>
    <tr>
      <th scope="col">Day</th>
      <th scope="col">Opens</th>
      <th scope="col">Closes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Monday</th>
      <td>9:00</td>
      <td>17:00</td>
    </tr>
    <tr>
      <th scope="row">Tuesday</th>
      <td>9:00</td>
      <td>17:00</td>
    </tr>
    <tr>
      <th scope="row">Saturday</th>
      <td>10:00</td>
      <td>15:00</td>
    </tr>
  </tbody>
</table>
</div>
</details>

Every `<th>` and `<td>` in this table so far exists because it's real, distinct data. That's the test for whether something belongs in a table at all: if you're tempted to leave cells empty just to make a layout line up, the content doesn't actually belong in a table.

## Merging cells: colspan and rowspan

Sometimes one value genuinely applies across more than one column. Sunday, this store is simply closed, and repeating "Closed" under both Opens and Closes would be misleading, since there's no separate opening and closing time. `colspan` merges a cell across the given number of columns. Here it's added to the Sunday row from the table you already built:

```html
<table>
  <caption>Store hours</caption>
  <thead>
    <tr>
      <th scope="col">Day</th>
      <th scope="col">Opens</th>
      <th scope="col">Closes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Sunday</th>
      <td colspan="2">Closed</td>
    </tr>
  </tbody>
</table>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<table>
  <caption>Store hours</caption>
  <thead>
    <tr>
      <th scope="col">Day</th>
      <th scope="col">Opens</th>
      <th scope="col">Closes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Sunday</th>
      <td colspan="2">Closed</td>
    </tr>
  </tbody>
</table>
</div>
</details>

`rowspan` is the same idea turned sideways: it merges a cell down across several rows, used when one label applies to more than one row underneath it, such as a heading that groups two sub-columns:

```html
<table>
  <thead>
    <tr>
      <th rowspan="2">Name</th>
      <th colspan="2">Scores</th>
    </tr>
    <tr>
      <th>Maths</th>
      <th>English</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Bob</td>
      <td>10/10</td>
      <td>9/10</td>
    </tr>
  </tbody>
</table>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<table>
  <thead>
    <tr>
      <th rowspan="2">Name</th>
      <th colspan="2">Scores</th>
    </tr>
    <tr>
      <th>Maths</th>
      <th>English</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Bob</td>
      <td>10/10</td>
      <td>9/10</td>
    </tr>
  </tbody>
</table>
</div>
</details>

`Name` spans both header rows down, because it labels the whole row below, not just one of the two sub-columns. `Scores` spans across, because it's the shared heading for the Maths and English columns beneath it.

<div class="diagram">
<svg viewBox="0 0 640 250" role="img" aria-label="Two grids of nine cells compared. On the left, a plain grid, three columns by three rows, all equal. On the right, the same grid after merging: the top-left two cells joined into one wide cell with colspan, and the two lower cells in the right column joined into one tall cell with rowspan.">
  <text x="10" y="18" class="d-lbl">A plain grid</text>
  <rect x="10" y="30" width="270" height="180" class="d-surface d-border" stroke-width="1.5"/>
  <line x1="100" y1="30" x2="100" y2="210" class="d-muted-stroke" stroke-width="1.5"/>
  <line x1="190" y1="30" x2="190" y2="210" class="d-muted-stroke" stroke-width="1.5"/>
  <line x1="10" y1="90" x2="280" y2="90" class="d-muted-stroke" stroke-width="1.5"/>
  <line x1="10" y1="150" x2="280" y2="150" class="d-muted-stroke" stroke-width="1.5"/>

  <text x="350" y="18" class="d-lbl">Merged</text>
  <rect x="350" y="30" width="180" height="60" rx="3" class="d-accent-soft d-accent-stroke" stroke-width="2"/>
  <text x="440" y="64" text-anchor="middle" class="d-lbl-mono">colspan="2"</text>
  <rect x="530" y="30" width="90" height="60" class="d-surface d-border" stroke-width="1.5"/>
  <rect x="350" y="90" width="90" height="60" class="d-surface d-border" stroke-width="1.5"/>
  <rect x="440" y="90" width="90" height="60" class="d-surface d-border" stroke-width="1.5"/>
  <rect x="530" y="90" width="90" height="120" rx="3" class="d-accent-soft d-accent-stroke" stroke-width="2"/>
  <text x="575" y="146" text-anchor="middle" class="d-lbl-mono">rowspan="2"</text>
  <rect x="350" y="150" width="90" height="60" class="d-surface d-border" stroke-width="1.5"/>
  <rect x="440" y="150" width="90" height="60" class="d-surface d-border" stroke-width="1.5"/>
</svg>
<figcaption>Nine equal cells on the left. On the right, colspan merges two cells sideways and rowspan merges two cells downward, same techniques used above for Sunday's hours and the Name heading.</figcaption>
</div>

## Adding a summary row

`<tfoot>` holds a row that summarizes the body, most often a total. Like `<tbody>`, it's a sibling of `<thead>`, not nested inside either of the others:

```html
<table>
  <caption>Weekly ingredient cost</caption>
  <thead>
    <tr>
      <th scope="col">Ingredient</th>
      <th scope="col">Cost</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Flour</th>
      <td>$12.00</td>
    </tr>
    <tr>
      <th scope="row">Butter</th>
      <td>$18.50</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">Total</th>
      <td>$30.50</td>
    </tr>
  </tfoot>
</table>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<table>
  <caption>Weekly ingredient cost</caption>
  <thead>
    <tr>
      <th scope="col">Ingredient</th>
      <th scope="col">Cost</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Flour</th>
      <td>$12.00</td>
    </tr>
    <tr>
      <th scope="row">Butter</th>
      <td>$18.50</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">Total</th>
      <td>$30.50</td>
    </tr>
  </tfoot>
</table>
</div>
</details>

Keeping `<thead>`, `<tbody>`, and `<tfoot>` distinct isn't just tidy structure. It's also what lets a browser, or a print stylesheet, repeat the header and footer rows if a long table breaks across pages, something a table built from plain `<tr>` elements with no sections can't do.

## The full table, all seven tags together

Here's everything from this module in one table: `<table>`, `<caption>`, `<thead>`, `<tbody>`, `<tr>`, `<th>` (with `scope`), and `<td>`.

```html
<table>
  <caption>Store hours</caption>
  <thead>
    <tr>
      <th scope="col">Day</th>
      <th scope="col">Opens</th>
      <th scope="col">Closes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Monday</th>
      <td>9:00</td>
      <td>17:00</td>
    </tr>
    <tr>
      <th scope="row">Tuesday</th>
      <td>9:00</td>
      <td>17:00</td>
    </tr>
    <tr>
      <th scope="row">Saturday</th>
      <td>10:00</td>
      <td>15:00</td>
    </tr>
    <tr>
      <th scope="row">Sunday</th>
      <td colspan="2">Closed</td>
    </tr>
  </tbody>
</table>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<table>
  <caption>Store hours</caption>
  <thead>
    <tr>
      <th scope="col">Day</th>
      <th scope="col">Opens</th>
      <th scope="col">Closes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Monday</th>
      <td>9:00</td>
      <td>17:00</td>
    </tr>
    <tr>
      <th scope="row">Tuesday</th>
      <td>9:00</td>
      <td>17:00</td>
    </tr>
    <tr>
      <th scope="row">Saturday</th>
      <td>10:00</td>
      <td>15:00</td>
    </tr>
    <tr>
      <th scope="row">Sunday</th>
      <td colspan="2">Closed</td>
    </tr>
  </tbody>
</table>
</div>
</details>

## The checklist

Run this over your table before you submit:

- Table has `<caption>`, `<thead>`, `<tbody>`, `<tfoot>`, with correct `scope`
- `colspan`/`rowspan` used only where a value genuinely spans, never for alignment
- Zero errors in the [W3C Markup Validation Service](https://validator.w3.org/)

## Keep learning

- [W3Schools: HTML Tables](https://www.w3schools.com/html/html_tables.asp). Covers the same table structure with more worked examples.
- [W3Schools: Table colspan and rowspan](https://www.w3schools.com/html/html_table_colspan_rowspan.asp). Focused practice on spanning cells across columns and rows.
