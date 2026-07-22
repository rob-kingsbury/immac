---
title: Links, Images, and Media
---

# Links, Images, and Media

Last week gave you the elements for a page of text. A page of text is a document. Links, images, and media are what turn it into the web. This chapter covers how to connect pages together, how to place images correctly, and how to embed audio and video.

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

The text between the tags is what the user clicks. Write it so it makes sense on its own. "Read the syllabus" is a good link. "Click here" is not, because screen reader users often pull up a list of just the links on a page, and a list of ten "click here" entries tells them nothing.

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

Add `width` and `height` attributes to match the image's real dimensions. This lets the browser reserve the right space before the image loads, which stops the page from jumping around as things arrive:

```html
<img src="images/cookies.jpg" alt="A tray of fresh chocolate chip cookies"
     width="800" height="600">
```

## Choosing a file format

The format you save an image in affects both quality and load time. The four you'll use:

- **SVG** for logos, icons, and anything drawn from shapes. It's vector, so it stays sharp at any size and the file stays tiny.
- **WebP** as the modern default for photographs. It compresses smaller than JPG at the same quality and every current browser supports it.
- **JPG** for photographs where you need the widest possible compatibility.
- **PNG** when you need a lossless image or transparency and can't use SVG.

You'll go deeper on optimizing and serving these images, including responsive `srcset` and lazy loading, in the Optimizing Images and Media chapter later this semester. For now, the rule of thumb is: drawings as SVG, photos as WebP or JPG.

## Embedding audio and video

Native HTML elements play media without any plugins.

```html
<video src="video/demo.mp4" controls width="640">
  Your browser does not support the video element.
</video>

<audio src="audio/intro.mp3" controls>
  Your browser does not support the audio element.
</audio>
```

The `controls` attribute gives the user play, pause, and volume. The text inside the element shows only if the browser can't play the file at all, which is different from the file simply not existing yet in your project folder.

To embed content hosted elsewhere, such as a YouTube video or a map, you use an `<iframe>`, which loads another page inside a frame on yours:

```html
<iframe src="https://www.youtube.com/embed/VIDEO_ID"
        title="Course introduction video"
        width="560" height="315"></iframe>
```

Always give an `<iframe>` a `title`. Like `alt` text on an image, it tells assistive technology what the frame contains. `VIDEO_ID` is the string of characters after `v=` in a normal YouTube URL, not the whole URL itself.

## Keep learning

- [W3Schools: HTML Links](https://www.w3schools.com/html/html_links.asp) and [HTML Images](https://www.w3schools.com/html/html_images.asp). Reference pages with more worked examples of paths and image attributes.
- [W3Schools: HTML5 Video](https://www.w3schools.com/html/html5_video.asp) and [HTML5 Audio](https://www.w3schools.com/html/html5_audio.asp). Full attribute references for the media elements in this chapter.
- [W3Schools: The iframe Tag](https://www.w3schools.com/tags/tag_iframe.asp). Covers `<iframe>` attributes beyond `src` and `title`.
- [Video: How to Embed Video in HTML, by PixemWeb](https://www.youtube.com/watch?v=9NTrwrfI-X4). Covers the `<video>` element and its attributes in more depth than this chapter.

## Try it yourself

Take one of your existing pages and connect it up. Add a second HTML page and link the two together with relative paths, in both directions. Place one image with a genuine, descriptive `alt` attribute and correct `width` and `height`. Add an in-page link that jumps to one of your `<h2>` sections using a matching `id`. If you have a short video clip, embed it with the `<video>` element. Open the page and confirm every link lands where you expect.

You now have two connected pages. Next week gives every element on them real meaning, with semantic HTML.
