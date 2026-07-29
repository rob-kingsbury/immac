---
title: Document Landmarks
prerequisites:
  - html/html-semantics
---

# Document Landmarks

Five elements describe the major regions of nearly every page. Assistive technology calls these landmarks, and they are the backbone of an accessible page. Get these right and a screen reader user can move around your site efficiently, whatever else the markup does.

## header

`<header>` holds introductory content: a site logo, the page title, the primary navigation. A page usually has one main `<header>` at the top, but the element can also introduce a `<section>` or `<article>`, so more than one is allowed.

```html
<header>
  <h1>Corner Bakery</h1>
  <p>Fresh bread daily since 1998</p>
</header>
```

## nav

`<nav>` wraps a block of navigation links. Use it for the primary menus, a table of contents, or breadcrumb trails, not for every group of links on the page. A footer with three links doesn't need a `<nav>`; the main site menu does. If a page has more than one `<nav>`, give each an `aria-label` so they can be told apart:

```html
<nav aria-label="Main">...</nav>
<nav aria-label="Footer">...</nav>
```

## main

`<main>` holds the content unique to this page, the reason the page exists. Everything that repeats across pages (the header, the nav, the footer) stays outside it. There must be exactly one `<main>` per page, and it should not be nested inside `<article>`, `<aside>`, `<header>`, or `<footer>`. This single element is what lets a screen reader user jump straight to the content and skip the repeated furniture.

## footer

`<footer>` holds closing content for the page or a section: copyright, contact details, secondary links, related information. Like `<header>`, it can belong to the page as a whole or to an individual `<article>` or `<section>`.

```html
<footer>
  <p>&copy; 2026 Corner Bakery</p>
  <address>123 Main St, Ottawa, ON</address>
</footer>
```

## search

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

## The skeleton they build

Put together, the landmarks give a page its shape:

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

The `<aside>` in that diagram is covered in [Grouping Content](/modules/html/html-semantics/grouping-content.md), alongside `<section>` and `<article>`.

## Going deeper: the ARIA roles you get for free

Every landmark element above does two things at once. It gives the browser a name for the region, and it exposes a role to assistive technology through the accessibility tree, automatically, with no extra markup.

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

## The checklist

- Exactly one `<header>` describing the whole page, used for introductory content, not just "the top"
- Exactly one `<nav>` for the primary menu, with an `aria-label` if there's more than one on the page
- Exactly one `<main>`, and it is not nested inside `<article>`, `<aside>`, `<header>`, or `<footer>`
- Exactly one `<footer>` describing the whole page, used for closing content
- Any search form wrapped in `<search>`, not just `<form>`

## Keep learning

- [MDN: ARIA landmark roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles#4._landmark_roles). The full role list behind the Going Deeper section above, including roles for content this page doesn't cover.
- [W3Schools: HTML Layout Elements and Techniques](https://www.w3schools.com/html/html_layout.asp). How the landmark elements fit together into a full page layout.
