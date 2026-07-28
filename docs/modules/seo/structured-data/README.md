---
title: Structured Data
prerequisites:
  - html/html-document-structure
  - html/html-navigation
---

# Structured Data

Structured data is machine-readable information about your content, written in a vocabulary search engines already understand. Where your headings and text describe a page in prose, structured data states facts plainly: this is an event, it starts at this time, it's at this address. Supply it and a search engine can build a richer result, showing star ratings, event dates, recipe times, and the like.

The current recommended format is **<abbr title="JSON for Linking Data">JSON-LD</abbr>**, a block of data placed in the page head. It's written in <abbr title="JavaScript Object Notation">JSON</abbr>, so the punctuation is strict.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Sourdough Baking Class",
  "startDate": "2026-03-15T18:00",
  "location": {
    "@type": "Place",
    "name": "Corner Bakery",
    "address": "123 Main St, Ottawa"
  }
}
</script>
```

Read it as a set of labelled facts. `@context` says which vocabulary is in use, always schema.org in practice. `@type` says what kind of thing this is. Everything after that is a property of that type, and properties can nest, as `location` does here by containing a whole `Place`.

The vocabulary comes from [schema.org](https://schema.org/), which defines types for events, recipes, products, articles, organizations, local businesses, and much more. Nobody memorizes it. You look up the type that fits your page and copy the property names it lists.

Two rules keep structured data useful. It must **describe what's actually on the page**, since marking up an event that isn't there is a policy violation, not a clever trick. And it must be **valid JSON**, which is exactly why you should make running every new block through a validator a habit before considering it done, the same instinct as the W3C validator for <abbr title="HyperText Markup Language">HTML</abbr>. That habit matters more here than almost anywhere else in this course: a single missing comma or brace invalidates the entire block, and unlike a browser rendering slightly-wrong HTML, there's no visible sign anything went wrong. The search engine just quietly ignores the whole thing rather than using the part that parsed. Run it through the validator and you catch that in seconds; skip it and you might not find out for weeks that a block did nothing at all.

### Going deeper: a Product example

*Optional, about 6 minutes.*

The Event type above fits a class or a workshop. A different kind of page needs a different type, and for a bakery selling something with a price tag, that type is `Product`.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Classic Sourdough Loaf",
  "image": "https://example.com/images/sourdough-loaf.jpg",
  "description": "A naturally leavened sourdough loaf, baked fresh daily in-house.",
  "offers": {
    "@type": "Offer",
    "price": "8.50",
    "priceCurrency": "CAD"
  }
}
</script>
```

The pattern is the same shape as the Event example, a flat set of properties plus one nested type. `name`, `image`, and `description` describe the item itself. `offers` is where the price lives, and it nests an `Offer`, the same way `location` nested a `Place` above. Inside that nested object, `price` is the number and `priceCurrency` is the three-letter currency code, `CAD` here rather than the `USD` you'll see in most schema.org examples written for a US audience.

This is the same shape you'd reach for if a page calls for `Product` instead of `Event`: swap in the item's real name, a real image path, and its real price, and validate it the same way.

### Going deeper: structured data for your breadcrumb trail

*Optional, about 6 minutes.*

[HTML Navigation](/modules/html/html-navigation/README.md) taught you the visible version of a breadcrumb trail: a `<nav aria-label="Breadcrumb">` holding an `<ol>`, with the current page marked by `aria-current="page"` instead of a link. If you built one, here's what a visitor on the bakery's Drinks page sees:

```html
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/menu/">Menu</a></li>
    <li aria-current="page">Drinks</li>
  </ol>
</nav>
```

That markup is for people and screen readers. It renders on the page and nothing in it talks to a search engine directly. `BreadcrumbList` is the schema.org type that hands the same trail to a search engine, so it can show the path directly in a search result instead of a plain URL:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://cornerbakeryottawa.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Menu",
      "item": "https://cornerbakeryottawa.com/menu/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Drinks"
    }
  ]
}
</script>
```

`itemListElement` is an array, one `ListItem` per step in the trail, in the same order as the visible `<ol>`. Each item names its `position` starting at 1, and `item` is the absolute URL of that step, matching the rule that structured data URLs are never relative. The last item is the one exception: it can leave `item` out entirely, since this script sits on the Drinks page already and there's nothing to link to.

This isn't a replacement for the HTML breadcrumb. It's a second, machine-readable copy of the same information, describing a trail that genuinely exists on the page, which is the same rule that governs every structured data block on this page.

## Common mistakes to avoid

- **Invalid JSON-LD syntax.** One missing comma invalidates the whole block, and search engines ignore all of it silently rather than reporting an error.
- **Structured data describing something not on the page.** It's against every major search engine's guidelines and risks the site's eligibility for rich results entirely.
- **A relative URL in `item` inside a `BreadcrumbList`.** The same absolute-URL rule that applies to `og:image` and `og:url` applies here too.
- **A `BreadcrumbList` that doesn't match the visible breadcrumb.** If the HTML trail says Home / Menu / Drinks and the structured data says something else, you've handed the search engine two conflicting descriptions of the same page.

## The checklist

Run this over a page before you move on:

- Structured data describes only what's actually on the page, nothing invented for the sake of a richer result
- Every JSON-LD block validated in the Schema Markup Validator before you consider it done

## Keep learning

- [Schema.org](https://schema.org/docs/gs.html). The vocabulary itself, with a getting-started guide. Look up the type you need rather than reading it end to end.
- [Schema Markup Validator](https://validator.schema.org/). Paste in a JSON-LD block to check it's valid before publishing.
- [Google Rich Results Test](https://search.google.com/test/rich-results). Checks whether a page's structured data qualifies for an enhanced search result.
- [Google Search Central: Breadcrumb structured data](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb). The source behind this module's `BreadcrumbList` example, with the full list of optional properties.
- [Google Search Central: Product structured data](https://developers.google.com/search/docs/appearance/structured-data/product). The source behind this module's Product example, including the properties that unlock additional rich-result features beyond what this course covers.
