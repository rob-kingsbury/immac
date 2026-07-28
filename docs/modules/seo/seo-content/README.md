---
title: SEO Content
prerequisites:
  - html/html-headings
  - web-basics/site-maps
  - seo/seo-basics
---

# <abbr title="Search Engine Optimization">SEO</abbr> Content

The words and structure on the page itself are what a search engine ultimately ranks. Metadata gets you a fair hearing; the content, and the links between your pages, are what earn the result.

## Headings and keyword relevance

Search engines read your heading structure to understand hierarchy and topic, the same outline you build for accessibility. Your `<h1>` should clearly state the page's subject, and your `<h2>` headings should describe its real sections. A crawler builds an outline from those levels exactly the way a screen reader does, which is why the accessibility work you did earlier pays off twice.

Use the words your audience would actually search for, but write for people first. Two failure modes are worth naming. **Keyword stuffing**, repeating a target phrase unnaturally, reads badly to humans and is something search engines specifically penalize rather than reward. And **heading levels chosen for size**, picking `<h4>` because you wanted smaller text, breaks the outline that both the crawler and the screen reader depend on. Headings are structure. Size is <abbr title="Cascading Style Sheets">CSS</abbr>.

The goal is a page that genuinely answers a question well. The keywords follow from writing about the real topic.

## Internal linking

Internal links are links between pages of your own site, and they do two jobs at once. They help people move around, and they help search engines discover and understand your pages, since crawlers follow links to find content and read the link text as a clue about the destination.

Four habits make internal linking work.

**Use descriptive link text.** "See our sourdough class" tells both a reader and a crawler what's on the other end. "Click here" tells neither, and it's also the single most common accessibility complaint about links, since a screen reader user navigating by link list hears "click here" repeated with no context.

```html
<!-- Weak: the link text says nothing about where it goes -->
<p>Want to learn more about our classes? <a href="/classes/">Click here</a>.</p>

<!-- Strong: the destination is described by the words doing the linking -->
<p>Browse our <a href="/classes/">full class schedule</a> to find a time that works.</p>
```

Read the second version out of context, just the link text on its own with nothing around it. "Full class schedule" still means something. "Click here" doesn't.

**Make every page reachable from the home page** by following links. A page nothing links to is called an orphan page, and a crawler that can't reach it may never index it no matter how good it is.

<div class="diagram">
<svg viewBox="0 0 640 300" role="img" aria-label="A site link graph. Home sits at the top, with arrows pointing down to About, Menu, and Contact. Menu has further arrows pointing down to Food and Drinks. A separate box labelled Spring Promo sits to the side with a dashed border and no arrow pointing into it, labelled as an orphan page with no incoming links.">
  <rect x="260" y="20" width="120" height="44" rx="6" class="d-accent-soft d-accent-stroke" stroke-width="1.5"/>
  <text x="320" y="46" text-anchor="middle" class="d-lbl">Home</text>

  <rect x="40" y="130" width="130" height="44" rx="6" class="d-surface d-border" stroke-width="1.5"/>
  <text x="105" y="156" text-anchor="middle" class="d-lbl">About</text>

  <rect x="255" y="130" width="130" height="44" rx="6" class="d-surface d-border" stroke-width="1.5"/>
  <text x="320" y="156" text-anchor="middle" class="d-lbl">Menu</text>

  <rect x="470" y="130" width="130" height="44" rx="6" class="d-surface d-border" stroke-width="1.5"/>
  <text x="535" y="156" text-anchor="middle" class="d-lbl">Contact</text>

  <rect x="195" y="240" width="110" height="44" rx="6" class="d-surface d-border" stroke-width="1.5"/>
  <text x="250" y="266" text-anchor="middle" class="d-lbl">Food</text>

  <rect x="325" y="240" width="110" height="44" rx="6" class="d-surface d-border" stroke-width="1.5"/>
  <text x="380" y="266" text-anchor="middle" class="d-lbl">Drinks</text>

  <line x1="320" y1="64" x2="105" y2="128" class="d-accent-stroke" stroke-width="2"/>
  <path d="M 99 120 L 105 130 L 111 120 Z" class="d-accent"/>

  <line x1="320" y1="64" x2="320" y2="128" class="d-accent-stroke" stroke-width="2"/>
  <path d="M 314 120 L 320 130 L 326 120 Z" class="d-accent"/>

  <line x1="320" y1="64" x2="535" y2="128" class="d-accent-stroke" stroke-width="2"/>
  <path d="M 529 120 L 535 130 L 541 120 Z" class="d-accent"/>

  <line x1="320" y1="174" x2="250" y2="238" class="d-accent-stroke" stroke-width="2"/>
  <path d="M 244 230 L 250 240 L 256 230 Z" class="d-accent"/>

  <line x1="320" y1="174" x2="380" y2="238" class="d-accent-stroke" stroke-width="2"/>
  <path d="M 374 230 L 380 240 L 386 230 Z" class="d-accent"/>

  <rect x="470" y="240" width="150" height="44" rx="6" class="d-surface d-border" stroke-width="1.5" stroke-dasharray="5 4"/>
  <text x="545" y="266" text-anchor="middle" class="d-lbl">Spring Promo</text>
  <text x="545" y="300" text-anchor="middle" class="d-lbl-muted">no incoming links</text>
</svg>
<figcaption>Every box but one connects back to Home by following arrows. Spring Promo has nothing pointing to it, so a crawler that only discovers pages by following links may never reach it, however good the page itself is.</figcaption>
</div>

**Keep important pages shallow.** If a visitor needs five clicks from the home page to reach something, both people and crawlers treat it as less important. The [three-click guideline](/modules/web-basics/site-maps/README.md#the-three-click-guideline) applies here too.

**Link related pages to each other,** not just from a navigation bar. Contextual links inside your content carry more meaning than a repeated site-wide menu, because the surrounding words tell the search engine what the target is about.

## Common mistakes to avoid

- **Keyword stuffing.** Repeating a target phrase unnaturally in a heading or description is penalized, not rewarded.
- **Skipping heading levels to control size.** It breaks the outline crawlers and screen readers both rely on.
- **"Click here" link text.** Bad for search engines, worse for screen reader users, and it costs nothing to fix.

## The checklist

Run this over a page before you move on:

- Heading structure serves both SEO and accessibility: no skipped levels, and no level chosen for its default size
- No keyword stuffing, in a heading, a title, or a description
- Link text is descriptive on its own, never "click here" or "read more"
- No orphan pages, every page reachable by following links from the home page
- Important pages sit within the [three-click guideline](/modules/web-basics/site-maps/README.md#the-three-click-guideline)
