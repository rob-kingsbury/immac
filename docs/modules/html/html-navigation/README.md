---
title: HTML Navigation
prerequisites:
  - html/html-anchors
  - html/html-lists
  - web-basics/site-maps
---

# <abbr title="HyperText Markup Language">HTML</abbr> Navigation

The [three-click guideline](/modules/web-basics/site-maps/README.md#the-three-click-guideline) is a planning check: it tells you when a site map is getting too deep. Breadcrumb navigation is the structural pattern that helps once a site actually has some depth to it, showing a visitor the path from the home page down to where they are right now.

For a bakery site's Menu > Drinks page, a breadcrumb reads: Home / Menu / Drinks. It's built from two elements you already know, `<nav>` and `<ol>`, used in a specific, recognized way:

```html
<!-- Wrong: no landmark, nothing marks this as a breadcrumb trail -->
<div class="breadcrumb">
  <a href="/">Home</a> &gt;
  <a href="/menu/">Menu</a> &gt;
  Drinks
</div>
```

A screen reader has no way to announce that as breadcrumb navigation. It's just a div holding some links, indistinguishable from any other paragraph on the page.

```html
<!-- Right: a labelled navigation landmark, ordered because the path is a sequence -->
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/menu/">Menu</a></li>
    <li aria-current="page">Drinks</li>
  </ol>
</nav>
```

Three things are doing real work here. The `<nav>` element marks this as a navigation landmark, the same role it plays in a page header, so a screen reader user can jump straight to it. `aria-label="Breadcrumb"` names that landmark, since a page usually has more than one `<nav>` (the main site navigation is one, this is another), and "Breadcrumb" is the conventional label assistive technology looks for. The list is ordered, `<ol>` rather than `<ul>`, because the sequence is the entire point: Home, then Menu, then Drinks, in that order, unlike a set of navigation links where the order is just a design choice.

The last item is deliberately not a link. You're already on the Drinks page, so linking to it again would go nowhere useful. `aria-current="page"` marks it as the current location instead, the same attribute a main navigation menu uses to mark its active item.

Breadcrumbs earn their place on pages where the three-click guideline is already telling you the site has real depth: a Menu section with Food and Drinks underneath it is exactly that case. A three-page portfolio site with no nesting doesn't need one; there's nowhere for a breadcrumb to lead from. Add one once your site map shows a page that isn't a direct child of Home.

## The checklist

Run this over your breadcrumb before you move on:

- Wrapped in `<nav aria-label="Breadcrumb">` holding an `<ol>`
- The current page is marked with `aria-current="page"`, not linked

## Keep learning

- [MDN: Breadcrumb navigation](https://developer.mozilla.org/en-US/docs/Web/CSS/How_to/Layout_cookbook/Breadcrumb_navigation). The accessible markup pattern above, with styling options.
