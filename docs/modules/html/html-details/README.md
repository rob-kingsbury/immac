---
title: HTML Details and Summary
prerequisites:
  - html/html-basics
---

# The details and summary Elements

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

Click through the Result box above. Both widgets are genuinely interactive, the same native element powering the collapsible Result boxes throughout this textbook. The nested question only appears once its parent is open, and the cancellation panel starts open because of the `open` attribute on it specifically, not because it's related to the other two. Nesting and `open` are both independent, per-element choices.

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

Give a set of `<details>` elements the same `name` and the browser makes them mutually exclusive, the same relationship a group of radio buttons already has in a form. It's newly available rather than widely available across browsers yet, so it isn't something this course builds with yet. Recognise it. If you're building an accordion where only one panel should ever be open at a time, `name` is the attribute that does it without a line of script, once it's had more time to settle.

Three other elements come up constantly in any current list of "modern HTML," and this course names them without building with any of them. [Elements This Course Names But Doesn't Build With](/modules/html/html-details/elements-not-built-with.md) covers why, and what would need to change to use one.

## The checklist

Run this over your work before you move on:

- Every `<details>` has a real `<summary>` as its first child, not the browser's default label

## Keep learning

- [MDN: The details element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details) and [its name attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details#name). Full reference, including the exclusive-accordion behaviour above.
- [Video: 2 HTML Elements I Never Used!? (Details & Summary), by DesignCourse](https://www.youtube.com/watch?v=PQtpZZQU0u0). A practical look at where these elements fit in a real project.
