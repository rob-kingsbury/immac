---
title: SEO Fundamentals
---

# SEO Fundamentals

Search engine optimization sounds like marketing, but a large part of it is just well-built HTML. A search engine is a program that reads your markup and tries to work out what your page is about. The clearer your structure, the better it understands, and the better it can match your page to what people search for.

This week covers how a search engine actually sees a page, and the metadata in your document head that controls how that page appears in a results list. Next week takes the same page further, into social sharing, structured data, and a hands-on audit.

## How a search engine reads a page

Getting a page into search results is three separate stages, and confusing them is the source of most SEO misunderstandings.

**Crawling** is discovery. Search engines run programs called crawlers, or spiders, that fetch pages and follow the links on them to find more pages. A crawler reads the same HTML you write, not the rendered picture a human sees. If no link anywhere points to a page, a crawler may simply never find it.

**Indexing** is storage and understanding. Once a page is fetched, the search engine analyses it, your title, headings, text, links, images, and metadata, and files what it learned in a huge database called the index. A page can be crawled but not indexed, if the engine judges it thin, duplicated, or blocked from indexing.

**Ranking** is the ordering. When somebody types a query, the engine searches its index and sorts the matches. This is the part nobody controls directly. What you control is making the first two stages go smoothly and giving the ranking stage clear, honest signals.

Two files sit at the edges of this process and are worth knowing by name. A **`robots.txt`** file at the root of a site tells crawlers which paths they should not request. A **sitemap**, usually `sitemap.xml`, lists the URLs you want discovered, which helps on a large site where linking alone might leave pages buried. Neither is something you need to hand-write for this course's projects, but "the crawler couldn't reach it" is a real cause of a missing page, and these are where that gets diagnosed.

The encouraging part is that everything you've already learned helps. Semantic elements, a logical heading order, descriptive link text, and real `alt` attributes are all signals a crawler uses. Good HTML is good SEO. The rest is adding a few specific pieces of information the crawler looks for.

## The title element

The `<title>` in the document head is the single most important SEO element on a page. It's the clickable headline in search results, the label on the browser tab, and the default name when someone bookmarks the page. Search engines weight it heavily.

```html
<head>
  <title>Sourdough Baking Class | Corner Bakery Ottawa</title>
</head>
```

Write a title that describes the specific page, front-loads the important words, and stays under about 60 characters so it doesn't get cut off in results. Every page needs its own unique title. "Home" or "Untitled" tells a searcher and a search engine nothing.

A pattern that works well across a whole site is *specific thing, separator, site name*, as in the example above. It reads naturally, it puts the distinguishing words first where they survive truncation, and it stays consistent from page to page. What to avoid is the reverse, `Corner Bakery Ottawa | Sourdough Baking Class`, where every result in a list starts with the same words and the useful part is what gets cut.

## Meta descriptions

The meta description is a short summary that often appears under the title in search results.

```html
<meta name="description"
      content="Learn sourdough from scratch in a hands-on evening class in downtown Ottawa. Small groups, all ingredients included.">
```

It isn't a direct ranking factor, which surprises people. Its job is different: it's the sales pitch that decides whether someone clicks your result over the one above it. Keep it around 150 to 160 characters, make it specific to the page, and write it for a human rather than a keyword counter.

If you leave it out, the search engine writes its own by pulling a passage from your page, and the result is usually a fragment that starts mid-thought. Writing your own is how you keep control of the first impression.

## What this actually looks like in results

Neither `<title>` nor a meta description renders anywhere on your own page. Their only audience is the search results list and the browser tab. Here's roughly what the two examples above produce:

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<div style="font-family: arial, sans-serif; max-width: 500px;">
  <div style="color: #1a0dab; font-size: 1.15rem; line-height: 1.3;">Sourdough Baking Class | Corner Bakery Ottawa</div>
  <div style="color: #006621; font-size: 0.85rem; margin: 2px 0;">www.cornerbakeryottawa.com › classes › sourdough</div>
  <div style="color: #545454; font-size: 0.9rem; line-height: 1.4;">Learn sourdough from scratch in a hands-on evening class in downtown Ottawa. Small groups, all ingredients included.</div>
</div>
</div>
</details>

This mockup isn't live HTML from your page, it's a rendering of how a search engine typically displays the `<title>` and description you write. Search engines can shorten or rewrite either one if they judge something else serves the searcher better, so treat this as the intended result rather than a guarantee.

## Headings and keyword relevance

Search engines read your heading structure to understand hierarchy and topic, the same outline you build for accessibility. Your `<h1>` should clearly state the page's subject, and your `<h2>` headings should describe its real sections. A crawler builds an outline from those levels exactly the way a screen reader does, which is why the accessibility work you did earlier pays off twice.

Use the words your audience would actually search for, but write for people first. Two failure modes are worth naming. **Keyword stuffing**, repeating a target phrase unnaturally, reads badly to humans and is something search engines specifically penalize rather than reward. And **heading levels chosen for size**, picking `<h4>` because you wanted smaller text, breaks the outline that both the crawler and the screen reader depend on. Headings are structure. Size is CSS.

The goal is a page that genuinely answers a question well. The keywords follow from writing about the real topic.

## Canonical links

Sometimes the same content is reachable at more than one URL. A site might serve the same page with and without a trailing slash, or with tracking parameters appended, or under two different paths. A canonical link tells search engines which URL is the official one, so they don't split ranking signals across duplicates or treat the repetition as a problem.

```html
<link rel="canonical" href="https://example.com/classes/sourdough">
```

For a simple site where each page has one address, this is straightforward: each page's canonical points to itself. That's called a self-referencing canonical, and including it is a cheap habit that prevents a category of problem before it starts. It matters much more on large sites, but knowing the tag exists and what it solves is part of understanding how search engines see your URLs.

## A complete head, so far

Putting this week's pieces together, a well-formed document head looks like this:

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Sourdough Baking Class | Corner Bakery Ottawa</title>
  <meta name="description"
        content="Learn sourdough from scratch in a hands-on evening class in downtown Ottawa. Small groups, all ingredients included.">
  <link rel="canonical" href="https://example.com/classes/sourdough">
  <link rel="stylesheet" href="css/styles.css">
</head>
```

Nothing there renders on the page. Every line of it shapes how the page is understood, displayed in results, or styled.

## Common mistakes to avoid

- **Duplicate or missing `<title>` elements.** Every page needs its own. Copy-pasting one page's `<head>` into another is the most common way this breaks, and it's invisible until you check.
- **Keyword stuffing.** Repeating a target phrase unnaturally in a heading or description is penalized, not rewarded.
- **A description that repeats the title.** It wastes the one piece of copy you fully control in the results list.
- **Skipping heading levels to control size.** It breaks the outline crawlers and screen readers both rely on.
- **A canonical pointing at the wrong URL.** A canonical that points somewhere else tells the search engine to rank that other page instead of yours, which is worse than having no canonical at all.

## Keep learning

- [Google Search Central: SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide). Google's own introduction, and the most authoritative plain-language source on everything in this chapter.
- [Google: Influencing Your Title Links in Search Results](https://developers.google.com/search/docs/appearance/title-link). How titles get chosen and displayed, straight from the source that decides.
- [MDN: The title element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/title) and [the meta element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta). Full references for the two tags this chapter leans on.
- [Video: SEO for Beginners, by Ahrefs](https://www.youtube.com/watch?v=xsVTqzratPs). A clear overview of crawling, indexing, and ranking, useful if the three-stage model above needs another pass.

## Try it yourself

Take one of your project pages and give it a proper document head. Write a unique, specific `<title>` under 60 characters using the *specific thing, separator, site name* pattern. Add a `<meta name="description">` of about 150 characters, written to make a real person want to click rather than to hit a keyword count. Add a self-referencing canonical link.

Then audit your headings. Confirm your `<h1>` states the page topic plainly, that there's exactly one of them, and that your `<h2>` headings describe the actual sections rather than being chosen for how big the text looks. Repeat the whole exercise for a second page, and check the two titles and descriptions are genuinely different from each other.
