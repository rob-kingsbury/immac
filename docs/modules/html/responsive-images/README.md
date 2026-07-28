---
title: Responsive Images
prerequisites:
  - html/image-optimization
---

# Responsive Images

*This module is a partial deposit: it covers choosing between image sizes and formats with `srcset` and `<picture>`. A later pass adds responsive images in the context of media queries and layout breakpoints.*

[Image Optimization](/modules/html/image-optimization/README.md) Steps 1 to 5 assume one file. A phone and a desktop should not download the same one.

## Step 6: Offer several sizes with srcset

The `srcset` attribute lets you offer several sizes and give the browser the information to choose between them:

```html
<img
  src="photo-800.webp"
  srcset="photo-400.webp   400w,
          photo-800.webp   800w,
          photo-1600.webp 1600w"
  sizes="(max-width: 600px) 100vw, 800px"
  alt="A tray of fresh cookies"
  width="1600" height="1200"
  loading="lazy">
```

Read it in two halves.

**`srcset` describes the files you have.** Each entry is a filename and that file's real width. `400w` means "this file is 400 pixels wide". It is a fact about the file, not a request or a condition.

**`sizes` describes your layout.** It tells the browser how wide the image will be on screen, before any of your CSS has loaded. Read the example above as: on viewports up to 600 pixels the image fills the full viewport width, otherwise it displays at 800 pixels.

Given both, the browser picks the smallest file that will still look sharp on that device, accounting for screen density. No JavaScript is involved. The plain `src` remains as a fallback for anything that does not understand `srcset`.

The pairing matters. `srcset` alone cannot help, because knowing you have a 400 and a 1600 says nothing about which one this layout needs.

### Why sizes is not optional

Leave `sizes` out and the browser assumes the image fills the entire viewport width. For a thumbnail in a narrow column that is badly wrong, and the browser downloads a much larger file than the layout needs, undoing the work.

```html
<!-- Wrong: no sizes, so the browser assumes full viewport width
     and downloads the 1600 file for a 300px thumbnail -->
<img src="thumb-300.webp"
     srcset="thumb-300.webp 300w, thumb-600.webp 600w, thumb-1200.webp 1200w"
     alt="Sourdough loaf" width="1200" height="900">

<!-- Right: sizes tells the truth about the layout -->
<img src="thumb-300.webp"
     srcset="thumb-300.webp 300w, thumb-600.webp 600w, thumb-1200.webp 1200w"
     sizes="300px"
     alt="Sourdough loaf" width="1200" height="900">
```

When an image is always the same size on screen, `sizes` can be a single value with no condition attached, as in the corrected version above.

### The simpler case: fixed-size images

For an image that never changes size, such as a logo or an avatar, there is a shorter form. Instead of describing widths, describe densities:

```html
<!-- A 48px avatar, with a sharper file for high-density screens -->
<img src="avatar-48.webp"
     srcset="avatar-48.webp 1x, avatar-96.webp 2x"
     alt="Priya Raghunathan" width="48" height="48">
```

`1x` and `2x` are density descriptors. Because the display size never varies, no `sizes` attribute is needed. Use this form for fixed-size images and the `w` form for anything that flexes with the layout.

### Going deeper: how the browser actually chooses

*Optional, about 5 minutes.*

The selection is more involved than "pick the matching width", and knowing the details explains behaviour that otherwise looks like a bug.

The browser resolves your `sizes` value against the current viewport to get a layout width in CSS pixels. It multiplies that by the device pixel ratio to get the number of physical pixels it actually needs. Then it walks the `srcset` list and takes the smallest file at or above that number.

So a 400 CSS pixel slot on a 2x phone needs 800 physical pixels, and the browser selects the 800 file, not the 400. This is why testing on a high-density screen appears to ignore your smallest file. It is working correctly.

Two behaviours regularly surprise people:

**The browser may pick a larger file than it needs.** If a bigger version is already sitting in the cache, using it costs nothing and looks better, so most browsers do. Your Network panel then shows a "wrong" choice that is actually the right one.

**The choice is made early, before your stylesheet is parsed.** The browser starts fetching images as soon as it sees them, which is why `sizes` has to state the layout width in the markup rather than the browser reading it from your CSS. It is duplication, and it is the price of the image starting to download sooner.

One consequence worth remembering: if you later change the layout width in your CSS, the `sizes` attribute does not update itself. Stale `sizes` values are a common cause of a site quietly serving the wrong image sizes for years.

## Step 7: The picture element

`srcset` chooses between sizes of the same image. `<picture>` handles the two jobs it cannot do.

**Art direction.** Sometimes a smaller version is not what you want. A wide banner may need to become a tight square on a phone so the subject stays visible, which is a different crop rather than a different size:

```html
<picture>
  <source media="(max-width: 600px)" srcset="hero-square.webp">
  <source media="(min-width: 601px)" srcset="hero-wide.webp">
  <img src="hero-wide.jpg" alt="Bakery storefront at sunrise"
       width="1600" height="900">
</picture>
```

The browser takes the first `<source>` whose condition matches and ignores the rest. The inner `<img>` is required. It is what actually renders, it carries the `alt` text and the dimensions, and it is the fallback when no source matches. A `<source>` element has no `alt` of its own.

**Format fallback.** This is the answer to the 96 and 93 percent support figures from [Image Optimization](/modules/html/image-optimization/README.md). Offer the modern formats first, with a universally supported file at the bottom:

```html
<picture>
  <source type="image/avif" srcset="cookies.avif">
  <source type="image/webp" srcset="cookies.webp">
  <img src="cookies.jpg" alt="A tray of fresh cookies"
       width="1600" height="1200" loading="lazy">
</picture>
```

The browser checks each `type` in order and uses the first it can decode. A browser without AVIF support skips straight past that line. **Exactly one file is downloaded**, never two, so the fallbacks cost nothing to the visitors who do not need them.

Both jobs combine, and `srcset` still works inside each source:

```html
<picture>
  <source media="(max-width: 600px)"
          type="image/webp"
          srcset="hero-square-400.webp 400w, hero-square-800.webp 800w"
          sizes="100vw">
  <source type="image/webp"
          srcset="hero-wide-800.webp 800w, hero-wide-1600.webp 1600w"
          sizes="100vw">
  <img src="hero-wide-1600.jpg" alt="Bakery storefront at sunrise"
       width="1600" height="900">
</picture>
```

That is the most complex image markup this course asks for, and most images do not need it. Reach for `<picture>` when you need a different crop or a format fallback. Use plain `srcset` for everything else. [Putting It Together](/modules/html/image-optimization/putting-it-together.md) shows a complete example combining every technique from both chapters.

## The checklist

Run this over every image before you move on:

- `srcset` and `sizes` where the image flexes with the layout
- `<picture>` where you need a different crop or a format fallback

## Keep learning

- [MDN: Responsive images](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images). The full guide to `srcset`, `sizes`, and `<picture>`, with more cases than this chapter covers.
- [MDN: the picture element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/picture). Attribute-level reference.
- [Video: HTML Responsive Images, srcset, sizes, and the picture Element, by CodeLucky](https://www.youtube.com/watch?v=96GcXfFp8dc). Walks through both techniques with more worked examples.

## Try it yourself (about 45 minutes)

Take one large photograph, ideally straight off a phone, and note its file size.

Export it at three widths, roughly 400, 800, and 1600 pixels, saving each as WebP at about 80 percent quality. In Squoosh that is the Resize panel for the width, the format dropdown set to WebP, and the quality slider, then Download. Repeat three times. Write down the four file sizes together, because the comparison is the point of the exercise.

Put the three files into an `<img>` with `srcset` and `sizes`, and add `alt` plus `width` and `height`. Use the dimensions of your **largest** file for those two attributes, since all three share the same shape and the browser only needs the ratio.

Open your page and open developer tools with **F12**, or **Ctrl+Shift+I**, or **Cmd+Option+I** on a Mac. Switch to the **Network** tab, in the same row of tabs as Elements and Console. Reload the page, then use the **Img** filter button below that row to hide the CSS, font, and favicon requests so only images remain. Resize the browser window and reload at a narrow width and again at a wide one. Confirm that a different file is requested each time.

Then add a second image lower down the page with `loading="lazy"`, reload at the top, and confirm in the Network panel that it does not appear in the list until you scroll toward it.

Finally, remove the `width` and `height` from one image. In the Network panel toolbar, find the throttling dropdown, which reads **No throttling** by default and sits near the top of the panel, and set it to **Slow 4G**. Reload and watch the text below the image jump when it arrives. Put the attributes back, reload again, and watch the jump disappear.

Your media loads fast. [SEO Basics](/modules/seo/seo-basics/README.md) is about making sure people can find your pages in the first place.
