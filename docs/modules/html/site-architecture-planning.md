---
title: Site Architecture and Planning
---

# Site Architecture and Planning

Every week so far has been about building individual pages. A website is more than a pile of pages, though. It has a shape: which pages exist, how they connect, and how someone moves through them. This week is about planning that shape before you write the markup, so the code you write has somewhere to live.

## Site maps

A site map is a simple diagram of every page on a site and how they relate. It's usually a tree, with the home page at the top and sections branching below.

```
Home
├── About
├── Menu
│   ├── Food
│   └── Drinks
└── Contact
```

Drawing this first answers questions before they become problems. How many pages do you actually need? What goes in the main navigation and what's a sub-page? Is anything more than two or three clicks from the home page, which is usually a sign the structure is too deep? You can sketch a site map on paper, in a diagramming tool, or as a plain indented list like the one above. The tool doesn't matter. Having made the decision before you start coding does.

## Content hierarchy

Within a single page, hierarchy is the order of importance of the content. It's the same idea as the heading levels from week two, applied to planning rather than markup. What's the one thing this page is about (the `<h1>`)? What are its major parts (the `<h2>` sections)? What's supporting detail underneath?

Deciding hierarchy up front is what lets you drop into semantic HTML cleanly. If you know a page is an article with three sections, you already know it needs one `<main>`, one `<article>`, and three `<section>` elements before you type a single tag.

## Wireframes

A wireframe is a low-detail sketch of a single page's layout. Boxes for where things go, labels for what they are, and deliberately no colour, fonts, or real images. The point is to decide arrangement (where the navigation sits, how content columns stack, what's above the fold) without getting distracted by visual design.

A wireframe for a product page might be nothing more than labelled rectangles: a header bar across the top, a large image box on the left, a heading and price block on the right, a description below. That's enough to see the structure and to map it directly onto HTML regions.

Keeping wireframes rough is a feature, not a limitation. A sketch is fast to change, and you *want* to change your mind cheaply at this stage rather than after everything is coded.

## From your UX course to your HTML

In your UX Design course you produce the design side of this planning: user flows, wireframes, and mockups of how a site should look and behave. This course is where those plans become working HTML. The wireframe that says "navigation across the top, three cards below" is your instruction sheet for which semantic elements to reach for and how to nest them.

Treat a mockup as a structure to translate, not a picture to copy. Before writing markup, look at a mockup and name the regions out loud: that's a `<header>`, that's the `<main>`, those three repeated blocks are `<article>` elements. Coding becomes far faster once you can read a design as a set of HTML regions.

## Translating a plan into structure

Here's the whole workflow in one example. Start with a wireframe region, and write the skeleton it implies:

```html
<body>
  <header>
    <h1>Corner Bakery</h1>
    <nav><!-- main navigation --></nav>
  </header>

  <main>
    <section>
      <h2>Today's specials</h2>
      <article><!-- one special --></article>
      <article><!-- another special --></article>
    </section>
  </main>

  <footer><!-- contact and hours --></footer>
</body>
```

Notice there's no real content yet, and no styling. This is the structural pass: get the regions and their nesting right, matching your plan, and fill in the details afterward. Building this way, plan first and structure second, is what separates a site that grows cleanly from one that turns into tangled markup halfway through.

## Try it yourself

Pick a small site you'd realistically build, three to five pages. Draw its site map as an indented list. Choose one of those pages and sketch a wireframe of it, boxes and labels only. Then, without adding any real content, write the HTML skeleton for that page using semantic elements that match your wireframe regions. You now have a plan and a structure ready to fill in.
