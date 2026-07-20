---
title: Web Accessibility Fundamentals
---

# Web Accessibility Fundamentals

Accessibility means building pages that everyone can use, including people who navigate with a keyboard, a screen reader, voice control, or a magnifier. It isn't a separate feature you bolt on at the end. Most of it comes free when you write good HTML, which is why it lands here, right after semantic markup, and not in some optional final week.

## What WCAG is

The Web Content Accessibility Guidelines (WCAG) are the international standard for accessible web content. The current version is WCAG 2.2. You don't need to memorize it, but you should know how it's organized, because it's the reference everyone points to.

WCAG is built on four principles, often shortened to POUR. Content must be Perceivable (people can sense it, so images need text alternatives), Operable (people can use it, so everything works by keyboard), Understandable (people can follow it, so language and behaviour are predictable), and Robust (it works with assistive technology). Most of what follows is a practical application of those four ideas.

## Landmark regions

You already built the foundation for this in week four. The semantic elements `<header>`, `<nav>`, `<main>`, `<footer>`, and `<aside>` are landmarks. A screen reader user can list all the landmarks on a page and jump straight to the one they want, the same way a sighted user's eye jumps to the navigation or the main content.

This is the single biggest accessibility win available, and you get it just by using semantic HTML instead of `<div>` boxes. One `<main>` per page, a `<nav>` around your menu, and a screen reader user can already move around your site efficiently.

## Heading hierarchy

Headings are the other structure screen reader users navigate by. Many pull up a list of all headings to skim a page, exactly like a sighted reader scanning subheadings. For that to work, the heading order has to be logical: one `<h1>`, `<h2>` for major sections, `<h3>` for subsections, and no skipped levels.

A page where headings jump from `<h2>` to `<h4>`, or where text is made big with CSS instead of marked as a real heading, is disorienting to navigate. The fix costs nothing: use the right heading level for the structure, and style the size separately.

## Skip navigation

Keyboard and screen reader users move through a page in order. Without help, that means tabbing through every navigation link on every page before reaching the content. A skip link solves this. It's the first focusable thing on the page, usually hidden until focused, and it jumps straight to the main content.

```html
<body>
  <a href="#main" class="skip-link">Skip to main content</a>
  <header>...</header>
  <main id="main">
    ...
  </main>
</body>
```

The CSS to hide it until it's focused comes in your styling course. The HTML pattern, a link to the `id` of your `<main>`, belongs here.

## ARIA roles and labels

ARIA (Accessible Rich Internet Applications) is a set of attributes that add accessibility information when HTML alone can't. The first rule of ARIA is the one worth memorizing: don't use it if a native HTML element already does the job. A real `<button>` is better than a `<div>` with `role="button"`, every time.

Where ARIA earns its place is labelling. When there's no visible text to name a control, `aria-label` provides one:

```html
<button aria-label="Close menu">&times;</button>

<nav aria-label="Main">
  <!-- distinguishes this nav from a footer nav -->
</nav>
```

Use ARIA to fill genuine gaps, not to decorate markup that's already semantic. Bad ARIA is worse than none, because it can announce things that aren't true.

## Accessible forms, in brief

Forms are where accessibility most often breaks, so here's the core rule now, with the full treatment next week: every input needs a real `<label>` tied to it.

```html
<label for="email">Email address</label>
<input type="email" id="email" name="email">
```

The `for` attribute matches the input's `id`. That link is what lets a screen reader announce "Email address, edit text" when the user reaches the field, and it makes the label clickable to focus the input. A placeholder is not a label, and never a substitute for one.

## Testing what you build

You can catch a large share of issues yourself, before anyone else sees the page. Try to use your page with the keyboard alone: can you reach and activate every link and control with Tab and Enter, and can you always see where focus is? Run the accessibility audit built into your browser's developer tools (Lighthouse in Chrome and Edge), which flags missing alt text, poor contrast, and unlabelled fields. These checks take minutes and catch the most common failures.

## Try it yourself

Take the semantic page you built in week four. Add a skip link as the first element in the body, pointing to your `<main>`. Give every image a considered `alt` value, empty if it's decorative. Then put the mouse aside and navigate the whole page with Tab and Enter only. Finally, run the Lighthouse accessibility audit and read every item it reports, fixing what you can.
