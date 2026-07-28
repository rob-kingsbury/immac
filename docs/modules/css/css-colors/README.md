---
title: Colour Values
prerequisites:
  - css/css-basics
---

# Colour Values

CSS accepts several notations for colour, and you'll meet all of them in other people's code. This module covers **hex, <abbr title="Red, Green, Blue">RGB</abbr>, and <abbr title="Hue, Saturation, Lightness">HSL</abbr> cold**, the three most common in practice. `oklch()` and `color-mix()`, covered later, are real, useful, Baseline-safe additions, not a replacement for those three, worth having specifically for palette work.

**Named colours** are the simplest: `red`, `teal`, `rebeccapurple`. There are about 140 of them. They're convenient for quick tests and too limited for real design work.

**Hexadecimal** is the most common notation in practice. A hex colour is a hash followed by six digits, in three pairs: red, green, blue. Each pair runs from `00` (none) to `ff` (maximum), in base 16.

```css
color: #000000;  /* black, no light at all */
color: #ffffff;  /* white, everything at maximum */
color: #ff0000;  /* pure red */
color: #2563eb;  /* a mid blue */
```

When all three pairs are doubled digits, you can write the short form: `#ffffff` becomes `#fff`, and `#2244aa` becomes `#24a`.

**RGB** notation says the same thing in decimal, from 0 to 255 per channel, and it can take a fourth value for opacity from 0 to 1. Between hex and RGB, lean on **RGB as the default while you're actively working out a colour**: hex is compact, and it's genuinely what dominates real production stylesheets and design-token systems once a colour is settled, largely because it's what colour pickers export by default. But hex's six digits don't map cleanly onto how much red, green, and blue is actually in a value, where RGB's plain decimal numbers make that relationship visible, which is worth the slightly longer syntax while you're still learning to reason about colour or computing one on the fly. Expect to see and write plenty of hex once a colour is fixed and final; reach for RGB while it's still a decision.

```css
color: rgb(37 99 235);
background-color: rgb(37 99 235 / 15%);   /* the same blue at 15% opacity */
```

That slash-and-percentage form for opacity is current CSS. You'll also see an older function, `rgba()`, written with commas and a fourth value from 0 to 1: `rgba(37, 99, 235, 0.15)`. It means exactly the same thing, and it still works everywhere, but it was folded into plain `rgb()` in 2022, so a separate function for "RGB with opacity" is no longer necessary. **Recognise `rgba()` when you see it in existing code, and write `rgb()` with a slash going forward.** The same history applies to `hsla()` below.

**HSL** describes a colour the way a person thinks about one, rather than as raw channel values, which makes it a genuinely useful *second* notation for one specific job: building a set of related colours by hand. It takes three parts: **hue**, an angle from 0 to 360 on the colour wheel; **saturation**, how intense the colour is from grey to vivid; and **lightness**, from black through the colour to white.

![A colour wheel showing hue as an angle from 0 to 360 degrees, with red at 0 degrees, green at 120, and blue at 240.](/images/color-wheel.png)

![The HSL colour model, showing hue as a position around a circle with saturation and lightness as separate scales.](/images/hsl.png)

```css
color: hsl(220 83% 53%);
```

HSL's advantage over RGB is that related colours are obvious. In RGB, lightening a blue means guessing new values for all three channels together. In HSL, you hold the hue and saturation steady and change only the lightness, and you get a matched set of tints and shades for a palette:

<CssDemo>

```html
<p class="l90">Lightness 90%</p>
<p class="l70">Lightness 70%</p>
<p class="l50">Lightness 50%</p>
<p class="l30">Lightness 30%</p>
```

```css
p {
  font-family: system-ui, sans-serif;
  padding: 10px 16px;
  margin: 0;
  color: #ffffff;
}
.l90 { background-color: hsl(220 83% 90%); color: #1e293b; }
.l70 { background-color: hsl(220 83% 70%); color: #1e293b; }
.l50 { background-color: hsl(220 83% 50%); }
.l30 { background-color: hsl(220 83% 30%); }
```

</CssDemo>

Doing that by hand in hex would mean guessing at six digits per step. In HSL you change one number. For building a palette, HSL is the tool.

## A newer colour space: oklch

HSL has one real weakness, and it shows up the moment you actually use it to build a palette. **Equal steps in HSL lightness don't look like equal steps to the eye.** Depending on the hue, the same jump in the lightness number can look huge on a yellow and barely noticeable on a blue.

<CssDemo>

```html
<p class="hsl-y1">HSL yellow, L 70%</p>
<p class="hsl-y2">HSL yellow, L 50%</p>
<p class="hsl-b1">HSL blue, L 70%</p>
<p class="hsl-b2">HSL blue, L 50%</p>
```

```css
p {
  font-family: system-ui, sans-serif;
  padding: 8px 14px;
  margin: 0 0 4px 0;
  color: #1e293b;
}
.hsl-y1 { background-color: hsl(50 90% 70%); }
.hsl-y2 { background-color: hsl(50 90% 50%); }
.hsl-b1 { background-color: hsl(220 90% 70%); }
.hsl-b2 { background-color: hsl(220 90% 50%); }
```

</CssDemo>

Both pairs drop the same 20 lightness points. The yellow pair barely changes. The blue pair changes a lot. HSL's "lightness" is a mathematical average of the colour channels, not a measure of how bright the colour actually looks to a human eye, and that gap is what causes it.

**`oklch()` fixes this.** It's a newer colour function, well supported across current browsers, built specifically so that lightness matches perceived brightness. It takes the same three-part shape as HSL, just with different ranges: **lightness** from 0 to 1, **chroma** roughly 0 to 0.4 for how saturated the colour is, and **hue** as the same 0 to 360 angle.

```css
color: oklch(0.6 0.15 250);
```

<CssDemo>

```html
<p class="ok90">Lightness 0.9</p>
<p class="ok70">Lightness 0.7</p>
<p class="ok50">Lightness 0.5</p>
<p class="ok30">Lightness 0.3</p>
```

```css
p {
  font-family: system-ui, sans-serif;
  padding: 10px 16px;
  margin: 0;
  color: #ffffff;
}
.ok90 { background-color: oklch(0.9 0.12 250); color: #1e293b; }
.ok70 { background-color: oklch(0.7 0.12 250); color: #1e293b; }
.ok50 { background-color: oklch(0.5 0.12 250); }
.ok30 { background-color: oklch(0.3 0.12 250); }
```

</CssDemo>

Build the same four-step palette in `oklch()` that you built in HSL, and every step looks like an equal jump in brightness, on any hue. That's the entire advantage: same idea as HSL, better arithmetic underneath.

## Deriving colours with color-mix()

A related, smaller tool: `color-mix()` blends two colours together in whatever proportion you give it, without you picking a third value by hand.

```css
.button {
  background-color: #2563eb;
}
.button:hover {
  background-color: color-mix(in oklch, #2563eb 85%, black);
}
```

That reads as "85% of this blue, 15% black," which gives you a darkened hover state derived directly from the button's own colour, rather than a second colour you typed out and now have to keep in sync by hand. It works with any colour notation, though mixing `in oklch` gives the smoothest, most even-looking blend for the same reason `oklch()` beats HSL above. Once a project has a real design system, you'll do this by mixing a stored value instead of retyping the hex code, using the custom properties taught in [CSS Custom Properties and Variables](/modules/css/css-custom-properties/README.md).

Choosing a palette isn't only a matter of taste. [Colour Contrast](/modules/accessibility/colour-contrast/README.md) covers the contrast ratio, the WCAG thresholds, and the tools that check a pair of colours for you. Check every text and background pair you pick against it before you settle on a final palette.

## Common mistakes to avoid

- **Trusting HSL lightness to look evenly spaced.** It isn't, and the gap is worse on some hues than others. Use `oklch()` when the steps genuinely need to look equal.
- **Typing a second colour by hand for a hover or disabled state.** A `color-mix()` derived from your one source colour stays correct if the source ever changes; a hand-picked second colour doesn't.

## The checklist

Run this over your colour choices before you move on:

- Comfortable writing hex, RGB, and HSL by hand
- Can explain why `oklch()` solves HSL's lightness-perception problem
- Hover, focus, and other derived states built with `color-mix()`, not a second colour typed by hand
- Every text and background pair checked against [Colour Contrast](/modules/accessibility/colour-contrast/README.md)

## Keep learning

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/). Paste two colours, get the ratio and the pass or fail. Bookmark this one.
- [MDN: oklch()](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch). The function reference, with the lightness-uniformity explanation in more depth.
- [MDN: color-mix()](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix). The function reference, including how the mixing colour space affects the result.
