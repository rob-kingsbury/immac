---
title: Optimizing Images and Media
---

# Optimizing Images and Media

Images are usually the heaviest thing on a page. A single unoptimized photo can outweigh all your HTML and CSS combined, and on a phone connection that's the difference between a page that loads instantly and one people give up on. The Links, Images, and Media chapter covered placing images. This chapter is about making them fast.

## Size the image to its job

The most common mistake is serving a huge image scaled down in the browser. A 4000-pixel-wide photo displayed in a 400-pixel box still downloads all 4000 pixels. The browser shrinks it visually, but the user paid the full download cost for pixels they never see, often several megabytes for a photo that only ever appears at a fraction of its size.

The fix is boring and effective: export images close to the size they'll actually display. If a photo shows at 800 pixels wide, export it at 800 (or 1600 for sharpness on high-density screens), not 4000. Do this resizing in your image editor before the file ever reaches your project.

## Compression

Compression removes data from an image to shrink the file. For photographs, some loss is invisible to the eye but saves enormous amounts of space. Most export tools let you choose a quality level; for web photos, somewhere around 75 to 85 percent quality is usually the sweet spot where the file gets much smaller and you can't see the difference.

Pair the right format with the right content, the rule from the Links, Images, and Media chapter:

| Format | Best for |
|---|---|
| SVG | Logos, icons, anything drawn from shapes |
| WebP | The modern default for photographs |
| JPG | Photographs, when you need maximum compatibility |
| PNG | Lossless images or transparency, when SVG doesn't fit |

WebP and the newer AVIF format both compress smaller than JPG at the same visible quality, and both are supported across current browsers, so there's rarely a reason to default to JPG anymore unless you have a specific compatibility requirement.

## Responsive images with srcset

A phone and a desktop shouldn't download the same image. The `srcset` attribute lets you offer several sizes and hand the browser the information to choose.

```html
<img
  src="photo-800.jpg"
  srcset="photo-400.jpg 400w,
          photo-800.jpg 800w,
          photo-1600.jpg 1600w"
  sizes="(max-width: 600px) 100vw, 800px"
  alt="A tray of fresh cookies">
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<img src="/images/placeholder.svg" alt="A tray of fresh cookies">
</div>
</details>

The Result box above shows a placeholder image, since a textbook can't ship three real sizes of an actual photo. What matters is the pattern: each entry in `srcset` names a file and its real width (`400w` means 400 pixels wide). The `sizes` attribute tells the browser how wide the image will display at different screen widths. Given both, the browser picks the smallest file that still looks sharp on that device, and the choice happens automatically, with no JavaScript. The plain `src` stays as a fallback for very old browsers.

This is not something you can watch happen in a small demo box. In your own project, open developer tools' Network panel, resize the browser window, and reload. You'll see a different file requested at different widths, exactly the behaviour the "Try it yourself" exercise below asks you to confirm.

## Art direction with the picture element

Sometimes you don't just want a smaller version, you want a *different* crop. A wide banner on desktop might need to become a tight square on a phone so the subject stays visible. The `<picture>` element handles this.

```html
<picture>
  <source media="(max-width: 600px)" srcset="hero-square.jpg">
  <source media="(min-width: 601px)" srcset="hero-wide.jpg">
  <img src="hero-wide.jpg" alt="Bakery storefront at sunrise">
</picture>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<img src="/images/placeholder.svg" alt="Bakery storefront at sunrise">
</div>
</details>

The browser uses the first `<source>` whose `media` condition matches, and falls back to the `<img>` if none do. That inner `<img>` is required. It's what actually renders if nothing else matches, and it's where the `alt` text lives, since `<source>` elements don't carry their own alt text.

`<picture>` also handles format fallback: offer an AVIF or WebP source first, with a JPG `<img>` fallback, and browsers take the best format they support, downloading exactly one file, never both.

## Lazy loading

Images far down a page don't need to load until the user scrolls near them. The `loading="lazy"` attribute tells the browser to defer them, so the top of the page appears faster.

```html
<img src="gallery-05.jpg" alt="..." loading="lazy" width="800" height="600">
```

Use `loading="lazy"` for images below the fold, but not for the main image at the top of the page, which you want loaded immediately, since delaying it would make the page feel slower to arrive, not faster. And keep setting `width` and `height` on every image, lazy-loaded or not: reserving the space stops the layout from jumping as lazy images arrive.

## Keep learning

- [W3Schools: HTML Images](https://www.w3schools.com/html/html_images.asp). A general images reference, including the responsive attributes covered here.
- [W3Schools: srcset Attribute](https://www.w3schools.com/tags/att_source_srcset.asp) and [The picture Tag](https://www.w3schools.com/tags/tag_picture.asp). Attribute-level references for the two techniques in this chapter.
- [Video: HTML Responsive Images, srcset, sizes, and the picture Element, by CodeLucky](https://www.youtube.com/watch?v=96GcXfFp8dc). Walks through both techniques with more worked examples.

## Try it yourself

Take a large photo and export it at three widths (roughly 400, 800, and 1600 pixels), saving each as WebP at about 80 percent quality. Note how much smaller they are than the original. Put them into an `<img>` with a `srcset` and `sizes` attribute, then resize your browser window and watch the Network panel in developer tools show a different file loading at different widths. Add `loading="lazy"` to an image lower on the page and confirm, in the Network panel, that it only loads once you scroll to it.
