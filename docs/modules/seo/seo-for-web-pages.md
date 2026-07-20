---
title: SEO for Web Pages
---

# SEO for Web Pages

Search engine optimization sounds like marketing, but a large part of it is just well-built HTML. A search engine is a program that reads your markup and tries to understand what your page is about. The clearer your structure, the better it understands, and the better it can match your page to what people search for. This chapter covers how a search engine reads a page, the metadata that controls how it appears in results and when shared, and a hands-on audit of a real page.

## How a search engine reads a page

Search engines send out crawlers, programs that fetch pages and follow links to discover more pages. A crawler reads the same HTML you write, not the rendered picture a human sees. It looks at your title, your headings, your text, your links, and your metadata to build an understanding of the page, then stores that in an index it searches when someone types a query.

This is why everything you've learned so far already helps your SEO. Semantic elements, a logical heading order, descriptive link text, and real `alt` attributes are all signals a crawler uses. Good HTML is good SEO. The rest is adding a few specific pieces of information the crawler looks for.

## The title element

The `<title>` in the document head is the single most important SEO element on a page. It's what shows as the clickable headline in search results and in the browser tab, and search engines weight it heavily.

```html
<head>
  <title>Sourdough Baking Class | Corner Bakery Ottawa</title>
</head>
```

Write a title that describes the specific page, front-loads the important words, and stays under about 60 characters so it doesn't get cut off in results. Every page needs its own unique title. "Home" or "Untitled" tells a searcher and a search engine nothing.

## Meta descriptions

The meta description is a short summary that often appears under the title in search results.

```html
<meta name="description"
      content="Learn sourdough from scratch in a hands-on evening class in downtown Ottawa. Small groups, all ingredients included.">
```

It isn't a direct ranking factor, but it's the sales pitch that decides whether someone clicks your result over the one above it. Keep it around 150 to 160 characters, make it specific to the page, and write it for a human, not a keyword counter.

## Headings and keyword relevance

Search engines read your heading structure to understand hierarchy and topic, the same outline you build for accessibility. Your `<h1>` should clearly state the page's subject, and your `<h2>` headings should describe its real sections.

Use the words your audience would actually search for, but write for people first. Stuffing a heading with repeated keywords reads badly to humans and is something search engines specifically penalize. The goal is a page that genuinely answers a question well; the keywords follow naturally from writing about the real topic.

## Canonical links

Sometimes the same content is reachable at more than one URL. A canonical link tells search engines which URL is the "official" one, so they don't split ranking across duplicates or penalize you for repeated content.

```html
<link rel="canonical" href="https://example.com/classes/sourdough">
```

For a simple site where each page has one address, this is straightforward: each page's canonical points to itself. It matters more on larger sites, but knowing the tag exists and what problem it solves is part of understanding how search engines see your URLs.

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

Take one of your project pages and give it a proper document head: a unique, specific `<title>` under 60 characters, a `<meta name="description">` of about 150 characters written to make someone want to click, and a self-referencing canonical link. Check that your `<h1>` states the page topic plainly and your `<h2>` headings describe the actual sections.

Then add a full set of Open Graph tags, including a preview image. Pick a content type that fits the page (an Event, Product, or Article) and add a JSON-LD structured data block for it, then check it in a structured data validator. Add at least two descriptive internal links to other pages of your site. Finally, run the Lighthouse SEO audit, record your score, fix what it flags, and run it again to confirm the improvement.
