---
title: Web Accessibility Fundamentals
---

# Web Accessibility Fundamentals

Accessibility means building pages that everyone can use, including people who navigate with a keyboard, a screen reader, voice control, or a magnifier. It isn't a separate feature you bolt on at the end. Most of it comes free when you write good <abbr title="HyperText Markup Language">HTML</abbr>, which is why it lands here, right after semantic markup, and not in some optional final chapter.

## How to read this chapter

**The core path is everything down to the checklist near the end.** Read the sections in order, try the demos as you go, and do the exercise at the end, and you have what the assignment needs. Budget about 30 minutes for the reading, plus the 50 minutes the exercise takes.

Sections headed **Going deeper** are optional and add roughly 15 minutes altogether. They cover what "AA" actually means for your grade, an attribute you've typed into every skeleton since Week 1 without knowing why, what your testing tools can and can't see, and how a screen reader names a control that has no visible label. Skip them on a busy week and nothing breaks. They're written to still be worth reading once the deadline pressure is off.

## What <abbr title="Web Content Accessibility Guidelines">WCAG</abbr> is

The Web Content Accessibility Guidelines (WCAG) are the international standard for accessible web content. The current version is WCAG 2.2. You don't need to memorize it, but you should know how it's organized, because it's the reference everyone points to.

WCAG is built on four principles, often shortened to <abbr title="Perceivable, Operable, Understandable, Robust">POUR</abbr>:

- **Perceivable.** People can sense the content, so images need text alternatives and video needs captions.
- **Operable.** People can use the interface, so everything works by keyboard, not just a mouse.
- **Understandable.** People can follow it, so language, layout, and behaviour are predictable from page to page.
- **Robust.** It works with assistive technology, both today's and whatever comes next.

Most of what follows is a practical application of those four ideas.

### Going deeper: what "AA" actually means for your grade

WCAG doesn't ask for all-or-nothing compliance. It defines three conformance levels, A, AA, and AAA, each one a stricter tier built on top of the last.

Level A is the floor. Skip it and a page has real, obvious barriers. Level AA adds the requirements that make a page usable for the large majority of people with disabilities, including the 4.5:1 and 3:1 contrast ratios from the Colour Contrast section below, both AA requirements. Level AAA is stricter again, for example a 7:1 contrast ratio for normal text instead of 4.5:1, but the W3C itself does not recommend requiring it across an entire site: "it is not recommended that Level AAA conformance be required as a general policy for entire sites because it is not possible to satisfy all Level AAA success criteria for some content."

In practice, AA is the level almost everyone means when they say a site "meets WCAG." It's the level most accessibility laws and procurement standards reference, and it's the level this course's rubrics grade against. If a tool or a rubric item says something "passes" or "fails" without naming a level, assume AA.

That has one direct, practical effect on your assignments: a colour pair that passes at 3:1 but fails at 4.5:1 is not good enough for normal-sized text. Check against 4.5:1 unless the text meets the large-text definition already given in the Colour Contrast section.

### Going deeper: the `lang` attribute you've been writing since Week 1

Every skeleton in this course starts the same way:

```html
<html lang="en">
```

You've typed that line dozens of times without a reason attached to it. Here's the reason. The `lang` attribute tells a screen reader which language's pronunciation rules to use for the text that follows. Without it, or with the wrong value, a screen reader either guesses or falls back to a default voice and mispronounces the page, word by word. This is what WCAG Success Criterion 3.1.1, Language of Page, requires, and it sits at Level A, the most basic tier there is.

`lang="en"` on `<html>` sets the language for the whole document. When one phrase or section is written in a different language than the rest of the page, set `lang` on that specific element too, not just the page:

```html
<!-- Wrong: the French phrase gets read using English pronunciation rules -->
<p>The chef calls it a mise en place, everything in its place before you start cooking.</p>

<!-- Right: the French phrase is marked, so the screen reader switches pronunciation for it -->
<p>The chef calls it a <span lang="fr">mise en place</span>, everything in its place before you start cooking.</p>
```

This second rule is WCAG Success Criterion 3.1.2, Language of Parts. It's a small piece of markup, and it only matters at the moments a page genuinely switches languages: a quoted phrase, a name, a menu item borrowed from another language. At that moment, though, it's the difference between a screen reader saying something intelligible and something that sounds like noise.

## Landmark regions

You already built the foundation for this in Semantic HTML. The elements `<header>`, `<nav>`, `<main>`, `<footer>`, and `<aside>` are landmarks. A screen reader user can list all the landmarks on a page and jump straight to the one they want, the same way a sighted user's eye jumps to the navigation or the main content.

This is the single biggest accessibility win available, and you get it just by using semantic HTML instead of `<div>` boxes. One `<main>` per page, a `<nav>` around your menu, and a screen reader user can already move around your site efficiently.

## Heading hierarchy

Headings are the other structure screen reader users navigate by. Many pull up a list of all headings to skim a page, exactly like a sighted reader scanning subheadings. For that to work, the heading order has to be logical: one `<h1>`, `<h2>` for major sections, `<h3>` for subsections, and no skipped levels.

A page where headings jump from `<h2>` to `<h4>`, or where text is made big with <abbr title="Cascading Style Sheets">CSS</abbr> instead of marked as a real heading, is disorienting to navigate. The fix costs nothing: use the right heading level for the structure, and style the size separately.

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

<div class="diagram">
<svg viewBox="0 0 640 300" role="img" aria-label="A diagram of keyboard tab order through a page. Four stops appear in a row: a skip link, which is the first stop and is normally hidden until it receives focus, then the header and navigation, then the main content, then the footer. Solid arrows connect the four stops in that order, showing the default path a keyboard user tabs through without using the skip link. A second, curved arrow below shows that activating the skip link with Enter jumps focus straight from the skip link to the main content, skipping the header and navigation entirely.">
  <text x="14" y="20" class="d-lbl">Default tab order</text>

  <rect x="12" y="40" width="130" height="70" rx="6" class="d-surface d-border" stroke-width="1.5" stroke-dasharray="4 3"/>
  <text x="77" y="66" text-anchor="middle" class="d-lbl">1. Skip link</text>
  <text x="77" y="84" text-anchor="middle" class="d-lbl-muted">hidden until</text>
  <text x="77" y="97" text-anchor="middle" class="d-lbl-muted">focused</text>

  <rect x="176" y="40" width="130" height="70" rx="6" class="d-surface d-border" stroke-width="1.5"/>
  <text x="241" y="70" text-anchor="middle" class="d-lbl">2. Header</text>
  <text x="241" y="88" text-anchor="middle" class="d-lbl">and nav</text>

  <rect x="340" y="40" width="130" height="70" rx="6" class="d-accent-soft d-accent-stroke" stroke-width="1.5"/>
  <text x="405" y="70" text-anchor="middle" class="d-lbl">3. Main</text>
  <text x="405" y="88" text-anchor="middle" class="d-lbl">content</text>

  <rect x="504" y="40" width="124" height="70" rx="6" class="d-surface d-border" stroke-width="1.5"/>
  <text x="566" y="70" text-anchor="middle" class="d-lbl">4. Footer</text>

  <line x1="142" y1="75" x2="172" y2="75" class="d-muted-stroke" stroke-width="2"/>
  <path d="M 166 70 L 176 75 L 166 80 Z" class="d-accent"/>

  <line x1="306" y1="75" x2="336" y2="75" class="d-muted-stroke" stroke-width="2"/>
  <path d="M 330 70 L 340 75 L 330 80 Z" class="d-accent"/>

  <line x1="470" y1="75" x2="500" y2="75" class="d-muted-stroke" stroke-width="2"/>
  <path d="M 494 70 L 504 75 L 494 80 Z" class="d-accent"/>

  <text x="14" y="150" class="d-lbl">When the skip link is activated</text>
  <path d="M 77 110 C 77 190, 405 190, 405 116" fill="none" class="d-accent-stroke" stroke-width="2" stroke-dasharray="5 4"/>
  <path d="M 397 108 L 405 120 L 414 108 Z" class="d-accent"/>
  <text x="241" y="215" text-anchor="middle" class="d-lbl-mono">Enter on the skip link</text>
  <text x="241" y="233" text-anchor="middle" class="d-lbl-muted">jumps straight to main, past the nav</text>
</svg>
<figcaption>Four stops, two paths. Tabbing without the skip link moves through all four stops in order. Activating the skip link jumps from stop 1 straight to stop 3, which is exactly what "skip navigation" means in practice.</figcaption>
</div>

## <abbr title="Accessible Rich Internet Applications">ARIA</abbr> roles and labels

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

### Going deeper: how a screen reader names a control with no visible label

You've just seen `aria-label` used to name a button that has no visible text. Here's the mechanism underneath that example, made explicit.

A screen reader doesn't just read whatever text happens to be visible on a control. It runs a short, ordered check to decide what to call it, and it stops at the first source that has content.

An explicit `aria-label`, when one is set, wins over everything else, including the element's own visible text. That's exactly why `<button aria-label="Close menu">&times;</button>` announces "Close menu, button," and not some description of the × character. If there's no `aria-label`, the browser falls back to the control's own visible content: the text inside a `<button>` or a link, the `alt` on an `<img>`, or the linked `<label>` for a form field. Only if none of those exist does it reach for weaker last-resort sources, such as a `title` attribute, and those shouldn't be relied on. `title` isn't announced consistently across screen readers, and it isn't visible to a sighted user either, so leaning on it fixes nothing for anyone.

Icon-only buttons are the case where this matters most, because there's often no visible text at all to fall back on:

```html
<!-- Wrong: no visible text and no aria-label, so a screen reader has nothing to announce but "button" -->
<button>&#9776;</button>

<!-- Right: aria-label supplies the name the icon alone can't -->
<button aria-label="Open menu">&#9776;</button>
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<button aria-label="Open menu">&#9776;</button>
</div>
</details>

The rule from earlier in this section still holds: reach for `aria-label` only when there's genuinely no visible text to work with. A button that already says "Close" in visible text needs no `aria-label` at all. Adding one anyway just gives you two names to keep in sync instead of one.

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

### Going deeper: what your testing tools can't see

Lighthouse and tools like it are worth running every time. They catch real, common mistakes in seconds. They also cannot see most of what actually makes a page accessible.

Deque, one of the companies that builds these testing tools, analyzed roughly 300,000 accessibility issues across more than 13,000 audited pages and found that automated testing caught about 57 percent of the individual issues, counted by volume, and that's the generous figure. Measured a different way, by how many of the distinct WCAG success criteria can even be checked automatically at all, the commonly cited figure is closer to 20 to 30 percent. WebAIM makes the same point without attaching a number to it: automated tools have real limitations, "not all conformance failures can be automatically detected," and "absence of detected errors does not indicate that a page is accessible or conformant."

The gap isn't a tooling problem that a better tool will close. It's structural. A script can confirm that an `alt` attribute exists. It cannot tell you whether the words inside it actually describe the image:

```html
<!-- Passes every automated check: alt is present and non-empty -->
<img src="team-photo.jpg" alt="image1">

<!-- Actually accessible: alt describes what's in the photo -->
<img src="team-photo.jpg" alt="The five-person web team standing outside the campus library">
```

Both of those pass Lighthouse. Only one of them tells a screen reader user anything true. The same gap shows up anywhere a tool can check that a thing exists but not whether it's right: focus order that's technically reachable but makes no sense, an ARIA label that's present but wrong, a heading that exists but doesn't describe its section.

This is why the manual keyboard test earlier in this chapter isn't a lesser, optional backup to the automated one. It catches a different, and often larger, category of problem. Run both every time, and don't let a clean Lighthouse score stand in for a page you've actually tried to use yourself.

## The checklist

Run this over every page before you submit work in this course:

- Landmark regions used for structure: `<header>`, `<nav>`, `<main>`, `<footer>`, not `<div>` boxes
- Heading levels in logical order, one `<h1>`, no skipped levels
- Colour contrast checked against at least 4.5:1 for normal text, 3:1 for large text
- Focus indicator visible on every interactive element, never removed without a replacement
- Skip link present as the first focusable element in `<body>`
- ARIA used only to fill a genuine gap, never added to markup that's already semantic
- Every form input has a real `<label>` connected with `for` and `id`
- Tested by keyboard alone: every control reachable, focus always visible
- Tested with an automated tool such as Lighthouse, every flagged item addressed
- `lang` set correctly on `<html>`, and on any part of the page written in a different language

## Keep learning

- [W3C WAI: Understanding Conformance](https://www.w3.org/WAI/WCAG22/Understanding/conformance). The source for the A, AA, AAA levels covered above, including the note on why AAA isn't required site-wide.
- [MDN: the lang global attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/lang). Full reference for `lang` and `xml:lang`, with more examples of language tags.
- [Deque: Automated Accessibility Coverage Report](https://www.deque.com/automated-accessibility-coverage-report/). The data behind the automated-testing coverage figures above.
- [MDN: Accessible name](https://developer.mozilla.org/en-US/docs/Glossary/Accessible_name). A short glossary explanation of how an accessible name gets computed.
- [W3Schools: Accessibility](https://www.w3schools.com/accessibility/index.php). A structured overview covering the same POUR principles with more examples.
- [WebAIM: Introduction to Web Accessibility](https://webaim.org/intro/). One of the most widely used accessibility education resources on the web, written for beginners.
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/). Enter two colours and get the exact contrast ratio and whether it passes WCAG.
- [Video: WCAG for Beginners, by Silktide](https://www.youtube.com/watch?v=5H1JGdqLrWo). A clear introduction to the guidelines this chapter is built on.

## Try it yourself (about 50 minutes)

Take the semantic page you built in the Semantic HTML chapter. Add a skip link as the first element in the body, pointing to your `<main>`. Give every image a considered `alt` value, empty if it's decorative. Check any coloured text against the WebAIM contrast checker and fix anything that fails.

Then put the mouse aside and navigate the whole page with Tab and Enter only, confirming you can always see where focus is. Finally, run the Lighthouse accessibility audit and read every item it reports, fixing what you can.

Your pages now work for everyone who reaches them. Next week adds forms, the one place your site collects something back.
