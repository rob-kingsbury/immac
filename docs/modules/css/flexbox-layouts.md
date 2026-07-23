---
title: Flexbox Layouts
---

# Flexbox Layouts

Everything so far has styled individual elements. This week you start arranging them, and **Flexbox** is the tool for arranging things in a line.

Flexbox handles a specific job extremely well: taking a set of items and distributing them along one direction, either a row or a column, with control over the spacing between them and how they line up across. A navigation bar, a row of cards, a header with a logo on the left and links on the right, a button with an icon beside its label. All of those are one-dimensional arrangements, and all of them are Flexbox.

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

## Keep learning

- [MDN: Flexbox](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Flexbox). The full beginner walkthrough of every property here.
- [CSS-Tricks: A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/). The reference chart everybody keeps open while writing Flexbox. Bookmark it.
- [Flexbox Froggy](https://flexboxfroggy.com/). A short game that drills the alignment properties. Genuinely the fastest way to make them stick.
- [Video: Learn Flexbox in 15 Minutes, by Web Dev Simplified](https://www.youtube.com/watch?v=fYq5PXgSsbE). A quick, practical run through the same properties.

## Try it yourself (about 45 minutes)

Build a navigation bar on your project page. Put a site name and a set of links inside a `<header>`, make it a flex container, and use `space-between` and `align-items: center` to pin the name left and the links right, vertically centred. Make the links themselves a nested flex container with a `gap`. Give them `:hover` and `:focus` styles.

Then build a row of at least four cards. Give the container `display: flex`, `flex-wrap: wrap`, and a `gap`, and give each card `flex: 1` with a sensible `flex-basis` so they share the width. Narrow your browser window slowly and watch them wrap. Note the width at which the layout stops looking right, because that number is a breakpoint, and the Responsive Design week puts it to use.

Finally, centre something both ways. Make a box with a fixed height, put a single element inside it, and centre it with `justify-content` and `align-items`. Then change the container's `flex-direction` to `column` and predict what happens to the centring before you save.

Flexbox handles one direction at a time. Next week adds the second dimension, rows and columns together, with Grid.
