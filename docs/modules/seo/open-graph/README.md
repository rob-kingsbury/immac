---
title: Open Graph
prerequisites:
  - html/html-document-structure
  - seo/seo-meta-tags
---

# Open Graph

A rich, correctly-formed preview card when you share your own project link is a concrete thing a hiring manager, or anyone else you send a link to, can look at directly rather than take your word for.

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

## Common mistakes to avoid

- **A missing `og:image`.** A shared link with no preview picture is far less likely to be clicked, even when the title and description are strong.
- **A relative URL in `og:image` or `og:url`.** The platform reading the tag isn't on your server, so a path like `/images/preview.jpg` resolves to nothing. Use the full absolute URL.

## The checklist

Run this over a page before you move on:

- Every `og:` tag present, with an absolute-URL `og:image` around 1200 by 630 pixels

## Keep learning

- [The Open Graph protocol](https://ogp.me/). The full, short specification for the `og:` tags in this module.
- [Video: How to Add Open Graph Meta Tags, by Rank Math SEO](https://www.youtube.com/watch?v=PU2RoBaelDc). A step-by-step walkthrough of the tags covered here.
