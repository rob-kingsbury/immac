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

Keeping wireframes rough is a feature, not a limitation. A sketch is fast to change, and you *want* to change your mind cheaply at this stage, rather than after everything is coded. Paper and a pencil are a completely legitimate wireframing tool. So is a whiteboard, a slide deck, or a dedicated wireframing app, if you prefer one. The tool doesn't matter. Making the decision before you start coding does.

Worth being clear on a related term you'll hear in a UX Design course: a **prototype** is a step up in fidelity from a wireframe, sometimes clickable, closer to how the finished design will actually look and behave, used there to test a flow before it's built. Structural work like this course's starts from wireframes because structure, not interaction, is the job at hand, but a prototype you're handed from a design course is read the same way: name the regions, then translate them into semantic HTML, exactly as [Translating a Plan into Structure](/modules/web-basics/site-maps/translating-to-structure.md) covers next.

## The checklist

Run this over your plan before you open a code editor:

- Wireframe sketched for at least one page, boxes and labels only, no colour or real content

## Keep learning

- [Video: How to Wireframe a Website (beginner tutorial), by Aliena Cai](https://www.youtube.com/watch?v=ctOUj3bke3A). A practical walkthrough of building a wireframe from nothing.
