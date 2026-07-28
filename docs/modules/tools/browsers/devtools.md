---
title: Developer Tools for Debugging
prerequisites:
  - html/html-basics
---

# Developer Tools for Debugging

Your browser's developer tools are where you diagnose problems in a live page. Right-click any element and choose Inspect to open them. The panels you'll use most:

The **Elements** (or Inspector) panel shows the live HTML tree. You can expand and collapse elements to check your nesting, hover over one to highlight it on the page, and confirm the structure that's actually rendering matches what you intended. It's the fastest way to find a misplaced closing tag or an element that ended up in the wrong parent.

The **Console** panel reports errors, such as an image that failed to load or a broken link path. When something on a page isn't behaving, the console is the first place to look for a message explaining why.

A console error usually names the file and line it came from, which is where to start reading, not the sentence describing the error:

```text
GET https://example.com/images/hero.jpg 404 (Not Found)
    at index.html:14
```

Read that from the right: line 14 of `index.html` requested `images/hero.jpg`, and the server answered `404`, meaning it looked and found nothing at that path. The fix is almost always one of two things: the file isn't actually named or located where the markup says it is, or the path in the markup has a typo. Open the Elements panel, find the `<img>` on line 14, and compare its `src` attribute against the actual file in your project folder.

## The checklist

Run this over your page before you move on:

- Comfortable finding your way around the Elements and Console panels
