---
title: Document Head Best Practices
prerequisites:
  - html/html-document-structure
---

# Document Head Best Practices

The `<head>` holds information about the page rather than visible content, and a complete one has become standard. Pulling together the pieces from across the course:

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Specific Page Title | Site Name</title>
  <meta name="description" content="A concise summary of this page.">
  <link rel="canonical" href="https://example.com/this-page">
  <link rel="icon" href="/favicon.ico">
  <link rel="stylesheet" href="css/styles.css">
</head>
```

Two of these are easy to forget and important. The `charset` declaration ensures characters and symbols display correctly, and without it, special characters can render as garbled text. The `viewport` meta tag is what makes a page respond properly to mobile screens rather than rendering a shrunken desktop layout that a phone user has to pinch and zoom to read. Both belong in the head of every page you build, no exceptions.

The other two are easy to get backwards. `canonical` tells a search engine which <abbr title="Uniform Resource Locator">URL</abbr> is the "real" one when the same content is reachable at more than one address, your GitHub Pages project URL and a custom domain, for instance. Point it at whichever address you want indexed and shared. `description` is the summary a search result shows under your title, not a place for keywords, and you'll put real work into writing a good one in [SEO Meta Tags](/modules/seo/seo-meta-tags/README.md). Neither attribute changes how the page looks or behaves for a visitor; both change how the page is found and understood by something reading the markup rather than rendering it, which is the whole reason the `<head>` exists as a section separate from the visible page.

## The checklist

Run this over your page before you move on:

- The document `<head>` has `charset`, `viewport`, `title`, `description`, `canonical`, favicon, and stylesheet

## Keep learning

- [MDN: The head element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/head). Reference for every document head piece above.
