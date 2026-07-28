---
title: SEO Fundamentals
---

# <abbr title="Search Engine Optimization">SEO</abbr> Fundamentals

Search engine optimization sounds like marketing, but a large part of it is just well-built <abbr title="HyperText Markup Language">HTML</abbr>. A search engine is a program that reads your markup and tries to work out what your page is about. The clearer your structure, the better it understands, and the better it can match your page to what people search for.

This week covers how a search engine actually sees a page, and the metadata in your document head that controls how that page appears in a results list. Next week takes the same page further, into social sharing, structured data, and a hands-on audit.

## How to read this chapter

**The core path is everything down to the checklist.** Read it in order and complete the Try it yourself exercise, and you have what the assignment needs. Budget about 20 minutes to read it, plus the 40 minutes the exercise takes.

Three sections are headed **Going deeper**. They're optional, marked clearly every time, and add roughly 20 minutes total if you read all three: a page-level alternative to `robots.txt`, why a URL is a search signal too, and the real mechanism behind title truncation in search results. Skip them on a busy week. Nothing in the core path or the exercise depends on them.

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

## The title element

The `<title>` in the document head is the single most important SEO element on a page. It's the clickable headline in search results, the label on the browser tab, and the default name when someone bookmarks the page. Search engines weight it heavily.

```html
<head>
  <title>Sourdough Baking Class | Corner Bakery Ottawa</title>
</head>
```

Write a title that describes the specific page, front-loads the important words, and stays under about 60 characters so it doesn't get cut off in results. Every page needs its own unique title. "Home" or "Untitled" tells a searcher and a search engine nothing.

A pattern that works well across a whole site is *specific thing, separator, site name*, as in the example above. It reads naturally, it puts the distinguishing words first where they survive truncation, and it stays consistent from page to page. What to avoid is the reverse, `Corner Bakery Ottawa | Sourdough Baking Class`, where every result in a list starts with the same words and the useful part is what gets cut.

### Going deeper: why titles get cut off where they do

*Optional, about 5 minutes.*

The "under about 60 characters" guidance above is a practical approximation, not the real rule. What a search engine actually does is measure the rendered width of your title in pixels against the width of the results display, which is why two titles with the identical character count can get cut at different points.

Letters aren't the same width. A lowercase `i` or `l` takes up a fraction of the space a capital `W` or `M` does. Compare these two titles, both exactly 52 characters:

```text
Sourdough Baking Class | Corner Bakery Ottawa      (52 characters)
Wildflower Meadow Landscaping | Wm. Marsh & Co.    (52 characters)
```

The first is mostly narrow letters and fits comfortably in the space Google gives it. The second, loaded with wide capitals, can run out of pixel room before it runs out of characters, and it gets truncated with an ellipsis even though the count looks identical on paper.

There's a second reason the 60-character figure is only a guideline. A search engine doesn't always use your `<title>` element at all. It can build a different title from your page's headings, other visible text, or the wording of links pointing to it, when it judges that a better match for what someone searched:

```html
<!-- Your <title> -->
<title>Home</title>

<!-- What might show in results instead, pulled from headings and content -->
Corner Bakery Ottawa | Fresh Bread, Pastries & Sourdough Classes
```

This mostly happens when a title is vague, stuffed with repeated boilerplate, or doesn't reflect what's actually on the page, which is one more reason a specific, honest title serves you better than a clever one.

None of this changes what to do. Writing a specific title, front-loading the important words, and staying roughly in the 60-character range is still correct practice, because it's a close enough approximation for nearly everything you'll build in this course. It's worth knowing the guideline is a proxy for pixel width, not the actual constraint, so a title that gets cut off two characters early on a real results page isn't a bug in your code.

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

Use the words your audience would actually search for, but write for people first. Two failure modes are worth naming. **Keyword stuffing**, repeating a target phrase unnaturally, reads badly to humans and is something search engines specifically penalize rather than reward. And **heading levels chosen for size**, picking `<h4>` because you wanted smaller text, breaks the outline that both the crawler and the screen reader depend on. Headings are structure. Size is <abbr title="Cascading Style Sheets">CSS</abbr>.

The goal is a page that genuinely answers a question well. The keywords follow from writing about the real topic.

## Canonical links

Sometimes the same content is reachable at more than one URL. A site might serve the same page with and without a trailing slash, or with tracking parameters appended, or under two different paths. A canonical link tells search engines which URL is the official one, so they don't split ranking signals across duplicates or treat the repetition as a problem.

```html
<link rel="canonical" href="https://example.com/classes/sourdough">
```

For a simple site where each page has one address, this is straightforward: each page's canonical points to itself. That's called a self-referencing canonical, and including it is a cheap habit that prevents a category of problem before it starts. It matters much more on large sites, but knowing the tag exists and what it solves is part of understanding how search engines see your URLs.

### Going deeper: URL structure as a signal

*Optional, about 6 minutes.*

Back in Links, Images, and Media, file naming came up in the context of relative paths breaking: keep names lowercase and consistent, because most servers treat `About.html` and `about.html` as two different files. That same habit turns out to matter for search too, and Site Architecture and Planning gave you the other half of it, a folder structure that mirrors your site map so a URL like `menu/drinks.html` tells you exactly where the file lives before you open it.

A URL is metadata a searcher sees before they ever click. It shows in the results list under your title, and it shows in the browser's address bar for as long as someone stays on the page.

```text
https://cornerbakeryottawa.com/menu/drinks.html
```

That tells a person, and a search engine, what the page is about before either one reads a word of content. Compare it with:

```text
https://cornerbakeryottawa.com/index.php?page_id=17&cat=3a5f
```

Same hypothetical page, no information in the address at all. Nobody can guess what that page holds, and a search engine has only the words on the page itself to go on, none of the free signal the first version gives away for nothing.

Two conventions make a URL work in your favour, and you've effectively already been following one of them without the SEO framing. Use hyphens to separate words, not underscores:

```text
sourdough-class.html   reads as: sourdough class
sourdough_class.html   reads as: sourdoughclass
```

Search engines read a hyphen as a word break and an underscore as a character that glues two words into one, which is backwards from what you want when the words are the whole point. And keep the whole thing lowercase, for the same case-sensitivity reason the Links, Images, and Media chapter already gave you.

None of this asks you to do extra work. It asks you to keep doing the file naming and folder planning you already learned, and to notice that the same discipline that keeps your own links from breaking is also the discipline that makes a URL a small, free piece of SEO.

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
- **A `noindex` page also blocked in `robots.txt`.** The crawler never gets far enough to read the `noindex`, so blocking a page in `robots.txt` doesn't guarantee it stays out of search results.
- **Underscores or mixed case in a URL.** `Sourdough_Class.html` reads as one glued word to a search engine, and can 404 on a case-sensitive server besides.

## The checklist

Run this over your document head and heading structure before you submit work in this course:

- `<title>` is specific to this page, under roughly 60 characters, and unique across your site
- Meta description is written for a human reader, not a keyword list, and roughly 150 to 160 characters
- A self-referencing canonical link is present
- Heading structure serves both SEO and accessibility: no skipped levels, and no level chosen for its default size
- No keyword stuffing, in a heading, a title, or the description
- If you used a `robots` meta tag anywhere, it says what you meant it to say, and nothing that page needs read is also blocked in `robots.txt`
- If you're thinking about URLs, they're short, descriptive, hyphenated, and lowercase

## Keep learning

- [Google Search Central: SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide). Google's own introduction, and the most authoritative plain-language source on everything in this chapter.
- [Google: Influencing Your Title Links in Search Results](https://developers.google.com/search/docs/appearance/title-link). How titles get chosen and displayed, straight from the source that decides, including the pixel-width detail from this chapter's Going deeper section.
- [Google Search Central: URL structure](https://developers.google.com/search/docs/crawling-indexing/url-structure). The source behind this chapter's hyphens-over-underscores and lowercase guidance.
- [MDN: The robots meta tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/robots). Full reference for `noindex`, `nofollow`, and the other values it accepts.
- [MDN: The title element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/title) and [the meta element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta). Full references for the two tags this chapter leans on.
- [Video: SEO for Beginners, by Ahrefs](https://www.youtube.com/watch?v=xsVTqzratPs). A clear overview of crawling, indexing, and ranking, useful if the three-stage model above needs another pass.

## Try it yourself (about 40 minutes)

Take one of your project pages and give it a proper document head. Write a unique, specific `<title>` under 60 characters using the *specific thing, separator, site name* pattern. Add a `<meta name="description">` of about 150 characters, written to make a real person want to click rather than to hit a keyword count. Add a self-referencing canonical link.

Then audit your headings. Confirm your `<h1>` states the page topic plainly, that there's exactly one of them, and that your `<h2>` headings describe the actual sections rather than being chosen for how big the text looks. Repeat the whole exercise for a second page, and check the two titles and descriptions are genuinely different from each other.
