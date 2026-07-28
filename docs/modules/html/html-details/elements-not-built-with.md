---
title: Elements This Course Names But Doesn't Build With
prerequisites:
  - html/html-details
---

# Elements This Course Names But Doesn't Build With

Three elements come up constantly in any current list of "modern HTML": `<dialog>`, `<template>`, and `popover`. All three are worth knowing by name, and none of them get built into the projects in this course. The reason is the same reason each time: this course has no JavaScript in it, and each of these three either does nothing without a script or was judged not yet settled enough across browsers to teach as the default answer. That's not a verdict that they're bad, or that you should avoid them forever. It's a statement about what's actually buildable with the tools this course gives you right now.

The habit worth taking from this module isn't memorising which element does what. It's the question underneath: before reaching for something you saw on a "modern HTML" list, ask whether it does its job with what you actually have available, or whether it's waiting on a tool you don't have yet.

That question outlives this course. New HTML lands constantly, and articles ranking it "must-know" rarely mention what the feature needs to actually run, or how many browsers have caught up to it yet. Checking both before you build with something, not just whether it exists, is a professional habit worth having on day one of your next job, not something you pick up later after shipping something that quietly didn't work for a slice of your visitors.

## The dialog element

The `<dialog>` element gives you a real, accessible modal dialog box: built-in focus handling, a backdrop, and keyboard support such as Escape to close, which used to mean hand-building all of that yourself with a `<div>`, careful JavaScript, and a lot of testing to get right. Once you're writing JavaScript, it's a genuinely good element and usually the correct choice over a hand-rolled modal.

The markup is simple enough to recognise on sight:

```html
<dialog>
  <p>Your class has been booked.</p>
  <button>Close</button>
</dialog>
```

That markup alone does nothing. A `<dialog>` renders hidden by default, and the only way to display it as an actual modal is a script calling `dialog.showModal()`; closing it again is `dialog.close()`. There's no CSS-only or attribute-only way to open one. That's the whole reason it doesn't appear in what this course builds: without JavaScript, you can write a perfectly valid `<dialog>` and it will never appear on the page, no matter how correct the markup is. Keep the name and the shape in mind. It's the right answer to "I need a modal" the day you start writing JavaScript, not before.

Notice what didn't decide this call: browser support isn't the problem. `<dialog>` is well supported across current browsers, wider than several elements this course does teach. It's rejected here purely on the "does it do its job with the tools this course gives you" test from the top of this module, which is a different question from "will it work" and worth keeping separate in your own thinking.

## The popover attribute

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

## The template element

`<template>` holds a chunk of markup that the browser parses but never displays or runs on its own:

```html
<template id="row-template">
  <li class="result"></li>
</template>
```

Nothing inside a `<template>` renders and nothing inside it runs, not even an `<img>` it might contain, until a script clones it into the page. On its own it's inert by definition, which makes it a JavaScript tool from the ground up. Unlike `popover`, there's no partial-credit version of using it: there's no way to make a `<template>` do anything without script, so it's out of scope in this course the same way `showModal()` is. Recognise the tag, and revisit it once you're writing script that needs to stamp out repeated pieces of markup, a list of search results, for instance.

## Common mistakes to avoid

- **Reaching for `<dialog>`, `<template>`, or `popover` in a project and expecting it to work.** All three either need JavaScript to function at all or aren't the recommended pattern yet in this course. If a brief calls for an accordion or an expandable answer, `<details>` is the element that actually does the job with no script.

## The checklist

Run this over your work before you move on:

- You can say in a sentence why `<dialog>`, `<template>`, and `popover` aren't built with in this course, and what would need to change to use one of them

## Keep learning

- [MDN: The dialog element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog). What it does once you're writing JavaScript.
- [MDN: The template element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/template). The full reference for what stays inert until script clones it.
- [MDN: Popover <abbr title="Application Programming Interface">API</abbr>](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API). The full guide, for when you're ready to build with it.
