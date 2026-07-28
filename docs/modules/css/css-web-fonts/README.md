---
title: Web Fonts
prerequisites:
  - css/css-typography
---

# Web Fonts

A font stack can only name fonts a visitor already has. **Web fonts** remove that limit by having the browser download a font file along with the page, so you can use a typeface nobody's machine has installed.

The easiest source is a hosted service such as [Google Fonts](https://fonts.google.com/). You choose a font, and it gives you a `<link>` to paste into your <abbr title="HyperText Markup Language">HTML</abbr> `<head>`, before your own stylesheet:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/styles.css">
```

Then use the font's name in your <abbr title="Cascading Style Sheets">CSS</abbr> as normal, still with fallbacks behind it:

```css
body {
  font-family: "Inter", system-ui, sans-serif;
}
```

Two habits keep web fonts from hurting your page. **Load only the weights you'll actually use**, since each one is a separate file download, and a page that pulls in nine weights of a font when it uses two is wasting a visitor's bandwidth. And **keep a real fallback stack** behind the web font, so the page stays readable if the download fails.

## Common mistakes to avoid

- **Loading many web font weights "just in case."** Every weight is a separate download.

## The checklist

Run this over your project before you move on:

- No more than one or two web font weights loaded, and only the ones actually used
- A real fallback stack sits behind every web font
- Developer tools confirm the font actually loaded, rather than silently falling back

## Keep learning

- [Google Fonts](https://fonts.google.com/). Free, hosted web fonts, with the `<link>` code generated for you.
- [MDN: Web fonts](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Text_styling/Web_fonts). The full reference, including self-hosting a font file instead of using a hosted service.
