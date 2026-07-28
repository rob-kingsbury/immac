---
title: Fluid Sizing Without a Query
prerequisites:
  - css/css-typography
---

# Fluid Sizing Without a Query

Some responsive behaviour needs no breakpoint at all, and reaching for a media query first is a habit worth resisting when one of these will do.

You already know `%`, `rem`, and viewport units, covered in [CSS Units](/modules/css/css-units/README.md). Three more tools combine them into sizing that adjusts continuously rather than jumping at fixed widths.

`max-width` in `ch` units ties a text container's width to the text itself, since `1ch` is roughly the width of one character in the current font. Around 60 to 75 characters is the readable range for a line of body text.

<CssDemo>

```html
<p class="prose">This paragraph is capped at a comfortable reading width using the ch unit, so the line length stays reasonable no matter how wide the surrounding page gets. Resize the panel and the text keeps wrapping at roughly the same number of characters per line.</p>
```

```css
.prose {
  max-width: 65ch;
  font-family: system-ui, sans-serif;
  line-height: 1.6;
}
```

</CssDemo>

`min()` and `max()` pick the smaller or larger of two values, evaluated live as the page resizes. `min()` is how you cap something without hardcoding when the cap kicks in: `width: min(90%, 600px)` is never wider than 600 pixels, and on a narrow screen where 90% is already less than that, it shrinks with the screen instead.

<CssDemo>

```html
<div class="capped">width: min(90%, 300px)</div>
```

```css
.capped {
  width: min(90%, 300px);
  background-color: #dbeafe;
  border: 1px solid #60a5fa;
  padding: 12px;
  font-family: system-ui, sans-serif;
  text-align: center;
}
```

</CssDemo>

`clamp()` combines both directions into one: a floor, a preferred value, and a ceiling. It's how you get type that grows smoothly with the screen instead of jumping at breakpoints.

<CssDemo>

```html
<h2 class="fluid">Fluid heading</h2>
```

```css
.fluid {
  font-size: clamp(1.5rem, 5vw, 3rem);
  font-family: system-ui, sans-serif;
  margin: 0;
}
```

</CssDemo>

Resize this panel and the heading scales continuously between its floor and its ceiling. Read `clamp(1.5rem, 5vw, 3rem)` as: never smaller than 1.5rem, never larger than 3rem, and 5% of the viewport width whenever that lands between the two. The middle value is what actually grows; the outer two just fence it in.

## Common mistakes to avoid

- **Reaching for a media query before trying `ch`, `min()`, `max()`, or `clamp()`.** A lot of what looks like it needs a breakpoint is actually a fluid sizing problem, and the fluid version needs less code and has fewer values to keep consistent.

## The checklist

Run this over your sizing before you move on:

- Body text capped with `max-width: 65ch` or similar for a readable line length
- `clamp()` used for fluid type where a hard breakpoint isn't needed

## Keep learning

- [MDN: clamp()](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp). The function behind fluid type.
