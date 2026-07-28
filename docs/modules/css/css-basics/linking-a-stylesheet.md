---
title: Linking a Stylesheet
prerequisites:
  - css/css-basics
---

# Linking a Stylesheet

Writing CSS is only useful once the browser knows to apply it to your HTML. There are three ways to connect the two, and although real projects use one of them almost exclusively, it's worth understanding all three, because you will run into each of them and the differences between them explain a habit that professional developers treat as a rule.

## Attaching CSS to a page

The first way is an **inline style**, written directly on a single element with the `style` attribute:

```html
<p style="color: crimson;">This paragraph is red.</p>
```

The second is an **internal stylesheet**, written once inside a `<style>` element in the page's `<head>`. Every matching element on that page is affected:

```html
<head>
  <style>
    p {
      color: crimson;
    }
  </style>
</head>
```

The third is an **external stylesheet**, where your CSS lives in its own separate file and the HTML page links to it. You write your rules in a file ending in `.css`, commonly named `styles.css` and kept in a `css` folder so your project stays organized as it grows. You connect it to the page with a `<link>` element in the `<head>`:

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>My Page</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
```

The `<link>` element needs two attributes to do its job. `rel="stylesheet"` tells the browser what kind of file it is connecting to, and `href` gives the path to that file. The value `css/styles.css` means the file `styles.css` inside a folder named `css`. With that one line in the `<head>`, every rule in your stylesheet applies to the page.

### Why external is the one to use

All three of these work. The browser will happily apply any of them. So why does the industry reach for external stylesheets almost every time? The answer comes down to two questions you should ask of any approach: how much do I have to repeat myself, and how hard is it to make a change later?

An **inline style** styles exactly one element and nothing else. It cannot be reused. If you want ten paragraphs to share the same look, you copy the same `style` attribute onto all ten, and the day you want to adjust that look you are editing ten separate tags and hoping you catch every one. It also jams appearance right into the middle of your structure, so your HTML becomes a tangle of content and styling that is genuinely hard to read. Inline styles break the separation of structure and presentation completely.

An **internal stylesheet** is a real step up. The rules are collected in one `<style>` block instead of scattered across tags, and a single rule there can style every matching element on the page at once. The problem is the phrase "on the page." That `<style>` block belongs to one HTML file. A second page cannot use it. Build a ten page site this way and you are copying the same block of CSS into all ten pages, and a change to your site's colours means editing that block ten times, in ten files, identically.

An **external stylesheet** removes both problems at once. The rules live in one `.css` file, and every page on the site links to that same file. Write a rule once and it applies everywhere the file is linked. Change a colour in that one file and every page updates together. Your HTML files stay clean, holding only structure, while all of the appearance lives in the stylesheet, exactly the separation of jobs a CSS project depends on.

There is a single principle underneath all three. The further you pull styling out of individual tags and into a shared file, the less you repeat yourself and the easier the whole site is to change. Inline is the extreme of repetition, external is the opposite, and internal sits in between. That is why "write some CSS" should always mean "add a rule to your linked stylesheet."

## Creating and linking your stylesheet

Do it for real, in your own project.

1. In VS Code's Explorer, create a new folder at the top level of your project called `css`.
2. Inside it, create a new file called `styles.css`. Your project now has `index.html` at the top and `css/styles.css` beneath it.
3. In `index.html`, add the link inside the `<head>`, on the line after the `<title>`:

```html
<link rel="stylesheet" href="css/styles.css">
```

4. In `styles.css`, add one obvious rule so you can see whether the connection works at all:

```css
body {
  background-color: whitesmoke;
}
```

5. Save both files. If you're running Live Server, your browser tab refreshes on its own and the page background should go pale grey.

**If nothing changed,** the connection is broken and this is worth fixing carefully now, because it's the single most common problem early on. Check three things, in this order. Is the `<link>` inside the `<head>`, not the `<body>`? Is the path exactly `css/styles.css`, matching your real folder and file names including their capitalisation? And did you actually save both files?

## The checklist

Run through this before you move on:

- Your `index.html` links an external stylesheet correctly: `rel="stylesheet"` and a working `href`, sitting inside the `<head>`
- You can choose between an inline style, an internal stylesheet, and an external stylesheet for a given job, and say why external wins for a real, multi-page project

## Keep learning

- [MDN: CSS first steps](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics). Covers attaching CSS to a page alongside the wider basics.
- [W3Schools: CSS How To](https://www.w3schools.com/css/css_howto.asp). A reference for all three ways of adding CSS to a page.
