---
title: SEO in Practice
---

# SEO in Practice

Last week was how search engines read a page. This week you put it to work: the metadata that controls how your links look when shared, the structured data that can earn richer search results, how internal links tie a site together, and a hands-on audit of a real page.

## Open Graph and social sharing

When someone shares your page on social media or in a chat app, that platform looks for Open Graph tags to build the preview card, the image, title, and description that appear. Without them, you get whatever the platform can scrape, which is often ugly or wrong.

```html
<meta property="og:title" content="Sourdough Baking Class">
<meta property="og:description" content="A hands-on evening class in downtown Ottawa.">
<meta property="og:image" content="https://example.com/images/class-preview.jpg">
<meta property="og:url" content="https://example.com/classes/sourdough">
<meta property="og:type" content="website">
```

These live in the document head alongside your title and description. The `og:image` matters most, since a good preview image is what makes a shared link get noticed. Aim for an image around 1200 by 630 pixels, the size most platforms display well.

## Structured data

Structured data is machine-readable information about your content, written in a standard vocabulary that search engines understand. Add it, and a search engine can show a richer result: star ratings, event dates, recipe cook times, and the like. The current recommended format is JSON-LD, a small block of data in the page head.

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

The vocabulary comes from schema.org, which lists types for events, recipes, products, articles, and much more. You don't memorize it; you look up the type you need. Adding valid structured data is optional, but it's one of the few ways to change how your result actually looks in the search listing.

## Internal linking

Internal links are links between pages of your own site. They do two jobs. They help people move around, and they help search engines discover and understand your pages, since crawlers follow links to find content and use the link text as a clue about the destination.

A few habits make internal linking work. Link related pages to each other rather than leaving them isolated. Use descriptive link text ("see our sourdough class") instead of "click here", because the words in a link tell the search engine what the target page is about. And make sure every page is reachable by following links from the home page, because a page nothing links to is a page crawlers may never find.

## Running an SEO audit

The audit tools you already have will grade a page's SEO. Lighthouse, built into Chrome and Edge developer tools, has an SEO category that checks for a title, a meta description, valid links, crawlable content, and more, then gives a score and a list of what to fix.

Run it on a page, read every item it flags, and treat each as a to-do. The value isn't the score itself, it's the checklist of concrete, fixable issues the tool hands you. Combine it with the schema.org validator to confirm any structured data you added is well formed.

## Try it yourself

Take the page you added a title and description to last week. Add a full set of Open Graph tags, including a preview image. Pick a content type that fits the page (an Event, Product, or Article) and add a JSON-LD structured data block for it, then check it in a structured data validator. Add at least two descriptive internal links to other pages of your site. Finally, run the Lighthouse SEO audit, record your score, fix what it flags, and run it again to confirm the improvement.
