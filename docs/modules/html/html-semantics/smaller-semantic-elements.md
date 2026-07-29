---
title: Smaller Semantic Elements
prerequisites:
  - html/html-semantics
---

# Smaller Semantic Elements

Semantics go beyond the big landmarks. Several smaller elements replace generic markup with meaning, and using them is part of writing professional HTML. Pairing an image or code sample with a caption gets its own treatment in [HTML Figure](/modules/html/html-figure/README.md).

`<time>` marks a date or time in a machine-readable way, which search engines and browsers can use:

```html
<p>Class starts <time datetime="2026-03-15T18:00">March 15 at 6 p.m.</time></p>
```

`<address>` marks contact information for the nearest `<article>` or the page as a whole. `<mark>` highlights text for reference, such as a search term found in a result. And `<strong>` marks importance and `<em>` marks emphasis, both of which are semantic even though they're inline.

## Going deeper: hgroup, one element for a heading and its subtitle

Go back to the `<header>` for Corner Bakery in [Document Landmarks](/modules/html/html-semantics/document-landmarks.md):

```html
<header>
  <h1>Corner Bakery</h1>
  <p>Fresh bread daily since 1998</p>
</header>
```

That tagline paragraph sits next to the heading, but nothing in the markup says the two belong together. A sighted visitor reads them as a pair because of how they're positioned on screen. A screen reader user browsing by heading hears "Corner Bakery" and, separately, may or may not notice the paragraph that follows it.

`<hgroup>` exists for exactly this pairing: a heading plus secondary content such as a subtitle, an alternative title, or a tagline, wrapped as one semantic unit.

```html
<header>
  <hgroup>
    <h1>Corner Bakery</h1>
    <p>Fresh bread daily since 1998</p>
  </hgroup>
</header>
```

`<hgroup>` allows one heading, `<h1>` through `<h6>`, plus any number of `<p>` elements before or after it. Only that one heading counts toward the page's heading outline; the paragraphs inside `<hgroup>` are announced as part of the group, not mistaken for headings of their own or counted as a skipped level.

This is current, standard <abbr title="HyperText Markup Language">HTML</abbr>, not an experimental feature. It has shipped across major browsers since 2015. Reach for it whenever a heading has a subtitle riding along with it: a page title with a tagline, an article title with a byline-style subheading, a product name with its short description. A heading with no companion text does not need it.

## The checklist

- `<time datetime="...">` used for any date or time that should be machine-readable
- `<address>` used for real contact information, not as a general "italic block" element
- `<strong>` and `<em>` chosen for importance and emphasis, not for bold and italic appearance
- `<hgroup>` used where a heading genuinely has a subtitle travelling with it

## Keep learning

- [MDN: the hgroup element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/hgroup). Full syntax and content rules.
- [MDN: the time element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/time). The `datetime` attribute formats, which are stricter than they look.
