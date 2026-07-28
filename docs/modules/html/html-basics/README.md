---
title: HTML Basics
prerequisites:
  - welcome/introduction-to-the-web
---

# <abbr title="HyperText Markup Language">HTML</abbr> Basics

Everything on a page is built out of elements. Before you write a full document, it is worth being precise about what an element is, how attributes attach extra information to one, and how elements nest inside each other.

## What an HTML element actually is

An HTML **element** is made of a tag, and usually some content inside it:

```html
<p>This is a paragraph.</p>
```

`<p>` is the opening tag, `</p>` is the closing tag, and the text between them is the content. Most elements follow this open-tag, content, close-tag pattern.

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<p>This is a paragraph.</p>
</div>
</details>

Some elements carry extra information in **attributes**, written inside the opening tag:

```html
<a href="https://algonquincollege.com">Algonquin College</a>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<a href="https://algonquincollege.com">Algonquin College</a>
</div>
</details>

Here, `href` is an attribute that tells the `<a>` (anchor) element where the link should point. An attribute always lives inside the opening tag, as `name="value"`.

Elements can also **nest** inside each other, which is how you build more complex structures:

```html
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<ul>
  <li>HTML</li>
  <li><abbr title="Cascading Style Sheets">CSS</abbr></li>
  <li>JavaScript</li>
</ul>
</div>
</details>

Indentation isn't required for the browser to understand nested code, but it's required for *you* to understand it later on. Consistent indentation, one level deeper for each child element, is a habit worth building now, not later.

## The checklist

Run this over your markup before you move on:

- Every element follows tag, content, closing tag
- Attributes live inside the opening tag, written as `name="value"`
- Elements are nested with consistent indentation, one level deeper than their parent

## Keep learning

- [Video: HTML Tags, Attributes and Elements, by John Morris](https://www.youtube.com/watch?v=vNOyRZIkC7o). A clear walkthrough of the tag/element/attribute vocabulary this module opens with.
