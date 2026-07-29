---
title: HTML Figure
prerequisites:
  - html/html-semantics
---

# <abbr title="HyperText Markup Language">HTML</abbr> Figure

## Pairing content with a caption

`<figure>` and `<figcaption>` pair an image, diagram, or code sample with a caption, tying the two together as a single unit:

```html
<figure>
  <img src="crumb.jpg" alt="Cross-section of a sourdough loaf showing an open crumb">
  <figcaption>An open crumb is the sign of a well-proofed dough.</figcaption>
</figure>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<figure>
  <img src="/images/placeholder.svg" alt="Cross-section of a sourdough loaf showing an open crumb">
  <figcaption>An open crumb is the sign of a well-proofed dough.</figcaption>
</figure>
</div>
</details>

`<figcaption>` can come before or after the content it captions, but there can only be one per `<figure>`. The pairing is what matters: a screen reader announces the two as connected, and the browser's own styling gives the pair a small margin by default, both because `<figure>` says "this content and its caption belong together," not just "here's an image, and here's some unrelated text near it."

`<figure>` isn't limited to images. A code sample, a table, or a quote can all be captioned the same way, whenever the content is being referenced as a unit rather than woven directly into the surrounding prose. If a piece of content wouldn't lose anything by being moved to a different position on the page, relative to the paragraph discussing it, it's a candidate for `<figure>`.

## The checklist

Run this over your page before you move on:

- `<figure>` and `<figcaption>` paired for any image, diagram, or code sample that needs a caption
- Only one `<figcaption>` per `<figure>`

## Keep learning

- [W3Schools: HTML figure and figcaption](https://www.w3schools.com/tags/tag_figcaption.asp). Syntax and more worked examples.
- [Video: Images, Figures, and Pictures in HTML, by Steve Griffith](https://www.youtube.com/watch?v=mwu2U_Sm6LY). Covers `<figure>` and `<figcaption>` alongside the wider set of image elements.
