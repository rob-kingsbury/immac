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
  <div class="i">flex: 1</div>
  <div class="i wide">flex: 2</div>
  <div class="i">flex: 1</div>
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

`flex: 1` on every item makes them share the space equally, and giving one `flex: 2` makes it twice as wide as its neighbours. This is how you build a layout with a sidebar and a main column that resize together.

The labels above say `flex`, not `flex-grow`, and the difference is not cosmetic. `flex: 1` is shorthand for `1 1 0%`, and that zero basis is what makes the ratio come out clean: every item starts at nothing, so the entire row is leftover space to divide. Write `flex-grow: 1` and `flex-grow: 2` instead and the basis stays `auto`, so each item starts at its own content width and only the *remaining* space gets split in a 2:1 ratio. The middle item ends up wider than the others but nowhere near twice their width.

Two shorthand values are worth memorizing. `flex: 1` means grow to fill, shrink if needed, ignore my natural width. `flex: 0 0 auto` means never grow, never shrink, stay exactly my natural size, which is what you want for something like a logo that shouldn't stretch.

`flex` also takes a full three-value form, `flex: <grow> <shrink> <basis>`, when you want a starting size before the growing and shrinking happen. `flex: 1 1 200px` means "start every item at 200px, then let them grow and shrink equally to fill the row."

Read that as a starting size and nothing more. It is tempting to treat the 200px as a minimum width, and it is not one: the shrink factor is still `1`, so three of those items in a 300px row will happily come out at 100px each. What actually stops an item shrinking is its automatic minimum size, which holds it at roughly the width of its own content. If you want a real floor, set `min-width` and say so.

There's also `align-self`, which overrides the container's `align-items` for one item only.

Every flex item also has an `order` property, which moves it visually without touching the markup, and carries its own accessibility caveat. See [Going Deeper: the order Property](/modules/css/css-flexbox/the-order-property.md).

## The checklist

Run this over your items before you move on:

- You know the difference between `flex: 1` and `flex: 0 0 auto`, and which one a logo needs
- Reaches for `align-self` when one item needs to break from the container's `align-items` value

## Keep learning

- [MDN: Flexbox](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Flexbox). Covers the `flex` shorthand and `align-self` alongside the rest of Flexbox.
