---
title: Core HTML Elements
---

# Core HTML Elements

Last week you wrote a complete HTML document. This week fills in the middle: the everyday elements you'll reach for on almost every page. Text content, lists, quotations, and the difference between elements that stack and elements that flow.

## Headings give a page its outline

HTML has six heading levels, `<h1>` through `<h6>`. They aren't just "big text" and "small text". They describe the structure of your content, the same way an outline describes a document.

```html
<h1>Chocolate Chip Cookies</h1>
<h2>Ingredients</h2>
<h2>Method</h2>
<h3>Mixing the dough</h3>
<h3>Baking</h3>
```

Two rules to build in now. Use one `<h1>` per page for the main title, and never skip a level to get a size you like (don't jump from `<h2>` to `<h4>`). Screen readers and search engines both read the heading order to understand what a page is about, so a broken outline is a real problem, not a cosmetic one. If a heading looks too big, you change its size with CSS later, not by picking the wrong level.

## Paragraphs and line breaks

Body text goes in paragraphs. A `<p>` element holds one paragraph, and the browser adds space between them automatically.

```html
<p>This is one paragraph. The browser decides where the lines
wrap based on the width of the screen.</p>

<p>This is a separate paragraph.</p>
```

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

An ordered list (`<ol>`) is for steps or ranked items, where sequence carries meaning:

```html
<ol>
  <li>Preheat the oven.</li>
  <li>Mix the dry ingredients.</li>
  <li>Add the wet ingredients.</li>
</ol>
```

A description list (`<dl>`) pairs terms with definitions:

```html
<dl>
  <dt>HTML</dt>
  <dd>The structure and meaning of a page.</dd>
  <dt>CSS</dt>
  <dd>The visual presentation of a page.</dd>
</dl>
```

Lists nest. An `<li>` can contain another full `<ul>` or `<ol>`, which is how navigation menus with sub-items are built.

## Quotations

Two elements mark quoted content. Use `<blockquote>` for a longer quote that stands on its own, and `<q>` for a short inline quote inside a sentence.

```html
<blockquote>
  <p>The web does not just connect machines, it connects people.</p>
</blockquote>

<p>She called it <q>the great equalizer</q> and moved on.</p>
```

Marking quotes with the right element matters beyond looks. It tells assistive technology and search engines that the text is borrowed rather than your own words.

## Inline versus block

Every element you meet falls into one of two display behaviours by default.

Block elements start on a new line and take up the full width available. Headings, paragraphs, lists, and blockquotes are all block-level. They stack vertically down the page.

Inline elements sit inside a line of text and only take up as much width as their content. `<a>` (links), `<strong>`, `<em>`, and `<q>` are inline. They flow along with the words around them.

```html
<p>You can make a word <strong>important</strong> or
<em>emphasized</em> without breaking the line.</p>
```

Use `<strong>` for content that matters (a warning, a key term), not just to make text bold, and `<em>` for genuine emphasis. As with headings, the visual weight is a side effect. The meaning is the point, and CSS controls the appearance.

## Comments and clean code

HTML comments are notes for you and your teammates that the browser ignores:

```html
<!-- Main navigation -->
<nav>
  ...
</nav>
<!-- End main navigation -->
```

Use them to label the major regions of a page. Combined with consistent indentation (nest each child element one level deeper than its parent), comments are what keep a file readable when it grows past a screen or two. Getting this habit now, on small files, means it's automatic by the time your project files are long.

## Try it yourself

Build a single page about a topic you know well. Give it one `<h1>`, at least two `<h2>` sections, a paragraph or two under each, one ordered and one unordered list, and a `<blockquote>`. Mark one or two words with `<strong>` or `<em>` where the meaning calls for it. Add a comment above each major section. Open it in the browser, then inspect an element and watch how the block elements each claim a full row while the inline ones share a line.
