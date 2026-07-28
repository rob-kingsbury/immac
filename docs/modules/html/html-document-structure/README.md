---
title: HTML Document Structure
prerequisites:
  - html/html-basics
---

# <abbr title="HyperText Markup Language">HTML</abbr> Document Structure

Every HTML file needs the same skeleton around its content. This is the shape you start every page from.

## Building a complete HTML document

Elements need somewhere to live. HTML files need a specific skeleton around your content to be valid, and building it one piece at a time makes each piece's job clear.

Start with the document type declaration. It's always the very first line, and it tells the browser this is a modern HTML document:

```html
<!DOCTYPE html>
```

Next, the `<html>` element wraps everything else in the file, and its `lang` attribute declares the page's language:

```html
<!DOCTYPE html>
<html lang="en">
</html>
```

Inside `<html>`, add a `<head>`. It holds information *about* the page, its character encoding and its title, none of which displays directly on the page itself:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>My First Page</title>
  </head>
</html>
```

`<meta charset="UTF-8">` tells the browser how to decode the text in the file, and it should be the first thing inside `<head>`. `<meta name="viewport" content="width=device-width, initial-scale=1">` tells a phone or tablet to render the page at its actual screen width instead of shrinking down a desktop-sized layout to fit, which is why a page without it looks fine on your laptop and unreadably tiny on a phone. Include it on every page from here on. You'll see exactly why it matters once you reach responsive design in MTM1544. `<title>` sets what appears in the browser tab, not anything inside the visible page.

Finally, add a `<body>`. Everything that actually shows up in the browser window goes here:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>My First Page</title>
  </head>
  <body>
    <h1>Hello, web.</h1>
    <p>This is my first web page.</p>
  </body>
</html>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<h1>Hello, web.</h1>
<p>This is my first web page.</p>
</div>
</details>

Notice the Result box above only shows what's inside `<body>`. That's not a simplification, it's exactly how a browser treats the rest of the file: `<!DOCTYPE>`, `<html>`, and `<head>` configure the page but produce no visible output of their own. The one exception is `<title>`, which you'd see in the browser tab, not in the page area.

Save this as `index.html` and open it directly in a browser. No server, no build tools, no installation beyond a text editor. That's the whole point of starting here: HTML runs anywhere, immediately.

## The checklist

Run this over your page before you move on:

- The skeleton is in place: `<!DOCTYPE html>`, `<html lang="en">`, a `<head>` with `charset` and `viewport` meta tags plus a `<title>`, and a `<body>` holding everything visible

## Try it yourself (about 45 minutes)

This exercise pulls together the whole group of elements that live inside the skeleton you just built: [HTML Headings](/modules/html/html-headings/README.md), [HTML Text](/modules/html/html-text/README.md), [Quotations](/modules/html/html-text/quotations.md), [HTML Lists](/modules/html/html-lists/README.md), [Inline and Block Elements](/modules/html/html-inline-block/README.md), and [HTML Comments](/modules/html/html-comments/README.md). Read those first, then work through this once.

Create a new folder in your cloned repository, add an `index.html` file, and build out the document skeleton, `<!DOCTYPE>` through `<body>`, from memory rather than copying it. Include the charset and viewport meta tags, both belong in every page you'll ever build from here on. Inside `<body>`, add one `<h1>`, at least two `<h2>` sections, a paragraph or two under each, one ordered and one unordered list, and a `<blockquote>`. Mark one or two words with `<strong>` or `<em>` where the meaning calls for it. Somewhere in your text, work in an ampersand or a copyright line and write it with the matching entity, `&amp;` or `&copy;`, instead of typing the character directly. Add a comment above each major section.

Open the page in your browser, then open developer tools and inspect your own elements. Watch how the block elements each claim a full row while the inline ones share a line. Then commit and push your change using the workflow from [Introduction to the Web](/modules/welcome/introduction-to-the-web.md), stage, commit, sync, and confirm it shows up on GitHub.

Your page is a single block of text and lists right now. [HTML Anchors](/modules/html/html-anchors/README.md) connects it to the rest of the web.

The skeleton above is enough to publish a page. [Document Head Best Practices](/modules/html/html-document-structure/head-best-practices.md) revisits the `<head>` once you have more to put in it: a description search engines can show, a canonical URL, a favicon.
