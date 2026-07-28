---
title: Responsive Media Containers
prerequisites:
  - html/html-iframes
---

# Responsive Media Containers

An `<iframe>` has a fixed `width` and `height`, which breaks on small screens: a 560-pixel-wide video overflows a 375-pixel phone. The fix is a container that holds a shape (an aspect ratio) while letting the size flex.

```html
<div class="video-wrapper">
  <iframe src="..." title="..." allowfullscreen></iframe>
</div>
```

The container gets a fixed aspect ratio in <abbr title="Cascading Style Sheets">CSS</abbr> (16 by 9 for most video) and the `<iframe>` is set to fill it completely. The result scales smoothly from desktop to phone without distortion. You'll write the CSS side in your styling course; the HTML pattern is the wrapper element around the embed, and it's worth building the habit of wrapping every embed now, before you have a page full of unwrapped ones to fix later.

The reason this needs a wrapper at all, rather than just resizing the `<iframe>` directly, is that `width` and `height` on an `<iframe>` set its pixel dimensions once, not a ratio it maintains as the page resizes. Shrink the browser window and the frame doesn't shrink with it unless something else is telling it to. The wrapper is what carries the ratio; the `<iframe>` inside it just fills whatever shape the wrapper currently is. The same problem and the same fix apply to any embed with fixed `width` and `height`, not only video: a map, a form builder, a social media post, anything delivered as an `<iframe>` gets the same wrapper treatment.

## The checklist

Run this over your embeds before you move on:

- Each embed sits inside a container ready to hold a fixed aspect ratio in CSS
