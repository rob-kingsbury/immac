---
title: Links, Images, and Media
---

# Links, Images, and Media

Last week gave you the elements for a page of text. A page of text is a document. Links, images, and media are what turn it into the web. This chapter covers how to connect pages together, how to place images correctly, and how to embed audio and video.

## How to read this chapter

**The core path is everything down to the checklist.** Read it in order, build the examples as you go, and you have what the assignment and the Try it yourself exercise need. Budget about 25 minutes for it, plus the 40 minutes the exercise takes.

Three sections are headed **Going deeper**. They're optional, marked clearly every time, and add roughly 20 minutes total if you read all three: sending email and phone calls directly from a link, opening a link safely in a new tab, and giving video or audio more than one file to try. Skip them on a busy week. Nothing in the core path or the exercise depends on them.

## Links and the anchor element

The anchor element `<a>` creates a link. Its `href` attribute says where the link goes.

```html
<a href="https://algonquincollege.com">Algonquin College</a>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<a href="https://algonquincollege.com">Algonquin College</a>
</div>
</details>

The text between the tags is what the user clicks. Write it so it makes sense on its own. "Read the syllabus" is a good link. "Click here" is not, because screen reader users often pull up a list of just the links on a page, and a list of ten "click here" entries tells them nothing. The same rule applies if you're skimming your own page later, out of context: good link text tells you where it goes before you click it. Search engines read link text the same way, using it as a signal for what the destination page is about, so a vague link is a small SEO cost as well as an accessibility one. You'll cover this properly in the SEO Fundamentals chapter later this semester.

### Going deeper: mailto: and tel: links

*Optional, about 6 minutes.*

Not every link points to a web page. Two special values for `href` hand off to a different program entirely.

A `mailto:` link opens the visitor's default email application with a new message already addressed:

```html
<a href="mailto:info@maplebrookbakery.ca">info@maplebrookbakery.ca</a>
```

Showing the actual address as the link text is fine here, unlike "click here". The address is the useful information, and a visitor who'd rather copy it into their own mail client than let the browser pick one can still read it straight off the page.

A `mailto:` link can prefill more than the address. Add a `subject` and a `body`, joined with a `?` and `&`, the same query-string pattern a search results page uses:

```html
<a href="mailto:info@maplebrookbakery.ca?subject=Catering%20Inquiry&body=Hi%2C%20I%27d%20like%20to%20ask%20about%20catering%20options">
  Email us about catering
</a>
```

Spaces and punctuation inside a URL have to be encoded. `%20` is a space, `%2C` is a comma, `%27` is an apostrophe. Get one wrong and most email clients still open, just with a slightly mangled subject or body, so open the link once after writing it and check what actually loads.

A `tel:` link does the same job for phone numbers, and it matters most on a phone, where tapping it hands the number straight to the dialer:

```html
<a href="tel:+16135551234">613-555-1234</a>
```

Write the number in the `href` in full international format: a `+`, the country code, then the digits, no spaces or punctuation. The link text is what the visitor actually reads, so the familiar `613-555-1234` formatting belongs there instead. The two don't need to match, because the browser only ever acts on the `href`.

## Absolute versus relative paths

Where a link points depends on the kind of path you give it, and this is one of the most common places beginners get stuck.

An absolute path is the full address, starting with the protocol. Use it to link to another website:

```html
<a href="https://developer.mozilla.org">MDN Web Docs</a>
```

A relative path points to a file in relation to the current page. Use it to link between pages of your own site:

```html
<!-- A file in the same folder -->
<a href="about.html">About</a>

<!-- A file in a subfolder -->
<a href="pages/contact.html">Contact</a>

<!-- Go up one folder, then into another -->
<a href="../index.html">Home</a>
```

`../` means "go up one level." This is exactly why consistent, lowercase, no-spaces file naming matters, a topic the Code Quality and Validation chapter covers in full. A link to `About.html` will break on a web server if the file is actually named `about.html`, even though it worked on your own computer, since most servers treat file names as case-sensitive.

The part that trips people up is that a relative path is read from the file doing the linking, not from some fixed starting point for the whole site. The same destination file gets written differently depending on where the link lives.

<div class="diagram">
<svg viewBox="0 0 640 250" role="img" aria-label="A small file structure and two links written from different files. The structure has a project folder containing index.html and about.html directly, and a pages subfolder containing contact.html. A link written inside index.html pointing to about.html, a file in the same folder, is just the filename: about.html. A link written inside index.html pointing to contact.html, a file inside the pages subfolder, includes that folder: pages slash contact.html. A link written inside contact.html pointing back to index.html has to step up out of the pages folder first, so it reads dot dot slash index.html. Three links, three different paths, because each one is written from a different starting file.">
  <text x="10" y="18" class="d-lbl">The file structure</text>
  <rect x="10" y="30" width="290" height="205" rx="8" class="d-surface d-border" stroke-width="1.5"/>
  <text x="26" y="58" class="d-lbl-muted">project/</text>
  <text x="34" y="86" class="d-lbl-mono">├─ about.html</text>
  <text x="34" y="112" class="d-lbl-mono">├─ index.html</text>
  <text x="34" y="138" class="d-lbl-muted">└─ pages/</text>
  <text x="54" y="164" class="d-lbl-mono">└─ contact.html</text>
  <text x="155" y="205" text-anchor="middle" class="d-lbl-muted">two files, one subfolder</text>

  <text x="340" y="18" class="d-lbl">Reading the paths</text>
  <rect x="340" y="30" width="290" height="205" rx="8" class="d-surface d-border" stroke-width="1.5"/>

  <text x="356" y="50" class="d-lbl-muted">from index.html to about.html</text>
  <rect x="356" y="58" width="180" height="24" rx="4" class="d-accent-soft d-accent-stroke" stroke-width="1.5"/>
  <text x="366" y="74" class="d-lbl-mono">about.html</text>

  <text x="356" y="102" class="d-lbl-muted">from index.html to contact.html</text>
  <rect x="356" y="110" width="230" height="24" rx="4" class="d-accent-soft d-accent-stroke" stroke-width="1.5"/>
  <text x="366" y="126" class="d-lbl-mono">pages/contact.html</text>

  <text x="356" y="154" class="d-lbl-muted">from contact.html to index.html</text>
  <rect x="356" y="162" width="180" height="24" rx="4" class="d-accent-soft d-accent-stroke" stroke-width="1.5"/>
  <text x="366" y="178" class="d-lbl-mono">../index.html</text>

  <text x="485" y="205" text-anchor="middle" class="d-lbl-muted">../ steps up before going back down</text>
</svg>
<figcaption>Three links to the same two destinations, each written differently. A relative path is written from the file doing the linking, not from the project's root folder.</figcaption>
</div>

You can also link to a specific spot on the same page using an `id`:

```html
<h2 id="ingredients">Ingredients</h2>
<a href="#ingredients">Jump to ingredients</a>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<p><a href="#demo-ingredients-target">Jump to ingredients</a></p>
<h3 id="demo-ingredients-target">Ingredients</h3>
<p>Flour, sugar, butter.</p>
</div>
</details>

Click the link above. The `href` matches the target element's `id` exactly, with a `#` in front, and the browser scrolls straight to it. This same technique, an `id` plus a matching `#` link, is how a page's own table of contents or a "back to top" link works.

### Going deeper: opening a link in a new tab safely

*Optional, about 6 minutes.*

The `target` attribute controls where a link opens. Its most common value, `_blank`, opens the link in a new tab instead of navigating away from the page the visitor is already on:

```html
<a href="https://developer.mozilla.org" target="_blank">MDN Web Docs</a>
```

Use it sparingly. Pulling a visitor into a tab they didn't ask for is disorienting more often than it's helpful, so it's usually reserved for links that lead off-site, where you want them to keep their place on your page.

There's a real security reason to be careful with it too, not just a style preference. When a link opens in a new tab, the page that opens can get a live reference back to the tab that opened it, through a JavaScript property called `window.opener`. A malicious destination page could use that reference to quietly redirect your original tab to a fake login page while the visitor's attention is on the new one, a trick known as reverse tabnabbing.

The fix is the `rel` attribute:

```html
<!-- Leaves a reference back to this tab -->
<a href="https://example.com" target="_blank">External link</a>

<!-- Cuts that reference -->
<a href="https://example.com" target="_blank" rel="noopener noreferrer">External link</a>
```

`noopener` is the one doing the security work. It stops `window.opener` from being set at all, so the new page has nothing to reach back with. `noreferrer` does the same thing and also stops the browser from telling the destination site which page sent the visitor there, which is a privacy detail more than a security one.

Current browsers already apply the `noopener` protection automatically the moment they see `target="_blank"`, even with no `rel` written at all. Write it anyway. It costs nothing, it makes the intent obvious to anyone reading your code, and `noreferrer`'s referrer-hiding still isn't automatic. Treat `rel="noopener noreferrer"` as something you type every time you type `target="_blank"`, the same reflex as writing `alt` every time you write `img`.

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

You'll go deeper on optimizing and serving these images, including responsive `srcset` and lazy loading, in the Optimizing Images and Media chapter later this semester. For now, the rule of thumb is: drawings as SVG, photos as WebP or JPG.

## Embedding audio and video

Native <abbr title="HyperText Markup Language">HTML</abbr> elements play media without any plugins.

```html
<video src="video/demo.mp4" controls width="640">
  Your browser does not support the video element.
</video>

<audio src="audio/intro.mp3" controls>
  Your browser does not support the audio element.
</audio>
```

The `controls` attribute gives the user play, pause, and volume. The text inside the element shows only if the browser can't play the file at all, which is different from the file simply not existing yet in your project folder.

**Video needs one more thing to be genuinely accessible: captions.** This isn't optional polish, it's a <abbr title="Web Content Accessibility Guidelines">WCAG</abbr> requirement (1.2.2, Level A, the same baseline level as the `alt` text you've already been writing) for anyone who's deaf or hard of hearing, and it helps far more people than that in practice, anyone watching with the sound off. A `<track>` element supplies them:

```html
<video src="video/demo.mp4" controls width="640">
  <track kind="captions" src="captions/demo-en.vtt" srclang="en" label="English">
  Your browser does not support the video element.
</video>
```

`kind="captions"` tells the browser what the track is for. `src` points to a caption file in the WebVTT format, plain text with timestamps, which you write once per video. `srclang` and `label` identify the language, which matters the moment a video has more than one caption track available. The player's existing `controls` bar automatically gains a captions toggle once a `<track>` is present, no extra markup needed.

To embed content hosted elsewhere, such as a YouTube video or a map, you use an `<iframe>`, which loads another page inside a frame on yours:

```html
<iframe src="https://www.youtube.com/embed/VIDEO_ID"
        title="Course introduction video"
        width="560" height="315"></iframe>
```

Always give an `<iframe>` a `title`. Like `alt` text on an image, it tells assistive technology what the frame contains. `VIDEO_ID` is the string of characters after `v=` in a normal YouTube <abbr title="Uniform Resource Locator">URL</abbr>, not the whole URL itself.

### Going deeper: giving video and audio more than one file to try

*Optional, about 5 minutes.*

The `<video>` and `<audio>` examples so far point at one file with a `src` attribute. That works until a visitor's browser can't decode that particular file, and then nothing plays, not even the fallback text, because the browser never gets far enough to show it.

Not every browser can decode every video or audio format. MP4 video, encoded as H.264, has the broadest support and is a safe first or only choice for most course work. WebM is an alternative container that compresses well and is openly licensed, but it isn't guaranteed everywhere MP4 is. Audio is less of a problem today than it used to be, since MP3 is now understood almost everywhere, but the same gap can still show up depending on what you're handed to work with.

The fix is to offer more than one file and let the browser pick. Replace the single `src` attribute with one or more `<source>` children instead, each pointing at a different encoded version of the same content:

```html
<video controls width="640">
  <source src="video/demo.webm" type="video/webm">
  <source src="video/demo.mp4" type="video/mp4">
  Your browser does not support the video element.
</video>
```

```html
<audio controls>
  <source src="audio/intro.ogg" type="audio/ogg">
  <source src="audio/intro.mp3" type="audio/mpeg">
  Your browser does not support the audio element.
</audio>
```

The browser checks each `<source>` in order and plays the first one it can decode, skipping the rest without downloading them. That's the same mechanism the `<picture>` element uses for images, which you'll meet properly in the Optimizing Images and Media chapter, just applied to media that plays over time instead of a still image. This is a different problem from what that later chapter solves: this is about whether a file plays at all, not about serving a smaller file to a smaller screen.

The `type` attribute is what lets the browser check without downloading anything first. It's a <abbr title="Multipurpose Internet Mail Extensions">MIME</abbr> type, the same kind of value a server sends to describe a file it's returning, and it tells the browser what it's looking at before committing to a download it might not be able to use.

One detail that's easy to get backwards: once you're using `<source>` children, drop the `src` attribute from the `<video>` or `<audio>` tag itself. The source list replaces it entirely. A `src` left on the parent element alongside `<source>` children is redundant at best, and confusing the moment the two disagree about what should actually play.

## The checklist

Run this over your page before you submit work in this course:

- Link text describes the destination on its own, never "click here"
- Paths are relative for your own pages and absolute only for other sites, and match the real file name and case
- `alt` text describes the image, or `alt=""` if it's purely decorative
- `width` and `height` are set to the image's real dimensions, so nothing jumps as it loads
- Image format matches the content: SVG for logos and icons, WebP or JPG for photographs
- `<video>` and `<audio>` both have `controls`, so the visitor can play, pause, and adjust volume
- Video includes a `<track kind="captions">` pointing at a WebVTT file
- Every `<iframe>` has a `title` describing what it contains

## Keep learning

- [W3Schools: HTML Links](https://www.w3schools.com/html/html_links.asp) and [HTML Images](https://www.w3schools.com/html/html_images.asp). Reference pages with more worked examples of paths and image attributes.
- [MDN: Creating hyperlinks](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks). Covers `mailto:` links in more depth, including `cc`, `bcc`, and the URL-encoding rules from this chapter's Going deeper section.
- [MDN: rel="noopener"](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/noopener). The security detail behind opening a link with `target="_blank"`.
- [W3Schools: HTML5 Video](https://www.w3schools.com/html/html5_video.asp) and [HTML5 Audio](https://www.w3schools.com/html/html5_audio.asp). Full attribute references for the media elements in this chapter.
- [MDN: the video element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video). Covers multiple `<source>` elements and format fallback in full.
- [W3Schools: The iframe Tag](https://www.w3schools.com/tags/tag_iframe.asp). Covers `<iframe>` attributes beyond `src` and `title`.
- [Video: How to Embed Video in HTML, by PixemWeb](https://www.youtube.com/watch?v=9NTrwrfI-X4). Covers the `<video>` element and its attributes in more depth than this chapter.

## Try it yourself (about 40 minutes)

Take one of your existing pages and connect it up. Add a second HTML page and link the two together with relative paths, in both directions. Place one image with a genuine, descriptive `alt` attribute and correct `width` and `height`. Add an in-page link that jumps to one of your `<h2>` sections using a matching `id`. If you have a short video clip, embed it with the `<video>` element. Open the page and confirm every link lands where you expect.

You now have two connected pages. Next week gives every element on them real meaning, with semantic HTML.
