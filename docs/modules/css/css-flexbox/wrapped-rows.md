---
title: Wrapped Rows and the flex-flow Shorthand
prerequisites:
  - css/css-flexbox
---

# Going Deeper: Wrapped Rows and the flex-flow Shorthand

Two more tools become useful once a flex container is wrapping onto more than one line.

## align-content for wrapped rows

`align-items` and `align-content` sound like the same property, and they're easy to mix up because both work on the cross axis. They're not interchangeable.

`align-items` positions items within a single line, the one you already used to centre things vertically in a row. `align-content` is different: it distributes space *between lines*, and it needs two things to have any effect. The container must be wrapping, meaning `flex-wrap: wrap` or `wrap-reverse`, and there must be leftover space in the cross axis for the lines to move around in.

Note what is not on that list. The items do not have to have actually wrapped. A wrapping container holding a single line of items still honours `align-content`, and that one line will sit at the top, the middle, or the bottom depending on the value you give it. What switches the property off entirely is `flex-wrap: nowrap`, which is the default, and which is what the spec means when it calls a container "single-line". A container that is set to wrap but happens to fit everything on one line is not single-line in that sense.

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

Either order parses. `flex-flow: wrap row` is as valid as `flex-flow: row wrap`, because the two values are distinguishable and the grammar lets them appear in either sequence. Direction first is the conventional way to write it and the order the browser reports it back in, so write it that way for readability, but the browser is not enforcing it.

Either value can also be left out, and this is the one real difference between the shorthand and the two longhands. An omitted value is not preserved, it is reset to that property's initial value. So `flex-flow: wrap` on a container that was already `flex-direction: column` sets the wrap *and* silently puts the direction back to `row`. Writing `flex-wrap: wrap` on its own would have left the column alone. The two rules in the example above are equivalent only because both of them set both values.

Some developers prefer `flex-flow` because it reads as one decision, "how does this container flow," rather than two. That is fine, as long as you remember it always makes both decisions, including the one you left blank.

## The checklist

Run this over your wrapped layouts before you move on:

- Knows that `align-content` needs `flex-wrap: wrap` and spare cross-axis space, and that the items do not have to have actually wrapped for it to work
- Comfortable using `flex-flow` as a shorthand for `flex-direction` and `flex-wrap` together

## Keep learning

- [MDN: Flexbox](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Flexbox). Covers `align-content` and `flex-flow` alongside the rest of Flexbox.
