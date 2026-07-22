---
title: SEO in Practice
---

# SEO in Practice

Last week covered how a search engine finds and understands a page, and the metadata that controls how it appears in a results list. This week is the applied half: how your page looks when somebody shares it, how to hand a search engine machine-readable facts about your content, how links between your own pages help both readers and crawlers, and how to audit a real page and fix what the tools flag.

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

Three practical notes. The `og:image` matters most, since the picture is what makes a shared link get noticed at all; aim for around 1200 by 630 pixels, the size most platforms display well. The `og:url` should be an **absolute** URL including `https://`, not a relative path, because the platform reading it isn't on your site. And platforms cache these aggressively, so if you fix a bad preview image you'll usually need the platform's own debugging tool to force a refresh rather than just re-sharing the link.

Some platforms also read a parallel set of `twitter:` tags, but most fall back to Open Graph when those are absent, so a solid set of `og:` tags covers the majority of cases.

## Structured data

Structured data is machine-readable information about your content, written in a vocabulary search engines already understand. Where your headings and text describe a page in prose, structured data states facts plainly: this is an event, it starts at this time, it's at this address. Supply it and a search engine can build a richer result, showing star ratings, event dates, recipe times, and the like.

The current recommended format is **JSON-LD**, a block of data placed in the page head. It's written in JSON, so the punctuation is strict.

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

Two rules keep structured data useful. It must **describe what's actually on the page**, since marking up an event that isn't there is a policy violation, not a clever trick. And it must be **valid JSON**, because a single missing comma or brace invalidates the entire block and the search engine ignores all of it rather than using the part that parsed. Always run a new block through a validator before considering it done.

## Internal linking

Internal links are links between pages of your own site, and they do two jobs at once. They help people move around, and they help search engines discover and understand your pages, since crawlers follow links to find content and read the link text as a clue about the destination.

Four habits make internal linking work.

**Use descriptive link text.** "See our sourdough class" tells both a reader and a crawler what's on the other end. "Click here" tells neither, and it's also the single most common accessibility complaint about links, since a screen reader user navigating by link list hears "click here" repeated with no context.

**Make every page reachable from the home page** by following links. A page nothing links to is called an orphan page, and a crawler that can't reach it may never index it no matter how good it is.

**Keep important pages shallow.** If a visitor needs five clicks from the home page to reach something, both people and crawlers treat it as less important. The three-click guideline you met in site architecture applies here too.

**Link related pages to each other,** not just from a navigation bar. Contextual links inside your content carry more meaning than a repeated site-wide menu, because the surrounding words tell the search engine what the target is about.

## Running an SEO audit

The tools you already have will grade a page. **Lighthouse**, built into Chrome and Edge developer tools, has an SEO category that checks for a title, a meta description, valid crawlable links, readable font sizes, and more, then gives a score with a list of what to fix.

Open developer tools, choose the Lighthouse panel, tick the SEO category, and run it against your page. Then work the list.

The score itself is the least useful part of the output. Lighthouse checks what an automated tool can check, so a page can score 100 and still have a title nobody would click. Treat the score as a floor rather than a goal, and treat the itemized list as the actual deliverable: each flagged item is a concrete, fixable problem with a link explaining why it matters.

A full audit pass on a page looks like this:

1. Run Lighthouse and record the SEO score and every flagged item.
2. Check the document head by eye against last week's checklist: unique title, description, canonical, charset, viewport.
3. Paste any JSON-LD into the [Schema Markup Validator](https://validator.schema.org/) and fix what it reports.
4. Check the preview card in a social platform's own sharing debugger.
5. Confirm every page of the site is reachable by following links from the home page.
6. Fix what you found, then run Lighthouse again to confirm the change landed.

That last step matters more than it looks. Re-running is how you learn which changes actually moved the result and which just felt productive.

## Common mistakes to avoid

- **A missing `og:image`.** A shared link with no preview picture is far less likely to be clicked, even when the title and description are strong.
- **A relative URL in `og:image` or `og:url`.** The platform reading the tag isn't on your server, so a path like `/images/preview.jpg` resolves to nothing. Use the full absolute URL.
- **Invalid JSON-LD syntax.** One missing comma invalidates the whole block, and search engines ignore all of it silently rather than reporting an error.
- **Structured data describing something not on the page.** It's against every major search engine's guidelines and risks the site's eligibility for rich results entirely.
- **"Click here" link text.** Bad for search engines, worse for screen reader users, and it costs nothing to fix.
- **Treating the Lighthouse score as the goal.** A perfect score on a page with a useless title is a page nobody clicks.

## Keep learning

- [Schema.org](https://schema.org/docs/gs.html). The vocabulary itself, with a getting-started guide. Look up the type you need rather than reading it end to end.
- [Schema Markup Validator](https://validator.schema.org/). Paste in a JSON-LD block to check it's valid before publishing.
- [Google Rich Results Test](https://search.google.com/test/rich-results). Checks whether a page's structured data qualifies for an enhanced search result.
- [The Open Graph protocol](https://ogp.me/). The full, short specification for the `og:` tags in this chapter.
- [Video: How to Add Open Graph Meta Tags, by Rank Math SEO](https://www.youtube.com/watch?v=PU2RoBaelDc). A step-by-step walkthrough of the tags covered here.

## Try it yourself

Add a full set of Open Graph tags to a project page, including a real preview image at roughly 1200 by 630 pixels, with absolute URLs throughout. Then pick a content type that genuinely fits the page, an Event, Product, or Article, and add a JSON-LD structured data block describing what's actually there. Run it through the Schema Markup Validator until it passes clean.

Add at least two descriptive contextual links from inside your page content to other pages of your site, and confirm every page of the site can be reached by following links from the home page.

Finally, run the Lighthouse SEO audit, record the score and the full list of flagged items, fix them, and run it again. Note which fix moved the number and which didn't, because that difference is the useful lesson.
