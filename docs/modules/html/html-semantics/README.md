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

### search

`<search>` is newer than the other four, but it already works the same way in every current browser. It wraps a search form and marks that whole region as a search landmark, the same way `<nav>` marks a navigation region, no extra ARIA needed.

```html
<search>
  <form action="/search" method="get">
    <label for="site-search">Search this site</label>
    <input type="search" id="site-search" name="q">
    <button type="submit">Search</button>
  </form>
</search>
```

Not every page needs it. Add `<search>` only when the page genuinely has a search form, the same way you'd only add `<nav>` around an actual navigation menu.

Put together, these four give a page its skeleton:

<CssDemo>

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

</CssDemo>

Visually this is nothing special, a heading, a menu, and a copyright line. That's the point: semantic elements don't change how a page looks on their own. They change what the code *means* to everything other than your eyes, a screen reader, a search engine, the next developer.

<div class="diagram">
<svg viewBox="0 0 640 400" role="img" aria-label="A landmark map of a page. A header spans the top and contains a nav region on its right side. Below it, a main region takes up most of the width on the left, with an aside region beside it on the right holding related content. A footer spans the full width at the bottom. Each of these five regions is a stop a screen reader user can jump straight to, in any order, without reading everything in between.">
  <rect x="10" y="10" width="620" height="380" rx="10" class="d-surface d-border" stroke-width="1.5"/>

  <rect x="26" y="26" width="588" height="66" rx="6" class="d-surface d-border" stroke-width="1.5"/>
  <text x="42" y="50" class="d-lbl">header</text>
  <rect x="420" y="46" width="176" height="30" rx="4" class="d-surface d-border" stroke-width="1.5" stroke-dasharray="4 3"/>
  <text x="508" y="65" text-anchor="middle" class="d-lbl-mono">nav</text>

  <rect x="26" y="106" width="380" height="212" rx="6" class="d-accent-soft d-accent-stroke" stroke-width="1.5"/>
  <text x="42" y="130" class="d-lbl">main</text>
  <text x="216" y="220" text-anchor="middle" class="d-lbl-muted">the one region per page</text>

  <rect x="420" y="106" width="176" height="212" rx="6" class="d-surface d-border" stroke-width="1.5" stroke-dasharray="4 3"/>
  <text x="436" y="130" class="d-lbl">aside</text>

  <rect x="26" y="332" width="588" height="52" rx="6" class="d-surface d-border" stroke-width="1.5"/>
  <text x="42" y="362" class="d-lbl">footer</text>
</svg>
<figcaption>Five landmarks, one page. This is the map a screen reader builds from the elements above: jump straight to <code>main</code>, or move between <code>header</code>, <code>nav</code>, <code>aside</code>, and <code>footer</code> by name, without reading past the boxes in between.</figcaption>
</div>

### Going deeper: the ARIA roles you get for free

Every landmark element you just read about does two things at once. It gives the browser a name for the region, and it exposes a role to assistive technology through the accessibility tree, automatically, with no extra markup.

`<header>` maps to the role `banner`. `<nav>` maps to `navigation`. `<main>` maps to `main`. `<footer>` maps to `contentinfo`. A screen reader asking "what regions does this page have" is really asking for this list of roles, and it gets the answer for free the moment you choose the right element.

This is the mechanical reason "use the semantic element, not a `<div>` plus <abbr title="Accessible Rich Internet Applications">ARIA</abbr>" is the right default, not just a style preference. The two blocks below produce an identical result in the accessibility tree:

```html
<!-- The long way: a div, and the role written by hand -->
<div role="banner">
  <h1>Corner Bakery</h1>
</div>

<!-- The short way: the browser adds the role for you -->
<header>
  <h1>Corner Bakery</h1>
</header>
```

Nobody writes the first version on purpose. It exists here to make the point stick: `<header>` is not a nicer-looking `<div>`, it is a `<div>` plus `role="banner"` plus a promise that you meant it.

There is one condition worth knowing, because the [full worked example](/modules/html/html-semantics/worked-example.md) depends on it. `<header>` and `<footer>` only carry `banner` and `contentinfo` when they describe the whole page, which in practice means sitting directly under `<body>`. Nest either one inside `<article>`, `<aside>`, `<main>`, `<nav>`, or `<section>`, and its role quietly changes to `generic`, the same as a `<div>`, because a page can hold many articles and each one claiming to be the page's banner would be confusing rather than useful. `<nav>` and `<main>` don't have this exception; they keep their role wherever they sit. In the worked example, the outer `<header>` and `<footer>` are the page's banner and contentinfo. The `<header>` and `<footer>` inside the `<article>` are not landmarks at all. Same elements, different meaning, decided entirely by nesting.

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

<CssDemo>

```html
<section>
  <h2>Reviews</h2>
  <article>
    <h3>Best sourdough in town</h3>
    <p>Five stars...</p>
  </article>
</section>
```

</CssDemo>

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

### Going deeper: why headings don't reset inside sections

An early draft of the HTML5 specification proposed something clever: every `<article>`, `<section>`, `<aside>`, and `<nav>` would start its own private heading count. You could write `<h1>` inside every single article on a page, and a browser would work out the *real* level from how deeply that article was nested, the way a word processor renumbers headings when you promote or demote them. This was called the outline algorithm.

No browser ever built it, and no screen reader ever calculated it from one. Authors who wrote nested `<h1>` elements expecting the algorithm to sort it out got a page that, to any real assistive technology, contained six headings that all claimed to be the top of the page. The specification eventually caught up to that reality: nesting multiple `<h1>` elements this way is now non-conforming, not a feature browsers simply haven't finished yet.

The practical result is that the rule from [HTML Headings](/modules/html/html-headings/README.md) still applies, unchanged, no matter how many `<article>` and `<section>` elements a page nests: one `<h1>` per page, and never skip a level. Sectioning content organizes what's on the page. It does not renumber the headings inside it.

```html
<!-- Wrong: written as if nesting resets the count. No browser reads it this way. -->
<article>
  <h1>The Case for a Longer Rise</h1>
  <section>
    <h1>Flavour</h1>
  </section>
</article>

<!-- Right: one h1 for the page, everything after it continues the sequence -->
<main>
  <article>
    <h2>The Case for a Longer Rise</h2>
    <section>
      <h3>Flavour</h3>
    </section>
  </article>
</main>
```

This is exactly what the [full worked example](/modules/html/html-semantics/worked-example.md) does. The page's `<h1>` is the blog's name. The article's title is an `<h2>`. Its subsections are `<h3>`. Wrapping content in `<article>` or `<section>` does not change what number comes next; you still choose it the way you did with headings, by what the outline should say, not by how many sectioning elements it happens to sit inside.

## More elements that carry meaning

Semantics go beyond the big landmarks. Several smaller elements replace generic markup with meaning, and using them is part of writing professional HTML. Pairing an image or code sample with a caption gets its own treatment in [HTML Figure](/modules/html/html-figure/README.md).

`<time>` marks a date or time in a machine-readable way, which search engines and browsers can use:

```html
<p>Class starts <time datetime="2026-03-15T18:00">March 15 at 6 p.m.</time></p>
```

`<address>` marks contact information for the nearest `<article>` or the page as a whole. `<mark>` highlights text for reference, such as a search term found in a result. And `<strong>` marks importance and `<em>` marks emphasis, both of which are semantic even though they're inline.

### Going deeper: hgroup, one element for a heading and its subtitle

Go back to the very first example in this chapter, the `<header>` for Corner Bakery:

```html
<header>
  <h1>Corner Bakery</h1>
  <p>Fresh bread daily since 1998</p>
</header>
```

That tagline paragraph sits next to the heading, but nothing in the markup says the two belong together. A sighted visitor reads them as a pair because of how they're positioned on screen. A screen reader user browsing by heading hears "Corner Bakery" and, separately, may or may not notice the paragraph that follows it.

`<hgroup>` exists for exactly this pairing: a heading plus secondary content such as a subtitle, an alternative title, or a tagline, wrapped as one semantic unit.

```html
<header>
  <hgroup>
    <h1>Corner Bakery</h1>
    <p>Fresh bread daily since 1998</p>
  </hgroup>
</header>
```

`<hgroup>` allows one heading, `<h1>` through `<h6>`, plus any number of `<p>` elements before or after it. Only that one heading counts toward the page's heading outline; the paragraphs inside `<hgroup>` are announced as part of the group, not mistaken for headings of their own or counted as a skipped level.

This is current, standard <abbr title="HyperText Markup Language">HTML</abbr>, not an experimental feature. It has shipped across major browsers since 2015. Reach for it whenever a heading has a subtitle riding along with it: a page title with a tagline, an article title with a byline-style subheading, a product name with its short description. A heading with no companion text does not need it.

## Common mistakes to avoid

A few patterns come up again and again in beginner code. Watching for them will put your markup ahead of most.

- **Div soup.** Wrapping everything in `<div>` elements when semantic ones exist. Before writing a `<div>`, check whether a `<header>`, `<nav>`, `<section>`, `<article>`, `<aside>`, or `<footer>` fits.
- **More than one `<main>`.** There is exactly one main content area per page. Multiple `<main>` elements break the landmark it provides.
- **A `<section>` with no heading.** If a block has no heading and isn't a real part of the outline, it's a `<div>`, not a `<section>`.
- **`<nav>` around every link.** Reserve it for major navigation blocks. A single "read more" link is not navigation.
- **Using headings for size.** Picking `<h3>` because it "looks right" rather than because it's the correct level. Choose the level for the outline; size it with CSS.

## Why it matters: accessibility and <abbr title="Search Engine Optimization">SEO</abbr>

Semantic markup pays off in two concrete, measurable ways, and both come free once you choose the right elements.

For accessibility, landmarks let assistive technology build a map of the page, the same map the diagram earlier in this chapter drew out. A screen reader user can list every landmark and jump straight to the `<main>`, skip the `<nav>`, or move between `<article>` elements, none of which is possible with anonymous `<div>` boxes. This is the single biggest accessibility win available in this course, and you get it just by using semantic HTML instead of `<div>` boxes: one `<main>` per page and a `<nav>` around your menu are, on their own, enough for a screen reader user to move around your site efficiently. Screen readers also let users navigate by heading, so the heading outline you build doubles as a table of contents. Good structure is not an accessibility feature you add later; it is accessibility, built in from the first tag.

For SEO, search engines read the same structure to understand your content. A heading inside an `<article>` inside `<main>` is clearly the important content of the page. The identical text buried in nested `<div>` elements is just text with no signal attached. Semantic HTML is one of the cheapest and most durable ranking signals available, and you earn it simply by using the correct element.

## The checklist

Run this over every page before you move on:

- Reached for a semantic element before falling back to `<div>`
- Exactly one `<header>` describing the whole page, used for introductory content, not just "the top"
- Exactly one `<nav>` for the primary menu, with an `aria-label` if there's more than one on the page
- Exactly one `<main>`, and it is not nested inside `<article>`, `<aside>`, `<header>`, or `<footer>`
- Exactly one `<footer>` describing the whole page, used for closing content
- Any search form wrapped in `<search>`, not just `<form>`
- Every `<section>` has its own heading and is a real, distinct part of the page outline
- Every `<article>` could stand on its own if pulled out and placed somewhere else
- `<aside>` used only for content the main point survives without
- `<time datetime="...">` used for any date or time that should be machine-readable
- Heading levels chosen by outline position, never by size, and never reset just because a heading sits inside an `<article>` or `<section>`

## Keep learning

References to go deeper. The W3Schools pages are quick and example-first, good to keep open as a cheat sheet while you work. The videos cover the same ground if you learn better by watching someone build.

- [W3Schools: HTML Semantic Elements](https://www.w3schools.com/html/html5_semantic_elements.asp). Every semantic tag with a runnable example you can edit in place.
- [W3Schools: HTML Layout Elements and Techniques](https://www.w3schools.com/html/html_layout.asp). How the landmark elements fit together into a full page layout.
- [MDN: ARIA landmark roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles#4._landmark_roles). The full role list behind the Going Deeper section above, including roles for content this chapter doesn't cover.
- [MDN: the hgroup element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/hgroup). Full syntax and content rules.
- [Video: HTML5 Semantics, by Net Ninja](https://www.youtube.com/watch?v=kGW8Al_cga4). A short, beginner-friendly walkthrough of the semantic elements.
- [Video: Semantic HTML Tags, by Dave Gray](https://www.youtube.com/watch?v=kX3TfdUqpuU). A fuller tutorial with live coding.

If you can look at a design and name its regions out loud (that's a `<header>`, that's the `<main>`, those repeating blocks are `<article>` elements), you have the skill this chapter is teaching. The [full worked example](/modules/html/html-semantics/worked-example.md) puts every element above into one realistic page.
