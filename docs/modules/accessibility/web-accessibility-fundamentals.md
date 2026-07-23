---
title: Web Accessibility Fundamentals
---

# Web Accessibility Fundamentals

Accessibility means building pages that everyone can use, including people who navigate with a keyboard, a screen reader, voice control, or a magnifier. It isn't a separate feature you bolt on at the end. Most of it comes free when you write good HTML, which is why it lands here, right after semantic markup, and not in some optional final chapter.

## What WCAG is

The Web Content Accessibility Guidelines (WCAG) are the international standard for accessible web content. The current version is WCAG 2.2. You don't need to memorize it, but you should know how it's organized, because it's the reference everyone points to.

WCAG is built on four principles, often shortened to POUR:

- **Perceivable.** People can sense the content, so images need text alternatives and video needs captions.
- **Operable.** People can use the interface, so everything works by keyboard, not just a mouse.
- **Understandable.** People can follow it, so language, layout, and behaviour are predictable from page to page.
- **Robust.** It works with assistive technology, both today's and whatever comes next.

Most of what follows is a practical application of those four ideas.

## Landmark regions

You already built the foundation for this in Semantic HTML. The elements `<header>`, `<nav>`, `<main>`, `<footer>`, and `<aside>` are landmarks. A screen reader user can list all the landmarks on a page and jump straight to the one they want, the same way a sighted user's eye jumps to the navigation or the main content.

This is the single biggest accessibility win available, and you get it just by using semantic HTML instead of `<div>` boxes. One `<main>` per page, a `<nav>` around your menu, and a screen reader user can already move around your site efficiently.

## Heading hierarchy

Headings are the other structure screen reader users navigate by. Many pull up a list of all headings to skim a page, exactly like a sighted reader scanning subheadings. For that to work, the heading order has to be logical: one `<h1>`, `<h2>` for major sections, `<h3>` for subsections, and no skipped levels.

A page where headings jump from `<h2>` to `<h4>`, or where text is made big with CSS instead of marked as a real heading, is disorienting to navigate. The fix costs nothing: use the right heading level for the structure, and style the size separately.

## Colour contrast

Perceivable content includes making sure text is actually readable. WCAG defines a minimum **contrast ratio** between text and its background: 4.5:1 for normal text, 3:1 for large text (roughly 24px and up, or 18.66px bold, WCAG's large-text threshold defined in points, 18pt or 14pt bold, which converts to those pixel values). Light grey text on a white background is a classic failure, it might look clean in a mockup, and it's unreadable for a huge number of users, not only those with a diagnosed vision impairment.

```html
<!-- Fails contrast: light grey on white -->
<p style="color: #b0b0b0;">Hard to read for many users.</p>

<!-- Passes contrast: dark enough against a white background -->
<p style="color: #4a4a4a;">Readable for far more users.</p>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<p style="color: #b0b0b0;">Hard to read for many users.</p>
<p style="color: #4a4a4a;">Readable for far more users.</p>
</div>
</details>

You don't need to calculate ratios by hand. A contrast checker tool (linked at the end of this chapter) takes a foreground and background colour and tells you the ratio and whether it passes. Check your colour choices with one before you commit to a palette in your styling course.

## Keyboard focus

Operable means every interactive element, every link, button, and form field, works without a mouse. Try tabbing through a page: `Tab` moves forward, `Shift+Tab` moves backward. Activation is where it's worth being precise, because links and buttons don't behave identically. A focused **link** activates with `Enter` only; `Space` scrolls the page instead, since that's the browser's native behaviour for a link, not a bug in any particular page. A focused **button** activates with either `Enter` or `Space`. Knowing this in advance matters here specifically: it's what the manual keyboard test just below is built on, and a result that doesn't match what you expected from a link is the test working correctly, not failing.

Browsers show a **focus indicator**, usually an outline, around the element currently selected by the keyboard. Never remove it without replacing it with something equally visible:

```html
<style>
  /* Never do this with nothing to replace it */
  :focus { outline: none; }
</style>
```

A keyboard user with the outline removed has no way to see where they are on the page. If a design calls for a different look, replace the default outline with a custom one, `outline` in a different colour, or a `box-shadow`, don't just delete it. You'll cover the CSS side of this in your styling course; the rule to hold onto here is that focus must always be visible in some form.

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

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<p><a href="#demo-main">Skip to main content</a></p>
<p><em>(header)</em></p>
<p id="demo-main"><em>(main content starts here)</em></p>
</div>
</details>

The skip link above is shown in place so you can see and click it. In a finished site it's usually hidden with CSS until a keyboard user tabs to it, which is a technique covered in your styling course. The HTML pattern belongs here: a link to the `id` of your `<main>`, placed as the very first thing in `<body>`.

## ARIA roles and labels

ARIA (Accessible Rich Internet Applications) is a set of attributes that add accessibility information when HTML alone can't. The first rule of ARIA is the one worth memorizing: don't use it if a native HTML element already does the job. A real `<button>` is better than a `<div>` with `role="button"`, every time, since the real element already comes with keyboard support and the correct behaviour built in.

Where ARIA earns its place is labelling. When there's no visible text to name a control, `aria-label` provides one:

```html
<button aria-label="Close menu">&times;</button>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<button aria-label="Close menu">&times;</button>
</div>
</details>

Visually that's just an &times; symbol. A screen reader announces "Close menu, button," because of the `aria-label`, not the symbol a sighted user sees. Without it, a screen reader would have nothing meaningful to say.

`aria-label` also distinguishes elements that would otherwise sound identical:

```html
<nav aria-label="Main">...</nav>
<nav aria-label="Footer">...</nav>
```

Two other ARIA attributes worth knowing. `aria-hidden="true"` hides purely decorative content from assistive technology, useful on an icon that's beside text already saying the same thing. **One real trap with it:** never put `aria-hidden="true"` on a wrapper that contains a focusable control, a link or a button inside it. The control stays reachable by `Tab`, since `aria-hidden` doesn't remove anything from the keyboard order, but a screen reader announces nothing when focus lands on it, since `aria-hidden` did remove it from that. The result is a control a keyboard user can tab to and hears nothing about. Only hide an element this way if nothing inside it can ever receive focus.

`aria-expanded` on a button tells a screen reader whether the menu or panel it controls is currently open or closed. It's a plain attribute, not a magic one: a script sets it to `"true"` or `"false"` when the control is toggled, and typically CSS uses that same value to show or hide the panel, targeting it with a selector like `[aria-expanded="true"]`. The attribute and the visual state are two separate things that your own code has to keep in sync; nothing does it automatically.

Use ARIA to fill genuine gaps like these, not to decorate markup that's already semantic. Bad ARIA is worse than none, because it can announce things that aren't true.

## Accessible forms, in brief

Forms are where accessibility most often breaks, so here's the core rule now, with the full treatment in the Forms and Data Structures chapter: every input needs a real `<label>` tied to it.

```html
<label for="email">Email address</label>
<input type="email" id="email" name="email">
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<label for="demo-a11y-email">Email address</label>
<input type="email" id="demo-a11y-email" name="email">
</div>
</details>

The `for` attribute matches the input's `id`. That link is what lets a screen reader announce "Email address, edit text" when the user reaches the field, and it makes the label clickable to focus the input. A placeholder is not a label, and never a substitute for one, since it disappears the moment someone starts typing.

## Common mistakes to avoid

- **Removing the focus outline with nothing to replace it.** Leaves keyboard users with no way to see where they are.
- **Using colour alone to convey meaning**, such as a red border with no text saying what's wrong. Someone who can't distinguish that colour gets no information at all.
- **Empty or missing `alt` text on meaningful images.** A blank `alt=""` is correct for decorative images, but wrong for one that carries real information.
- **ARIA added to markup that's already semantic**, or added incorrectly. Wrong ARIA actively misinforms assistive technology, which is worse than having none.
- **`aria-hidden="true"` on a wrapper containing a focusable link or button.** The control stays reachable by keyboard but silent to a screen reader, the worst combination of the two.
- **Testing only by eye.** A page can look perfect and still fail for a keyboard-only or screen-reader user. The next section is how to actually check.

## Testing what you build

You can catch a large share of issues yourself, before anyone else sees the page. Try to use your page with the keyboard alone: can you reach and activate every link and control with Tab and Enter, and can you always see where focus is? Run the accessibility audit built into your browser's developer tools (Lighthouse in Chrome and Edge), which flags missing alt text, poor contrast, and unlabelled fields. These checks take minutes and catch the most common failures.

## Keep learning

- [W3Schools: Accessibility](https://www.w3schools.com/accessibility/index.php). A structured overview covering the same POUR principles with more examples.
- [WebAIM: Introduction to Web Accessibility](https://webaim.org/intro/). One of the most widely used accessibility education resources on the web, written for beginners.
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/). Enter two colours and get the exact contrast ratio and whether it passes WCAG.
- [Video: WCAG for Beginners, by Silktide](https://www.youtube.com/watch?v=5H1JGdqLrWo). A clear introduction to the guidelines this chapter is built on.

## Try it yourself (about 50 minutes)

Take the semantic page you built in the Semantic HTML chapter. Add a skip link as the first element in the body, pointing to your `<main>`. Give every image a considered `alt` value, empty if it's decorative. Check any coloured text against the WebAIM contrast checker and fix anything that fails.

Then put the mouse aside and navigate the whole page with Tab and Enter only, confirming you can always see where focus is. Finally, run the Lighthouse accessibility audit and read every item it reports, fixing what you can.

Your pages now work for everyone who reaches them. Next week adds forms, the one place your site collects something back.
