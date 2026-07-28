---
title: HTML Headings
prerequisites:
  - html/html-basics
---

# <abbr title="HyperText Markup Language">HTML</abbr> Headings

## Headings give a page its outline

HTML has six heading levels, `<h1>` through `<h6>`. They aren't just "big text" and "small text." They describe the structure of your content, the same way an outline describes a document.

```html
<h1>Chocolate Chip Cookies</h1>
<h2>Ingredients</h2>
<h2>Method</h2>
<h3>Mixing the dough</h3>
<h3>Baking</h3>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<h1>Chocolate Chip Cookies</h1>
<h2>Ingredients</h2>
<h2>Method</h2>
<h3>Mixing the dough</h3>
<h3>Baking</h3>
</div>
</details>

Two rules to build in now. Use one `<h1>` per page for the main title, and never skip a level to get a size you like (don't jump from `<h2>` to `<h4>`). Screen readers and search engines both read the heading order to understand what a page is about, so a broken outline is a real problem, not a cosmetic one. If a heading looks too big, you change its size with <abbr title="Cascading Style Sheets">CSS</abbr> later, not by picking the wrong level.

## The checklist

Run this over your page before you move on:

- One `<h1>` per page, and no heading level skipped just to get a size

## Keep learning

- [W3Schools: HTML Headings](https://www.w3schools.com/html/html_headings.asp). Covers heading levels with more worked examples.
