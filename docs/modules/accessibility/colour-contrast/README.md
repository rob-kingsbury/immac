---
title: Colour Contrast
prerequisites:
  - accessibility/wcag
  - css/css-colors
---

# Colour Contrast

Perceivable content, one of the four WCAG principles, includes making sure text is actually readable. This is the part of accessible colour work that isn't a matter of taste.

Text has to be readable by people with low vision, colour vision deficiencies, or simply a cheap screen in bright sunlight. The measure is **contrast ratio**, the difference in relative luminance between the text colour and the colour behind it. It runs from 1:1, identical and invisible, to 21:1, pure black on pure white.

WCAG sets the thresholds:

| Text | Minimum (<abbr title="WCAG Level AA conformance">AA</abbr>) | Enhanced (<abbr title="WCAG Level AAA conformance">AAA</abbr>) |
|---|---|---|
| Normal body text | 4.5 : 1 | 7 : 1 |
| Large text, 18.66px bold or 24px and up | 3 : 1 | 4.5 : 1 |
| Interface components and meaningful graphics | 3 : 1 | not defined |

The large-text row is worth being precise about, since it's easy to mistype from memory: WCAG defines it in points, 18pt or 14pt bold, which is where the 24px and 18.66px figures above come from once converted to pixels.

**AA is the standard to meet in this course**, and it's the level most organizations are legally held to. A colour pair that passes at 3:1 but fails at 4.5:1 is not good enough for normal-sized text.

<CssDemo>

```html
<p class="fail">Light grey on white, about 1.9:1. This fails badly.</p>
<p class="pass">Dark slate on white, about 12:1. Comfortable for everyone.</p>
```

```css
p {
  font-family: system-ui, sans-serif;
  background-color: #ffffff;
  padding: 12px;
  margin: 0 0 6px 0;
}
.fail {
  color: #c8c8c8;
}
.pass {
  color: #1e293b;
}
```

</CssDemo>

You don't calculate these by hand. Two tools do it for you. The [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) takes two colours and reports the ratio with a pass or fail against each threshold. And your browser's developer tools show the contrast ratio directly in the colour picker when you inspect a text element, with a warning when it fails.

Two related habits matter as much as the ratio itself. **Never use colour as the only way to convey information**, because a red "error" that looks identical in shape to a green "success" tells a colour-blind user nothing; pair colour with text or an icon. And **check your hover and focus states too**, since a link that meets contrast at rest can easily fail once it changes colour.

## Going deeper: contrast preferences and forced colors

Some visitors ask their browser or operating system to change colour handling entirely, beyond just checking your ratios against a fixed palette. [Contrast Preferences and Forced Colors](/modules/accessibility/colour-contrast/contrast-preferences.md) covers both, and is optional reading.

## Common mistakes to avoid

- **Light grey body text.** It's the most common contrast failure on the web, and it usually comes from copying a look without checking the ratio.
- **Trusting a colour pair "because it looked fine in the mockup."** Check the ratio, don't eyeball it.
- **Checking only the resting state.** A link that passes contrast normally can fail on hover or focus.

## The checklist

Run this over your colour choices before you move on:

- Every text and background pair checked against WCAG AA, 4.5:1 for normal text and 3:1 for large text
- Hover, focus, and other derived states checked too, not just the resting state
- Colour is never the only way information is conveyed

## Keep learning

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/). Paste two colours, get the ratio and the pass or fail. Bookmark this one.
- [WCAG: Contrast Minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html). The actual success criterion behind the table above.
