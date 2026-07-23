---
title: Site Architecture and Planning
---

# Site Architecture and Planning

Every chapter so far has been about building individual pages. A website is more than a pile of pages, though. It has a shape: which pages exist, how they connect, and how someone moves through them. This chapter is about planning that shape before you write a line of markup, so the semantic structure you already know how to build has a plan to follow, rather than being invented page by page as you go.

## Information architecture, briefly

**Information architecture** is the overall organization of a site's content: what exists, how it's grouped, and how it relates. A **site map** is one concrete artifact that represents part of that organization, a diagram of pages and their relationships. The two terms get used interchangeably in casual conversation, but it's worth knowing the distinction: information architecture is the thinking, a site map is one drawing that comes out of it.

## Site maps

A site map is usually a tree, with the home page at the top and sections branching below:

```
Home
├── About
├── Menu
│   ├── Food
│   └── Drinks
└── Contact
```

Drawing this first answers questions before they become problems in code. How many pages do you actually need? What belongs in the main navigation, and what's a sub-page reached from somewhere else? Nielsen Norman Group's usability research on site maps found that users complete tasks far more successfully when a site map is simple and shows everything in view at once, rather than scattered across many small pages. The same principle applies to your own planning: a site map you can see in its entirety is one you can actually reason about.

Here's a second example, for a small portfolio site, to show the pattern isn't only for stores or restaurants:

```
Home
├── Projects
│   ├── Project One
│   └── Project Two
├── About
└── Contact
```

### The three-click guideline

A common rule of thumb: no page should be more than two or three clicks from the home page. It's not a hard law, but it's a useful check. If your site map has a page buried four levels deep, that's usually a sign the structure needs a shortcut, a broader top-level category, or a rethink of what's actually important enough to put in the main navigation.

## Content hierarchy

Within a single page, hierarchy is the order of importance of the content. It's the same idea as the heading levels from Core HTML Elements, applied to planning rather than markup. What's the one thing this page is about (the `<h1>`)? What are its major parts (the `<h2>` sections)? What's supporting detail underneath?

Deciding hierarchy up front is what lets you drop into semantic HTML cleanly. If you know a page is an article with three sections, you already know it needs one `<main>`, one `<article>`, and three `<section>` elements before you type a single tag. Planning the hierarchy and choosing the semantic elements are really the same decision, made at two different times.

## Wireframes

A wireframe is a low-detail sketch of a single page's layout. Boxes for where things go, labels for what they are, and deliberately no colour, fonts, or real images. The point is to decide arrangement (where the navigation sits, how content columns stack, what's above the fold) without getting distracted by visual design.

A wireframe for a product page might be nothing more than labelled rectangles, described here in text since a wireframe itself is a drawing:

```
+--------------------------------------+
|  LOGO         NAV  NAV  NAV          |
+--------------------------------------+
|                                      |
|  [ PRODUCT IMAGE ]   Product Name    |
|                       $24.99         |
|                       [ Add to Cart] |
|                                      |
+--------------------------------------+
|  Description text goes here...       |
+--------------------------------------+
```

That's enough to see the structure and to map it directly onto HTML regions: a `<header>` with a `<nav>`, a `<main>` containing an image and a heading/price/button group, and a `<section>` below for the description.

Keeping wireframes rough is a feature, not a limitation. A sketch is fast to change, and you *want* to change your mind cheaply at this stage, rather than after everything is coded. Paper and a pencil are a completely legitimate wireframing tool. So is a whiteboard, a slide deck, or a dedicated wireframing app, if you prefer one. The tool doesn't matter. Making the decision before you start coding does.

Worth being clear on a related term you'll hear in your UX Design course: a **prototype** is a step up in fidelity from a wireframe, sometimes clickable, closer to how the finished design will actually look and behave, used there to test a flow before it's built. This course works from wireframes because structure, not interaction, is the job at hand, but a prototype you're handed from that course is read the same way: name the regions, then translate them into semantic HTML, exactly as below.

## From your UX course to your HTML

In your UX Design course you produce the design side of this planning: user flows, wireframes, and mockups of how a site should look and behave. This course is where those plans become working HTML. The wireframe that says "navigation across the top, three cards below" is your instruction sheet for which semantic elements to reach for and how to nest them.

Treat a mockup as a structure to translate, not a picture to copy. Before writing markup, look at a mockup and name the regions out loud: that's a `<header>`, that's the `<main>`, those three repeated blocks are `<article>` elements. Coding becomes far faster once you can read a design as a set of HTML regions rather than a picture to reproduce pixel by pixel.

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

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<header>
  <h1>Corner Bakery</h1>
  <nav><em>(main navigation)</em></nav>
</header>

<section>
  <h2>Today's specials</h2>
  <p><em>(one special)</em></p>
  <p><em>(another special)</em></p>
</section>

<footer><em>(contact and hours)</em></footer>
</div>
</details>

Notice there's no real content yet, and no styling. This is the structural pass: get the regions and their nesting right, matching your plan, and fill in the details afterward. The Result box shows italic placeholder text where the code has HTML comments, since a comment renders as nothing at all, an empty box would be harder to read than a labelled one. Building this way, plan first and structure second, is what separates a site that grows cleanly from one that turns into tangled markup halfway through.

## Keep learning

- [W3Schools: HTML Layout Elements and Techniques](https://www.w3schools.com/html/html_layout.asp). A refresher on the semantic layout elements this chapter's plans translate into.
- [Nielsen Norman Group: Site Map Usability](https://www.nngroup.com/reports/site-map-usability/). The actual research behind the "simple, single-view site map" finding cited earlier in this chapter.
- [Video: How to Wireframe a Website (beginner tutorial), by Aliena Cai](https://www.youtube.com/watch?v=ctOUj3bke3A). A practical walkthrough of building a wireframe from nothing.
- [Video: How to Plan a Website Sitemap, by Brainstorm Force](https://www.youtube.com/watch?v=O3BXKqlfHGs). Covers the same site-mapping process as this chapter, with more worked examples.

## Try it yourself (about 45 minutes)

Pick a small site you'd realistically build, three to five pages. Draw its site map as an indented list, and check it against the three-click guideline. Choose one of those pages and sketch a wireframe of it, boxes and labels only, no colour or real content.

Then, without adding any real content, write the HTML skeleton for that page using semantic elements that match your wireframe regions. Name each region out loud before you type it: "this is the header, this is the main, these three repeated blocks are articles." You now have a plan and a structure ready to fill in.

Your plan is solid. Next week checks whether the page built from it actually works for every visitor, not just the ones who match your own assumptions.
