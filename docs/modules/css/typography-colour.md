---
title: Typography and Colour
---

# Typography and Colour

Last week gave every element on your page a size and a shape. This week fills those boxes in: most of a web page is text, and most of the impression a page makes comes from how that text is set and coloured. This chapter covers the properties that control both, including the units question Week 2 opened, and finishes with the one hard requirement that governs every colour choice you make: whether people can actually read it.

## Font families and font stacks

The `font-family` property sets the typeface. What makes it unusual is that you don't give it one name, you give it a **stack**: a list of options in order of preference, separated by commas. The browser uses the first one it can actually find.

```css
body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
```

The browser tries Helvetica Neue. If the visitor's machine doesn't have it, it tries Helvetica, then Arial. The last item is different from the others: `sans-serif` is a **generic family**, a category rather than a specific font, and the browser always has something for it. Always end a stack with a generic family, so there's a guaranteed fallback.

The generic families you'll use are `serif` (letterforms with small strokes on the ends, traditional and print-like), `sans-serif` (without those strokes, the default look of most interfaces), and `monospace` (every character the same width, used for code).

<CssDemo>

```html
<p class="serif">The quick brown fox jumps over the lazy dog.</p>
<p class="sans">The quick brown fox jumps over the lazy dog.</p>
<p class="mono">The quick brown fox jumps over the lazy dog.</p>
```

```css
.serif {
  font-family: Georgia, "Times New Roman", serif;
}
.sans {
  font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}
.mono {
  font-family: "SF Mono", Consolas, "Courier New", monospace;
}
```

</CssDemo>

Font names containing spaces need quotation marks. Names without spaces don't, though quoting them anyway does no harm.

There's a shortcut worth knowing. The keyword `system-ui` tells the browser to use whatever the operating system's own interface font is, which means the page looks native on every platform and loads instantly because nothing has to download. For a course project it's a solid default:

```css
body {
  font-family: system-ui, sans-serif;
}
```

## Web fonts

A font stack can only name fonts a visitor already has. **Web fonts** remove that limit by having the browser download a font file along with the page, so you can use a typeface nobody's machine has installed.

The easiest source is a hosted service such as [Google Fonts](https://fonts.google.com/). You choose a font, and it gives you a `<link>` to paste into your HTML `<head>`, before your own stylesheet:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/styles.css">
```

Then use the font's name in your CSS as normal, still with fallbacks behind it:

```css
body {
  font-family: "Inter", system-ui, sans-serif;
}
```

Two habits keep web fonts from hurting your page. **Load only the weights you'll actually use**, since each one is a separate file download, and a page that pulls in nine weights of a font when it uses two is wasting a visitor's bandwidth. And **keep a real fallback stack** behind the web font, so the page stays readable if the download fails.

## Font size

The `font-size` property takes several units, and the choice matters more than it first appears.

**Pixels (`px`)** are absolute. `font-size: 18px` is 18 pixels, always. It's predictable, which is why beginners like it, and it has one significant drawback covered below.

**`rem`** is relative to the root font size, which is the browser's default of 16 pixels unless something changes it. So `1rem` is 16px, `1.5rem` is 24px, and `0.875rem` is 14px. Because everything scales from one number, changing the root size rescales the whole page proportionally.

**`em`** is relative to the font size of the *parent* element, which makes it useful for spacing that should scale with its own text, and treacherous for font sizes, because nested elements multiply. An `em` inside an `em` inside an `em` compounds in ways that are hard to predict.

<CssDemo>

```html
<p class="px">Set in pixels, 18px.</p>
<p class="rem">Set in rem, 1.125rem, the same visual size.</p>
<p class="big">A larger heading-ish size, 1.75rem.</p>
```

```css
.px {
  font-size: 18px;
}
.rem {
  font-size: 1.125rem;
}
.big {
  font-size: 1.75rem;
}
```

</CssDemo>

**Use `rem` for font sizes.** The reason is accessibility, and it's covered properly in the Accessible Styling week, but the short version is that a visitor who has increased their browser's default text size gets the larger text they asked for with `rem`, and gets ignored with `px`. That's a real barrier for a real group of people, and avoiding it costs you nothing.

## Font weight

Weight is how heavy the strokes are. The `font-weight` property takes keywords or numbers from 100 to 900 in hundreds, where 400 is normal and 700 is bold.

<CssDemo>

```html
<p class="light">Weight 300, light.</p>
<p class="normal">Weight 400, normal.</p>
<p class="semi">Weight 600, semibold.</p>
<p class="bold">Weight 700, bold.</p>
```

```css
p {
  font-family: system-ui, sans-serif;
  font-size: 1.2rem;
  margin: 4px 0;
}
.light { font-weight: 300; }
.normal { font-weight: 400; }
.semi { font-weight: 600; }
.bold { font-weight: 700; }
```

</CssDemo>

A font only displays the weights it actually contains. Ask for 300 from a font that only ships 400 and 700, and the browser either substitutes the nearest real weight or synthesises a fake one that usually looks poor. With web fonts, make sure you loaded the weights you're asking for.

## Line height

`line-height` is the vertical space each line of text occupies, and it does more for readability than almost anything else on this page. Default line height is cramped for body text at typical sizes.

Set it as a **unitless number**, which multiplies the element's own font size. `line-height: 1.6` means each line takes 1.6 times the font size. Unitless is the right choice because it scales correctly when a child element has a different font size, where a fixed value like `24px` would not.

<CssDemo>

```html
<p class="tight">Line height 1, the lines sit right on top of each other and the eye struggles to find the start of the next line when a paragraph runs long enough to wrap several times.</p>
<p class="loose">Line height 1.7, which gives the eye room to travel back to the left margin and land on the correct line, which is most of what readability actually means.</p>
```

```css
p {
  font-family: system-ui, sans-serif;
  max-width: 40ch;
}
.tight {
  line-height: 1;
}
.loose {
  line-height: 1.7;
}
```

</CssDemo>

Body text usually wants something between 1.5 and 1.7. Large headings want less, often 1.1 to 1.3, because at that size generous spacing pulls the words apart rather than helping.

A small, newer property solves a different heading problem: a multi-word heading that wraps onto two lines usually leaves one short, orphaned word dangling on the second line. `text-wrap: balance` asks the browser to distribute the words more evenly across the lines instead.

```css
h1, h2 {
  text-wrap: balance;
}
```

It has no visible effect on a heading that already fits one line, and browser support is newer than everything else in this course, so treat it as a nice-to-have polish rather than something to depend on.

## Letter spacing and other text properties

A handful of remaining properties round out text control.

`letter-spacing` adjusts the space between characters. It's mostly used in small amounts, and mostly to loosen uppercase text, which is set too tight by default. `text-transform` changes capitalisation without changing the HTML. `text-align` positions text within its box. `text-decoration` controls underlines, and is what you use to remove the default underline from links, though think twice before you do.

<CssDemo>

```html
<p class="label">Small caps label</p>
<p class="centred">Centred text</p>
<p class="plain-link">A link with <a href="#">no underline</a>, which is harder to spot.</p>
```

```css
p {
  font-family: system-ui, sans-serif;
}
.label {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.8rem;
  font-weight: 700;
  color: #64748b;
}
.centred {
  text-align: center;
}
.plain-link a {
  text-decoration: none;
  color: #2563eb;
}
```

</CssDemo>

Note the unit on that letter spacing. Using `em` here is correct, because the spacing should grow with the text it applies to.

## Colour values

CSS accepts several notations for colour, and you'll meet all of them in other people's code. Before the details: this course expects you to know **hex, RGB, and HSL cold**, since the CLR for this course names all three by name. `oklch()` and `color-mix()`, covered later in this section, are real, useful, Baseline-safe additions, not a replacement for those three, worth having specifically for palette work.

**Named colours** are the simplest: `red`, `teal`, `rebeccapurple`. There are about 140 of them. They're convenient for quick tests and too limited for real design work.

**Hexadecimal** is the most common notation in practice. A hex colour is a hash followed by six digits, in three pairs: red, green, blue. Each pair runs from `00` (none) to `ff` (maximum), in base 16.

```css
color: #000000;  /* black, no light at all */
color: #ffffff;  /* white, everything at maximum */
color: #ff0000;  /* pure red */
color: #2563eb;  /* a mid blue */
```

When all three pairs are doubled digits, you can write the short form: `#ffffff` becomes `#fff`, and `#2244aa` becomes `#24a`.

**RGB** notation says the same thing in decimal, from 0 to 255 per channel, and it can take a fourth value for opacity from 0 to 1. Between hex and RGB, this course leans on **RGB as the default while you're actively working out a colour**: hex is compact, and it's genuinely what dominates real production stylesheets and design-token systems once a colour is settled, largely because it's what colour pickers export by default. But hex's six digits don't map cleanly onto how much red, green, and blue is actually in a value, where RGB's plain decimal numbers make that relationship visible, which is worth the slightly longer syntax while you're still learning to reason about colour or computing one on the fly. Expect to see and write plenty of hex once a colour is fixed and final; reach for RGB while it's still a decision.

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
.l90 { background-color: hsl(220, 83%, 90%); color: #1e293b; }
.l70 { background-color: hsl(220, 83%, 70%); color: #1e293b; }
.l50 { background-color: hsl(220, 83%, 50%); }
.l30 { background-color: hsl(220, 83%, 30%); }
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

Build the same four-step palette in `oklch()` that you built in HSL, and every step looks like an equal jump in brightness, on any hue. That's the entire advantage: same idea as HSL, better arithmetic underneath, exactly the extension role this chapter flagged for it at the start.

## Deriving colours with color-mix()

A related, smaller tool: `color-mix()` blends two colours together in whatever proportion you give it, without you picking a third value by hand.

```css
--brand: #2563eb;

.button:hover {
  background-color: color-mix(in oklch, var(--brand) 85%, black);
}
```

That reads as "85% brand colour, 15% black," which gives you a darkened hover state derived from a single source colour, rather than a second colour you typed out and now have to keep in sync by hand. It works with any colour notation, though mixing `in oklch` gives the smoothest, most even-looking blend for the same reason `oklch()` beats HSL above.

## Accessible colour contrast

This is the part of the chapter that isn't a matter of taste.

Text has to be readable by people with low vision, colour vision deficiencies, or simply a cheap screen in bright sunlight. The measure is **contrast ratio**, the difference in relative luminance between the text colour and the colour behind it. It runs from 1:1, identical and invisible, to 21:1, pure black on pure white.

The WCAG guidelines you met in MTM1511 set the thresholds:

| Text | Minimum (AA) | Enhanced (AAA) |
|---|---|---|
| Normal body text | 4.5 : 1 | 7 : 1 |
| Large text, 18.66px bold or 24px and up | 3 : 1 | 4.5 : 1 |
| Interface components and meaningful graphics | 3 : 1 | not defined |

**AA is the standard to meet in this course**, and it's the level most organizations are legally held to.

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

## Common mistakes to avoid

- **Setting font sizes in `px`.** It ignores a visitor's chosen text size. Use `rem`.
- **A font stack with no generic family at the end.** If every named font is missing, the browser falls back to its own default, which may be nothing like what you designed for.
- **Light grey body text.** It's the most common contrast failure on the web, and it usually comes from copying a look without checking the ratio.
- **Loading many web font weights "just in case."** Every weight is a separate download.
- **Removing link underlines without adding another signal.** Colour alone is not enough to mark a link, for exactly the reason above.
- **Using `line-height` with a unit.** Unitless values scale correctly with nested font sizes. Fixed values don't.
- **Trusting HSL lightness to look evenly spaced.** It isn't, and the gap is worse on some hues than others. Use `oklch()` when the steps genuinely need to look equal.
- **Typing a second colour by hand for a hover or disabled state.** A `color-mix()` derived from your one source colour stays correct if the source ever changes; a hand-picked second colour doesn't.

## Keep learning

- [MDN: Fundamental text and font styling](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Text_styling/Fundamentals). The full reference for every property in this chapter.
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/). Paste two colours, get the ratio and the pass or fail. Bookmark this one.
- [Google Fonts](https://fonts.google.com/). Free, hosted web fonts, with the `<link>` code generated for you.
- [WCAG: Contrast Minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html). The actual success criterion behind the table above.
- [MDN: oklch()](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch). The function reference, with the lightness-uniformity explanation in more depth.
- [MDN: color-mix()](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix). The function reference, including how the mixing colour space affects the result.
- [Video: Typography Basics for the Web, by Kevin Powell](https://www.youtube.com/watch?v=lMEHfaV0Cnw). A practical walkthrough of setting readable type in CSS.

## Try it yourself (about 55 minutes)

Set a typographic baseline on your project. Give `body` a font stack ending in a generic family, a base `font-size` in `rem`, and a `line-height` between 1.5 and 1.7. Then give your headings their own sizes in `rem` and a tighter line height, so there's a clear visual step between an `h1`, an `h2`, and body text. Add `text-wrap: balance` to your headings.

Add one web font from Google Fonts, loading no more than two weights, and keep a fallback stack behind it. Confirm in developer tools that the font actually loaded rather than silently falling back.

Build a small colour palette using HSL, the way this chapter demonstrated. Pick one hue, then generate four versions of it by changing only the lightness, and use them for your background, your cards, and your accents. Write each one as a comment noting what it's for. Then rebuild the same four steps in `oklch()` and compare the two palettes side by side. Note in a comment which one looks more evenly spaced to you.

Pick one interactive colour, a button or link, and give it a `:hover` state built with `color-mix()` from its base colour rather than a second colour you typed by hand.

Finally, audit every text and background pair you used with the WebAIM Contrast Checker. Record the ratio for each. Anything below 4.5:1 for body text gets darkened or lightened until it passes, and you note in a comment what it was and what you changed it to.

Your page now looks and reads the way you intend. Next week asks a harder question: when two of your rules disagree about how something should look, which one actually wins.
