---
title: Advanced HTML Patterns
---

# Advanced <abbr title="HyperText Markup Language">HTML</abbr> Patterns

By now you can build a complete, valid, accessible page. This chapter rounds out your <abbr title="HyperText Markup Language">HTML</abbr> with the patterns that come up on real sites: embedding content from other services safely, keeping that content responsive, polishing the document head, and building interactive disclosure widgets with no JavaScript at all. It also takes an honest look at three elements you'll see in every "modern HTML" list you find online, and this course doesn't build with any of them, for reasons worth understanding rather than just accepting.

## How to read this chapter

**The core path is everything down to the checklist.** Read the sections in order, try the embed pattern and the <abbr title="Frequently Asked Questions">FAQ</abbr> pattern as you go, and you have what the assignment needs. Budget about 30 minutes to read, plus the 45 minutes the exercise takes.

One section headed **Going deeper** is optional and adds roughly 5 minutes: a newer accordion variant of `<details>`. Skip it this week if you're short on time; nothing in the assignment depends on it.

This chapter also spends real time on three elements you will not build with in this course: `<dialog>`, `<template>`, and `popover`. That's deliberate, not an oversight. Knowing what a tool is for, and knowing when it isn't yet the right tool for what you can actually build, are both part of being good at this. This week is where that judgment call gets made explicit instead of left for you to guess at.

## Embedding third-party content

Most sites include things they didn't build: a YouTube video, a Google Map, a booking widget. These come as embed codes, usually an `<iframe>`, that you paste into your markup.

```html
<iframe
  src="https://www.youtube.com/embed/VIDEO_ID"
  title="How to shape a sourdough loaf"
  width="560" height="315"
  loading="lazy"
  allowfullscreen></iframe>
```

A few practices make embeds behave. Always give the `<iframe>` a `title` describing its content, for the same accessibility reason images need `alt`. Add `loading="lazy"` so an embed lower on the page doesn't slow the initial load. And paste embed codes only from services you trust, since an `<iframe>` loads and runs another site's content inside your page, effectively giving that site a window into yours. The `sandbox` attribute below is the other half of that trust question: it lets you take an embed whose content you trust but whose permissions you'd rather limit.

An `<iframe>` with no `sandbox` attribute can, by default, run scripts, submit forms, open popups, and navigate the page it's embedded in, essentially everything the embedded site could do if a visitor opened it directly in its own tab. Most embed code you paste in, a video player, a map, doesn't need all of that.

The `sandbox` attribute turns those permissions off, then lets you switch specific ones back on by name:

```html
<iframe
  src="https://www.youtube.com/embed/VIDEO_ID"
  title="How to shape a sourdough loaf"
  width="560" height="315"
  loading="lazy"
  sandbox="allow-scripts allow-same-origin allow-presentation"
  allowfullscreen></iframe>
```

Written with no value at all, `sandbox` blocks everything and is the strictest setting available. Each `allow-*` token you add back is a permission you've decided that specific embed genuinely needs. `allow-scripts` lets it run JavaScript, which most video and map embeds require just to function. Get the token list wrong and the embed tends to break silently rather than showing an error, so add `sandbox`, reload, and confirm the embed still works before you trust the result.

This is a well-established attribute, not a new one, and it's supported anywhere `<iframe>` itself is. Add it to every third-party embed you paste in, the same habit as `title` and `loading="lazy"` above, since most embed code from a reputable provider works fine under it and it costs you nothing when it does.

One thing an `<iframe>` doesn't hand you is control over what's inside it. Captions on an embedded video, keyboard behaviour inside an embedded map, colour contrast in a booking widget: all of that belongs to the site you embedded, and your page inherits whatever accessibility work that site did or didn't do. Your responsibility stops at the frame boundary, the `title`, and deciding whether the embed belongs on the page at all. That's a real limit, not a loophole, and it's worth knowing where it sits before a client asks why an embedded widget doesn't behave like the rest of the accessible page you built around it.

## Responsive media containers

An `<iframe>` has a fixed `width` and `height`, which breaks on small screens: a 560-pixel-wide video overflows a 375-pixel phone. The fix is a container that holds a shape (an aspect ratio) while letting the size flex.

```html
<div class="video-wrapper">
  <iframe src="..." title="..." allowfullscreen></iframe>
</div>
```

The container gets a fixed aspect ratio in <abbr title="Cascading Style Sheets">CSS</abbr> (16 by 9 for most video) and the `<iframe>` is set to fill it completely. The result scales smoothly from desktop to phone without distortion. You'll write the CSS side in your styling course; the HTML pattern is the wrapper element around the embed, and it's worth building the habit of wrapping every embed now, before you have a page full of unwrapped ones to fix later.

The reason this needs a wrapper at all, rather than just resizing the `<iframe>` directly, is that `width` and `height` on an `<iframe>` set its pixel dimensions once, not a ratio it maintains as the page resizes. Shrink the browser window and the frame doesn't shrink with it unless something else is telling it to. The wrapper is what carries the ratio; the `<iframe>` inside it just fills whatever shape the wrapper currently is. The same problem and the same fix apply to any embed with fixed `width` and `height`, not only video: a map, a form builder, a social media post, anything delivered as an `<iframe>` gets the same wrapper treatment.

## Document head best practices

The `<head>` holds information about the page rather than visible content, and a complete one has become standard. Pulling together the pieces from across the course:

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Specific Page Title | Site Name</title>
  <meta name="description" content="A concise summary of this page.">
  <link rel="canonical" href="https://example.com/this-page">
  <link rel="icon" href="/favicon.ico">
  <link rel="stylesheet" href="css/styles.css">
</head>
```

Two of these are easy to forget and important. The `charset` declaration ensures characters and symbols display correctly, and without it, special characters can render as garbled text. The `viewport` meta tag is what makes a page respond properly to mobile screens rather than rendering a shrunken desktop layout that a phone user has to pinch and zoom to read. Both belong in the head of every page you build, no exceptions.

The other two are easy to get backwards. `canonical` tells a search engine which <abbr title="Uniform Resource Locator">URL</abbr> is the "real" one when the same content is reachable at more than one address, your GitHub Pages project URL and a custom domain, for instance. Point it at whichever address you want indexed and shared. `description` is the summary a search result shows under your title, not a place for keywords, and you'll put real work into writing a good one when the SEO weeks get there. Neither attribute changes how the page looks or behaves for a visitor; both change how the page is found and understood by something reading the markup rather than rendering it, which is the whole reason the `<head>` exists as a section separate from the visible page.

## The details and summary elements

Some interactive patterns that used to require JavaScript are now built directly into HTML. `<details>` and `<summary>` create an expand-and-collapse disclosure widget, an FAQ answer that opens on click, with no scripting at all.

```html
<details>
  <summary>What should I bring to the class?</summary>
  <p>Just yourself. All ingredients and equipment are provided.</p>
</details>
```

`<summary>` is always the first child, and it's what stays visible when the widget is closed. Everything else inside `<details>` is the content that reveals when it's opened.

A real FAQ section is usually more than one question, and `<details>` elements need nothing extra to sit next to each other. Each one opens and closes independently, they can be nested when a question has a natural follow-up, and adding `open` with no value starts a panel expanded on page load instead of collapsed.

```html
<details>
  <summary>Is the class suitable for beginners?</summary>
  <p>Yes. No prior baking experience is assumed.</p>
  <details>
    <summary>What if I've never used an oven before?</summary>
    <p>The instructor walks through oven basics in the first ten minutes.</p>
  </details>
</details>

<details open>
  <summary>What's the cancellation policy?</summary>
  <p>Full refund up to 48 hours before the class starts.</p>
</details>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<details>
  <summary>Is the class suitable for beginners?</summary>
  <p>Yes. No prior baking experience is assumed.</p>
  <details>
    <summary>What if I've never used an oven before?</summary>
    <p>The instructor walks through oven basics in the first ten minutes.</p>
  </details>
</details>
<details open>
  <summary>What's the cancellation policy?</summary>
  <p>Full refund up to 48 hours before the class starts.</p>
</details>
</div>
</details>

Click through the Result box above. Both widgets are genuinely interactive, the same native element powering the collapsible Result boxes throughout this entire textbook. The nested question only appears once its parent is open, and the cancellation panel starts open because of the `open` attribute on it specifically, not because it's related to the other two. Nesting and `open` are both independent, per-element choices.

### Going deeper: grouping details into an exclusive accordion

Stack several `<details>` elements and by default they're fully independent: open three and all three stay open. Sometimes you want the opposite, an accordion where opening one question closes whichever one was already open.

As of September 2024, HTML added a `name` attribute for exactly that:

```html
<details name="faq-group">
  <summary>What should I bring?</summary>
  <p>Just yourself.</p>
</details>

<details name="faq-group">
  <summary>Is there parking on site?</summary>
  <p>Yes, free parking behind the building.</p>
</details>
```

Give a set of `<details>` elements the same `name` and the browser makes them mutually exclusive, the same relationship a group of radio buttons already has in a form. It's newly available rather than widely available across browsers yet, so it isn't part of this course's assignments. Recognise it. If you're building an accordion where only one panel should ever be open at a time, `name` is the attribute that does it without a line of script, once it's had more time to settle.

## Elements this course names but doesn't build with

Three elements come up constantly in any current list of "modern HTML": `<dialog>`, `<template>`, and `popover`. All three are worth knowing by name, and none of them get built into your assignments this term. The reason is the same reason each time: this course has no JavaScript in it, and each of these three either does nothing without a script or was judged not yet settled enough across browsers to teach as the default answer. That's not a verdict that they're bad, or that you should avoid them forever. It's a statement about what's actually buildable with the tools this course gives you right now.

The habit worth taking from this section isn't memorising which element does what. It's the question underneath: before reaching for something you saw on a "modern HTML" list, ask whether it does its job with what you actually have available, or whether it's waiting on a tool you don't have yet.

That question outlives this course. New HTML lands constantly, and articles ranking it "must-know" rarely mention what the feature needs to actually run, or how many browsers have caught up to it yet. Checking both before you build with something, not just whether it exists, is a professional habit worth having on day one of your next job, not something you pick up later after shipping something that quietly didn't work for a slice of your visitors.

### The dialog element

The `<dialog>` element gives you a real, accessible modal dialog box: built-in focus handling, a backdrop, and keyboard support such as Escape to close, which used to mean hand-building all of that yourself with a `<div>`, careful JavaScript, and a lot of testing to get right. Once you're writing JavaScript, it's a genuinely good element and usually the correct choice over a hand-rolled modal.

The markup is simple enough to recognise on sight:

```html
<dialog>
  <p>Your class has been booked.</p>
  <button>Close</button>
</dialog>
```

That markup alone does nothing. A `<dialog>` renders hidden by default, and the only way to display it as an actual modal is a script calling `dialog.showModal()`; closing it again is `dialog.close()`. There's no CSS-only or attribute-only way to open one. That's the whole reason it doesn't appear in this course's assignments: without JavaScript, you can write a perfectly valid `<dialog>` and it will never appear on the page, no matter how correct the markup is. Keep the name and the shape in mind. It's the right answer to "I need a modal" the day you start writing JavaScript, not before.

Notice what didn't decide this call: browser support isn't the problem. `<dialog>` is well supported across current browsers, wider than several elements this course does teach. It's rejected here purely on the "does it do its job with the tools this course gives you" test from the top of this section, which is a different question from "will it work" and worth keeping separate in your own thinking.

### The popover attribute

The `popover` attribute is a newer, lighter pattern for content that should float above the rest of the page and dismiss itself when the visitor clicks elsewhere or presses Escape: a dropdown menu, a tooltip, a small "saved" notice.

```html
<button popovertarget="menu">Open menu</button>

<div id="menu" popover>
  <a href="#routes">Routes</a>
  <a href="#conditions">Conditions</a>
  <a href="#about">About</a>
</div>
```

Unlike `<dialog>`, the basic version genuinely needs no script. `popovertarget` on the button names the element it controls by `id`, `popover` on that element is what makes it float and behave like a popover instead of an ordinary `<div>`, and clicking outside or pressing Escape closes it, all handled by the browser. That made `popover` the closest call of the three elements on this page.

It still isn't what this course teaches for disclosure content, for two reasons. First, `<details>` already covers the Level 1 use case, a question that expands to reveal an answer, at a more established support tier. Second, as of this writing `popover` is newly available rather than widely available across browsers, which is a different bar than "basically everyone supports it," and this course holds new HTML to that bar before teaching it as the default.

Where `popover` earns its place over `<details>` is a case `<details>` was never built for: a floating element that isn't naturally attached to a block of page content, a navigation menu, a tooltip, a status message that needs to sit above everything else regardless of where its trigger is. That's a real gap in what `<details>` can do, and it's worth revisiting `popover` for exactly that gap once it's had more time to settle.

That "float above everything" behaviour comes from the browser promoting a popover into what's called the **top layer**, the same rendering layer `<dialog>` uses. An element in the top layer ignores an ancestor's `overflow: hidden` entirely, which is not true of a hand-built dropdown made from `position: absolute`, the older technique, and still the one you'd reach for today without JavaScript or `popover`.

<div class="diagram">
<svg viewBox="0 0 640 275" role="img" aria-label="Two identical menus opened from a button inside a card, compared side by side. On the left, the menu is positioned with position: absolute, and the card's overflow: hidden setting clips off the bottom of the menu where it extends past the card's edge. On the right, the same menu uses the popover attribute, which the browser promotes into the top layer, so the full menu displays even though it extends past the same card boundary.">
  <defs>
    <clipPath id="w13-card-clip">
      <rect x="12" y="32" width="286" height="201" rx="8"/>
    </clipPath>
  </defs>

  <text x="10" y="18" class="d-lbl">position: absolute, clipped</text>
  <rect x="10" y="30" width="290" height="205" rx="8" class="d-surface d-border" stroke-width="1.5"/>
  <rect x="100" y="150" width="110" height="26" rx="4" class="d-surface d-border" stroke-width="1.5"/>
  <text x="155" y="167" text-anchor="middle" class="d-lbl-mono">Open menu</text>
  <g clip-path="url(#w13-card-clip)">
    <rect x="95" y="182" width="120" height="70" rx="4" class="d-accent-soft d-accent-stroke" stroke-width="1.5"/>
    <text x="105" y="200" class="d-lbl-mono">Routes</text>
    <text x="105" y="216" class="d-lbl-mono">Conditions</text>
    <text x="105" y="232" class="d-lbl-mono">About</text>
  </g>
  <rect x="10" y="30" width="290" height="205" rx="8" fill="none" class="d-border" stroke-width="1.5"/>
  <text x="155" y="266" text-anchor="middle" class="d-lbl-muted">overflow: hidden cuts it off</text>

  <text x="340" y="18" class="d-lbl">popover: promoted to the top layer</text>
  <rect x="340" y="30" width="290" height="205" rx="8" class="d-surface d-border" stroke-width="1.5"/>
  <rect x="430" y="150" width="110" height="26" rx="4" class="d-surface d-border" stroke-width="1.5"/>
  <text x="485" y="167" text-anchor="middle" class="d-lbl-mono">Open menu</text>
  <rect x="425" y="182" width="120" height="70" rx="4" class="d-accent-soft d-accent-stroke" stroke-width="1.5"/>
  <text x="435" y="200" class="d-lbl-mono">Routes</text>
  <text x="435" y="216" class="d-lbl-mono">Conditions</text>
  <text x="435" y="232" class="d-lbl-mono">About</text>
  <text x="485" y="266" text-anchor="middle" class="d-lbl-muted">renders in full regardless</text>
</svg>
<figcaption>Same menu, same card, same overflow: hidden set on the card. Positioned with position: absolute, the card clips it. Given the popover attribute instead, the browser renders it in the top layer, above the clipping ancestor entirely.</figcaption>
</div>

### The template element

`<template>` holds a chunk of markup that the browser parses but never displays or runs on its own:

```html
<template id="row-template">
  <li class="result"></li>
</template>
```

Nothing inside a `<template>` renders and nothing inside it runs, not even an `<img>` it might contain, until a script clones it into the page. On its own it's inert by definition, which makes it a JavaScript tool from the ground up. Unlike `popover`, there's no partial-credit version of using it: there's no way to make a `<template>` do anything without script, so it's out of scope in this course the same way `showModal()` is. Recognise the tag, and revisit it once you're writing script that needs to stamp out repeated pieces of markup, a list of search results, for instance.

## Common mistakes to avoid

- **An `<iframe>` with no `title`.** Leaves assistive technology with nothing to announce about what the frame contains.
- **Forgetting the `viewport` meta tag.** The single most common cause of a page that "looks broken" specifically on mobile, when it looked fine on a desktop screen.
- **A `<details>` with no `<summary>`.** The browser supplies a default "Details" label, which tells a user nothing about what's inside.
- **Reaching for `<dialog>`, `<template>`, or `popover` in a graded assignment and expecting it to work.** All three either need JavaScript to function at all or aren't the recommended pattern yet in this course. If a brief calls for an accordion or an expandable answer, `<details>` is the element that actually does the job with no script.
- **Leaving a third-party embed unsandboxed by default.** Not every embed needs the full run of permissions an `<iframe>` gets by default. `sandbox` lets you hand it only what it actually needs.

## The checklist

Run this over your Week 13 work before you submit:

- Every `<iframe>` embed has a `title`, `loading="lazy"`, and a `sandbox` attribute with only the permissions it needs
- Each embed sits inside a container ready to hold a fixed aspect ratio in CSS
- The document `<head>` has `charset`, `viewport`, `title`, `description`, `canonical`, favicon, and stylesheet
- Every `<details>` has a real `<summary>` as its first child, not the browser's default label
- You can say in a sentence why `<dialog>`, `<template>`, and `popover` aren't built with in this course, and what would need to change to use one of them

## Keep learning

- [MDN: The details element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details) and [its name attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details#name). Full reference, including the exclusive-accordion behaviour from Going deeper.
- [MDN: The dialog element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog). What it does once you're writing JavaScript.
- [MDN: The template element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/template). The full reference for what stays inert until script clones it.
- [MDN: Popover <abbr title="Application Programming Interface">API</abbr>](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API). The full guide, for when you're ready to build with it.
- [MDN: The iframe element, sandbox attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe#sandbox). The complete list of permission tokens.
- [MDN: The head element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/head). Reference for the document head pieces in this chapter.
- [Video: 2 HTML Elements I Never Used!? (Details & Summary), by DesignCourse](https://www.youtube.com/watch?v=PQtpZZQU0u0). A practical look at where these elements fit in a real project.

## Try it yourself (about 45 minutes)

Embed a video or map on one of your pages using an `<iframe>` with a `title` and `loading="lazy"`, wrapped in a container element ready for a responsive aspect ratio. Add a `sandbox` attribute with only the permissions the embed actually needs, and confirm the embed still works after you add it.

Audit the `<head>` of your pages against the checklist above and add anything missing, especially the `charset` and `viewport` tags.

Then build an <abbr title="Frequently Asked Questions">FAQ</abbr> section with at least four questions using `<details>` and `<summary>`. Nest at least one follow-up question inside its parent's `<details>`, the way the oven question nests inside the beginner question earlier in this chapter, and set one top-level `<details>` to start expanded with the `open` attribute. Confirm every one of them opens and closes with no scripting.

Finally, write one or two sentences, in your project README or wherever your instructor asks for it, on why you didn't build with `<dialog>` or `popover` this term, and what would need to be true for you to reach for one of them instead. That sentence is a better test of whether you understood this week than the markup is.

You've now covered everything MTM1511 teaches about HTML. The final weeks bring your finished structure into MTM1544, where it gets styled.
