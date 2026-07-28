---
title: aspect-ratio
prerequisites:
  - css/css-box-model
---

# Sizing a Box by Its Shape: aspect-ratio

You'll often want a box that keeps a fixed shape, an image container, a video embed, a map, no matter how wide it ends up being. Setting a fixed `height` looks like the answer, but content spills out the moment the box's width changes and the height doesn't follow.

The `aspect-ratio` property solves this properly. Give it a ratio, and the box calculates its own height from whatever width it happens to have.

<CssDemo>

```html
<div class="frame">16:9, whatever width I end up</div>
```

```css
.frame {
  aspect-ratio: 16 / 9;
  width: 100%;
  max-width: 320px;
  background-color: #e0e7ff;
  border: 2px solid #818cf8;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 12px;
}
```

</CssDemo>

Resize your browser and that box's height adjusts on its own, always in proportion. No JavaScript, no fixed number to get wrong. `1 / 1` gives a square, `4 / 3` an older photo shape, `21 / 9` an ultra-wide banner. This is the property to reach for whenever "fixed height" was your instinct, particularly for image and video placeholders.

## Common mistakes to avoid

- **Setting a fixed `height` on a box holding text or media.** Content length or proportions change, and a fixed height either clips or leaves gaps. Let padding define the vertical space and the height follow the content, or use `aspect-ratio` when the box genuinely needs a fixed shape.

## The checklist

Run this over your layout before you move on:

- You reach for `aspect-ratio` instead of a fixed `height` whenever a box needs to keep a shape

## Keep learning

- [MDN: aspect-ratio](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio). The property reference, with the shorthand forms.
