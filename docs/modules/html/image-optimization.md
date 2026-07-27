---
title: Optimizing Images and Media
---

# Optimizing Images and Media

Images are usually the heaviest thing on a page. A single unoptimized photo can outweigh all your <abbr title="HyperText Markup Language">HTML</abbr> and <abbr title="Cascading Style Sheets">CSS</abbr> combined, and on a phone connection that is the difference between a page that loads instantly and one people give up on.

The Links, Images, and Media chapter covered placing images. This chapter is about making them fast, and about the small set of attributes that decide whether a page feels quick or feels broken.

## How to read this chapter

**The core path is everything down to the checklist.** Work through the six steps in order, build the example at the end, and you have what the assignment needs.

Sections headed **Going deeper** are optional. They explain why the browser behaves the way it does, and they are here because this page is meant to still be useful to you in a job two years from now. Skip them on a busy week and nothing breaks.

## The problem, in numbers

A photo straight off a phone camera is commonly 4000 pixels wide and 3 to 5 megabytes. Put four of those on a page and you have shipped roughly 16 megabytes.

On a good office connection that page arrives in about a second. On a weak mobile connection it can take the better part of a minute, and the person waiting has no idea whether the page is slow or dead. They leave.

The frustrating part is that almost none of those pixels were needed. If each photo displays in a 600 pixel wide box, you sent nearly seven times the width required, which is close to fifty times the pixel data, for an image that looks identical to the visitor.

Six steps fix it, and none of them are difficult.

## Step 1: Size the image to its job

The most common mistake is serving a huge image scaled down by the browser. A 4000 pixel wide photo displayed in a 400 pixel box still downloads all 4000 pixels. The browser shrinks it on screen, so it looks correct, and the visitor paid the full download cost for pixels they never saw.

Export images close to the size they actually display. Do this in your image editor, before the file reaches your project.

There is one wrinkle. Phones and modern laptops pack more physical pixels into the same physical space, which is what "Retina" describes. On a screen with a device pixel ratio of 2, a 400 pixel wide box is painted with 800 physical pixels, and an image exported at exactly 400 looks soft.

The working rule:

```text
Displayed width  400px
Export at        800px   (2x, sharp on high-density screens)
Never export at  4000px  (the original, 25x more data than needed)
```

Doubling for density costs about four times the pixel data of the 1x version, which sounds bad until you compare it against the ten or twenty times you were wasting before. Step 6 removes even that cost by letting the browser choose.

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

**AVIF and WebP both beat JPG** at the same visible quality, often by a wide margin on photographs. As of July 2026, WebP is supported by about 96 percent of browsers in use and AVIF by about 93 percent. Both numbers are high, and neither is 100, which is exactly the situation the `<picture>` element in Step 7 exists to handle. Offer the modern format first, keep a JPG behind it, and every visitor gets the best file their browser understands.

### Going deeper: why AVIF is not automatically the right answer

AVIF usually compresses smaller than WebP, so the obvious move is to reach for it every time. Two things complicate that.

AVIF encoding is slow. On a large batch of images you will notice, and some export tools still produce weaker AVIF files than their WebP output at similar settings. It is worth comparing the two exports rather than assuming.

AVIF also tends to smooth fine detail at aggressive quality settings in a way that reads as slightly plastic on faces and textures. WebP tends to fail more visibly, with blocky edges. Neither is strictly better, and for a small site the difference in bytes rarely justifies much agonising. Default to WebP, reach for AVIF when a page is image-heavy enough that the saving is real, and compare before committing.

## Step 3: Compress

Compression discards data to shrink the file. For photographs a surprising amount can go before anyone notices, because the eye is far more sensitive to shapes and edges than to exact colour values.

Most export tools give you a quality slider from 0 to 100. For web photographs the useful range is roughly **75 to 85**. Below about 70 you start seeing artifacts around edges. Above about 90 the file grows quickly for a difference nobody can see.

Run one comparison yourself, once, so that you trust the numbers rather than the advice. Take a photograph and export it three times:

```text
original.jpg   quality 100   2,400 KB
photo-85.jpg   quality 85      310 KB
photo-75.jpg   quality 75      210 KB
```

The exact figures depend on the photo. The pattern does not. Dropping from 100 to 85 typically removes most of the file for none of the visible quality, and that is the single largest saving available in this chapter.

[Squoosh](https://squoosh.app/) is a free browser tool that shows the original and the compressed version side by side with a slider, along with the resulting file size. Use it to calibrate your eye, then apply the same settings in whatever editor you normally use.

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

Two related attributes exist and are worth recognising when you meet them.

`fetchpriority="high"` on the hero image asks the browser to move it up the download queue ahead of other files. It reached cross-browser support recently, in late 2024, so treat it as a bonus rather than something to rely on.

`decoding="async"` lets the browser decode the image off the main thread. Modern browsers already make good decisions here, and the measurable benefit on a small site is close to nothing. Recognise it, do not bother adding it.

Neither belongs in this course's assignments. They are here so the attributes are not a mystery when you see them in real code.

## Step 6: Offer several sizes with srcset

Steps 1 to 5 assume one file. A phone and a desktop should not download the same one.

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

**Format fallback.** This is the answer to the 96 and 93 percent support figures from Step 2. Offer the modern formats first, with a universally supported file at the bottom:

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

That is the most complex image markup this course asks for, and most images do not need it. Reach for `<picture>` when you need a different crop or a format fallback. Use plain `srcset` for everything else.

## Putting it together

A single image with every technique from this chapter applied, of the kind you would write for a real project:

```html
<picture>
  <source type="image/webp"
          srcset="storefront-400.webp   400w,
                  storefront-800.webp   800w,
                  storefront-1600.webp 1600w"
          sizes="(max-width: 600px) 100vw, 800px">
  <img src="storefront-800.jpg"
       srcset="storefront-400.jpg   400w,
               storefront-800.jpg   800w,
               storefront-1600.jpg 1600w"
       sizes="(max-width: 600px) 100vw, 800px"
       alt="Maplebrook Bakery at sunrise, with bread visible in the window"
       width="1600" height="900"
       loading="lazy">
</picture>
```

Every piece is doing a job. The WebP source serves the smaller format to browsers that support it. The `srcset` and `sizes` pair picks an appropriate size for the device. The dimensions reserve the layout space. The `loading` attribute defers a below-the-fold image. The `alt` text describes the picture for anyone who cannot see it.

## Media: video is heavier still

Everything above applies to video with the numbers multiplied. A short clip can outweigh every image on the page combined, so the defaults matter more.

```html
<video controls
       width="800" height="450"
       poster="talk-poster.webp"
       preload="metadata">
  <source src="talk.webm" type="video/webm">
  <source src="talk.mp4" type="video/mp4">
  Your browser does not support embedded video.
  <a href="talk.mp4">Download the video</a> instead.
</video>
```

Four decisions in that block are worth stating.

`poster` shows a still image before playback begins, so the visitor sees something immediately rather than a black rectangle, and you control what that something is.

`preload="metadata"` loads only enough to know the video's length and dimensions. The default behaviour can begin pulling the video itself, which is a large download for a visitor who may never press play. Use `preload="none"` when the video is well down the page.

Multiple `<source>` elements work the same way as in `<picture>`, and `width` and `height` reserve the space exactly as they do for images.

Avoid `autoplay`. It consumes data without consent, it is hostile on a metered connection, and browsers block it with sound anyway.

For anything longer than a short clip, host it on a video platform and embed it. Streaming services deliver several qualities and adapt to the connection, which is well beyond what a static site can do.

## The checklist

Run this over every image before you submit work in this course:

- Exported near its display size, at 2x for density, not straight off the camera
- Format matched to content, SVG for shapes and WebP or AVIF for photographs
- Compressed at roughly 75 to 85 quality, and checked by eye
- `width` and `height` present, matching the file's real dimensions
- `loading="lazy"` on everything below the fold, and never on the hero
- `srcset` and `sizes` where the image flexes with the layout
- `<picture>` where you need a different crop or a format fallback
- `alt` text that describes the image, or `alt=""` if it is decorative

## Keep learning

- [MDN: Responsive images](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images). The full guide to `srcset`, `sizes`, and `<picture>`, with more cases than this chapter covers.
- [MDN: the img element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img) and [the picture element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/picture). Attribute-level reference for both.
- [MDN: the video element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video). Every attribute available on `<video>`.
- [web.dev: Cumulative Layout Shift](https://web.dev/articles/cls) and [Largest Contentful Paint](https://web.dev/articles/lcp). What the two metrics from Steps 4 and 5 measure and how they are scored.
- [Squoosh](https://squoosh.app/). Compare compression settings side by side in the browser, with live file sizes.
- [Video: HTML Responsive Images, srcset, sizes, and the picture Element, by CodeLucky](https://www.youtube.com/watch?v=96GcXfFp8dc). Walks through both techniques with more worked examples.

## Try it yourself (about 45 minutes)

Take one large photograph, ideally straight off a phone, and note its file size.

Export it at three widths, roughly 400, 800, and 1600 pixels, saving each as WebP at about 80 percent quality. Write down the four file sizes together. The comparison is the point of the exercise.

Put the three files into an `<img>` with `srcset` and `sizes`, and add `width`, `height`, and `alt`. Open your page, open developer tools, and switch to the Network panel. Resize the browser window and reload at a narrow width and again at a wide one. Confirm that a different file is requested each time.

Then add a second image lower down the page with `loading="lazy"`, reload at the top, and confirm in the Network panel that it does not appear in the list until you scroll toward it.

Finally, remove the `width` and `height` from one image, throttle your connection to a slow speed in the Network panel, and reload. Watch the text below the image jump when it arrives. Put the attributes back and watch the jump disappear.

Your media loads fast. Next week is about making sure people can find your pages in the first place.
