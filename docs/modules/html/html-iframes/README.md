---
title: HTML Iframes
prerequisites:
  - html/media-elements
---

# <abbr title="HyperText Markup Language">HTML</abbr> Iframes

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

A few practices make embeds behave. Always give the `<iframe>` a `title` describing its content, for the same accessibility reason images need `alt`. Add `loading="lazy"` so an embed lower on the page doesn't slow the initial load. And paste embed codes only from services you trust, since an `<iframe>` loads and runs another site's content inside your page, effectively giving that site a window into yours. The `sandbox` attribute below is the other half of that trust question: it lets you take an embed whose content you trust but whose permissions you'd rather limit.

An `<iframe>` with no `sandbox` attribute can, by default, run scripts, submit forms, open popups, and navigate the page it's embedded in, essentially everything the embedded site could do if a visitor opened it directly in its own tab. Most embed code you paste in, a video player, a map, doesn't need all of that.

The `sandbox` attribute turns those permissions off, then lets you switch specific ones back on by name:

```html
<iframe
  src="https://www.youtube.com/embed/VIDEO_ID"
  title="How to shape a sourdough loaf"
  width="560" height="315"
  loading="lazy"
  sandbox="allow-scripts allow-same-origin allow-presentation"
  allowfullscreen></iframe>
```

Written with no value at all, `sandbox` blocks everything and is the strictest setting available. Each `allow-*` token you add back is a permission you've decided that specific embed genuinely needs. `allow-scripts` lets it run JavaScript, which most video and map embeds require just to function. Get the token list wrong and the embed tends to break silently rather than showing an error, so add `sandbox`, reload, and confirm the embed still works before you trust the result.

This is a well-established attribute, not a new one, and it's supported anywhere `<iframe>` itself is. Add it to every third-party embed you paste in, the same habit as `title` and `loading="lazy"` above, since most embed code from a reputable provider works fine under it and it costs you nothing when it does.

One thing an `<iframe>` doesn't hand you is control over what's inside it. Captions on an embedded video, keyboard behaviour inside an embedded map, colour contrast in a booking widget: all of that belongs to the site you embedded, and your page inherits whatever accessibility work that site did or didn't do. Your responsibility stops at the frame boundary, the `title`, and deciding whether the embed belongs on the page at all. That's a real limit, not a loophole, and it's worth knowing where it sits before a client asks why an embedded widget doesn't behave like the rest of the accessible page you built around it.

Wrap every embed in a container ready to hold a fixed aspect ratio, covered next in [Responsive Media Containers](/modules/html/html-iframes/responsive-containers.md), so it scales down cleanly on a phone instead of overflowing the screen.

## The checklist

Run this over your embeds before you move on:

- Every `<iframe>` embed has a `title`, `loading="lazy"`, and a `sandbox` attribute with only the permissions it needs
- Embed code is pasted only from services you trust

## Keep learning

- [MDN: The iframe element, sandbox attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe#sandbox). The complete list of permission tokens.
- [W3Schools: The iframe Tag](https://www.w3schools.com/tags/tag_iframe.asp). Covers `<iframe>` attributes beyond `src` and `title`.
