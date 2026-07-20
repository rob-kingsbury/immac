---
title: Links, Images, and Media
---

# Links, Images, and Media

A page of text is a document. Links, images, and media are what turn it into the web. This week covers how to connect pages together, how to place images correctly, and how to embed audio and video.

## Links and the anchor element

The anchor element `<a>` creates a link. Its `href` attribute says where the link goes.

```html
<a href="https://algonquincollege.com">Algonquin College</a>
```

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

`../` means "go up one level". This is exactly why the consistent, lowercase, no-spaces file naming from week one matters. A link to `About.html` will break on a web server if the file is actually named `about.html`, even though it worked on your own computer.

You can also link to a specific spot on a page using an `id`:

```html
<h2 id="ingredients">Ingredients</h2>
...
<a href="#ingredients">Jump to ingredients</a>
```

## Images

The image element places a picture on the page. It has no closing tag, and two attributes matter every time:

```html
<img src="images/cookies.jpg" alt="A tray of fresh chocolate chip cookies">
```

`src` is the path to the image file, relative or absolute, exactly like `href`. `alt` is the text alternative. It's read aloud to screen reader users, shown if the image fails to load, and read by search engines. Describe what the image shows and why it's there. If an image is purely decorative, give it an empty `alt=""` so assistive technology skips it rather than announcing a filename.

Add `width` and `height` attributes to match the image's real dimensions. This lets the browser reserve the right space before the image loads, which stops the page from jumping around as things arrive.

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

You'll go deeper on optimizing and serving these in week eight. For now, the rule of thumb is: drawings as SVG, photos as WebP or JPG.

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

The `controls` attribute gives the user play, pause, and volume. The text inside the element shows only if the browser can't play the file.

To embed content hosted elsewhere, such as a YouTube video or a map, you use an `<iframe>`, which loads another page inside a frame on yours:

```html
<iframe src="https://www.youtube.com/embed/VIDEO_ID"
        title="Course introduction video"
        width="560" height="315"></iframe>
```

Always give an `<iframe>` a `title`. Like `alt` text on an image, it tells assistive technology what the frame contains.

## Try it yourself

Take last week's page and connect it up. Add a second HTML page and link the two together with relative paths, in both directions. Place one image with a genuine, descriptive `alt` attribute and correct `width` and `height`. Add an in-page link that jumps to one of your `<h2>` sections. If you have a short video clip, embed it with the `<video>` element. Open the page and confirm every link lands where you expect.
