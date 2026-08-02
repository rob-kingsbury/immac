---
title: Semantic HTML
prerequisites:
  - html/html-headings
  - html/html-images
---

# Semantic <abbr title="HyperText Markup Language">HTML</abbr>

You could build almost any page using nothing but `<div>` elements. It would look identical to a well-built page, and it would be far worse: harder to maintain, weaker in search results, and close to unusable for anyone relying on a screen reader. Semantic HTML is the alternative. It means choosing elements that describe what a piece of content *is*, not just that it exists.

## Structure versus presentation

HTML's job is structure and meaning. <abbr title="Cascading Style Sheets">CSS</abbr>'s job is appearance. Semantic HTML is what keeps those two jobs separate, and that separation is the single most important idea in this course.

When you mark a heading as an `<h2>`, you are saying "this is a second-level heading," not "make this text big and bold." How big and how bold is a decision for CSS, and it can change without touching the HTML. Keeping meaning in the HTML and appearance in the CSS is what lets a site be restyled, made accessible, and understood by machines, all from the same clean structure.

## What "semantic" actually means

A `<div>` is a generic container. It has no meaning. It says "here is a box," and nothing more. A `<span>` is the same idea for inline content: a meaningless wrapper.

A semantic element, by contrast, tells you what it holds. A `<nav>` announces "this is navigation." An `<article>` announces "this is a self-contained piece of content." Compare two versions of the same page header:

```html
<!-- Non-semantic: works visually, means nothing -->
<div class="header">
  <div class="nav">
    <div class="nav-item"><a href="/">Home</a></div>
  </div>
</div>

<!-- Semantic: identical on screen, full meaning in the code -->
<header>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
    </ul>
  </nav>
</header>
```

To a browser painting pixels, these render the same. To a screen reader, a search engine, or the next developer to open the file, the second version explains itself and the first is a wall of anonymous boxes.

`<div>` and `<span>` still have a place. When you genuinely need a container only to hook CSS onto, and no semantic element fits, a `<div>` is the correct choice. The rule is simple: reach for a semantic element first, and fall back to `<div>` only when nothing meaningful applies.

## The elements, in three groups

Applying that rule means knowing what's available. The semantic elements fall into three groups, each covered on its own page.

The **landmarks** describe the major regions of a page: `<header>`, `<nav>`, `<main>`, `<footer>`, and `<search>`. These are the elements assistive technology uses to build a map of the page, and they matter most. See [Document Landmarks](/modules/html/html-semantics/document-landmarks.md).

Inside those regions, **sectioning elements** organize the content itself: `<article>`, `<section>`, and `<aside>`, each with a test for when it applies and when a plain `<div>` is the honest answer. See [Grouping Content](/modules/html/html-semantics/grouping-content.md).

Beyond the structural elements, a set of **smaller semantic elements** replaces generic markup in the middle of your content: `<time>`, `<address>`, `<mark>`, and the pairing element `<hgroup>`. See [Smaller Semantic Elements](/modules/html/html-semantics/smaller-semantic-elements.md).

## Common mistakes to avoid

A few patterns come up again and again in beginner code. Watching for them will put your markup ahead of most.

- **Div soup.** Wrapping everything in `<div>` elements when semantic ones exist. Before writing a `<div>`, check whether a `<header>`, `<nav>`, `<section>`, `<article>`, `<aside>`, or `<footer>` fits.
- **More than one `<main>`.** There is exactly one main content area per page. Multiple `<main>` elements break the landmark it provides.
- **A `<section>` with no heading.** If a block has no heading and isn't a real part of the outline, it's a `<div>`, not a `<section>`.
- **`<nav>` around every link.** Reserve it for major navigation blocks. A single "read more" link is not navigation.
- **Using headings for size.** Picking `<h3>` because it "looks right" rather than because it's the correct level. Choose the level for the outline; size it with CSS.

## Why it matters: accessibility and <abbr title="Search Engine Optimization">SEO</abbr>

Semantic markup pays off in two concrete, measurable ways, and both come free once you choose the right elements.

For accessibility, landmarks let assistive technology build a map of the page. A screen reader user can list every landmark and jump straight to the `<main>`, skip the `<nav>`, or move between `<article>` elements, none of which is possible with anonymous `<div>` boxes. This is the single biggest accessibility win available in this course: one `<main>` per page and a `<nav>` around your menu are, on their own, enough for a screen reader user to move around your site efficiently. Screen readers also let users navigate by heading, so the heading outline you build doubles as a table of contents. Good structure is not an accessibility feature you add later; it is accessibility, built in from the first tag.

For SEO, search engines read the same structure to understand your content. A heading inside an `<article>` inside `<main>` is clearly the important content of the page. The identical text buried in nested `<div>` elements is just text with no signal attached. Semantic HTML is one of the cheapest and most durable ranking signals available, and you earn it simply by using the correct element.

## The checklist

Run this over every page before you move on. Each of the three pages above ends with a checklist for its own elements; these are the habits that cut across all of them.

- Reached for a semantic element before falling back to `<div>`
- Every `<div>` in the file is there because nothing semantic fit, not because it was quickest
- Heading levels chosen by outline position, never by size
- The page reads as a set of named regions, not a stack of anonymous boxes

## Keep learning

- [W3Schools: HTML Semantic Elements](https://www.w3schools.com/html/html5_semantic_elements.asp). Every semantic tag with a runnable example you can edit in place.
- [Video: HTML5 Semantics, by Net Ninja](https://www.youtube.com/watch?v=kGW8Al_cga4). A short, beginner-friendly walkthrough of the semantic elements.
- [Video: Semantic HTML Tags, by Dave Gray](https://www.youtube.com/watch?v=kX3TfdUqpuU). A fuller tutorial with live coding.

If you can look at a design and name its regions out loud (that's a `<header>`, that's the `<main>`, those repeating blocks are `<article>` elements), you have the skill this module is teaching. The [full worked example](/modules/html/html-semantics/worked-example.md) puts every element above into one realistic page.
