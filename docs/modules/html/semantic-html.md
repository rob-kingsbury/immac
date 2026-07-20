---
title: Semantic HTML
---

# Semantic HTML

You could build almost any page using nothing but `<div>` elements and CSS. It would look fine and be nearly impossible to use for anyone relying on a screen reader, and weaker in search results. Semantic HTML is the fix: elements that say what a region of the page *is*, not just that it exists.

## What "semantic" means

A `<div>` is a generic box with no meaning. A `<nav>` is also a box, but it announces "this is the navigation". Same visual result, completely different information for anything reading the code.

Compare these two versions of a page header:

```html
<!-- Non-semantic: works visually, means nothing -->
<div class="header">
  <div class="nav">...</div>
</div>

<!-- Semantic: identical look, full meaning -->
<header>
  <nav>...</nav>
</header>
```

To a browser painting pixels, they're the same. To a screen reader, a search engine, or a developer reading the file six months later, the second one is self-explaining.

## The main structural elements

These are the landmark elements that describe the major regions of almost every page:

- `<header>` is introductory content at the top of a page or a section: a logo, a title, the main navigation.
- `<nav>` wraps a set of navigation links. Use it for the primary menus, not for every stray link.
- `<main>` holds the primary content of the page, the part that's unique to it. There should be exactly one `<main>` per page.
- `<footer>` is closing content: copyright, contact details, secondary links.

```html
<body>
  <header>
    <h1>Corner Bakery</h1>
    <nav>
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="menu.html">Menu</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <!-- the unique content of this page goes here -->
  </main>

  <footer>
    <p>&copy; 2026 Corner Bakery</p>
  </footer>
</body>
```

## Sections and articles

Inside `<main>`, two elements help you group content.

An `<article>` is a self-contained piece that would make sense on its own: a blog post, a news story, a product card, a single comment. If you could pull it out and syndicate it elsewhere, it's an article.

A `<section>` is a thematic grouping of related content, usually with its own heading: the "Ingredients" section of a recipe, the "Reviews" section of a product page.

```html
<main>
  <article>
    <h2>Sourdough Basics</h2>
    <section>
      <h3>What you need</h3>
      <p>...</p>
    </section>
    <section>
      <h3>The process</h3>
      <p>...</p>
    </section>
  </article>
</main>
```

The `<aside>` element holds content related to but separate from the main content: a sidebar, a pull quote, a "related links" box. A screen reader can announce it as complementary, and a user can skip it to get to the main text.

## Why it matters: accessibility and SEO

Semantic elements pay off in two concrete ways.

For accessibility, landmark elements let assistive technology build a map of the page. A screen reader user can jump straight to the `<main>` content, skip past the `<nav>`, or pull up a list of all the regions, none of which is possible with anonymous `<div>` boxes. This is the foundation you'll build on in week six.

For SEO, search engines use the same structure to understand your content. A heading inside an `<article>` inside `<main>` reads as the important content of the page. The same text buried in nested `<div>` elements is just text. Semantic markup is one of the cheapest and most durable ranking signals you can give, and you get it simply by choosing the right element.

## Try it yourself

Rebuild one of your earlier pages using semantic structure. Wrap the top in a `<header>` with a `<nav>`, put the page's unique content in a single `<main>`, and close with a `<footer>`. Inside `<main>`, group your content with at least one `<section>` that has its own heading. Then open developer tools, and in the accessibility or elements panel, look at how the browser now recognizes the landmark regions you created.
