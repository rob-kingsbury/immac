---
title: Grouping Content
prerequisites:
  - html/html-semantics
---

# Grouping Content

Inside `<main>`, three elements organize your content. This is where beginners hesitate most, so here is a clear rule for each.

## article

An `<article>` is a self-contained piece of content that would still make sense if you pulled it out and placed it somewhere else. A blog post, a news story, a product card, a single user comment, a recipe. The test: could this stand on its own, or be syndicated to another site? If yes, it's an `<article>`.

```html
<article>
  <h2>How to Shape a Boule</h2>
  <p>Shaping builds the tension that gives a loaf its rise...</p>
</article>
```

## section

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

## aside

An `<aside>` holds content related to the main content but not essential to it: a sidebar, a pull quote, a "related articles" box, an author bio next to a post. A screen reader announces it as complementary, and a user can skip it. If removing the content wouldn't hurt the main point, it's a candidate for `<aside>`.

## The decision, in one table

| You have | Use |
|---|---|
| Content that could stand alone or be syndicated | `<article>` |
| A distinct, headed part of the page | `<section>` |
| Related but non-essential content | `<aside>` |
| A box needed only as a CSS styling hook | `<div>` |

When in doubt between `<section>` and `<div>`, ask whether the block has its own heading and belongs in the page outline. Headed and meaningful means `<section>`. A styling wrapper with no heading means `<div>`.

## Going deeper: why headings don't reset inside sections

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

## The checklist

- Every `<section>` has its own heading and is a real, distinct part of the page outline
- Every `<article>` could stand on its own if pulled out and placed somewhere else
- `<aside>` used only for content the main point survives without
- Heading levels chosen by outline position, never reset just because a heading sits inside an `<article>` or `<section>`

## Keep learning

- [W3Schools: HTML Semantic Elements](https://www.w3schools.com/html/html5_semantic_elements.asp). Every semantic tag with a runnable example you can edit in place.
