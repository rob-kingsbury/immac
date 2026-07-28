---
title: Typography
prerequisites:
  - css/css-units
---

# Font Families and Font Stacks

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

There's a shortcut worth knowing. The keyword `system-ui` tells the browser to use whatever the operating system's own interface font is, which means the page looks native on every platform and loads instantly because nothing has to download. For a project without a specific brand typeface it's a solid default:

```css
body {
  font-family: system-ui, sans-serif;
}
```

A font stack can only name fonts a visitor already has. [Web Fonts](/modules/css/css-web-fonts/README.md) covers how to use a typeface nobody's machine has installed.

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

**Use `rem` for font sizes.** The reason is accessibility, and it's covered properly in [Text Scaling](/modules/accessibility/text-scaling/README.md), but the short version is that a visitor who has increased their browser's default text size gets the larger text they asked for with `rem`, and gets ignored with `px`. That's a real barrier for a real group of people, and avoiding it costs you nothing.

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

`line-height` is the vertical space each line of text occupies, and it does more for readability than almost anything else on a page. Default line height is cramped for body text at typical sizes.

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

It has no visible effect on a heading that already fits one line, and browser support is newer than most of the rest of this module, so treat it as a nice-to-have polish rather than something to depend on.

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
  color: #5b6b85;
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

## Common mistakes to avoid

- **Setting font sizes in `px`.** It ignores a visitor's chosen text size. Use `rem`.
- **A font stack with no generic family at the end.** If every named font is missing, the browser falls back to its own default, which may be nothing like what you designed for.
- **Removing link underlines without adding another signal.** Colour alone is not enough to mark a link.
- **Using `line-height` with a unit.** Unitless values scale correctly with nested font sizes. Fixed values don't.

## The checklist

Run this over your typography choices before you move on:

- Font stack ends in a generic family (`serif`, `sans-serif`, or `monospace`)
- Font sizes set in `rem`, not `px`
- `line-height` set as a unitless number

## Keep learning

- [MDN: Fundamental text and font styling](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Text_styling/Fundamentals). The full reference for every property in this module.
- [Video: Typography Basics for the Web, by Kevin Powell](https://www.youtube.com/watch?v=lMEHfaV0Cnw). A practical walkthrough of setting readable type in CSS.
