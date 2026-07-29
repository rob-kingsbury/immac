---
title: Inline and Block Elements
prerequisites:
  - html/html-headings
  - html/html-text
  - html/html-lists
---

# Inline and Block Elements

## Inline versus block

Every element you meet falls into one of two display behaviours by default.

Block elements start on a new line and take up the full width available. [Headings](/modules/html/html-headings/README.md), [paragraphs](/modules/html/html-text/README.md#paragraphs-and-line-breaks), [lists](/modules/html/html-lists/README.md), and [blockquotes](/modules/html/html-text/quotations.md) are all block-level. They stack vertically down the page.

Inline elements sit inside a line of text and only take up as much width as their content. `<a>` (links), `<strong>`, `<em>`, and `<q>` are inline. They flow along with the words around them.

```html
<p>You can make a word <strong>important</strong> or
<em>emphasized</em> without breaking the line.</p>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<p>You can make a word <strong>important</strong> or
<em>emphasized</em> without breaking the line.</p>
</div>
</details>

<div class="diagram">
<svg viewBox="0 0 640 250" role="img" aria-label="Block elements compared to inline elements. On the left, three block-level elements, a heading, a paragraph, and a list, each start on a new line and stretch across the full width of their container, stacking one below another. On the right, a line of ordinary text flows normally, and an inline element sitting in the middle of the sentence takes up only as much width as its own content, staying inside the line instead of starting a new one.">
  <text x="10" y="18" class="d-lbl">Block elements</text>
  <rect x="10" y="30" width="290" height="205" rx="8" class="d-surface d-border" stroke-width="1.5"/>
  <rect x="26" y="44" width="258" height="28" rx="4" class="d-accent-soft d-accent-stroke" stroke-width="1.5"/>
  <text x="155" y="63" text-anchor="middle" class="d-lbl-mono">h1, full width</text>
  <line x1="26" y1="92" x2="284" y2="92" class="d-muted-stroke" stroke-width="5"/>
  <line x1="26" y1="106" x2="230" y2="106" class="d-muted-stroke" stroke-width="5"/>
  <text x="30" y="128" class="d-lbl-muted">p, full width</text>
  <line x1="40" y1="146" x2="270" y2="146" class="d-muted-stroke" stroke-width="5"/>
  <line x1="40" y1="160" x2="245" y2="160" class="d-muted-stroke" stroke-width="5"/>
  <line x1="40" y1="174" x2="260" y2="174" class="d-muted-stroke" stroke-width="5"/>
  <text x="30" y="196" class="d-lbl-muted">ul, full width</text>
  <text x="155" y="222" text-anchor="middle" class="d-lbl">each starts a new line</text>

  <text x="340" y="18" class="d-lbl">Inline elements</text>
  <rect x="340" y="30" width="290" height="205" rx="8" class="d-surface d-border" stroke-width="1.5"/>
  <line x1="356" y1="80" x2="470" y2="80" class="d-muted-stroke" stroke-width="5"/>
  <rect x="474" y="72" width="64" height="16" rx="3" class="d-accent-soft d-accent-stroke" stroke-width="1.5"/>
  <line x1="544" y1="80" x2="600" y2="80" class="d-muted-stroke" stroke-width="5"/>
  <line x1="356" y1="98" x2="520" y2="98" class="d-muted-stroke" stroke-width="5"/>
  <text x="506" y="83" text-anchor="middle" class="d-lbl-mono" font-size="9">strong</text>
  <text x="485" y="140" text-anchor="middle" class="d-lbl-muted">one line, no break</text>
  <text x="485" y="222" text-anchor="middle" class="d-lbl">content just flows</text>
</svg>
<figcaption>Block elements each claim a full row and stack top to bottom. Inline elements sit inside the flow of a line and take up only the width their content needs.</figcaption>
</div>

Use `<strong>` for content that matters (a warning, a key term), not just to make text bold, and `<em>` for genuine emphasis. As with headings, the visual weight is a side effect. The meaning is the point, and <abbr title="Cascading Style Sheets">CSS</abbr> controls the appearance.

## The checklist

Run this over your page before you move on:

- Block elements (headings, paragraphs, lists, blockquotes) stack full width; inline elements (`<a>`, `<strong>`, `<em>`, `<q>`) sit inside the line
- `<strong>` and `<em>` are used for meaning, not just to make text bold or italic
