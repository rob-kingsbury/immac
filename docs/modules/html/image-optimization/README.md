---
title: Optimizing Images and Media
prerequisites:
  - html/html-images
---

# Optimizing Images and Media

Images are usually the heaviest thing on a page. A single unoptimized photo can outweigh all your <abbr title="HyperText Markup Language">HTML</abbr> and <abbr title="Cascading Style Sheets">CSS</abbr> combined, and on a phone connection that is the difference between a page that loads instantly and one people give up on.

[HTML Images](/modules/html/html-images/README.md) covered placing images. This chapter is about making them fast, and about the small set of attributes that decide whether a page feels quick or feels broken.

**One tool, for everything below.** [Squoosh](https://squoosh.app/) is free, runs in the browser, and does the whole job on its own: resize to an exact pixel width, set a quality level, convert to WebP or AVIF, and export. If you already work in Photoshop, Affinity, or GIMP, use those instead. If you own no image editor at all, Squoosh is the only one you need for this chapter.

## The problem, in numbers

A photo straight off a phone camera is commonly 4000 pixels wide and 3 to 5 megabytes. Put four of those on a page and you have shipped roughly 16 megabytes.

On a good office connection that page arrives in about a second. On a weak mobile connection it can take the better part of a minute, and the person waiting has no idea whether the page is slow or dead. They leave.

The frustrating part is that almost none of those pixels were needed. If each photo displays in a 600 pixel wide box, you sent nearly seven times the width required, which is close to fifty times the pixel data, for an image that looks identical to the visitor.

Seven steps fix it, and none of them are difficult. This chapter covers the first five; [Responsive Images](/modules/html/responsive-images/README.md) covers the last two.

If you already make these calls professionally, for photography, video, or client design work, Steps 1 to 3 will be familiar ground. Skim them and start reading closely at Step 4, where the markup begins.

## Step 1: Size the image to its job

The most common mistake is serving a huge image scaled down by the browser. A 4000 pixel wide photo displayed in a 400 pixel box still downloads all 4000 pixels. The browser shrinks it on screen, so it looks correct, and the visitor paid the full download cost for pixels they never saw.

Export images close to the size they actually display. Do this before the file reaches your project, in Squoosh or whichever editor you already use. In Squoosh the control is the Resize panel on the right, where you set the width in pixels and it scales the height to match.

There is one wrinkle. Phones and modern laptops pack more physical pixels into the same physical space, which is what "Retina" describes. On a screen with a device pixel ratio of 2, a 400 pixel wide box is painted with 800 physical pixels, and an image exported at exactly 400 looks soft.

The working rule:

```text
Displayed width  400px
Export at        800px   (2x, sharp on high-density screens)
Never export at  4000px  (the original, 25x more data than needed)
```

Doubling for density costs about four times the pixel data of the 1x version, which sounds bad until you compare it against the ten or twenty times you were wasting before. [Responsive Images](/modules/html/responsive-images/README.md) removes even that cost by letting the browser choose.

## Step 2: Pick the format

Format choice does more for file size than any other single decision, because each format is built for a different kind of picture.

| Format | Use it for | Avoid it for |
|---|---|---|
| <abbr title="Scalable Vector Graphics">SVG</abbr> | Logos, icons, diagrams, anything drawn from shapes | Photographs |
| <abbr title="AV1 Image File Format">AVIF</abbr> | Photographs, when you can provide a fallback | Simple flat graphics, where SVG wins |
| WebP | Photographs and transparency, the safe modern default | Line art that SVG could describe |
| <abbr title="Joint Photographic Experts Group">JPG</abbr> | The universal fallback for photographs | Anything needing transparency |
| <abbr title="Portable Network Graphics">PNG</abbr> | Lossless detail or transparency when SVG does not fit | Photographs, where it is far larger than JPG |

Two of those rows carry most of the benefit.

**SVG is not an image file in the usual sense.** It is a set of drawing instructions, so it stays sharp at any size and a logo is often a couple of kilobytes. It scales infinitely because the browser redraws it rather than stretching pixels.

```html
<!-- A logo as SVG. Sharp at any size, tiny, no separate 2x version needed. -->
<img src="/images/logo.svg" alt="Maplebrook Bakery" width="180" height="48">
```

The limit is content. SVG describes shapes, so a photograph converted to SVG becomes thousands of coloured paths and ends up far larger than the JPG you started with. Shapes go in SVG, photographs do not.

**AVIF and WebP both beat JPG** at the same visible quality, often by a wide margin on photographs. As of July 2026, WebP is supported by about 96 percent of browsers in use and AVIF by about 93 percent. Both numbers are high, and neither is 100, which is exactly the situation the `<picture>` element in [Responsive Images](/modules/html/responsive-images/README.md) exists to handle. Offer the modern format first, keep a JPG behind it, and every visitor gets the best file their browser understands.

### Going deeper: why AVIF is not automatically the right answer

*Optional, about 5 minutes.*

AVIF usually compresses smaller than WebP, so the obvious move is to reach for it every time. Two things complicate that.

AVIF encoding is slow. On a large batch of images you will notice, and some export tools still produce weaker AVIF files than their WebP output at similar settings. It is worth comparing the two exports rather than assuming.

AVIF also tends to smooth fine detail at aggressive quality settings in a way that reads as slightly plastic on faces and textures. WebP tends to fail more visibly, with blocky edges. Neither is strictly better, and for a small site the difference in bytes rarely justifies much agonising. Default to WebP, reach for AVIF when a page is image-heavy enough that the saving is real, and compare before committing.

## Step 3: Compress

Compression discards data to shrink the file. For photographs a surprising amount can go before anyone notices, because the eye is far more sensitive to shapes and edges than to exact colour values.

Most export tools give you a quality slider from 0 to 100. For web photographs the useful range is roughly **75 to 85**. Below about 70 you start seeing compression artifacts, the blocky patches and smeared halos that appear around hard edges when too much data has been thrown away. Above about 90 the file grows quickly for a difference nobody can see.

Run one comparison yourself, once, so that you trust the numbers rather than the advice. Take a photograph and export it three times:

```text
original.jpg   quality 100   2,400 KB
photo-85.jpg   quality 85      310 KB    <- top of the useful range
photo-75.jpg   quality 75      210 KB    <- bottom of the useful range
photo-50.jpg   quality 50      120 KB    <- artifacts now visible, do not ship
```

The exact figures depend on the photo. The pattern does not. Dropping from 100 to 85 typically removes most of the file for none of the visible quality, and that is the single largest saving available in this chapter.

Squoosh does this comparison and the export in the same screen. It shows the original and the compressed version side by side with a draggable divider, reports the resulting file size as you move the quality slider, and exports the result. Set the format to WebP on the right, set quality, set the width in the Resize panel, and download. That is the entire workflow for this chapter in one tool.

## Step 4: Reserve the space

This step costs two attributes and fixes a problem you have certainly experienced as a user.

A page loads, you start reading, and the text jumps down the screen as an image finally arrives above it. Sometimes you tap the wrong thing because a button moved. That jump has a name, **<abbr title="Cumulative Layout Shift">CLS</abbr>**, Cumulative Layout Shift, and it is one of the Core Web Vitals that Google measures and reports.

The cause is simple. Until an image downloads, the browser does not know its shape, so it reserves no room. When the image arrives, everything below it moves.

The fix is to state the image's real dimensions in the markup:

```html
<!-- Wrong: no dimensions, so the layout jumps when this arrives -->
<img src="hero.webp" alt="Bakery storefront at sunrise">

<!-- Right: the browser reserves the correct shape before the file arrives -->
<img src="hero.webp" alt="Bakery storefront at sunrise" width="1600" height="900">
```

Those numbers are the image's actual pixel dimensions, not the size you want it displayed at. The browser divides them to get an aspect ratio, reserves a box of the correct shape immediately, and fills it when the file arrives. Nothing moves.

<div class="diagram">
<svg viewBox="0 0 640 250" role="img" aria-label="Two page layouts compared. On the left, without width and height attributes, the browser reserves no space for the image, so when the image finally loads it pushes the paragraph text down the page. On the right, with width and height set, the browser reserves a correctly shaped empty box before the image arrives, and the paragraph text stays exactly where it started.">
  <text x="10" y="18" class="d-lbl">Without width and height</text>
  <rect x="10" y="30" width="290" height="205" rx="8" class="d-surface d-border" stroke-width="1.5"/>
  <line x1="26" y1="52" x2="284" y2="52" class="d-muted-stroke" stroke-width="2" stroke-dasharray="4 3"/>
  <text x="30" y="46" class="d-lbl-muted">text started here</text>
  <rect x="26" y="62" width="258" height="66" rx="4" class="d-accent-soft d-accent-stroke" stroke-width="1.5"/>
  <text x="155" y="100" text-anchor="middle" class="d-lbl-mono">image arrives late</text>
  <line x1="26" y1="150" x2="284" y2="150" class="d-muted-stroke" stroke-width="5"/>
  <line x1="26" y1="168" x2="284" y2="168" class="d-muted-stroke" stroke-width="5"/>
  <line x1="26" y1="186" x2="215" y2="186" class="d-muted-stroke" stroke-width="5"/>
  <line x1="155" y1="56" x2="155" y2="142" class="d-accent-stroke" stroke-width="2"/>
  <path d="M 149 134 L 155 144 L 161 134 Z" class="d-accent"/>
  <text x="155" y="212" text-anchor="middle" class="d-lbl">content jumps down</text>

  <text x="340" y="18" class="d-lbl">With width and height</text>
  <rect x="340" y="30" width="290" height="205" rx="8" class="d-surface d-border" stroke-width="1.5"/>
  <rect x="356" y="62" width="258" height="66" rx="4" fill="none" class="d-muted-stroke" stroke-width="1.5" stroke-dasharray="4 3"/>
  <text x="485" y="100" text-anchor="middle" class="d-lbl-mono">space reserved</text>
  <line x1="356" y1="150" x2="614" y2="150" class="d-muted-stroke" stroke-width="5"/>
  <line x1="356" y1="168" x2="614" y2="168" class="d-muted-stroke" stroke-width="5"/>
  <line x1="356" y1="186" x2="545" y2="186" class="d-muted-stroke" stroke-width="5"/>
  <text x="485" y="212" text-anchor="middle" class="d-lbl">nothing moves</text>
</svg>
<figcaption>Two attributes are the whole difference. The reserved box on the right is the same shape as the image that will fill it.</figcaption>
</div>

For that to work with a responsive layout, your <abbr title="Cascading Style Sheets">CSS</abbr> needs to let the height follow the width:

```css
img {
  max-width: 100%;
  height: auto;
}
```

`height: auto` is the load-bearing part. It tells the browser to keep the ratio from the attributes while the width flexes. Set a fixed `height` in CSS instead and you throw away the ratio and the protection with it.

Put dimensions on every image you write, every time. It is two attributes and it is the cheapest performance win in this course.

## Step 5: Load what matters first

Images far down the page do not need to arrive before the visitor has scrolled anywhere near them. The `loading` attribute defers them:

```html
<!-- Below the fold. Defer it. -->
<img src="gallery-05.webp" alt="Cinnamon buns cooling on a rack"
     loading="lazy" width="800" height="600">
```

This is one attribute with no downside for images below the fold, and it is well supported.

There is one image you must never lazy-load: **the big one at the top**. That image is usually what performance tools report as **<abbr title="Largest Contentful Paint">LCP</abbr>**, Largest Contentful Paint, which measures how long the largest visible thing takes to appear. Lazy-loading it tells the browser to wait before starting the download that the score is measuring, and the page gets measurably slower.

```html
<!-- Wrong: the hero image is the LCP element. Never defer it. -->
<img src="hero.webp" alt="Bakery storefront at sunrise"
     loading="lazy" width="1600" height="900">

<!-- Right: let the hero load immediately -->
<img src="hero.webp" alt="Bakery storefront at sunrise"
     width="1600" height="900">
```

The rule in one line: everything below the fold gets `loading="lazy"`, and the hero never does.

### Going deeper: two newer attributes

*Optional, about 5 minutes.*

Two related attributes exist and are worth recognising when you meet them.

`fetchpriority="high"` on the hero image asks the browser to move it up the download queue ahead of other files. It reached cross-browser support recently, in late 2024, so treat it as a bonus rather than something to rely on.

`decoding="async"` lets the browser decode the image off the main thread. Modern browsers already make good decisions here, and the measurable benefit on a small site is close to nothing. Recognise it, do not bother adding it.

Neither is required for this course's projects. They are here so the attributes are not a mystery when you see them in real code.

Fixed-size, compressed, and loading in the right order. [Responsive Images](/modules/html/responsive-images/README.md) is the next step: offering more than one size and letting the browser pick.

## The checklist

Run this over every image before you move on:

- Exported near its display size, at 2x for density, not straight off the camera
- Format matched to content, SVG for shapes and WebP or AVIF for photographs
- Compressed at roughly 75 to 85 quality, and checked by eye
- `width` and `height` present, matching the file's real dimensions
- `loading="lazy"` on everything below the fold, and never on the hero

## Keep learning

- [MDN: the img element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img). Attribute-level reference.
- [web.dev: Cumulative Layout Shift](https://web.dev/articles/cls) and [Largest Contentful Paint](https://web.dev/articles/lcp). What the two metrics from Steps 4 and 5 measure and how they are scored.
- [Squoosh](https://squoosh.app/). Compare compression settings side by side in the browser, with live file sizes.
