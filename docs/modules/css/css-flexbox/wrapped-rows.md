---
title: Wrapped Rows and the flex-flow Shorthand
prerequisites:
  - css/css-flexbox
---

# Going Deeper: Wrapped Rows and the flex-flow Shorthand

Two more tools become useful once a flex container is wrapping onto more than one line.

## align-content for wrapped rows

`align-items` and `align-content` sound like the same property, and they're easy to mix up because both work on the cross axis. They're not interchangeable.

`align-items` positions items within a single line, the one you already used to centre things vertically in a row. `align-content` is different: it distributes space *between multiple lines*, and it only does anything once `flex-wrap: wrap` is on, the items have actually wrapped onto more than one line, and there's leftover space in the cross axis for those lines to move around in. A single-line flex container ignores `align-content` completely, no matter what value you give it.

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

You'll reach for this less often than the properties in [Flexbox Layouts](/modules/css/css-flexbox/README.md), because most flex containers are exactly as tall as their content. It earns its keep the moment a container has a fixed or minimum height and its wrapped content doesn't quite fill it: a footer with a short list of links, a sidebar with room to spare.

## The flex-flow shorthand

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

There's no behaviour difference between the shorthand and writing both properties separately. Some developers prefer `flex-flow` because it reads as one decision, "how does this container flow," rather than two. Either is correct.

## The checklist

Run this over your wrapped layouts before you move on:

- Knows that `align-content` only does anything once `flex-wrap: wrap` is on and content has actually wrapped onto more than one line
- Comfortable using `flex-flow` as a shorthand for `flex-direction` and `flex-wrap` together

## Keep learning

- [MDN: Flexbox](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Flexbox). Covers `align-content` and `flex-flow` alongside the rest of Flexbox.
