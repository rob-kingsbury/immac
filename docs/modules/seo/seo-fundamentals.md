---
title: SEO Fundamentals
---

# SEO Fundamentals

Search engine optimization sounds like marketing, but a large part of it is just well-built HTML. A search engine is a program that reads your markup and tries to understand what your page is about. The clearer your structure, the better it understands, and the better it can match your page to what people search for. This week is the "why and how" of that reading; next week is the hands-on practice.

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

## Try it yourself

Take one of your project pages and give it a proper document head: a unique, specific `<title>` under 60 characters, a `<meta name="description">` of about 150 characters written to make someone want to click, and a self-referencing canonical link. Check that your `<h1>` states the page topic plainly and your `<h2>` headings describe the actual sections. Then search the web for one of your competitors' pages and look at how their title and description appear in the results, and whether they followed the same rules.
