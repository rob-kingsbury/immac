---
title: Core HTML Elements
---

# Core HTML Elements

Your tools are set up, your repository is cloned, and your first push already worked. This week is where the actual subject of the course begins: your first real HTML document, and the everyday elements you'll reach for on almost every page after it.

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
  <li>CSS</li>
  <li>JavaScript</li>
</ul>
</div>
</details>

Indentation isn't required for the browser to understand nested code, but it's required for *you* to understand it six weeks from now. Consistent indentation is a habit worth building this week, not in week twelve.

## Building a complete HTML document

Every element you just met needs to live somewhere. HTML files need a specific skeleton around your content to be valid, and building it one piece at a time makes each piece's job clear.

Start with the document type declaration. It's always the very first line, and it tells the browser this is a modern HTML document:

```html
<!DOCTYPE html>
```

Next, the `<html>` element wraps everything else in the file, and its `lang` attribute declares the page's language:

```html
<!DOCTYPE html>
<html lang="en">
</html>
```

Inside `<html>`, add a `<head>`. It holds information *about* the page, its character encoding and its title, none of which displays directly on the page itself:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>My First Page</title>
  </head>
</html>
```

`<meta charset="UTF-8">` tells the browser how to decode the text in the file, and it should be the first thing inside `<head>`. `<title>` sets what appears in the browser tab, not anything inside the visible page.

Finally, add a `<body>`. Everything that actually shows up in the browser window goes here:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>My First Page</title>
  </head>
  <body>
    <h1>Hello, web.</h1>
    <p>This is my first web page.</p>
  </body>
</html>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<h1>Hello, web.</h1>
<p>This is my first web page.</p>
</div>
</details>

Notice the Result box above only shows what's inside `<body>`. That's not a simplification, it's exactly how a browser treats the rest of the file: `<!DOCTYPE>`, `<html>`, and `<head>` configure the page but produce no visible output of their own. The one exception is `<title>`, which you'd see in the browser tab, not in the page area.

Save this as `index.html` and open it directly in a browser. No server, no build tools, no installation beyond a text editor. That's the whole point of starting here: HTML runs anywhere, immediately.

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

Two rules to build in now. Use one `<h1>` per page for the main title, and never skip a level to get a size you like (don't jump from `<h2>` to `<h4>`). Screen readers and search engines both read the heading order to understand what a page is about, so a broken outline is a real problem, not a cosmetic one. If a heading looks too big, you change its size with CSS later, not by picking the wrong level.

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

Whitespace in your code doesn't affect the output. Ten spaces or ten line breaks between two words collapse to a single space on the page. When you genuinely need a line break inside a paragraph (a postal address, a line of a poem), use `<br>`, but reach for it rarely. Most spacing is a job for CSS.

## Lists

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

## Quotations

Two elements mark quoted content. Use `<blockquote>` for a longer quote that stands on its own, and `<q>` for a short inline quote inside a sentence.

```html
<blockquote>
  <p>The web does not just connect machines, it connects people.</p>
</blockquote>

<p>She called it <q>the great equalizer</q> and moved on.</p>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<blockquote>
  <p>The web does not just connect machines, it connects people.</p>
</blockquote>

<p>She called it <q>the great equalizer</q> and moved on.</p>
</div>
</details>

Marking quotes with the right element matters beyond looks. It tells assistive technology and search engines that the text is borrowed rather than your own words. Most browsers add quotation marks around `<q>` content automatically, which is one reason not to type your own quotation marks inside it.

## Inline versus block

Every element you meet falls into one of two display behaviours by default.

Block elements start on a new line and take up the full width available. Headings, paragraphs, lists, and blockquotes are all block-level. They stack vertically down the page.

Inline elements sit inside a line of text and only take up as much width as their content. `<a>` (links), `<strong>`, `<em>`, and `<q>` are inline. They flow along with the words around them.

```html
<p>You can make a word <strong>important</strong> or
<em>emphasized</em> without breaking the line.</p>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<p>You can make a word <strong>important</strong> or
<em>emphasized</em> without breaking the line.</p>
</div>
</details>

Use `<strong>` for content that matters (a warning, a key term), not just to make text bold, and `<em>` for genuine emphasis. As with headings, the visual weight is a side effect. The meaning is the point, and CSS controls the appearance.

## Comments and clean code

HTML comments are notes for you and your teammates that the browser ignores entirely, so there's nothing to render for this one:

```html
<!-- Main navigation -->
<nav>
  ...
</nav>
<!-- End main navigation -->
```

Use them to label the major regions of a page. Combined with consistent indentation (nest each child element one level deeper than its parent), comments are what keep a file readable when it grows past a screen or two. Getting this habit now, on small files, means it's automatic by the time your project files are long.

## Keep learning

- [W3Schools: HTML Headings](https://www.w3schools.com/html/html_headings.asp). Covers heading levels with more worked examples.
- [W3Schools: HTML Paragraphs](https://www.w3schools.com/html/html_paragraphs.asp) and [HTML Lists](https://www.w3schools.com/html/html_lists.asp). Reference pages for the elements in this chapter.
- [W3Schools: HTML Quotation Elements](https://www.w3schools.com/html/html_quotation_elements.asp). Covers `<blockquote>`, `<q>`, and related elements like `<cite>` and `<abbr>`.
- [Video: HTML Tags, Attributes and Elements, by John Morris](https://www.youtube.com/watch?v=vNOyRZIkC7o). A clear walkthrough of the tag/element/attribute vocabulary this chapter opens with.

## Try it yourself (about 45 minutes)

Create a new folder in your cloned repository, add an `index.html` file, and build out the document skeleton, `<!DOCTYPE>` through `<body>`, from memory rather than copying it. Inside `<body>`, add one `<h1>`, at least two `<h2>` sections, a paragraph or two under each, one ordered and one unordered list, and a `<blockquote>`. Mark one or two words with `<strong>` or `<em>` where the meaning calls for it. Add a comment above each major section.

Open the page in your browser, then open developer tools and inspect your own elements. Watch how the block elements each claim a full row while the inline ones share a line. Then commit and push your change using the workflow from last week, stage, commit, sync, and confirm it shows up on GitHub.

Your page is a single block of text and lists right now. Next week connects it to the rest of the web, with links, images, and media.
