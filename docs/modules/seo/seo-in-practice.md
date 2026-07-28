---
title: SEO in Practice
prerequisites:
  - seo/seo-fundamentals
  - html/site-architecture-planning
---

# <abbr title="Search Engine Optimization">SEO</abbr> in Practice

[SEO Fundamentals](/modules/seo/seo-fundamentals.md) covered how a search engine finds and understands a page, and the metadata that controls how it appears in a results list. This chapter is the applied half: how your page looks when somebody shares it, how to hand a search engine machine-readable facts about your content, how links between your own pages help both readers and crawlers, and how to audit a real page and fix what the tools flag.

This is also the chapter that shows up in a portfolio review. A rich, correctly-formed preview card when you share your own project link, and a clean Lighthouse SEO score you can point to, are both concrete things a hiring manager can look at directly, not just take your word for.

## How to read this chapter

**The core path is everything down to the checklist.** Read it in order and complete the Try it yourself exercise. Budget about 25 minutes to read it, plus the 50 minutes the exercise takes.

Three sections are headed **Going deeper**. They're optional, marked clearly every time, and add roughly 20 minutes total if you read all three: a second structured data example built around a product with a price, marking up the same breadcrumb trail you already know how to build in <abbr title="HyperText Markup Language">HTML</abbr>, and a short look at the `twitter:` tags mentioned in passing below. Skip them if you are short on time. Nothing in the core path or the exercise depends on them.

## Open Graph and social sharing

When someone shares your page on social media or pastes a link into a chat app, that platform doesn't display your `<title>` and meta description. It looks for **Open Graph** tags, a small vocabulary of `<meta>` tags that describe how the page should appear as a preview card. Without them you get whatever the platform can scrape on its own, which is often the wrong image or no image at all.

```html
<meta property="og:title" content="Sourdough Baking Class">
<meta property="og:description" content="A hands-on evening class in downtown Ottawa.">
<meta property="og:image" content="https://example.com/images/class-preview.jpg">
<meta property="og:url" content="https://example.com/classes/sourdough">
<meta property="og:type" content="website">
```

These live in the document head alongside your title and description. Note that Open Graph uses `property` rather than the `name` attribute your meta description uses. That difference trips people up, and a tag with the wrong attribute is simply ignored.

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<div style="border: 1px solid #dadce0; border-radius: 8px; max-width: 400px; overflow: hidden; font-family: arial, sans-serif;">
  <img src="/images/placeholder.svg" alt="" style="width: 100%; display: block;">
  <div style="padding: 0.6rem 0.8rem;">
    <div style="text-transform: uppercase; font-size: 0.75rem; color: #606770;">example.com</div>
    <div style="font-weight: 600; margin-top: 2px;">Sourdough Baking Class</div>
    <div style="color: #606770; font-size: 0.85rem;">A hands-on evening class in downtown Ottawa.</div>
  </div>
</div>
</div>
</details>

This mockup uses a placeholder graphic in place of a real `og:image`, since a textbook can't ship every project's preview photo, but the layout is the shape a social platform builds from your tags.

Three practical notes. The `og:image` matters most, since the picture is what makes a shared link get noticed at all; aim for around 1200 by 630 pixels, the size most platforms display well. The `og:url` should be an **absolute** <abbr title="Uniform Resource Locator">URL</abbr> including `https://`, not a relative path, because the platform reading it isn't on your site. And platforms cache these aggressively, so if you fix a bad preview image you'll usually need the platform's own debugging tool to force a refresh rather than just re-sharing the link.

Some platforms also read a parallel set of `twitter:` tags, but most fall back to Open Graph when those are absent, so a solid set of `og:` tags covers the majority of cases.

### Going deeper: twitter: Card tags

*Optional, about 5 minutes.*

The previous section mentioned that a few platforms read a separate `twitter:` vocabulary instead of falling back to Open Graph. If a link you share there is showing the wrong crop of your image, or you want the card to look right on that one platform without changing your `og:` tags, add the `twitter:` versions alongside them:

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Sourdough Baking Class">
<meta name="twitter:image" content="https://example.com/images/class-preview.jpg">
```

Note the attribute switches back to `name`, not `property`, which is easy to get backwards after just writing four `og:` tags in a row. `twitter:card` sets the layout: `summary_large_image` is the wide format most preview cards use; a plain `summary` shows a small square image instead. `twitter:title` and `twitter:image` work the same way their `og:` equivalents do, including the same rule that `twitter:image` needs an absolute URL.

Keep this brief and add it only when you actually need platform-specific control. For most student projects, a complete set of `og:` tags is the whole job, and this section exists so the tags aren't a mystery if you meet them in someone else's markup.

## Structured data

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

This is the same shape you'd reach for if the exercise below has you pick `Product` instead of `Event`: swap in the item's real name, a real image path, and its real price, and validate it the same way.

### Going deeper: structured data for your breadcrumb trail

*Optional, about 6 minutes.*

Site Architecture and Planning taught you the visible version of a breadcrumb trail: a `<nav aria-label="Breadcrumb">` holding an `<ol>`, with the current page marked by `aria-current="page"` instead of a link. If you built one, here's what a visitor on the bakery's Drinks page sees:

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

`itemListElement` is an array, one `ListItem` per step in the trail, in the same order as the visible `<ol>`. Each item names its `position` starting at 1, and `item` is the absolute URL of that step, matching the rule from earlier in this chapter that structured data URLs are never relative. The last item is the one exception: it can leave `item` out entirely, since this script sits on the Drinks page already and there's nothing to link to.

This isn't a replacement for the HTML breadcrumb. It's a second, machine-readable copy of the same information, describing a trail that genuinely exists on the page, which is the same rule that governs every structured data block in this chapter.

## Internal linking

Internal links are links between pages of your own site, and they do two jobs at once. They help people move around, and they help search engines discover and understand your pages, since crawlers follow links to find content and read the link text as a clue about the destination.

Four habits make internal linking work.

**Use descriptive link text.** "See our sourdough class" tells both a reader and a crawler what's on the other end. "Click here" tells neither, and it's also the single most common accessibility complaint about links, since a screen reader user navigating by link list hears "click here" repeated with no context.

```html
<!-- Weak: the link text says nothing about where it goes -->
<p>Want to learn more about our classes? <a href="/classes/">Click here</a>.</p>

<!-- Strong: the destination is described by the words doing the linking -->
<p>Browse our <a href="/classes/">full class schedule</a> to find a time that works.</p>
```

Read the second version out of context, just the link text on its own with nothing around it. "Full class schedule" still means something. "Click here" doesn't.

**Make every page reachable from the home page** by following links. A page nothing links to is called an orphan page, and a crawler that can't reach it may never index it no matter how good it is.

<div class="diagram">
<svg viewBox="0 0 640 300" role="img" aria-label="A site link graph. Home sits at the top, with arrows pointing down to About, Menu, and Contact. Menu has further arrows pointing down to Food and Drinks. A separate box labelled Spring Promo sits to the side with a dashed border and no arrow pointing into it, labelled as an orphan page with no incoming links.">
  <rect x="260" y="20" width="120" height="44" rx="6" class="d-accent-soft d-accent-stroke" stroke-width="1.5"/>
  <text x="320" y="46" text-anchor="middle" class="d-lbl">Home</text>

  <rect x="40" y="130" width="130" height="44" rx="6" class="d-surface d-border" stroke-width="1.5"/>
  <text x="105" y="156" text-anchor="middle" class="d-lbl">About</text>

  <rect x="255" y="130" width="130" height="44" rx="6" class="d-surface d-border" stroke-width="1.5"/>
  <text x="320" y="156" text-anchor="middle" class="d-lbl">Menu</text>

  <rect x="470" y="130" width="130" height="44" rx="6" class="d-surface d-border" stroke-width="1.5"/>
  <text x="535" y="156" text-anchor="middle" class="d-lbl">Contact</text>

  <rect x="195" y="240" width="110" height="44" rx="6" class="d-surface d-border" stroke-width="1.5"/>
  <text x="250" y="266" text-anchor="middle" class="d-lbl">Food</text>

  <rect x="325" y="240" width="110" height="44" rx="6" class="d-surface d-border" stroke-width="1.5"/>
  <text x="380" y="266" text-anchor="middle" class="d-lbl">Drinks</text>

  <line x1="320" y1="64" x2="105" y2="128" class="d-accent-stroke" stroke-width="2"/>
  <path d="M 99 120 L 105 130 L 111 120 Z" class="d-accent"/>

  <line x1="320" y1="64" x2="320" y2="128" class="d-accent-stroke" stroke-width="2"/>
  <path d="M 314 120 L 320 130 L 326 120 Z" class="d-accent"/>

  <line x1="320" y1="64" x2="535" y2="128" class="d-accent-stroke" stroke-width="2"/>
  <path d="M 529 120 L 535 130 L 541 120 Z" class="d-accent"/>

  <line x1="320" y1="174" x2="250" y2="238" class="d-accent-stroke" stroke-width="2"/>
  <path d="M 244 230 L 250 240 L 256 230 Z" class="d-accent"/>

  <line x1="320" y1="174" x2="380" y2="238" class="d-accent-stroke" stroke-width="2"/>
  <path d="M 374 230 L 380 240 L 386 230 Z" class="d-accent"/>

  <rect x="470" y="240" width="150" height="44" rx="6" class="d-surface d-border" stroke-width="1.5" stroke-dasharray="5 4"/>
  <text x="545" y="266" text-anchor="middle" class="d-lbl">Spring Promo</text>
  <text x="545" y="300" text-anchor="middle" class="d-lbl-muted">no incoming links</text>
</svg>
<figcaption>Every box but one connects back to Home by following arrows. Spring Promo has nothing pointing to it, so a crawler that only discovers pages by following links may never reach it, however good the page itself is.</figcaption>
</div>

**Keep important pages shallow.** If a visitor needs five clicks from the home page to reach something, both people and crawlers treat it as less important. The three-click guideline you met in site architecture applies here too.

**Link related pages to each other,** not just from a navigation bar. Contextual links inside your content carry more meaning than a repeated site-wide menu, because the surrounding words tell the search engine what the target is about.

## Running an SEO audit

The tools you already have will grade a page. **Lighthouse**, built into Chrome and Edge developer tools, has an SEO category that checks for a title, a meta description, valid crawlable links, readable font sizes, and more, then gives a score with a list of what to fix.

Open developer tools, choose the Lighthouse panel, tick the SEO category, and run it against your page. Then work the list.

The score itself is the least useful part of the output. Lighthouse checks what an automated tool can check, so a page can score 100 and still have a title nobody would click. Treat the score as a floor rather than a goal, and treat the itemized list as the actual deliverable: each flagged item is a concrete, fixable problem with a link explaining why it matters.

A full audit pass on a page looks like this:

1. Run Lighthouse and record the SEO score and every flagged item.
2. Check the document head by eye against [SEO Fundamentals](/modules/seo/seo-fundamentals.md)'s checklist: unique title, description, canonical, charset, viewport.
3. Paste any JSON-LD into the [Schema Markup Validator](https://validator.schema.org/) and fix what it reports.
4. Check the preview card in a social platform's own sharing debugger.
5. Confirm every page of the site is reachable by following links from the home page.
6. Fix what you found, then run Lighthouse again to confirm the change landed.

That last step matters more than it looks. Re-running is how you learn which changes actually moved the result and which just felt productive.

## Common mistakes to avoid

- **A missing `og:image`.** A shared link with no preview picture is far less likely to be clicked, even when the title and description are strong.
- **A relative URL in `og:image` or `og:url`.** The platform reading the tag isn't on your server, so a path like `/images/preview.jpg` resolves to nothing. Use the full absolute URL. The same rule applies to `item` inside a `BreadcrumbList`.
- **Invalid JSON-LD syntax.** One missing comma invalidates the whole block, and search engines ignore all of it silently rather than reporting an error.
- **Structured data describing something not on the page.** It's against every major search engine's guidelines and risks the site's eligibility for rich results entirely.
- **A `BreadcrumbList` that doesn't match the visible breadcrumb.** If the HTML trail says Home / Menu / Drinks and the structured data says something else, you've handed the search engine two conflicting descriptions of the same page.
- **"Click here" link text.** Bad for search engines, worse for screen reader users, and it costs nothing to fix.
- **Treating the Lighthouse score as the goal.** A perfect score on a page with a useless title is a page nobody clicks.

## The checklist

Run this over a page before you move on:

- Every `og:` tag present, with an absolute-URL `og:image` around 1200 by 630 pixels
- Structured data describes only what's actually on the page, nothing invented for the sake of a richer result
- Every JSON-LD block validated in the Schema Markup Validator before you consider it done
- Link text is descriptive on its own, never "click here" or "read more"
- No orphan pages, every page reachable by following links from the home page
- Important pages sit within the three-click guideline from Site Architecture and Planning
- Lighthouse SEO audit run, the flagged items fixed, and the audit run a second time to confirm the fix landed

## Keep learning

- [Schema.org](https://schema.org/docs/gs.html). The vocabulary itself, with a getting-started guide. Look up the type you need rather than reading it end to end.
- [Schema Markup Validator](https://validator.schema.org/). Paste in a JSON-LD block to check it's valid before publishing.
- [Google Rich Results Test](https://search.google.com/test/rich-results). Checks whether a page's structured data qualifies for an enhanced search result.
- [Google Search Central: Breadcrumb structured data](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb). The source behind this chapter's `BreadcrumbList` example, with the full list of optional properties.
- [Google Search Central: Product structured data](https://developers.google.com/search/docs/appearance/structured-data/product). The source behind this chapter's Product example, including the properties that unlock additional rich-result features beyond what this course covers.
- [The Open Graph protocol](https://ogp.me/). The full, short specification for the `og:` tags in this chapter.
- [Video: How to Add Open Graph Meta Tags, by Rank Math SEO](https://www.youtube.com/watch?v=PU2RoBaelDc). A step-by-step walkthrough of the tags covered here.

## Try it yourself (about 50 minutes)

Add a full set of Open Graph tags to a project page, including a real preview image at roughly 1200 by 630 pixels, with absolute URLs throughout. Then pick a content type that genuinely fits the page, an Event, Product, or Article, and add a JSON-LD structured data block describing what's actually there. The worked Event and Product examples above are the template either way; look up `Article` on schema.org if that's the one your page needs. Run it through the Schema Markup Validator until it passes clean.

Add at least two descriptive contextual links from inside your page content to other pages of your site, and confirm every page of the site can be reached by following links from the home page.

Finally, run the Lighthouse SEO audit, record the score and the full list of flagged items, fix them, and run it again. Note which fix moved the number and which didn't, because that difference is the useful lesson.
