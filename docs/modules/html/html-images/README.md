---
title: HTML Images
prerequisites:
  - html/html-basics
---

# <abbr title="HyperText Markup Language">HTML</abbr> Images

## Images

The image element places a picture on the page. It has no closing tag, and two attributes matter every time:

```html
<img src="images/cookies.jpg" alt="A tray of fresh chocolate chip cookies">
```

`src` is the path to the image file, relative or absolute, exactly like `href`. `alt` is the text alternative. It's read aloud to screen reader users, shown if the image fails to load, and read by search engines. Describe what the image shows and why it's there. If an image is purely decorative, give it an empty `alt=""` so assistive technology skips it rather than announcing a filename.

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<img src="/images/placeholder.svg" alt="A tray of fresh chocolate chip cookies">
</div>
</details>

The image above is a placeholder graphic, since a textbook can't ship every photo a real project would have. In your own project, `src` points to a real image file in your folder, and it displays normally, with the same `alt` behaviour.

Add `width` and `height` attributes to match the image's real dimensions. This lets the browser reserve the right space before the image loads, which stops the page from jumping around as things arrive, a real, measured metric called **Cumulative Layout Shift (CLS)**, one of the Core Web Vitals a tool like Lighthouse will report on your finished project:

```html
<img src="images/cookies.jpg" alt="A tray of fresh chocolate chip cookies"
     width="800" height="600">
```

## Choosing a file format

The format you save an image in affects both quality and load time. The four you'll use:

- **<abbr title="Scalable Vector Graphics">SVG</abbr>** for logos, icons, and anything drawn from shapes. It's vector, so it stays sharp at any size and the file stays tiny.
- **WebP** as the modern default for photographs. It compresses smaller than <abbr title="Joint Photographic Experts Group">JPG</abbr> at the same quality and every current browser supports it.
- **JPG** for photographs where you need the widest possible compatibility.
- **<abbr title="Portable Network Graphics">PNG</abbr>** when you need a lossless image or transparency and can't use SVG.

SVG's limit is content, not quality. It describes a picture as a set of drawing instructions, shapes, lines, fills, so a logo stays sharp at any size and the file stays a couple of kilobytes. A photograph doesn't have clean shapes to describe that way. Converted to SVG, it becomes thousands of tiny coloured paths and ends up far larger than the JPG you started with. Save SVG for what it's actually good at and reach for a photographic format for everything else.

You'll go deeper on optimizing and serving these images, including responsive `srcset` and lazy loading, in [Optimizing Images and Media](/modules/html/image-optimization.md). For now, the rule of thumb is: drawings as SVG, photos as WebP or JPG.

## The checklist

Run this over your page before you move on:

- `alt` text describes the image, or `alt=""` if it's purely decorative
- `width` and `height` are set to the image's real dimensions, so nothing jumps as it loads
- Image format matches the content: SVG for logos and icons, WebP or JPG for photographs

## Keep learning

- [W3Schools: HTML Images](https://www.w3schools.com/html/html_images.asp). A reference page with more worked examples of image attributes.
