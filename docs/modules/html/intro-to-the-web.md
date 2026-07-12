---
title: Introduction to the Web
---

# Introduction to the Web

Before writing a single tag, it helps to know what actually happens when a web page shows up on your screen. This week covers three things: how the web works under the hood, how to set up a workspace you'll use all semester, and the basic building blocks of HTML.

## What happens when you load a page

Every website you've ever visited comes down to two computers talking to each other: a **client** (your browser) and a **server** (a computer somewhere else that stores the website's files).

The sequence looks like this:

1. You type a URL or click a link.
2. Your browser sends a **request** to a server, asking for a specific page.
3. The server sends back a **response**, usually an HTML file, along with whatever CSS, images, and scripts that page needs.
4. Your browser reads that HTML and renders it into the page you see.

This request/response exchange happens over **HTTP** (HyperText Transfer Protocol). You don't need to memorize the protocol details, but the mental model matters: a browser is not magic, it's a program that requests files and turns HTML into a visual layout. Every tool you'll use this semester exists to make that HTML file better.

## Setting up your workspace

You'll be writing code by hand all semester, so a solid setup now saves headaches later.

**A code editor.** We'll use [Visual Studio Code](https://code.visualstudio.com/). It's free, it's what most of the industry uses, and it has good defaults for web development out of the box.

**A browser with developer tools open.** Chrome, Firefox, and Edge all ship with a built-in inspector. Right-click any element on a page and choose "Inspect" to see the HTML behind it. You'll live in this panel all semester, so get comfortable opening it now.

**A consistent project folder.** Keep one folder per project, with a clear naming convention (lowercase, hyphens instead of spaces: `my-first-site`, not `My First Site`). File and folder naming isn't cosmetic. Servers, URLs, and version control all care about exact names, and inconsistent naming is one of the most common sources of broken links later in the course.

## HTML: the skeleton of every page

HTML (HyperText Markup Language) doesn't make pages look a particular way. It describes what each piece of content *is*: a heading, a paragraph, a list, a link. Styling that content is CSS's job, covered in your other course. For now, focus on structure and meaning.

An HTML **element** is made of a tag, and usually some content inside it:

```html
<p>This is a paragraph.</p>
```

`<p>` is the opening tag, `</p>` is the closing tag, and the text between them is the content. Most elements follow this open-tag/content/close-tag pattern.

Some elements carry extra information in **attributes**, written inside the opening tag:

```html
<a href="https://algonquincollege.com">Algonquin College</a>
```

Here, `href` is an attribute that tells the `<a>` (anchor) element where the link should point.

Elements can also **nest** inside each other, which is how you build more complex structures:

```html
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>
```

Indentation isn't required for the browser to understand nested code, but it's required for *you* to understand it six weeks from now. Consistent indentation is a habit worth building in week one, not week twelve.

## A complete, minimal HTML document

Every HTML file needs a few things around your actual content to be valid. Here's the smallest complete page you can write:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>My First Page</title>
  </head>
  <body>
    <h1>Hello, web.</h1>
    <p>This is my first web page.</p>
  </body>
</html>
```

A quick breakdown:

- `<!DOCTYPE html>` tells the browser this is a modern HTML document.
- `<html lang="en">` wraps the entire page and declares its language.
- `<head>` holds information *about* the page (its character encoding, its title) that isn't displayed directly on the page itself.
- `<body>` holds everything that actually shows up in the browser window.

Save this as `index.html` and open it directly in a browser. No server, no build tools, no installation beyond a text editor. That's the whole point of starting here: HTML runs anywhere, immediately.

## Try it yourself

Create a new folder, add an `index.html` file, and build out the boilerplate above from memory rather than copying it. Add a second heading and a couple more paragraphs. Open it in your browser, then open developer tools and inspect your own elements. Getting comfortable with that inspect-and-adjust loop now will make every week after this one easier.
