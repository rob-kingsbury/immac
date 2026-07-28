---
title: CSS Nesting
prerequisites:
  - css/css-pseudo-classes
  - css/css-precedence
  - css/css-container-queries
---

# Nesting Related Rules Together

Every rule you've written names its full selector on its own line, even when several rules are clearly about the same component. A card's border, its heading colour, and its hover state end up as three separate top-level rules, related only by the fact that their selectors all start with `.card`.

**Native CSS nesting** lets you write a rule inside another rule, and have the inner selector understood as relative to the outer one, using `&` to stand for the parent selector.

```css
/* Without nesting: three separate rules, related only in your head */
.card {
  border: 1px solid var(--border);
}
.card h3 {
  color: var(--colour-brand);
}
.card:hover {
  border-color: var(--colour-brand);
}

/* With nesting: the relationship is visible in the code itself */
.card {
  border: 1px solid var(--border);

  h3 {
    color: var(--colour-brand);
  }

  &:hover {
    border-color: var(--colour-brand);
  }
}
```

Browser support for this is solid. The W3C CSS Validator has not caught up yet and will report an error here. That is the tool lagging the specification, not a problem with your code.

<CssDemo>

```html
<div class="card">
  <h3>Ridge Trail</h3>
  <p>Hover this card.</p>
</div>
```

```css
.card {
  border: 2px solid #cbd5e1;
  border-radius: 8px;
  padding: 14px 18px;
  font-family: system-ui, sans-serif;
  transition: border-color 150ms ease;

  h3 {
    color: #0e7490;
    margin: 0 0 4px 0;
  }

  &:hover {
    border-color: #0e7490;
  }
}
```

</CssDemo>

Two things about that `&` are worth being precise on. A nested selector with a space before it, like `h3` above, is understood as a **descendant** of the parent, exactly as if you'd written `.card h3`. When you need the pseudo-class or a compound form directly on the parent element itself, like `:hover`, you write `&` explicitly right against it, `&:hover`, not just `:hover` on its own.

Media queries and container queries nest too, which keeps a component's responsive behaviour physically next to the rest of its rules instead of scattered at the bottom of the file:

```css
.card {
  display: block;

  @container (min-width: 400px) {
    display: flex;
  }
}
```

**Nesting doesn't replace the specificity rules from [Specificity, Calculated Properly](/modules/css/css-precedence/README.md).** A nested selector's specificity is calculated exactly the same way as if you'd written it out in full, `&` included. It's a way of organising related rules so their relationship is visible on the page, not a new cascade mechanism.

Use it where it genuinely groups related rules, a component and its own states and media queries. Reaching for it everywhere, nesting three or four levels deep "because you can," produces the same long, fragile selectors already warned about, just written differently.

## Nesting versus preprocessor nesting

You may recognise this from Sass or Less, which have offered nesting for years through a build step. It looks similar there. It is not the same thing.

Preprocessor nesting is resolved **before** the CSS is written, in a separate build step, so by the time a browser sees the file it's gone, flattened into plain CSS with the full selectors written out. Native CSS nesting is expanded by the browser itself, at render time, using the same cascade rules as everything else. Nothing needs to be compiled, and everything above runs directly in every current browser. The same distinction applies to variables; see [Custom Properties versus Preprocessor Variables](/modules/css/css-custom-properties/preprocessor-comparison.md).

## Common mistakes to avoid

- **Nesting three or four levels deep because you can.** It produces the same fragile, over-specific selectors [Specificity, Calculated Properly](/modules/css/css-precedence/README.md) warned about, just formatted differently.
- **Writing `:hover` instead of `&:hover` inside a nested rule.** Without the `&`, it's understood as a descendant selector, not the parent itself, and won't match what you meant.

## The checklist

Run this over your stylesheet before you move on:

- You can explain the difference between `&:hover` and a bare `:hover` inside a nested rule
- You know nesting doesn't change how specificity is calculated, only how the rule is written

## Keep learning

- [MDN: CSS nesting](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting). The full reference, including nested media and container queries.
