---
title: ARIA
prerequisites:
  - accessibility/wcag
  - html/html-semantics
---

# <abbr title="Accessible Rich Internet Applications">ARIA</abbr>

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

Use ARIA to fill genuine gaps like these, not to decorate markup that's already semantic. Bad ARIA is worse than none, because it can announce things that aren't true. Adding it to markup that's already semantic, or adding it incorrectly, actively misinforms assistive technology.

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

The rule from earlier still holds: reach for `aria-label` only when there's genuinely no visible text to work with. A button that already says "Close" in visible text needs no `aria-label` at all. Adding one anyway just gives you two names to keep in sync instead of one.

## The checklist

Run this over your markup before you move on:

- ARIA used only to fill a genuine gap, never added to markup that's already semantic
- Every `aria-label` names a control that has no other way to get an accessible name
- `aria-hidden="true"` never applied to a wrapper containing a focusable link or button
- Any `aria-expanded` toggle kept in sync with the panel it controls

## Keep learning

- [MDN: Accessible name](https://developer.mozilla.org/en-US/docs/Glossary/Accessible_name). A short glossary explanation of how an accessible name gets computed.
- [W3Schools: Accessibility](https://www.w3schools.com/accessibility/index.php). Covers ARIA alongside the wider set of accessibility techniques.
