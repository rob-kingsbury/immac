---
title: HTML Lists
prerequisites:
  - html/html-basics
---

# <abbr title="HyperText Markup Language">HTML</abbr> Lists

There are three list types, and the right one depends on your content.

An unordered list (`<ul>`) is for items where order doesn't matter:

```html
<ul>
  <li>Flour</li>
  <li>Sugar</li>
  <li>Butter</li>
</ul>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<ul>
  <li>Flour</li>
  <li>Sugar</li>
  <li>Butter</li>
</ul>
</div>
</details>

An ordered list (`<ol>`) is for steps or ranked items, where sequence carries meaning:

```html
<ol>
  <li>Preheat the oven.</li>
  <li>Mix the dry ingredients.</li>
  <li>Add the wet ingredients.</li>
</ol>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<ol>
  <li>Preheat the oven.</li>
  <li>Mix the dry ingredients.</li>
  <li>Add the wet ingredients.</li>
</ol>
</div>
</details>

A description list (`<dl>`) pairs terms with definitions:

```html
<dl>
  <dt>HTML</dt>
  <dd>The structure and meaning of a page.</dd>
  <dt>CSS</dt>
  <dd>The visual presentation of a page.</dd>
</dl>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<dl>
  <dt>HTML</dt>
  <dd>The structure and meaning of a page.</dd>
  <dt>CSS</dt>
  <dd>The visual presentation of a page.</dd>
</dl>
</div>
</details>

Lists nest. An `<li>` can contain another full `<ul>` or `<ol>`, which is how navigation menus with sub-items are built:

```html
<ul>
  <li>HTML
    <ul>
      <li>Elements</li>
      <li>Attributes</li>
    </ul>
  </li>
  <li>CSS</li>
</ul>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<ul>
  <li>HTML
    <ul>
      <li>Elements</li>
      <li>Attributes</li>
    </ul>
  </li>
  <li>CSS</li>
</ul>
</div>
</details>

## Going deeper: why headings are already "big" and lists already have bullets

*Optional, about 4 minutes.*

You've written an [`<h1>`](/modules/html/html-headings/README.md) and it showed up large and bold. You've written a `<ul>` and it showed up with bullets and an indent. You haven't written a single line of <abbr title="Cascading Style Sheets">CSS</abbr>. Where did that come from?

Every browser ships with its own built-in stylesheet, called the **user-agent stylesheet**, and it applies to every page on the web before any CSS you write gets a chance to run. It's what makes an `<h1>` big and an `<h2>` smaller, a `<ul>` indented with bullets and an `<ol>` indented with numbers, a `<p>` followed by a blank line. None of that is a rule you wrote. It's a default, applied automatically, that exists so a plain HTML document with zero authored styling is still readable instead of a wall of identical, run-together text.

This is worth sitting with for a second, because it's the clearest possible proof of something [HTML Basics](/modules/html/html-basics/README.md) already told you: HTML describes structure, not appearance. The browser's default stylesheet is itself just CSS, applied by the browser instead of by you. When MTM1544 teaches you to write your own CSS, you aren't switching a page from "no style" to "styled." You're overriding the browser's styling with your own. An unstyled page was never actually unstyled. It was styled by whoever built the browser.

Different browsers' default stylesheets aren't identical to each other, either, which is one reason professional CSS work often starts by deliberately resetting or normalizing these defaults before building custom styles on top. You'll meet that idea properly in MTM1544. For now, the smaller and more important takeaway is this: every visual decision you're seeing right now, heading size, bullet points, paragraph spacing, is a style, even the ones nobody in this room wrote.

## The checklist

Run this over your page before you move on:

- The right list type for the content: `<ul>` for unordered items, `<ol>` for sequence or ranking, `<dl>` for term and definition pairs

## Keep learning

- [W3Schools: HTML Lists](https://www.w3schools.com/html/html_lists.asp). A reference page for the three list types.
- [MDN: the Cascade, user-agent stylesheets](https://developer.mozilla.org/en-US/docs/Web/CSS/Cascade#user-agent_stylesheets). Where the browser's default styling fits among the other kinds of CSS.
- [Video: HTML Lists, by Steve Griffith](https://www.youtube.com/watch?v=eWpRm5fZGEU). A direct walkthrough of the three list types.
