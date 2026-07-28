---
title: Controlling Individual Items
prerequisites:
  - css/css-flexbox
---

# Controlling Individual Items

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

`flex` also takes a full three-value form, `flex: <grow> <shrink> <basis>`, when you want a starting size before the growing and shrinking happen. `flex: 1 1 200px` means "start every item at 200px, then let them grow and shrink equally to fill the row." That starting number is the `flex-basis` from a moment ago, and it's a realistic minimum width for that card's content, so the cards resize from something reasonable instead of from nothing.

There's also `align-self`, which overrides the container's `align-items` for one item only.

Every flex item also has an `order` property, which moves it visually without touching the markup, and carries its own accessibility caveat. See [Going Deeper: the order Property](/modules/css/css-flexbox/the-order-property.md).

## The checklist

Run this over your items before you move on:

- You know the difference between `flex: 1` and `flex: 0 0 auto`, and which one a logo needs
- Reaches for `align-self` when one item needs to break from the container's `align-items` value

## Keep learning

- [MDN: Flexbox](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Flexbox). Covers the `flex` shorthand and `align-self` alongside the rest of Flexbox.
