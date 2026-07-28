---
title: Keyboard Access
prerequisites:
  - accessibility/wcag
  - html/html-semantics
---

# Keyboard Focus and Focus States

## Keyboard focus

Operable means every interactive element, every link, button, and form field, works without a mouse. Try tabbing through a page: `Tab` moves forward, `Shift+Tab` moves backward. Activation is where it's worth being precise, because links and buttons don't behave identically. A focused **link** activates with `Enter` only; `Space` scrolls the page instead, since that's the browser's native behaviour for a link, not a bug in any particular page. A focused **button** activates with either `Enter` or `Space`. Knowing this in advance matters here specifically: it's what a manual keyboard test is built on, and a result that doesn't match what you expected from a link is the test working correctly, not failing.

## The focus indicator

Browsers show a **focus indicator**, usually an outline, around the element currently selected by the keyboard. It is not beautiful, and the internet is full of advice to remove it:

```css
/* Never do this with nothing to replace it */
:focus {
  outline: none;
}
```

That single declaration makes a page unusable for keyboard users, and it's a <abbr title="Web Content Accessibility Guidelines">WCAG</abbr> failure. A keyboard user with the outline removed has no way to see where they are on the page. If you don't like the default, **replace it, don't remove it.**

<CssDemo>

```html
<p class="demo">
  <a href="#" class="good">Tab to me: replaced focus style</a><br>
  <a href="#" class="bad">Tab to me: focus removed</a>
</p>
```

```css
.demo {
  font-family: system-ui, sans-serif;
  line-height: 2.4;
}
.demo a {
  color: #1d4ed8;
  padding: 4px 8px;
}
.good:focus {
  outline: 3px solid #f59e0b;
  outline-offset: 3px;
  border-radius: 3px;
}
.bad:focus {
  outline: none;
}
```

</CssDemo>

Click into the demo and press Tab. The first link announces itself clearly. The second vanishes from view while still being focused, which is exactly the experience you're inflicting if you strip the outline.

Two details make a replacement good. `outline-offset` pushes the ring away from the element so it doesn't crowd the text. And an outline is better than a border for this, because outlines don't affect layout, so nothing shifts when focus arrives.

### `:focus-visible`

There's a legitimate reason people dislike the default ring: it appears on mouse clicks too, where it looks like a mistake. The modern fix is `:focus-visible`, which the browser applies only when it judges a visible indicator is genuinely useful, typically for keyboard navigation and not for a mouse click.

```css
/* Keep a ring for keyboard users, without one flashing on every mouse click */
a:focus-visible {
  outline: 3px solid #f59e0b;
  outline-offset: 3px;
}
```

Use `:focus-visible` for the styled version, and never leave `:focus` with `outline: none` unless `:focus-visible` provides a replacement.

The contrast rules from [Colour Contrast](/modules/accessibility/colour-contrast/README.md) apply to the focus indicator itself. It needs at least a 3:1 ratio against what's behind it, or it's a marker nobody can see. A focus indicator with poor contrast is the same as no focus indicator: present but invisible.

## The checklist

Run this over your page before you move on:

- Every interactive element reachable and operable with `Tab` and `Enter` alone
- Focus indicator visible on every interactive element, never removed without a replacement
- `:focus-visible` used for the styled ring, so it doesn't flash on every mouse click
- Focus indicator checked against at least 3:1 contrast

## Keep learning

- [WebAIM: Keyboard Accessibility](https://webaim.org/techniques/keyboard/). What keyboard users actually need, in plain language.
- [MDN: :focus-visible](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible). Why it exists and how it differs from `:focus`.
- [Video: Accessible Focus Styles, by Kevin Powell](https://www.youtube.com/watch?v=6btMrs0YKuA). A short, concrete walkthrough of focus indicators.
