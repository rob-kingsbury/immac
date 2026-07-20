---
title: Advanced HTML Patterns
---

# Advanced HTML Patterns

By now you can build a complete, valid, accessible page. This week rounds out your HTML with the patterns that come up on real sites: embedding content from other services safely, keeping that content responsive, polishing the document head, and a look at where HTML is heading so your knowledge doesn't go stale.

## Embedding third-party content

Most sites include things they didn't build: a YouTube video, a Google Map, a booking widget. These come as embed codes, usually an `<iframe>`, that you paste into your markup.

```html
<iframe
  src="https://www.youtube.com/embed/VIDEO_ID"
  title="How to shape a sourdough loaf"
  width="560" height="315"
  loading="lazy"
  allowfullscreen></iframe>
```

A few practices make embeds behave. Always give the `<iframe>` a `title` describing its content, for the same accessibility reason images need `alt`. Add `loading="lazy"` so an embed lower on the page doesn't slow the initial load. And paste embed codes only from services you trust, since an `<iframe>` loads and runs another site's content inside your page.

## Responsive media containers

An `<iframe>` has a fixed `width` and `height`, which breaks on small screens: a 560-pixel-wide video overflows a 375-pixel phone. The fix is a container that holds a shape (an aspect ratio) while letting the size flex.

```html
<div class="video-wrapper">
  <iframe src="..." title="..." allowfullscreen></iframe>
</div>
```

The container gets a fixed aspect ratio in CSS (16 by 9 for most video) and the `<iframe>` is set to fill it completely. The result scales smoothly from desktop to phone without distortion. You'll write the CSS side in your styling course; the HTML pattern is the wrapper element around the embed, and it's worth building the habit of wrapping every embed now.

## Document head best practices

The `<head>` holds information about the page rather than visible content, and a complete one has become standard. Pulling together the pieces from across the course:

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Specific Page Title | Site Name</title>
  <meta name="description" content="A concise summary of this page.">
  <link rel="canonical" href="https://example.com/this-page">
  <link rel="icon" href="/favicon.ico">
  <link rel="stylesheet" href="css/styles.css">
</head>
```

Two of these are easy to forget and important. The `charset` declaration ensures characters and symbols display correctly, and the `viewport` meta tag is what makes a page respond properly to mobile screens rather than rendering a shrunken desktop layout. Both belong in the head of every page you build.

## Where HTML is going

HTML is a living standard, meaning it's updated continuously rather than in big numbered versions. Newer elements keep arriving that handle, natively, things that used to require scripting. Two worth knowing:

The `<dialog>` element provides a real, accessible modal dialog box, with built-in focus handling and a backdrop, replacing the old pattern of faking one with `<div>` elements. The `<details>` and `<summary>` elements create an expand-and-collapse disclosure widget (an FAQ answer that opens on click, say) with no scripting at all:

```html
<details>
  <summary>What should I bring to the class?</summary>
  <p>Just yourself. All ingredients and equipment are provided.</p>
</details>
```

The takeaway isn't to memorize every new element. It's the habit: before reaching for a complicated custom solution, check whether HTML has since grown a native element for it. The platform keeps absorbing common patterns, and native is almost always more accessible and more reliable than a hand-built version. A reference like MDN Web Docs is where you check what's current.

## Try it yourself

Embed a video or map on one of your pages using an `<iframe>` with a `title` and `loading="lazy"`, wrapped in a container element ready for a responsive aspect ratio. Audit the `<head>` of your pages against the checklist above and add anything missing, especially the `charset` and `viewport` tags. Then build an FAQ section using `<details>` and `<summary>`, and note that it opens and closes with no scripting at all.
