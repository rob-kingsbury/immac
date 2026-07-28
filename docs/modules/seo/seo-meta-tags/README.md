---
title: SEO Meta Tags
prerequisites:
  - html/html-document-structure
  - seo/seo-basics
---

# <abbr title="Search Engine Optimization">SEO</abbr> Meta Tags

[SEO Basics](/modules/seo/seo-basics/README.md) covered how a search engine finds and understands a page. This module is the practical half of that: the specific tags in your document `<head>` that control how a page appears in a results list.

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

Title, description, and canonical are three pieces of a complete document head. [Document Head Best Practices](/modules/html/html-document-structure/head-best-practices.md) pulls all of it together, alongside `charset`, `viewport`, and a favicon.

## Common mistakes to avoid

- **Duplicate or missing `<title>` elements.** Every page needs its own. Copy-pasting one page's `<head>` into another is the most common way this breaks, and it's invisible until you check.
- **A description that repeats the title.** It wastes the one piece of copy you fully control in the results list.

## The checklist

Run this over your document head before you move on:

- `<title>` is specific to this page, under roughly 60 characters, and unique across your site
- Meta description is written for a human reader, not a keyword list, and roughly 150 to 160 characters

## Keep learning

- [Google: Influencing Your Title Links in Search Results](https://developers.google.com/search/docs/appearance/title-link). How titles get chosen and displayed, straight from the source that decides, including the pixel-width detail from the Going Deeper section above.
- [MDN: The title element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/title) and [the meta element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta). Full references for the two tags this module leans on.
