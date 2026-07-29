---
title: Transforms
prerequisites:
  - css/css-transitions
---

# Transforms

`transform` moves, scales, and rotates an element without disturbing anything around it. That last part matters enormously.

`translate()` moves it. `scale()` resizes it. `rotate()` turns it.

<CssDemo>

```html
<div class="row">
  <div class="card lift">Lifts</div>
  <div class="card grow">Grows</div>
  <div class="card tilt">Tilts</div>
</div>
```

```css
.row {
  display: flex;
  gap: 14px;
  font-family: system-ui, sans-serif;
  padding: 14px;
}
.card {
  background-color: #ecfeff;
  border: 1px solid #22d3ee;
  border-radius: 8px;
  padding: 20px 24px;
  transition: transform 250ms ease-out;
}
.lift:hover { transform: translateY(-8px); }
.grow:hover { transform: scale(1.08); }
.tilt:hover { transform: rotate(-3deg); }
```

</CssDemo>

Here's the reason transforms matter beyond the visual effect. Changing an element's `width`, `height`, `margin`, or `top` forces the browser to recalculate the position of everything around it, which is expensive and can stutter. `transform` and `opacity` are handled separately, late in the rendering process, and can be animated smoothly even on a modest device.

**Animate `transform` and `opacity`. Avoid animating layout properties.** If you want a card to appear to grow, `scale()` it rather than changing its width. The visual result is similar and the performance is not comparable.

Transforms combine in one declaration, applied in the order written:

```css
transform: translateY(-8px) scale(1.03);
```

Pairing a transform with a `transition`, the way the demo above does, is what turns a static shift into motion. See [Transitions](/modules/css/css-transitions/README.md) for the property that does that, and [A Complete Interactive Component](/modules/css/css-transitions/complete-component.md) for both working together on a real card.

## Common mistakes to avoid

- **Animating `width`, `height`, `top`, or `margin`.** Use `transform` instead, for a smoother result.

## The checklist

Run this over your transforms before you move on:

- The properties being animated are `transform` and `opacity`, not layout properties like `width`, `height`, or `top`
- Multiple transform functions on one element are combined in a single declaration, not written as separate rules

## Keep learning

- [MDN: Using CSS transforms](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_transforms/Using_CSS_transforms). Every transform function, including the 3D ones.
- [Video: CSS 2D Transforms, by Steve Griffith](https://www.youtube.com/watch?v=IeWtxwjBXKQ). A practical run through translate, scale, and rotate.
