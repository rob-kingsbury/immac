---
title: The order Property
prerequisites:
  - css/css-flexbox
---

# Going Deeper: the order Property

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

This is the real-world version of the caveat around `row-reverse` in [Flexbox Layouts](/modules/css/css-flexbox/README.md), and it's the one you'll reach for far more often. A common pattern: write the parts of a card in the HTML in the order that makes sense read aloud, then use `order` to rearrange them visually, an image that should appear above its caption on a wide screen and below it on a narrow one, with the HTML never changing.

That's exactly why `order` needs the same caution as `row-reverse`. It's a purely visual reorder. Tab through a page that uses it and the browser still moves focus in HTML order, not visual order, so a keyboard user can land on something that appears to be at the bottom of the screen right after something that appears at the top. Use `order` freely for genuine visual-only adjustments, and check with the keyboard afterward that the tab order still makes sense.

## The checklist

Run this over any reordered layout before you move on:

- You know that `order` changes what's seen without changing what's read or tabbed to
- Checked with the keyboard that tab order still makes sense after using `order`

## Keep learning

- [MDN: Flexbox](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Flexbox). Covers `order` alongside the rest of Flexbox.
