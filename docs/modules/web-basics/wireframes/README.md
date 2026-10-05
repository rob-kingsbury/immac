---
title: Wireframes
prerequisites:
  - web-basics/site-maps
---

# Wireframes

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

## Mobile and desktop

Most pages get two wireframes: one for a narrow phone screen and one for a wide desktop screen. Here's the same product page drawn for a phone:

```
+------------------+
|  LOGO     [MENU] |
+------------------+
| [PRODUCT IMAGE ] |
|                  |
|  Product Name    |
|  $24.99          |
|  [ Add to Cart ] |
+------------------+
|  Description     |
|  text goes       |
|  here...         |
+------------------+
```

Compare it with the desktop version above. Two things changed, and they're what to look for in any pair:

- **Columns stack, which forces an order.** The image and the product details sat side by side on desktop. On a phone there's room for one column, so they stack, and something has to come first. Should the image sit above the name, or below the price? The phone wireframe makes you decide.
- **The navigation shrinks.** A row of links doesn't fit across a phone, so it usually collapses behind a menu button. Drawing that button is enough for now. Making it open and close is a later course's job.

What doesn't change is the HTML. Both wireframes describe the same page, so one skeleton serves both, and CSS rearranges it for each screen later. That makes the phone wireframe the more useful guide while you write the skeleton: its single column is the order a reader moves through the page, and that's the order your elements should appear in the code.

Keeping wireframes rough is a feature, not a limitation. A sketch is fast to change, and you *want* to change your mind cheaply at this stage, rather than after everything is coded. Paper and a pencil are a completely legitimate wireframing tool. So is a whiteboard, a slide deck, or a dedicated wireframing app, if you prefer one. The tool doesn't matter. Making the decision before you start coding does.

Worth being clear on a related term you'll hear in a UX Design course: a **prototype** is a step up in fidelity from a wireframe, sometimes clickable, closer to how the finished design will actually look and behave, used there to test a flow before it's built. Structural work like this course's starts from wireframes because structure, not interaction, is the job at hand, but a prototype you're handed from a design course is read the same way: name the regions, then translate them into semantic HTML, exactly as [Translating a Plan into Structure](/modules/web-basics/site-maps/translating-to-structure.md) covers next.

## The checklist

Run this over your plan before you open a code editor:

- Wireframe sketched for at least one page, boxes and labels only, no colour or real content
- A phone version and a desktop version of that page, with the stacking order decided

## Keep learning

- [Video: How to Wireframe a Website (beginner tutorial), by Aliena Cai](https://www.youtube.com/watch?v=ctOUj3bke3A). A practical walkthrough of building a wireframe from nothing.
