---
title: Core HTML Elements
---

# Core <abbr title="HyperText Markup Language">HTML</abbr> Elements

Your tools are set up, your repository is cloned, and your first push already worked. This week is where the actual subject of the course begins: your first real HTML document, and the everyday elements you'll reach for on almost every page after it.

## How to read this chapter

**The core path is everything from "What an HTML element actually is" down to the checklist near the end.** Work through it in order, build the examples as you go, and you have what the assignment and the Try it yourself exercise need. Budget about 30 minutes to read it, plus the 45 minutes the exercise takes.

Sections headed **Going deeper** are optional and add roughly 15 minutes total if you read all of them. They're marked clearly, every time, so you always know when you've stepped off the required path. They exist because this page is meant to still answer real questions for you a year or two from now, not just get you through this week's assignment. Skip them on a busy week. Nothing here depends on them.

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

Indentation isn't required for the browser to understand nested code, but it's required for *you* to understand it six weeks from now. Consistent indentation, one level deeper for each child element, is a habit worth building this week, not in week twelve.

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
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>My First Page</title>
  </head>
</html>
```

`<meta charset="UTF-8">` tells the browser how to decode the text in the file, and it should be the first thing inside `<head>`. `<meta name="viewport" content="width=device-width, initial-scale=1">` tells a phone or tablet to render the page at its actual screen width instead of shrinking down a desktop-sized layout to fit, which is why a page without it looks fine on your laptop and unreadably tiny on a phone. Include it on every page from here on. You'll see exactly why it matters once you reach responsive design in MTM1544. `<title>` sets what appears in the browser tab, not anything inside the visible page.

Finally, add a `<body>`. Everything that actually shows up in the browser window goes here:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
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

### Going deeper: elements with no closing tag

*Optional, about 4 minutes.*

Every element you've met so far follows the same shape: opening tag, content, closing tag. `<meta charset="UTF-8">`, back in the document skeleton, didn't follow it. Neither does the `<br>` you just met.

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

You'll meet a third one next week: `<img>`, which points at an image file rather than wrapping one. A handful of others exist (`<hr>`, `<input>`, `<link>`) and you'll meet them as their topics come up. The list is short and effectively fixed, because the browser needs to know, while it's still reading a tag, whether a closing tag is coming later or not.

One older habit is worth naming so it doesn't confuse you when you see it in someone else's code: `<br />`, with a trailing slash before the closing bracket. That comes from XHTML, a stricter, XML-based version of HTML that required every element to be explicitly closed, void or not. Modern HTML doesn't require the slash. Both `<br>` and `<br />` render identically, and this course writes the plain form throughout.

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

### Going deeper: why headings are already "big" and lists already have bullets

*Optional, about 4 minutes.*

You've written an `<h1>` and it showed up large and bold. You've written a `<ul>` and it showed up with bullets and an indent. You haven't written a single line of CSS. Where did that come from?

Every browser ships with its own built-in stylesheet, called the **user-agent stylesheet**, and it applies to every page on the web before any CSS you write gets a chance to run. It's what makes an `<h1>` big and an `<h2>` smaller, a `<ul>` indented with bullets and an `<ol>` indented with numbers, a `<p>` followed by a blank line. None of that is a rule you wrote. It's a default, applied automatically, that exists so a plain HTML document with zero authored styling is still readable instead of a wall of identical, run-together text.

This is worth sitting with for a second, because it's the clearest possible proof of something Week 1 already told you: HTML describes structure, not appearance. The browser's default stylesheet is itself just CSS, applied by the browser instead of by you. When MTM1544 teaches you to write your own CSS, you aren't switching a page from "no style" to "styled." You're overriding the browser's styling with your own. An unstyled page was never actually unstyled. It was styled by whoever built the browser.

Different browsers' default stylesheets aren't identical to each other, either, which is one reason professional CSS work often starts by deliberately resetting or normalizing these defaults before building custom styles on top. You'll meet that idea properly in MTM1544. For now, the smaller and more important takeaway is this: every visual decision you're seeing right now, heading size, bullet points, paragraph spacing, is a style, even the ones nobody in this room wrote.

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

### Going deeper: character entities and escaping reserved symbols

*Optional, about 5 minutes.*

Three characters mean something special to HTML: `<`, `>`, and `&`. The browser uses them to find tags and attributes, which creates a problem the moment you actually want to type one of them as ordinary text.

```html
<p>Compare the two values with < and check the total.</p>
```

The browser reads that `<` and starts looking for a tag name. It finds "and," fails to make sense of it, and the rest of the sentence can render unpredictably or vanish depending on the browser. The fix is a **character entity**: a short, reserved piece of text that stands in for the character you actually want, so the browser reads it as content instead of markup.

```html
<p>Compare the two values with &lt; and check the total.</p>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<p>Compare the two values with &lt; and check the total.</p>
</div>
</details>

The entities you'll actually reach for, almost all of the time:

| Entity | Renders as | When you need it |
|---|---|---|
| `&lt;` | &lt; | A literal less-than sign |
| `&gt;` | &gt; | A literal greater-than sign |
| `&amp;` | &amp; | An ampersand, e.g. "Fish &amp; Chips" |
| `&quot;` | &quot; | A straight double quote inside text where it might be misread |
| `&copy;` | &copy; | A copyright symbol |
| `&nbsp;` | *(a space that won't line-break)* | Rare. Covered below. |

`&amp;` is the one you'll type most, because an ampersand shows up constantly in ordinary writing ("Sales &amp; Marketing," "the lakeside loop &amp; the summit climb") and, unlike `<`, it doesn't look dangerous the way a stray bracket does, so it's the easiest one to forget.

```html
<h2>Routes &amp; Difficulty</h2>
<p>Easy, moderate, then steep. &copy; Mountain Trail Guide.</p>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<h2>Routes &amp; Difficulty</h2>
<p>Easy, moderate, then steep. &copy; Mountain Trail Guide.</p>
</div>
</details>

`&nbsp;` works differently from the rest. It doesn't stand in for a character you can't type, it changes behaviour. A regular space lets the browser break a line between two words. `&nbsp;` is a space that refuses that break, which is useful for keeping something like "10&nbsp;km" from splitting across two lines with the number stranded at the end of one and the unit at the start of the next. Reach for it rarely and on purpose. Most spacing, like most of what's in this chapter's Going deeper sections, is a CSS decision you'll make properly starting next course.

One more thing worth knowing: every named entity, including `&copy;`, also has a numeric form (`&#169;` for the copyright symbol). Numeric forms exist because they work even in older or unusual systems that don't recognize every named entity. For the handful of entities in the table above, the named form is what you'll see in almost all real code, and it's what this course expects.

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

<div class="diagram">
<svg viewBox="0 0 640 250" role="img" aria-label="Block elements compared to inline elements. On the left, three block-level elements, a heading, a paragraph, and a list, each start on a new line and stretch across the full width of their container, stacking one below another. On the right, a line of ordinary text flows normally, and an inline element sitting in the middle of the sentence takes up only as much width as its own content, staying inside the line instead of starting a new one.">
  <text x="10" y="18" class="d-lbl">Block elements</text>
  <rect x="10" y="30" width="290" height="205" rx="8" class="d-surface d-border" stroke-width="1.5"/>
  <rect x="26" y="44" width="258" height="28" rx="4" class="d-accent-soft d-accent-stroke" stroke-width="1.5"/>
  <text x="155" y="63" text-anchor="middle" class="d-lbl-mono">h1, full width</text>
  <line x1="26" y1="92" x2="284" y2="92" class="d-muted-stroke" stroke-width="5"/>
  <line x1="26" y1="106" x2="230" y2="106" class="d-muted-stroke" stroke-width="5"/>
  <text x="30" y="128" class="d-lbl-muted">p, full width</text>
  <line x1="40" y1="146" x2="270" y2="146" class="d-muted-stroke" stroke-width="5"/>
  <line x1="40" y1="160" x2="245" y2="160" class="d-muted-stroke" stroke-width="5"/>
  <line x1="40" y1="174" x2="260" y2="174" class="d-muted-stroke" stroke-width="5"/>
  <text x="30" y="196" class="d-lbl-muted">ul, full width</text>
  <text x="155" y="222" text-anchor="middle" class="d-lbl">each starts a new line</text>

  <text x="340" y="18" class="d-lbl">Inline elements</text>
  <rect x="340" y="30" width="290" height="205" rx="8" class="d-surface d-border" stroke-width="1.5"/>
  <line x1="356" y1="80" x2="470" y2="80" class="d-muted-stroke" stroke-width="5"/>
  <rect x="474" y="72" width="64" height="16" rx="3" class="d-accent-soft d-accent-stroke" stroke-width="1.5"/>
  <line x1="544" y1="80" x2="600" y2="80" class="d-muted-stroke" stroke-width="5"/>
  <line x1="356" y1="98" x2="520" y2="98" class="d-muted-stroke" stroke-width="5"/>
  <text x="506" y="83" text-anchor="middle" class="d-lbl-mono" font-size="9">strong</text>
  <text x="485" y="140" text-anchor="middle" class="d-lbl-muted">one line, no break</text>
  <text x="485" y="222" text-anchor="middle" class="d-lbl">content just flows</text>
</svg>
<figcaption>Block elements each claim a full row and stack top to bottom. Inline elements sit inside the flow of a line and take up only the width their content needs.</figcaption>
</div>

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

## The checklist

Run this over your page before you submit work in this course:

- Every element follows tag, content, closing tag, except the void elements (`<meta>`, `<br>`, and soon `<img>`) that take no closing tag at all
- Attributes live inside the opening tag, written as `name="value"`
- Elements are nested with consistent indentation, one level deeper than their parent
- The skeleton is in place: `<!DOCTYPE html>`, `<html lang="en">`, a `<head>` with `charset` and `viewport` meta tags plus a `<title>`, and a `<body>` holding everything visible
- One `<h1>` per page, and no heading level skipped just to get a size
- Paragraph text lives in `<p>`, not stacked with repeated `<br>` tags
- The right list type for the content: `<ul>` for unordered items, `<ol>` for sequence or ranking, `<dl>` for term and definition pairs
- `<blockquote>` marks a standalone quote, `<q>` marks a short one inline
- `<strong>` and `<em>` are used for meaning, not just to make text bold or italic
- Block elements (headings, paragraphs, lists, blockquotes) stack full width; inline elements (`<a>`, `<strong>`, `<em>`, `<q>`) sit inside the line
- A comment labels each major section of the file

## Keep learning

- [W3Schools: HTML Headings](https://www.w3schools.com/html/html_headings.asp). Covers heading levels with more worked examples.
- [W3Schools: HTML Paragraphs](https://www.w3schools.com/html/html_paragraphs.asp) and [HTML Lists](https://www.w3schools.com/html/html_lists.asp). Reference pages for the elements in this chapter.
- [W3Schools: HTML Quotation Elements](https://www.w3schools.com/html/html_quotation_elements.asp). Covers `<blockquote>`, `<q>`, and related elements like `<cite>` and `<abbr>`.
- [W3Schools: HTML Entities](https://www.w3schools.com/html/html_entities.asp). A fuller list than the table above, including the numeric forms.
- [MDN: Void element](https://developer.mozilla.org/en-US/docs/Glossary/Void_element). A short glossary entry naming every void element in HTML.
- [MDN: the Cascade, user-agent stylesheets](https://developer.mozilla.org/en-US/docs/Web/CSS/Cascade#user-agent_stylesheets). Where the browser's default styling fits among the other kinds of CSS.
- [Video: HTML Tags, Attributes and Elements, by John Morris](https://www.youtube.com/watch?v=vNOyRZIkC7o). A clear walkthrough of the tag/element/attribute vocabulary this chapter opens with.

## Try it yourself (about 45 minutes)

Create a new folder in your cloned repository, add an `index.html` file, and build out the document skeleton, `<!DOCTYPE>` through `<body>`, from memory rather than copying it. Include the charset and viewport meta tags, both belong in every page you'll ever build from here on. Inside `<body>`, add one `<h1>`, at least two `<h2>` sections, a paragraph or two under each, one ordered and one unordered list, and a `<blockquote>`. Mark one or two words with `<strong>` or `<em>` where the meaning calls for it. Somewhere in your text, work in an ampersand or a copyright line and write it with the matching entity, `&amp;` or `&copy;`, instead of typing the character directly. Add a comment above each major section.

Open the page in your browser, then open developer tools and inspect your own elements. Watch how the block elements each claim a full row while the inline ones share a line. Then commit and push your change using the workflow from last week, stage, commit, sync, and confirm it shows up on GitHub.

Your page is a single block of text and lists right now. Next week connects it to the rest of the web, with links, images, and media.
