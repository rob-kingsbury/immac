---
title: Media Elements
prerequisites:
  - html/html-basics
---

# Media Elements

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

Always give an `<iframe>` a `title`. Like `alt` text on an image, it tells assistive technology what the frame contains. `VIDEO_ID` is the string of characters after `v=` in a normal YouTube <abbr title="Uniform Resource Locator">URL</abbr>, not the whole URL itself. [HTML iframes](/modules/html/html-iframes/README.md) covers embedding third-party content in more depth, including how to keep an embed responsive and how to limit what it's allowed to do on your page.

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

The browser checks each `<source>` in order and plays the first one it can decode, skipping the rest without downloading them. The `type` attribute is what lets the browser check without downloading anything first. It's a <abbr title="Multipurpose Internet Mail Extensions">MIME</abbr> type, the same kind of value a server sends to describe a file it's returning, and it tells the browser what it's looking at before committing to a download it might not be able to use.

One detail that's easy to get backwards: once you're using `<source>` children, drop the `src` attribute from the `<video>` or `<audio>` tag itself. The source list replaces it entirely. A `src` left on the parent element alongside `<source>` children is redundant at best, and confusing the moment the two disagree about what should actually play.

## Media: video is heavier still

Everything [Image Optimization](/modules/html/image-optimization/README.md) covers applies to video with the numbers multiplied. A short clip can outweigh every image on the page combined, so the defaults matter more.

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

Multiple `<source>` elements work the same way as above, and `width` and `height` reserve the space exactly as they do for images.

Avoid `autoplay`. It consumes data without consent, it is hostile on a metered connection, and browsers block it with sound anyway.

For anything longer than a short clip, host it on a video platform and embed it. Streaming services deliver several qualities and adapt to the connection, which is well beyond what a static site can do.

## The checklist

Run this over your page before you move on:

- `<video>` and `<audio>` both have `controls`, so the visitor can play, pause, and adjust volume
- Video includes a `<track kind="captions">` pointing at a WebVTT file
- Every `<iframe>` has a `title` describing what it contains
- Video, if any, has a `poster`, sets `preload` to `metadata` or `none`, and does not autoplay

## Keep learning

- [W3Schools: HTML5 Video](https://www.w3schools.com/html/html5_video.asp) and [HTML5 Audio](https://www.w3schools.com/html/html5_audio.asp). Full attribute references for the media elements in this module.
- [MDN: the video element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video). Covers multiple `<source>` elements and format fallback in full.
- [Video: HTML5 Video, by Steve Griffith](https://www.youtube.com/watch?v=Sq4NFODUjGg). Covers the `<video>` element and its attributes in more depth than this module.
