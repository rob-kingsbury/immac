---
title: SEO Basics
prerequisites:
  - html/html-document-structure
---

# <abbr title="Search Engine Optimization">SEO</abbr> Basics

Search engine optimization sounds like marketing, but a large part of it is just well-built <abbr title="HyperText Markup Language">HTML</abbr>. A search engine is a program that reads your markup and tries to work out what your page is about. The clearer your structure, the better it understands, and the better it can match your page to what people search for.

Here's the direct version of why this matters to your career: a client or an employer judges a web developer partly on whether their pages actually get found, not just whether they render correctly. "I built a site" and "I built a site that shows up when someone searches for it" are different claims.

## How a search engine reads a page

Getting a page into search results is three separate stages, and confusing them is the source of most SEO misunderstandings.

**Crawling** is discovery. Search engines run programs called crawlers, or spiders, that fetch pages and follow the links on them to find more pages. A crawler reads the same HTML you write, not the rendered picture a human sees. If no link anywhere points to a page, a crawler may simply never find it.

**Indexing** is storage and understanding. Once a page is fetched, the search engine analyses it, your title, headings, text, links, images, and metadata, and files what it learned in a huge database called the index. A page can be crawled but not indexed, if the engine judges it thin, duplicated, or blocked from indexing.

**Ranking** is the ordering. When somebody types a query, the engine searches its index and sorts the matches. This is the part nobody controls directly. What you control is making the first two stages go smoothly and giving the ranking stage clear, honest signals.

<div class="diagram">
<svg viewBox="0 0 700 210" role="img" aria-label="A three stage pipeline reading crawling, then indexing, then ranking, connected by arrows. The crawling box lists what is controllable at that stage: reachable via links, and not blocked by robots dot txt. The indexing box lists: worth storing, and not thin or duplicated. The ranking box is styled differently from the other two to show it is not directly controllable, and lists: quality of match to the search, and nobody controls this stage directly.">
  <text x="120" y="24" text-anchor="middle" class="d-lbl">1. Crawling</text>
  <rect x="20" y="36" width="200" height="150" rx="8" class="d-accent-soft d-accent-stroke" stroke-width="1.5"/>
  <text x="120" y="64" text-anchor="middle" class="d-lbl-muted">Discovery</text>
  <text x="40" y="96" class="d-lbl-mono">reachable via links</text>
  <text x="40" y="116" class="d-lbl-mono">not blocked by</text>
  <text x="40" y="134" class="d-lbl-mono">robots.txt</text>

  <line x1="226" y1="111" x2="244" y2="111" class="d-accent-stroke" stroke-width="2"/>
  <path d="M 238 105 L 248 111 L 238 117 Z" class="d-accent"/>

  <text x="350" y="24" text-anchor="middle" class="d-lbl">2. Indexing</text>
  <rect x="250" y="36" width="200" height="150" rx="8" class="d-accent-soft d-accent-stroke" stroke-width="1.5"/>
  <text x="350" y="64" text-anchor="middle" class="d-lbl-muted">Storage and understanding</text>
  <text x="270" y="96" class="d-lbl-mono">worth storing</text>
  <text x="270" y="116" class="d-lbl-mono">not thin or</text>
  <text x="270" y="134" class="d-lbl-mono">duplicated</text>

  <line x1="456" y1="111" x2="474" y2="111" class="d-accent-stroke" stroke-width="2"/>
  <path d="M 468 105 L 478 111 L 468 117 Z" class="d-accent"/>

  <text x="580" y="24" text-anchor="middle" class="d-lbl">3. Ranking</text>
  <rect x="480" y="36" width="200" height="150" rx="8" class="d-surface d-border" stroke-width="1.5"/>
  <text x="580" y="64" text-anchor="middle" class="d-lbl-muted">The ordering</text>
  <text x="500" y="96" class="d-lbl-mono">quality of match</text>
  <text x="500" y="116" class="d-lbl-mono">nobody controls</text>
  <text x="500" y="134" class="d-lbl-mono">this stage directly</text>
</svg>
<figcaption>Three stages, three different jobs. Crawling and indexing are things you can influence directly, which is why their boxes are shaded. Ranking is the search engine matching your page against a query, and nothing outside the search engine controls it.</figcaption>
</div>

Two files sit at the edges of this process and are worth knowing by name. A **`robots.txt`** file at the root of a site tells crawlers which paths they should not request. A **sitemap**, usually `sitemap.xml`, lists the <abbr title="Uniform Resource Locator">URL</abbr>s you want discovered, which helps on a large site where linking alone might leave pages buried. Neither is something you need to hand-write for this course's projects, but "the crawler couldn't reach it" is a real cause of a missing page, and these are where that gets diagnosed.

### Going deeper: the robots meta tag

*Optional, about 6 minutes.*

`robots.txt` works at the level of the whole site: it lists paths a crawler shouldn't request at all. Sometimes what you want is finer-grained than that, one specific page kept out of search results while everything else on the site stays open. That's the job of the `robots` meta tag, placed in the `<head>` of the one page it applies to:

```html
<meta name="robots" content="noindex, nofollow">
```

`noindex` tells a search engine not to add this page to its index, so it won't turn up in results even though the page is otherwise perfectly reachable. `nofollow` tells it not to follow the links on this page to discover more pages from it. The two are independent. A page can be `noindex` and still `follow` its links, or the reverse, and you write only the ones you mean.

A real use for this: a thank-you page that only makes sense right after someone submits a form.

```html
<!-- Not something anyone should land on from a search result, but it still
     needs to exist as a real page for the form to redirect to -->
<meta name="robots" content="noindex">
```

It's not content anyone should land on from a search result, but deleting it isn't an option either, since the form depends on it. `noindex` keeps it out of the index without touching whether it works.

One thing trips people up. A crawler has to actually fetch a page to read its `robots` meta tag, because the tag lives inside the page. If you also block that page in `robots.txt`, the crawler never requests it, never sees the `noindex`, and the page can still turn up in results anyway if something else on the web links to it. `robots.txt` and the `robots` meta tag solve different problems, and blocking a page with the first stops the second from ever being read. For a page you want kept fully out of search, use the meta tag, and leave that page out of `robots.txt`.

The encouraging part is that everything you've already learned helps. Semantic elements, a logical heading order, descriptive link text, and real `alt` attributes are all signals a crawler uses. Good HTML is good SEO. The rest is adding a few specific pieces of information the crawler looks for.

## The checklist

Run this over your project before you move on:

- Can explain the difference between crawling, indexing, and ranking, and which of the three you actually control
- If you used a `robots` meta tag anywhere, it says what you meant it to say, and nothing that page needs read is also blocked in `robots.txt`

## Keep learning

- [Google Search Central: SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide). Google's own introduction, and the most authoritative plain-language source on how a search engine sees a page.
- [MDN: The robots meta tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/robots). Full reference for `noindex`, `nofollow`, and the other values it accepts.
- [Video: SEO for Beginners, by Ahrefs](https://www.youtube.com/watch?v=xsVTqzratPs). A clear overview of crawling, indexing, and ranking, useful if the three-stage model above needs another pass.
