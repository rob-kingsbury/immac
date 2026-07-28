---
title: Site Architecture and Planning
---

# Site Architecture and Planning

Every chapter so far has been about building individual pages. A website is more than a pile of pages, though. It has a shape: which pages exist, how they connect, and how someone moves through them. This chapter is about planning that shape before you write a line of markup, so the semantic structure you already know how to build has a plan to follow, rather than being invented page by page as you go.

## How to read this chapter

**The core path is everything down to the checklist.** Read through site maps, content hierarchy, wireframes, and the translation into semantic HTML, then work through the exercise at the end. Budget about 30 minutes to read it, plus the 45 minutes the exercise takes.

Sections headed **Going deeper** are optional and add roughly 15 minutes altogether. They cover a lightweight technique for deciding what belongs on a site map before you draw it, a structural navigation pattern built entirely from elements you already know, and a habit for keeping a project's folders honest about the site map they came from. Skip them on a busy week and nothing breaks. The assignment only needs the core path.

You don't need any new tool for this chapter. Paper, a whiteboard, or a slide deck all work for the planning artifacts below, the same as they did in earlier weeks.

## Information architecture, briefly

**Information architecture** is the overall organization of a site's content: what exists, how it's grouped, and how it relates. A **site map** is one concrete artifact that represents part of that organization, a diagram of pages and their relationships. The two terms get used interchangeably in casual conversation, but it's worth knowing the distinction: information architecture is the thinking, a site map is one drawing that comes out of it.

## Going deeper: content inventory and card sorting

*Optional depth. The core path picks up again at Site maps below.*

A site map answers "how is this organized." It doesn't answer "what actually belongs in it." Before you draw a single tree, it helps to know what content exists, or needs to exist, without worrying yet about how it's grouped. That flat, unstructured list is a **content inventory**: every page or piece of content the site needs, written down with no hierarchy imposed. For the Corner Bakery example used through this course, a content inventory might just be a list: Home, About, Hours and Location, Menu (Food), Menu (Drinks), Catering, Gift Cards, Contact. Nothing about order or grouping yet, just an honest accounting of what's there.

**Card sorting** is the technique that turns that flat list into groups. Write each inventory item on an actual card, a sticky note, or a line in a spreadsheet, then sort the items into piles that feel like they belong together. Do this yourself for a small project, or better, hand the items to two or three people who don't already know the site and watch where they put things. Nielsen Norman Group, the same usability research group behind the site map finding later in this chapter, describes card sorting as a way to uncover how someone else's mental model of your content differs from your own, which is exactly the gap a site map drawn from assumption alone tends to miss.

You don't need software or a formal study to get value from this. For a five-page site like the ones this course assigns, ten minutes with sticky notes on a table is enough. Write out every piece of content, group the notes by hand, and see what categories emerge before committing to a site map:

```text
Loose inventory:
Home, About, Hours and Location, Menu (Food), Menu (Drinks),
Catering, Gift Cards, Contact

Sorted into piles:
Visit Us      -> About, Hours and Location, Contact
Menu          -> Menu (Food), Menu (Drinks)
Order Ahead   -> Catering, Gift Cards
```

If "Hours and Location" keeps landing next to "Contact" every time you sort, that's a stronger signal for how to group your navigation than guessing would have been. That's what card sorting is for: catching a grouping like that before you've drawn a single box, rather than after. The worked site map in the next section keeps the Corner Bakery example flatter, since it's a smaller project used to walk through the rest of this chapter, but the sorting instinct is exactly the same one you'd apply to a fuller site of your own: group by how a visitor actually thinks about the content, not by how the pages happen to occur to you.

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

## Going deeper: mirror your file structure to your site map

*Optional depth. The core path picks up again at Content hierarchy below.*

The Links, Images, and Media chapter covered relative paths: how a link like `menu/drinks.html` finds a file relative to the page it's written on. A site map is a planning tool, but it also doubles as a specification for that folder structure, if you let it.

Take the bakery site map from above:

```text
Home
├── About
├── Menu
│   ├── Food
│   └── Drinks
└── Contact
```

A folder structure that mirrors it exactly looks like this:

```text
/
├── index.html
├── about.html
├── menu/
│   ├── food.html
│   └── drinks.html
└── contact.html
```

Every branch in the tree became either a file or a folder at the same depth. "Menu" is a section with two pages under it, so it became a folder, `menu/`, holding `food.html` and `drinks.html`. A page with nothing nested under it, like About or Contact, is just a file at the top level.

This isn't a rule GitHub Pages enforces. Nothing stops you from putting every file in one folder with names like `menu-food.html`. But when the folder structure matches the site map, the relative path from anywhere in the project matches the branch you already drew, which is one less thing to hold in your head:

```html
<!-- Written from a page inside /menu/, linking back to the home page -->
<a href="../index.html">Home</a>

<!-- Written from the home page, linking into the Menu section -->
<a href="menu/drinks.html">Drinks</a>
```

Six months from now, when you or someone else opens this project cold, a folder named `menu/` containing `food.html` and `drinks.html` reads as self-documenting. A flat folder of eleven similarly named files does not. Decide your folder structure at the same time you draw your site map, not after you've already started creating files, and the two will always agree with each other.

## Content hierarchy

Within a single page, hierarchy is the order of importance of the content. It's the same idea as the heading levels from Core <abbr title="HyperText Markup Language">HTML</abbr> Elements, applied to planning rather than markup. What's the one thing this page is about (the `<h1>`)? What are its major parts (the `<h2>` sections)? What's supporting detail underneath?

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

Worth being clear on a related term you'll hear in your <abbr title="User Experience">UX</abbr> Design course: a **prototype** is a step up in fidelity from a wireframe, sometimes clickable, closer to how the finished design will actually look and behave, used there to test a flow before it's built. This course works from wireframes because structure, not interaction, is the job at hand, but a prototype you're handed from that course is read the same way: name the regions, then translate them into semantic HTML, exactly as below.

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

Notice there's no real content yet, and no styling. This is the structural pass: get the regions and their nesting right, matching your plan, and fill in the details afterward. The Result box shows italic placeholder text where the code has HTML comments, since a comment renders as nothing at all, an empty box would be harder to read than a labelled one.

The same regions, drawn as a page layout instead of code, look like this. Each box is labelled with the element that implements it:

<div class="diagram">
<svg viewBox="0 0 480 400" role="img" aria-label="A page wireframe with labelled regions, each annotated with the semantic HTML element that implements it. A header region at the top contains a logo box and a nav box, labelled header and nav. Below it, a main region contains a section with two side by side article boxes, labelled main, section, and article. A footer region spans the bottom, labelled footer.">
  <rect x="10" y="10" width="460" height="380" rx="8" class="d-surface d-border" stroke-width="1.5"/>

  <rect x="26" y="26" width="428" height="62" rx="6" class="d-accent-soft d-accent-stroke" stroke-width="1.5"/>
  <rect x="40" y="42" width="90" height="30" rx="3" class="d-surface d-border" stroke-width="1.5"/>
  <text x="85" y="61" text-anchor="middle" class="d-lbl-muted">LOGO</text>
  <rect x="150" y="42" width="290" height="30" rx="3" class="d-surface d-border" stroke-width="1.5" stroke-dasharray="4 3"/>
  <text x="295" y="61" text-anchor="middle" class="d-lbl-muted">nav links</text>
  <text x="440" y="40" text-anchor="end" class="d-lbl-mono">&lt;header&gt;</text>
  <text x="295" y="37" text-anchor="middle" class="d-lbl-mono">&lt;nav&gt;</text>

  <rect x="26" y="98" width="428" height="222" rx="6" class="d-surface d-border" stroke-width="1.5"/>
  <text x="440" y="116" text-anchor="end" class="d-lbl-mono">&lt;main&gt;</text>

  <rect x="40" y="122" width="400" height="184" rx="6" class="d-accent-soft d-accent-stroke" stroke-width="1.5"/>
  <text x="54" y="142" class="d-lbl-muted">Today's specials</text>
  <text x="424" y="142" text-anchor="end" class="d-lbl-mono">&lt;section&gt;</text>

  <rect x="54" y="154" width="180" height="140" rx="4" class="d-surface d-border" stroke-width="1.5"/>
  <line x1="70" y1="176" x2="190" y2="176" class="d-muted-stroke" stroke-width="4"/>
  <line x1="70" y1="194" x2="216" y2="194" class="d-muted-stroke" stroke-width="2.5"/>
  <line x1="70" y1="208" x2="198" y2="208" class="d-muted-stroke" stroke-width="2.5"/>
  <text x="144" y="278" text-anchor="middle" class="d-lbl-mono">&lt;article&gt;</text>

  <rect x="246" y="154" width="180" height="140" rx="4" class="d-surface d-border" stroke-width="1.5"/>
  <line x1="262" y1="176" x2="382" y2="176" class="d-muted-stroke" stroke-width="4"/>
  <line x1="262" y1="194" x2="408" y2="194" class="d-muted-stroke" stroke-width="2.5"/>
  <line x1="262" y1="208" x2="390" y2="208" class="d-muted-stroke" stroke-width="2.5"/>
  <text x="336" y="278" text-anchor="middle" class="d-lbl-mono">&lt;article&gt;</text>

  <rect x="26" y="334" width="428" height="52" rx="6" class="d-accent-soft d-accent-stroke" stroke-width="1.5"/>
  <text x="40" y="365" class="d-lbl-muted">contact + hours</text>
  <text x="440" y="356" text-anchor="end" class="d-lbl-mono">&lt;footer&gt;</text>
</svg>
<figcaption>The same wireframe region can be read two ways: as boxes on a page, or as the nested elements in the code above. Planning the first gives you the second for free.</figcaption>
</div>

Building this way, plan first and structure second, is what separates a site that grows cleanly from one that turns into tangled markup halfway through.

## Going deeper: breadcrumb navigation

*Optional depth. The core path picks up again at The checklist below.*

The three-click guideline earlier in this chapter is a planning check: it tells you when a site map is getting too deep. Breadcrumb navigation is the structural pattern that helps once a site actually has some depth to it, showing a visitor the path from the home page down to where they are right now.

For the bakery site's Menu > Drinks page, a breadcrumb reads: Home / Menu / Drinks. It's built from two elements you already know, `<nav>` and `<ol>`, used in a specific, recognized way:

```html
<!-- Wrong: no landmark, nothing marks this as a breadcrumb trail -->
<div class="breadcrumb">
  <a href="/">Home</a> &gt;
  <a href="/menu/">Menu</a> &gt;
  Drinks
</div>
```

A screen reader has no way to announce that as breadcrumb navigation. It's just a div holding some links, indistinguishable from any other paragraph on the page.

```html
<!-- Right: a labelled navigation landmark, ordered because the path is a sequence -->
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/menu/">Menu</a></li>
    <li aria-current="page">Drinks</li>
  </ol>
</nav>
```

Three things are doing real work here. The `<nav>` element marks this as a navigation landmark, the same role it plays in your page header, so a screen reader user can jump straight to it. `aria-label="Breadcrumb"` names that landmark, since a page usually has more than one `<nav>` (the main site navigation is one, this is another), and "Breadcrumb" is the conventional label assistive technology looks for. The list is ordered, `<ol>` rather than `<ul>`, because the sequence is the entire point: Home, then Menu, then Drinks, in that order, unlike a set of navigation links where the order is just a design choice.

The last item is deliberately not a link. You're already on the Drinks page, so linking to it again would go nowhere useful. `aria-current="page"` marks it as the current location instead, the same attribute a main navigation menu uses to mark its active item.

Breadcrumbs earn their place on pages where the three-click guideline is already telling you the site has real depth: a Menu section with Food and Drinks underneath it is exactly that case. A three-page portfolio site with no nesting doesn't need one; there's nowhere for a breadcrumb to lead from. Add one once your site map shows a page that isn't a direct child of Home.

## The checklist

Run this over your plan before you open a code editor:

- Site map drawn, as a tree from the home page down to every planned page
- Every page checked against the three-click guideline
- Page-level content hierarchy decided, what's the `<h1>` and what are the `<h2>` sections, before writing markup
- Wireframe sketched for at least one page, boxes and labels only, no colour or real content
- Wireframe regions translated into the semantic elements that implement them
- Folder structure mirrors the site map, so a relative link matches the branch it lives on

## Keep learning

- [W3Schools: HTML Layout Elements and Techniques](https://www.w3schools.com/html/html_layout.asp). A refresher on the semantic layout elements this chapter's plans translate into.
- [Nielsen Norman Group: Site Map Usability](https://www.nngroup.com/reports/site-map-usability/). The actual research behind the "simple, single-view site map" finding cited earlier in this chapter.
- [Nielsen Norman Group: Card Sorting, Uncover Users' Mental Models](https://www.nngroup.com/articles/card-sorting-definition/). The research behind the card-sorting technique in this chapter's first Going deeper section.
- [MDN: Breadcrumb navigation](https://developer.mozilla.org/en-US/docs/Web/CSS/How_to/Layout_cookbook/Breadcrumb_navigation). The accessible markup pattern this chapter's breadcrumb example follows, with styling options.
- [Video: How to Wireframe a Website (beginner tutorial), by Aliena Cai](https://www.youtube.com/watch?v=ctOUj3bke3A). A practical walkthrough of building a wireframe from nothing.
- [Video: How to Plan a Website Sitemap, by Brainstorm Force](https://www.youtube.com/watch?v=O3BXKqlfHGs). Covers the same site-mapping process as this chapter, with more worked examples.

## Try it yourself (about 45 minutes)

Pick a small site you'd realistically build, three to five pages. Draw its site map as an indented list, and check it against the three-click guideline. Choose one of those pages and sketch a wireframe of it, boxes and labels only, no colour or real content.

Then, without adding any real content, write the HTML skeleton for that page using semantic elements that match your wireframe regions. Name each region out loud before you type it: "this is the header, this is the main, these three repeated blocks are articles." You now have a plan and a structure ready to fill in.

If your site map has any page nested under a section rather than sitting directly off Home, add a breadcrumb to that page's skeleton too: a `<nav aria-label="Breadcrumb">` holding an `<ol>` that matches the branch you drew, with `aria-current="page"` marking the page you're on.

Your plan is solid. Next week checks whether the page built from it actually works for every visitor, not just the ones who match your own assumptions.
