---
title: The position Property
prerequisites:
  - css/css-box-model
---

# The Third Layout Tool: position

[Flexbox](/modules/css/css-flexbox/README.md) and [Grid](/modules/css/css-grid/README.md) both lay out a group of items in relation to each other. Sometimes you need something different: take one element out of that flow entirely and place it exactly where you want, on top of everything else. That's the job of the `position` property, and it comes up constantly, a badge sitting on a photo's corner, a dropdown menu, a "skip to content" link that only appears when focused.

By default, every element has `position: static`. It sits in normal document flow, in the order you wrote it, and `top`/`right`/`bottom`/`left` do nothing to it. Two other values are what you'll reach for most:

<CssDemo>

```html
<div class="frame">
  <div class="box">In normal flow</div>
  <div class="badge">Tag</div>
</div>
```

```css
.frame {
  position: relative;
  background-color: #f1f5f9;
  border: 1px solid #94a3b8;
  padding: 20px;
  font-family: system-ui, sans-serif;
}
.box {
  background-color: #dbeafe;
  padding: 12px;
}
.badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: #dc2626;
  color: white;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.8rem;
}
```

</CssDemo>

`.frame` has `position: relative`, which does something subtle but important: it doesn't move `.frame` at all, but it makes `.frame` the **containing block** for any absolutely positioned element inside it. `.badge` has `position: absolute`, which pulls it completely out of normal flow (it no longer takes up space, and nothing else shifts to make room for it) and positions it using `top`/`right`/`bottom`/`left`, measured from the edges of its containing block, `.frame`, rather than from the page.

That's the whole mechanism: **`position: absolute` positions an element relative to its nearest ancestor that isn't `static`.** Skip the `position: relative` on the parent, and the browser keeps looking up the tree until it finds one, sometimes all the way to the page itself, which is almost never what you meant. This is why an absolutely positioned element that "won't stay where you put it" is nearly always missing a `position: relative` somewhere on an ancestor, not a mistake in the `top`/`left` values themselves.

Two more values worth knowing by name. `position: fixed` behaves like `absolute` but measures from the browser window instead of a containing block, and stays in place even when the page scrolls, which is how a persistent header or a cookie banner is usually built. `position: sticky` acts like normal flow until the page scrolls past a threshold you set, then locks in place like `fixed`, which is how a section heading that "sticks" to the top while its section scrolls is built.

**`z-index` decides which element sits on top when two positioned elements overlap.** It only works on an element that already has a `position` other than `static`, and it takes a plain number: higher stacks above lower. You'll need it any time something you positioned ends up hidden behind something else, a header, a hero image, a modal background.

You'll meet `position: absolute` again in this course's own [Visually Hidden](/modules/accessibility/visually-hidden/README.md), for the `.visually-hidden` pattern and the skip link. Both will make a lot more sense now that you know what `position: absolute` is actually doing and why it needs a positioned ancestor to behave.

## Common mistakes to avoid

- **`position: absolute` with no `position: relative` on a parent.** The element positions itself against the nearest ancestor that isn't `static`, which without one set deliberately is often the whole page, not the box you meant.

## The checklist

Run this over your layout before you move on:

- Checked that any absolutely positioned element has a `position: relative` ancestor to position against
- Knows the difference between `absolute`, `fixed`, and `sticky`, and which one a persistent header or a scroll-locked section heading needs
- Reaches for `z-index` only on an element that already has a non-`static` `position`

## Keep learning

- [MDN: position](https://developer.mozilla.org/en-US/docs/Web/CSS/position). The full property reference, including every value covered here.
