---
title: Semantic HTML
---

# Semantic HTML

You could build almost any page using nothing but `<div>` elements. It would look identical to a well-built page, and it would be far worse: harder to maintain, weaker in search results, and close to unusable for anyone relying on a screen reader. Semantic HTML is the alternative. It means choosing elements that describe what a piece of content *is*, not just that it exists. This chapter covers every semantic element you'll use regularly, how to decide between the tricky ones, and why the choice matters.

## Structure versus presentation

HTML's job is structure and meaning. CSS's job is appearance. Semantic HTML is what keeps those two jobs separate, and that separation is the single most important idea in this course.

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

## The document landmarks

Four elements describe the major regions of nearly every page. Assistive technology calls these landmarks, and they are the backbone of an accessible page.

### header

`<header>` holds introductory content: a site logo, the page title, the primary navigation. A page usually has one main `<header>` at the top, but the element can also introduce a `<section>` or `<article>`, so more than one is allowed.

```html
<header>
  <h1>Corner Bakery</h1>
  <p>Fresh bread daily since 1998</p>
</header>
```

### nav

`<nav>` wraps a block of navigation links. Use it for the primary menus, a table of contents, or breadcrumb trails, not for every group of links on the page. A footer with three links doesn't need a `<nav>`; the main site menu does. If a page has more than one `<nav>`, give each an `aria-label` so they can be told apart:

```html
<nav aria-label="Main">...</nav>
<nav aria-label="Footer">...</nav>
```

### main

`<main>` holds the content unique to this page, the reason the page exists. Everything that repeats across pages (the header, the nav, the footer) stays outside it. There must be exactly one `<main>` per page, and it should not be nested inside `<article>`, `<aside>`, `<header>`, or `<footer>`. This single element is what lets a screen reader user jump straight to the content and skip the repeated furniture.

### footer

`<footer>` holds closing content for the page or a section: copyright, contact details, secondary links, related information. Like `<header>`, it can belong to the page as a whole or to an individual `<article>` or `<section>`.

```html
<footer>
  <p>&copy; 2026 Corner Bakery</p>
  <address>123 Main St, Ottawa, ON</address>
</footer>
```

Put together, these four give a page its skeleton:

```html
<body>
  <header>
    <h1>Corner Bakery</h1>
    <nav aria-label="Main">
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="menu.html">Menu</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <!-- the unique content of this page -->
  </main>

  <footer>
    <p>&copy; 2026 Corner Bakery</p>
  </footer>
</body>
```

## Grouping content: section, article, and aside

Inside `<main>`, three elements organize your content. This is where beginners hesitate most, so here is a clear rule for each.

### article

An `<article>` is a self-contained piece of content that would still make sense if you pulled it out and placed it somewhere else. A blog post, a news story, a product card, a single user comment, a recipe. The test: could this stand on its own, or be syndicated to another site? If yes, it's an `<article>`.

```html
<article>
  <h2>How to Shape a Boule</h2>
  <p>Shaping builds the tension that gives a loaf its rise...</p>
</article>
```

### section

A `<section>` is a thematic grouping of related content, almost always with its own heading. The "Ingredients" part of a recipe, the "Reviews" part of a product page, the "Our Team" part of an about page. A `<section>` is not just any box; if the content isn't a distinct, headed part of the page, it probably wants a `<div>` instead.

```html
<section>
  <h2>Reviews</h2>
  <article>
    <h3>Best sourdough in town</h3>
    <p>Five stars...</p>
  </article>
</section>
```

Notice that sections and articles nest naturally. A "Reviews" `<section>` can contain many review `<article>` elements, and an `<article>` can contain its own `<section>` elements. Choose based on meaning, not nesting depth.

### aside

An `<aside>` holds content related to the main content but not essential to it: a sidebar, a pull quote, a "related articles" box, an author bio next to a post. A screen reader announces it as complementary, and a user can skip it. If removing the content wouldn't hurt the main point, it's a candidate for `<aside>`.

### The decision, in one table

| You have | Use |
|---|---|
| Content that could stand alone or be syndicated | `<article>` |
| A distinct, headed part of the page | `<section>` |
| Related but non-essential content | `<aside>` |
| A box needed only as a CSS styling hook | `<div>` |

When in doubt between `<section>` and `<div>`, ask whether the block has its own heading and belongs in the page outline. Headed and meaningful means `<section>`. A styling wrapper with no heading means `<div>`.

## More elements that carry meaning

Semantics go beyond the big landmarks. Several smaller elements replace generic markup with meaning, and using them is part of writing professional HTML.

`<figure>` and `<figcaption>` pair an image, diagram, or code sample with a caption, tying the two together as a single unit:

```html
<figure>
  <img src="crumb.jpg" alt="Cross-section of a sourdough loaf showing an open crumb">
  <figcaption>An open crumb is the sign of a well-proofed dough.</figcaption>
</figure>
```

`<time>` marks a date or time in a machine-readable way, which search engines and browsers can use:

```html
<p>Class starts <time datetime="2026-03-15T18:00">March 15 at 6 p.m.</time></p>
```

`<address>` marks contact information for the nearest `<article>` or the page as a whole. `<mark>` highlights text for reference, such as a search term found in a result. And from earlier chapters, `<strong>` marks importance and `<em>` marks emphasis, both of which are semantic even though they're inline.

## Common mistakes to avoid

A few patterns come up again and again in beginner code. Watching for them will put your markup ahead of most.

- **Div soup.** Wrapping everything in `<div>` elements when semantic ones exist. Before writing a `<div>`, check whether a `<header>`, `<nav>`, `<section>`, `<article>`, `<aside>`, or `<footer>` fits.
- **More than one `<main>`.** There is exactly one main content area per page. Multiple `<main>` elements break the landmark it provides.
- **A `<section>` with no heading.** If a block has no heading and isn't a real part of the outline, it's a `<div>`, not a `<section>`.
- **`<nav>` around every link.** Reserve it for major navigation blocks. A single "read more" link is not navigation.
- **Using headings for size.** Picking `<h3>` because it "looks right" rather than because it's the correct level. Choose the level for the outline; size it with CSS.

## Why it matters: accessibility and SEO

Semantic markup pays off in two concrete, measurable ways, and both come free once you choose the right elements.

For accessibility, landmarks let assistive technology build a map of the page. A screen reader user can list every landmark and jump straight to the `<main>`, skip the `<nav>`, or move between `<article>` elements, none of which is possible with anonymous `<div>` boxes. Screen readers also let users navigate by heading, so the heading outline you build doubles as a table of contents. Good structure is not an accessibility feature you add later; it is accessibility, built in from the first tag.

For SEO, search engines read the same structure to understand your content. A heading inside an `<article>` inside `<main>` is clearly the important content of the page. The identical text buried in nested `<div>` elements is just text with no signal attached. Semantic HTML is one of the cheapest and most durable ranking signals available, and you earn it simply by using the correct element.

## How this connects to your styling course

Clean semantic structure is also what makes a page pleasant to style in MTM1544. Well-named landmarks and a logical outline give CSS clear, meaningful targets to work with. A tangle of unnamed `<div>` elements is painful to style and easy to break. The structural quality you build here directly determines how smoothly the styling goes, which is why HTML is taught first each week and CSS second.

## A full worked example

Here is a realistic article page marked up entirely with semantic elements. Read it as a model for the structure your own pages should follow.

```html
<body>
  <header>
    <h1>Corner Bakery Blog</h1>
    <nav aria-label="Main">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/blog/">Blog</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <article>
      <header>
        <h2>The Case for a Longer Rise</h2>
        <p>Posted <time datetime="2026-02-10">February 10, 2026</time></p>
      </header>

      <section>
        <h3>Flavour</h3>
        <p>A slow fermentation develops...</p>
      </section>

      <section>
        <h3>Texture</h3>
        <figure>
          <img src="crumb.jpg" alt="Open crumb of a slowly fermented loaf">
          <figcaption>Twenty-four hours of cold proofing.</figcaption>
        </figure>
      </section>

      <footer>
        <address>Written by the Corner Bakery team</address>
      </footer>
    </article>

    <aside>
      <h2>Related posts</h2>
      <ul>
        <li><a href="#">Choosing a starter</a></li>
      </ul>
    </aside>
  </main>

  <footer>
    <p>&copy; 2026 Corner Bakery</p>
  </footer>
</body>
```

Notice that the `<article>` has its own `<header>` and `<footer>`, separate from the page's. That is legal and correct: those elements describe the nearest section they belong to, whether that's the whole page or a single article.

## Try it yourself

Work through these in order. They're practice, not graded work.

1. Take a page you built in an earlier chapter and rebuild its skeleton with `<header>`, `<nav>`, one `<main>`, and `<footer>`.
2. Inside `<main>`, add at least one `<section>` with its own heading, and one `<article>` that could stand on its own.
3. Add a `<figure>` with a `<figcaption>` for one image, and mark one date with `<time>`.
4. Add an `<aside>` with related links, and confirm the page still makes sense if you imagine removing it.
5. Open developer tools, and in the Elements or Accessibility panel, look at how the browser now recognizes the landmark regions you created. Compare that to the same page built only with `<div>` elements.

If you can look at a design and name its regions out loud (that's a `<header>`, that's the `<main>`, those repeating blocks are `<article>` elements), you have the skill this chapter is teaching.
