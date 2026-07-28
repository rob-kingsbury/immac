---
title: Combinators
prerequisites:
  - css/css-selectors
---

# Combinators: Selecting by Relationship

So far every selector has matched elements on their own. **Combinators** match elements by their relationship to another element, which lets you write rules like "links inside the navigation" without giving each of those links a class.

**Descendant** (a space) matches an element anywhere inside another, at any depth.

**Child** (`>`) matches only direct children, one level down.

**Adjacent sibling** (`+`) matches the element immediately following another at the same level.

<CssDemo>

```html
<div class="box">
  <p>A direct child paragraph.</p>
  <div><p>A paragraph nested one level deeper.</p></div>
  <h3>A heading</h3>
  <p>The paragraph right after the heading.</p>
</div>
```

```css
.box {
  font-family: system-ui, sans-serif;
}
.box p {
  color: #0f766e;
}
.box > p {
  font-weight: 700;
}
h3 + p {
  border-left: 3px solid #db2777;
  padding-left: 8px;
}
```

</CssDemo>

Read the results carefully. Every paragraph inside `.box` turned teal, including the nested one, because the descendant combinator reaches any depth. Only the two direct children went bold, because `>` stops at one level. And only the paragraph immediately following the `h3` got the pink border.

The descendant combinator is the one you'll use most, and it's also the easiest to overuse. A selector like `.page .content .article .body p` works, but it's fragile: it breaks the moment somebody moves an element, and it's also unnecessarily specific, a problem [Specificity, Calculated Properly](/modules/css/css-precedence/README.md) covers in full.

## The checklist

Run this over your selectors before you move on:

- You can predict which elements a descendant, child, or adjacent sibling combinator matches, and explain why
- Long descendant chains are a signal to look for a shorter, less fragile selector

## Keep learning

- [MDN: CSS combinators](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors/Combinators). The complete reference, including sibling combinators this module didn't cover.
