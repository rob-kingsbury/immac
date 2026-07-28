---
title: Flexbox Layouts
---

# Flexbox Layouts

Everything so far has styled individual elements. This week you start arranging them, and **Flexbox** is the tool for arranging things in a line.

Flexbox handles a specific job extremely well: taking a set of items and distributing them along one direction, either a row or a column, with control over the spacing between them and how they line up across. A navigation bar, a row of cards, a header with a logo on the left and links on the right, a button with an icon beside its label. All of those are one-dimensional arrangements, and all of them are Flexbox.

## How to read this chapter

**The core path is everything down to the checklist.** Work through the container-and-items, direction-and-axes, distributing space, aligning, gap, wrapping, and item-control sections in order, build the navigation bar and the card row as you go, then do the exercise. Budget about 30 minutes to read, plus the 45 minutes the exercise takes.

Sections headed **Going deeper** are optional and add about 15 minutes altogether. They cover `align-content`, the `order` property, and the `flex-flow` shorthand: real properties you'll run into in other people's code, but none of them are needed to finish this week's exercise. Skip them on a busy week and nothing breaks.

## The container and its items

Flexbox always involves two levels. You turn a **container** into a flex container, and its **direct children** automatically become flex items. Nothing deeper is affected.

<CssDemo>

```html
<div class="row">
  <div class="item">One</div>
  <div class="item">Two</div>
  <div class="item">Three</div>
</div>
```

```css
.row {
  display: flex;
}
.item {
  background-color: #dbeafe;
  border: 1px solid #60a5fa;
  padding: 12px 20px;
  font-family: system-ui, sans-serif;
}
```

</CssDemo>

One declaration, `display: flex`, changed everything. Those three `<div>` elements are block elements, so without Flexbox each would claim its own row. As flex items they sit in a line, and each one shrank to fit its content rather than stretching full width.

That's the pattern for the whole of this week: properties on the **container** control the arrangement, properties on the **items** control how individual pieces behave within it.

## Direction and the two axes

`flex-direction` sets which way items flow, and it establishes the two axes everything else refers to.

The **main axis** runs in the direction of flow. The **cross axis** runs perpendicular to it. With the default `row`, the main axis is horizontal and the cross axis is vertical. Switch to `column` and they swap.

<CssDemo>

```html
<div class="row">
  <div class="item">One</div>
  <div class="item">Two</div>
  <div class="item">Three</div>
</div>
<div class="col">
  <div class="item">One</div>
  <div class="item">Two</div>
  <div class="item">Three</div>
</div>
```

```css
.row, .col {
  display: flex;
  margin-bottom: 16px;
  border: 2px dashed #94a3b8;
  padding: 8px;
}
.row {
  flex-direction: row;
}
.col {
  flex-direction: column;
}
.item {
  background-color: #dcfce7;
  border: 1px solid #4ade80;
  padding: 10px 16px;
  font-family: system-ui, sans-serif;
}
```

</CssDemo>

Keeping the axes straight is the thing that makes the rest of Flexbox make sense, because the two main alignment properties are named after axes, not after directions. `justify-content` always works along the main axis. `align-items` always works along the cross axis. Change `flex-direction` and both of them change what they do on screen, while doing exactly the same thing conceptually.

`row-reverse` and `column-reverse` also exist, and reverse the visual order. Use them sparingly: they change what a sighted user sees without changing the order a screen reader reads, so a mismatch between the two is an accessibility problem.

Here's the same idea drawn out: the same three items, the same container, only `flex-direction` changed.

<div class="diagram">
<svg viewBox="0 0 640 250" role="img" aria-label="Two flex containers side by side. On the left, flex-direction is row: three items sit in a horizontal line, the main axis runs horizontally along them shown by a solid arrow, and the cross axis runs vertically shown by a dashed line spanning the height of the items. On the right, flex-direction is column: the same three items stack vertically, the main axis now runs vertically and the cross axis runs horizontally. The items and their order don't change, only which axis is which.">
  <text x="10" y="18" class="d-lbl">flex-direction: row (default)</text>
  <rect x="10" y="30" width="290" height="205" rx="8" class="d-surface d-border" stroke-width="1.5"/>
  <rect x="34" y="140" width="64" height="50" rx="4" class="d-accent-soft d-accent-stroke" stroke-width="1.5"/>
  <rect x="114" y="140" width="64" height="50" rx="4" class="d-accent-soft d-accent-stroke" stroke-width="1.5"/>
  <rect x="194" y="140" width="64" height="50" rx="4" class="d-accent-soft d-accent-stroke" stroke-width="1.5"/>
  <text x="66" y="170" text-anchor="middle" class="d-lbl-mono">1</text>
  <text x="146" y="170" text-anchor="middle" class="d-lbl-mono">2</text>
  <text x="226" y="170" text-anchor="middle" class="d-lbl-mono">3</text>
  <line x1="34" y1="105" x2="258" y2="105" class="d-accent-stroke" stroke-width="2"/>
  <path d="M 252 99 L 264 105 L 252 111 Z" class="d-accent"/>
  <text x="146" y="93" text-anchor="middle" class="d-lbl-mono">main axis</text>
  <line x1="20" y1="140" x2="20" y2="190" class="d-muted-stroke" stroke-width="2" stroke-dasharray="4 3"/>
  <line x1="15" y1="140" x2="25" y2="140" class="d-muted-stroke" stroke-width="1.5"/>
  <line x1="15" y1="190" x2="25" y2="190" class="d-muted-stroke" stroke-width="1.5"/>
  <text x="20" y="210" text-anchor="middle" class="d-lbl-muted">cross axis</text>

  <text x="340" y="18" class="d-lbl">flex-direction: column</text>
  <rect x="340" y="30" width="290" height="205" rx="8" class="d-surface d-border" stroke-width="1.5"/>
  <rect x="430" y="60" width="110" height="40" rx="4" class="d-accent-soft d-accent-stroke" stroke-width="1.5"/>
  <rect x="430" y="110" width="110" height="40" rx="4" class="d-accent-soft d-accent-stroke" stroke-width="1.5"/>
  <rect x="430" y="160" width="110" height="40" rx="4" class="d-accent-soft d-accent-stroke" stroke-width="1.5"/>
  <text x="485" y="84" text-anchor="middle" class="d-lbl-mono">1</text>
  <text x="485" y="134" text-anchor="middle" class="d-lbl-mono">2</text>
  <text x="485" y="184" text-anchor="middle" class="d-lbl-mono">3</text>
  <line x1="410" y1="60" x2="410" y2="200" class="d-accent-stroke" stroke-width="2"/>
  <path d="M 404 194 L 410 206 L 416 194 Z" class="d-accent"/>
  <text x="410" y="48" text-anchor="middle" class="d-lbl-mono">main axis</text>
  <line x1="560" y1="130" x2="610" y2="130" class="d-muted-stroke" stroke-width="2" stroke-dasharray="4 3"/>
  <line x1="560" y1="125" x2="560" y2="135" class="d-muted-stroke" stroke-width="1.5"/>
  <line x1="610" y1="125" x2="610" y2="135" class="d-muted-stroke" stroke-width="1.5"/>
  <text x="585" y="150" text-anchor="middle" class="d-lbl-muted">cross axis</text>
</svg>
<figcaption>The solid arrow is always the main axis, the dashed line is always the cross axis. Switch <code>flex-direction</code> from row to column and the two swap. The items don't move to a different axis, the axis itself rotates.</figcaption>
</div>

That reordering problem, changing what a sighted user sees without changing what a screen reader or keyboard user encounters, comes back later in this chapter in the optional section on the `order` property. Worth flagging now, because `order` gets reached for constantly and carries the exact same caveat as `row-reverse`.

## Distributing space along the main axis

`justify-content` decides what happens to leftover space along the main axis.

<CssDemo>

```html
<div class="row start"><div class="i">A</div><div class="i">B</div><div class="i">C</div></div>
<div class="row center"><div class="i">A</div><div class="i">B</div><div class="i">C</div></div>
<div class="row between"><div class="i">A</div><div class="i">B</div><div class="i">C</div></div>
<div class="row around"><div class="i">A</div><div class="i">B</div><div class="i">C</div></div>
```

```css
.row {
  display: flex;
  border: 2px dashed #94a3b8;
  margin-bottom: 10px;
  padding: 6px;
}
.start { justify-content: flex-start; }
.center { justify-content: center; }
.between { justify-content: space-between; }
.around { justify-content: space-around; }
.i {
  background-color: #ede9fe;
  border: 1px solid #a78bfa;
  padding: 8px 18px;
  font-family: system-ui, sans-serif;
}
```

</CssDemo>

`flex-start` is the default, packing items at the start. `center` packs them in the middle. `flex-end` packs them at the end. `space-between` puts all the leftover space *between* items, pinning the first to the start and the last to the end. `space-around` gives each item equal space on both sides, which visually means half-size gaps at the outer edges. There's also `space-evenly`, which makes every gap including the outer ones identical.

`space-between` is the one you'll reach for most, because it's exactly what a header wants: logo pinned left, navigation pinned right, space in the middle.

## Aligning across the cross axis

`align-items` positions items along the cross axis. With a row, that means vertically.

<CssDemo>

```html
<div class="row stretch"><div class="i">Tall<br>item</div><div class="i">Short</div></div>
<div class="row center"><div class="i">Tall<br>item</div><div class="i">Short</div></div>
<div class="row end"><div class="i">Tall<br>item</div><div class="i">Short</div></div>
```

```css
.row {
  display: flex;
  border: 2px dashed #94a3b8;
  margin-bottom: 10px;
  padding: 6px;
  gap: 10px;
}
.stretch { align-items: stretch; }
.center { align-items: center; }
.end { align-items: flex-end; }
.i {
  background-color: #fef3c7;
  border: 1px solid #fbbf24;
  padding: 8px 18px;
  font-family: system-ui, sans-serif;
}
```

</CssDemo>

The default is `stretch`, which is why the short item in the first row grew to match the tall one. That default is often exactly what you want for cards of unequal content, and occasionally a surprise when you wanted items to keep their natural height.

Between `justify-content: center` and `align-items: center` you get the answer to a question that was genuinely hard for years:

<CssDemo>

```html
<div class="centre-box">
  <p>Perfectly centred, both ways.</p>
</div>
```

```css
.centre-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 160px;
  border: 2px dashed #94a3b8;
  font-family: system-ui, sans-serif;
}
.centre-box p {
  background-color: #cffafe;
  padding: 12px 20px;
  margin: 0;
}
```

</CssDemo>

Two lines. Before Flexbox this took absolute positioning and negative margins, and it's the single most-cited reason people were glad to see Flexbox arrive.

## Gaps

`gap` sets the space between flex items, and it's simpler and better behaved than putting margins on the items.

<CssDemo>

```html
<div class="row">
  <div class="i">One</div><div class="i">Two</div><div class="i">Three</div>
</div>
```

```css
.row {
  display: flex;
  gap: 20px;
  border: 2px dashed #94a3b8;
  padding: 8px;
}
.i {
  background-color: #fce7f3;
  border: 1px solid #f472b6;
  padding: 10px 16px;
  font-family: system-ui, sans-serif;
}
```

</CssDemo>

The reason to prefer `gap` over margins is that gaps only appear *between* items, never on the outside edges, so you don't need a `:last-child` rule to strip a trailing margin. You can also set the two directions separately with `row-gap` and `column-gap`.

## Wrapping

By default flex items refuse to wrap. They shrink to stay on one line, and if they can't shrink far enough they overflow. `flex-wrap: wrap` lets them move to a new line instead.

<CssDemo>

```html
<div class="row">
  <div class="i">Card one</div>
  <div class="i">Card two</div>
  <div class="i">Card three</div>
  <div class="i">Card four</div>
  <div class="i">Card five</div>
</div>
```

```css
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  border: 2px dashed #94a3b8;
  padding: 8px;
}
.i {
  background-color: #e0e7ff;
  border: 1px solid #818cf8;
  padding: 14px 22px;
  font-family: system-ui, sans-serif;
}
```

</CssDemo>

Narrow this page and those cards rearrange themselves onto more lines with no media query involved. That's worth noticing, because it's the beginning of responsive layout, which is the whole of next week and then some.

### Going deeper: align-content for wrapped rows

`align-items` and `align-content` sound like the same property, and they're easy to mix up because both work on the cross axis. They're not interchangeable.

`align-items` positions items within a single line, the one you already used above to centre things vertically in a row. `align-content` is different: it distributes space *between multiple lines*, and it only does anything once `flex-wrap: wrap` is on, the items have actually wrapped onto more than one line, and there's leftover space in the cross axis for those lines to move around in. A single-line flex container ignores `align-content` completely, no matter what value you give it.

Give a wrapped row of cards a fixed height taller than it needs, and `align-content` decides how the rows spread out inside that extra space:

<CssDemo>

```html
<div class="wrap-demo between">
  <div class="i">1</div><div class="i">2</div><div class="i">3</div>
  <div class="i">4</div><div class="i">5</div>
</div>
<div class="wrap-demo center">
  <div class="i">1</div><div class="i">2</div><div class="i">3</div>
  <div class="i">4</div><div class="i">5</div>
</div>
```

```css
.wrap-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  height: 220px;
  max-width: 340px;
  border: 2px dashed #94a3b8;
  padding: 8px;
  margin-bottom: 12px;
}
.between { align-content: space-between; }
.center { align-content: center; }
.i {
  width: 110px;
  background-color: #d1fae5;
  border: 1px solid #34d399;
  padding: 14px;
  font-family: system-ui, sans-serif;
  text-align: center;
}
```

</CssDemo>

`space-between` pushes the first row to the top of the box and the last row to the bottom, spreading any rows between them evenly, the same logic as `justify-content: space-between` but applied to whole lines instead of individual items. `center` pulls all the rows together into the middle of the box and leaves equal empty space above and below. The default, `stretch`, grows the lines themselves to fill the container, which is usually not what you want once you've deliberately given a container extra height.

You'll reach for this less often than the properties above it, because most flex containers are exactly as tall as their content. It earns its keep the moment a container has a fixed or minimum height and its wrapped content doesn't quite fill it: a footer with a short list of links, a sidebar with room to spare.

### Going deeper: the flex-flow shorthand

`flex-direction` and `flex-wrap` are two separate properties, but they're both set on the container and get changed together often enough that CSS provides a shorthand: `flex-flow`.

```css
/* These two rules do exactly the same thing. */
.row {
  flex-direction: row;
  flex-wrap: wrap;
}
.row {
  flex-flow: row wrap;
}
```

The order in `flex-flow` is always direction first, then wrap. Either value can be left out and it falls back to that property's own default, so `flex-flow: wrap;` on its own is valid and just leaves `flex-direction` at `row`.

There's no behaviour difference between the shorthand and writing both properties separately. Some developers prefer `flex-flow` because it reads as one decision, "how does this container flow," rather than two. Every example in this chapter uses the longhand for clarity, and either is correct.

## Controlling individual items

Three properties go on the items rather than the container, and they're usually written together with the `flex` shorthand.

`flex-grow` says how much of the leftover space an item should absorb, as a proportion. `flex-shrink` says how readily it gives up space when there isn't enough. `flex-basis` sets its starting size before growing or shrinking.

<CssDemo>

```html
<div class="row">
  <div class="i">grow: 1</div>
  <div class="i wide">grow: 2</div>
  <div class="i">grow: 1</div>
</div>
```

```css
.row {
  display: flex;
  gap: 10px;
  border: 2px dashed #94a3b8;
  padding: 8px;
}
.i {
  flex: 1;
  background-color: #ccfbf1;
  border: 1px solid #2dd4bf;
  padding: 12px;
  font-family: system-ui, sans-serif;
  text-align: center;
}
.wide {
  flex: 2;
}
```

</CssDemo>

`flex: 1` on every item makes them share the space equally. Giving one `flex: 2` makes it take twice the share of the *leftover* space. This is how you build a layout with a sidebar and a main column that resize together.

Two shorthand values are worth memorizing. `flex: 1` means grow to fill, shrink if needed, ignore my natural width. `flex: 0 0 auto` means never grow, never shrink, stay exactly my natural size, which is what you want for something like a logo that shouldn't stretch.

There's also `align-self`, which overrides the container's `align-items` for one item only.

### Going deeper: the order property

Every flex item has a default `order` value of `0`, and items with equal `order` values stay in the sequence they appear in the HTML. Give an item a different number and you move it, visually, without touching the markup. Lower numbers paint first.

```html
<div class="row">
  <div class="i comments">Comments</div>
  <div class="i article">Article</div>
  <div class="i sidebar">Sidebar</div>
</div>
```

```css
.row {
  display: flex;
  gap: 12px;
}
.article  { order: 1; }
.comments { order: 2; }
.sidebar  { order: 3; }
```

In the HTML, Comments comes before Article, on purpose: a comment thread belongs after the thing it's commenting on, and that's the sequence a screen reader or a search engine meets. Giving `.article` an `order` of `1` and `.comments` an `order` of `2` reverses what's painted on screen, Article first, Comments second, Sidebar third, without moving a single line of markup.

This is the real-world version of the caveat you already read about `row-reverse`, and it's the one you'll reach for far more often. A common pattern: write the parts of a card in the HTML in the order that makes sense read aloud, then use `order` to rearrange them visually, an image that should appear above its caption on a wide screen and below it on a narrow one, with the HTML never changing.

That's exactly why `order` needs the same caution as `row-reverse`. It's a purely visual reorder. Tab through a page that uses it and the browser still moves focus in HTML order, not visual order, so a keyboard user can land on something that appears to be at the bottom of the screen right after something that appears at the top. Use `order` freely for genuine visual-only adjustments, and check with the keyboard afterward that the tab order still makes sense.

## A real navigation bar

Everything in this chapter comes together in the single most common Flexbox pattern on the web:

<CssDemo>

```html
<header class="site-header">
  <div class="logo">TrailGuide</div>
  <nav class="nav">
    <a href="#">Routes</a>
    <a href="#">Conditions</a>
    <a href="#">About</a>
  </nav>
</header>
```

```css
.site-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;
  background-color: #0f172a;
  font-family: system-ui, sans-serif;
}
.logo {
  color: #ffffff;
  font-weight: 700;
  font-size: 1.2rem;
}
.nav {
  display: flex;
  gap: 22px;
}
.nav a {
  color: #cbd5e1;
  text-decoration: none;
}
.nav a:hover, .nav a:focus {
  color: #ffffff;
  text-decoration: underline;
}
```

</CssDemo>

Note that there are **two** flex containers here, nested. The header is a flex container pushing the logo and the nav to opposite ends. The nav is itself a flex container spacing the links evenly. Nesting flex containers like this is normal and is how most real layouts are built.

## Common mistakes to avoid

- **Putting `display: flex` on the items instead of the container.** Flexbox is set on the parent, and it affects that parent's direct children only.
- **Expecting it to reach grandchildren.** Only direct children become flex items. Anything deeper needs its own flex container.
- **Confusing `justify-content` with `align-items`.** One works on the main axis, the other on the cross axis, and which is which depends on `flex-direction`.
- **Using margins between items instead of `gap`.** You end up writing a `:last-child` rule to remove the trailing one.
- **Forgetting `flex-wrap`.** Items that can't fit will squash rather than wrap, and squashed content is a common cause of a layout that looks fine on a laptop and terrible on a phone.
- **Using `row-reverse` for visual order.** It changes what's seen without changing what's read, which breaks the experience for screen reader and keyboard users.

## The checklist

Run this over your own layout before you move on:

- `display: flex` is set on the container, never on the items themselves
- You can say which axis is the main axis and which is the cross axis for the current `flex-direction`, and you know they swap when you change it
- `justify-content` handles the main axis and `align-items` handles the cross axis, and you're not guessing which is which
- You reach for `gap` instead of margins for the space between items
- `flex-wrap: wrap` is set anywhere the content might not fit on one line
- You know the difference between `flex: 1` and `flex: 0 0 auto`, and which one a logo needs
- You know that `row-reverse`, `column-reverse`, and `order` all change what's seen without changing what's read or tabbed to

## Keep learning

- [MDN: Flexbox](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Flexbox). The full beginner walkthrough of every property here.
- [<abbr title="Cascading Style Sheets">CSS</abbr>-Tricks: A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/). The reference chart everybody keeps open while writing Flexbox. Bookmark it.
- [Flexbox Froggy](https://flexboxfroggy.com/). A short game that drills the alignment properties. Genuinely the fastest way to make them stick.
- [Video: Learn Flexbox in 15 Minutes, by Web Dev Simplified](https://www.youtube.com/watch?v=fYq5PXgSsbE). A quick, practical run through the same properties.

## Try it yourself (about 45 minutes)

Build a navigation bar on your project page. Put a site name and a set of links inside a `<header>`, make it a flex container, and use `space-between` and `align-items: center` to pin the name left and the links right, vertically centred. Make the links themselves a nested flex container with a `gap`. Give them `:hover` and `:focus` styles.

Then build a row of at least four cards. Give the container `display: flex`, `flex-wrap: wrap`, and a `gap`, and give each card `flex: 1` with a sensible `flex-basis` so they share the width. Narrow your browser window slowly and watch them wrap. Note the width at which the layout stops looking right, because that number is a breakpoint, and the Responsive Design week puts it to use.

Finally, centre something both ways. Make a box with a fixed height, put a single element inside it, and centre it with `justify-content` and `align-items`. Then change the container's `flex-direction` to `column` and predict what happens to the centring before you save.

If you have time left, try `order` on two of your cards so they display in a different sequence than they appear in your HTML. Then tab through the page with the keyboard and confirm focus still follows your HTML order, not the order the cards display in.

Flexbox handles one direction at a time. Next week adds the second dimension, rows and columns together, with Grid.
