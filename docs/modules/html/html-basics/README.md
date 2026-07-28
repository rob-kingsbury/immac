---
title: HTML Basics
prerequisites:
  - web-basics/how-the-web-works
---

# <abbr title="HyperText Markup Language">HTML</abbr> Basics

Everything on a page is built out of elements. Before you write a full document, it is worth being precise about what an element is, how attributes attach extra information to one, and how elements nest inside each other.

## What HTML is

HTML stands for **HyperText Markup Language**. Every website you have ever visited, from a personal blog to the largest search engine, is built on it. Understanding what it does, and just as importantly what it doesn't do, is the first real concept in this course.

**HTML describes structure and meaning, not appearance.** When you write HTML you're labelling content: this is a heading, this is a paragraph, this is a list, this is a link. You are not saying what colour it is, how large the text should be, or where it sits on the page. That's a separate job, done by <abbr title="Cascading Style Sheets">CSS</abbr>, which you'll learn in your Web Styles course. Keeping those two jobs separate, structure in HTML and appearance in CSS, is one of the most important habits this course will build in you.

**A browser reads HTML and turns it into the page you see.** Without any styling at all an HTML page still displays, just plainly: headings look bigger than paragraphs, lists show bullets, links are blue and underlined. That plain rendering is the browser's built-in idea of what each element means, before any designer touches it.

### Head versus body

Every HTML page splits into two parts: a `<head>`, holding information *about* the page that never appears on screen, and a `<body>`, holding everything a visitor actually sees. [HTML Document Structure](/modules/html/html-document-structure/README.md) builds the full skeleton properly; the mistake below is worth seeing once before you do, because it's easy to make and easy to miss.

```html
<!-- Wrong: the heading is inside <head>, so nothing shows on the page -->
<head>
  <title>Mountain Trail Guide</title>
  <h1>Mountain Trail Guide</h1>
</head>
<body>
  <p>Three routes, from an easy lakeside loop to a steep summit climb.</p>
</body>
```

```html
<!-- Right: <head> holds only metadata; anything a visitor should see goes in <body> -->
<head>
  <title>Mountain Trail Guide</title>
</head>
<body>
  <h1>Mountain Trail Guide</h1>
  <p>Three routes, from an easy lakeside loop to a steep summit climb.</p>
</body>
```

The wrong version doesn't throw an error. The browser tab still shows the title correctly, and the page looks like it loaded fine, right up until you notice the `<h1>` never actually appears. An editor that only flags broken syntax won't catch this either, since nothing about it is technically invalid. It's worth testing once yourself so the failure looks familiar if you ever meet it again.

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

- Can state why HTML describes structure and meaning, not appearance
- Every element follows tag, content, closing tag
- Attributes live inside the opening tag, written as `name="value"`
- Elements are nested with consistent indentation, one level deeper than their parent

## Keep learning

- [Video: HTML Tags, Attributes and Elements, by John Morris](https://www.youtube.com/watch?v=vNOyRZIkC7o). A clear walkthrough of the tag/element/attribute vocabulary this module opens with.
