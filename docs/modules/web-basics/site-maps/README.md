---
title: Site Maps
prerequisites:
  - web-basics/information-architecture
---

# Site Maps

A site map is usually a tree, with the home page at the top and sections branching below:

```
Home
├── About
├── Menu
│   ├── Food
│   └── Drinks
└── Contact
```

Drawing this first answers questions before they become problems in code. How many pages do you actually need? What belongs in the main navigation, and what's a sub-page reached from somewhere else? Nielsen Norman Group's usability research on site maps found that users complete tasks far more successfully when a site map is simple and shows everything in view at once, rather than scattered across many small pages. The same principle applies to your own planning: a site map you can see in its entirety is one you can actually reason about.

Here's a second example, for a small portfolio site, to show the pattern isn't only for stores or restaurants:

```
Home
├── Projects
│   ├── Project One
│   └── Project Two
├── About
└── Contact
```

## The three-click guideline

A common rule of thumb: no page should be more than two or three clicks from the home page. It's not a hard law, but it's a useful check. If your site map has a page buried four levels deep, that's usually a sign the structure needs a shortcut, a broader top-level category, or a rethink of what's actually important enough to put in the main navigation.

## Content hierarchy

Within a single page, hierarchy is the order of importance of the content. It's the same idea as heading levels, applied to planning rather than markup. What's the one thing this page is about (the `<h1>`)? What are its major parts (the `<h2>` sections)? What's supporting detail underneath?

Deciding hierarchy up front is what lets you drop into semantic HTML cleanly. If you know a page is an article with three sections, you already know it needs one `<main>`, one `<article>`, and three `<section>` elements before you type a single tag. Planning the hierarchy and choosing the semantic elements are really the same decision, made at two different times.

Once you've sketched a page's layout as a [wireframe](/modules/web-basics/wireframes/README.md), [Translating a Plan into Structure](/modules/web-basics/site-maps/translating-to-structure.md) walks through turning that plan into the semantic elements that implement it.

## The checklist

Run this over your plan before you open a code editor:

- Site map drawn, as a tree from the home page down to every planned page
- Every page checked against the three-click guideline
- Page-level content hierarchy decided, what's the `<h1>` and what are the `<h2>` sections, before writing markup

## Keep learning

- [Nielsen Norman Group: Site Map Usability](https://www.nngroup.com/reports/site-map-usability/). The actual research behind the "simple, single-view site map" finding cited above.
- [Video: How to Plan a Website Sitemap, by Brainstorm Force](https://www.youtube.com/watch?v=O3BXKqlfHGs). Covers the same site-mapping process as this chapter, with more worked examples.
