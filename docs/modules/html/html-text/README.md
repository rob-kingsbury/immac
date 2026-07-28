---
title: HTML Text
prerequisites:
  - html/html-basics
---

# <abbr title="HyperText Markup Language">HTML</abbr> Text

## Paragraphs and line breaks

Body text goes in paragraphs. A `<p>` element holds one paragraph, and the browser adds space between them automatically.

```html
<p>This is one paragraph. The browser decides where the lines
wrap based on the width of the screen.</p>

<p>This is a separate paragraph.</p>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<p>This is one paragraph. The browser decides where the lines
wrap based on the width of the screen.</p>

<p>This is a separate paragraph.</p>
</div>
</details>

Whitespace in your code doesn't affect the output. Ten spaces or ten line breaks between two words collapse to a single space on the page. When you genuinely need a line break inside a paragraph (a postal address, a line of a poem), use `<br>`, but reach for it rarely. Most spacing is a job for <abbr title="Cascading Style Sheets">CSS</abbr>.

### Going deeper: elements with no closing tag

*Optional, about 4 minutes.*

Every element you've met so far follows the same shape: opening tag, content, closing tag. `<meta charset="UTF-8">`, in the [HTML Document Structure](/modules/html/html-document-structure/README.md) skeleton, didn't follow it. Neither does the `<br>` you just met.

These are called **void elements** (you'll also hear "self-closing" or "empty elements"), and the reason is structural, not stylistic: a void element can never contain anything, so there's nothing for a closing tag to close.

```html
<!-- Container element: something goes between the tags -->
<p>This is a paragraph.</p>

<!-- Void element: nothing can go between the tags, so there's only one tag -->
<br>
```

Writing `<br></br>`, or trying to put content inside `<meta>`, isn't just unnecessary, it's invalid. The browser has no concept of "inside a void element" to put anything into.

The void elements you've met so far:

| Element | Job |
|---|---|
| `<meta>` | Carries page metadata, like the character encoding or the viewport setting |
| `<br>` | Forces a single line break inside text |

You'll meet a third one in [Links, Images, and Media](/modules/html/links-images-media.md): `<img>`, which points at an image file rather than wrapping one. A handful of others exist (`<hr>`, `<input>`, `<link>`) and you'll meet them as their topics come up. The list is short and effectively fixed, because the browser needs to know, while it's still reading a tag, whether a closing tag is coming later or not.

One older habit is worth naming so it doesn't confuse you when you see it in someone else's code: `<br />`, with a trailing slash before the closing bracket. That comes from XHTML, a stricter, XML-based version of HTML that required every element to be explicitly closed, void or not. Modern HTML doesn't require the slash. Both `<br>` and `<br />` render identically, and this course writes the plain form throughout.

## Quoting other people's words

Not all text on a page is your own. [Quotations](/modules/html/html-text/quotations.md) covers the two elements that mark borrowed text, and the character entities you need when a symbol means something to HTML.

## The checklist

Run this over your page before you move on:

- Paragraph text lives in `<p>`, not stacked with repeated `<br>` tags
- The void elements (`<meta>`, `<br>`, `<img>`) are the exception to the tag, content, closing tag pattern, and take no closing tag at all

## Keep learning

- [W3Schools: HTML Paragraphs](https://www.w3schools.com/html/html_paragraphs.asp). A reference page for the elements in this module.
- [MDN: Void element](https://developer.mozilla.org/en-US/docs/Glossary/Void_element). A short glossary entry naming every void element in HTML.
