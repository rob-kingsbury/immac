---
title: Accessible Styling
---

# Accessible Styling

In MTM1511 you learned that accessibility is mostly a structural problem: correct landmarks, a sane heading order, real alt text, labelled form controls. All of that is HTML's job, and doing it well gets you a long way.

Then CSS arrives and can undo it. A stylesheet can hide the focus ring, shrink text below legibility, break at a visitor's chosen zoom level, or animate something that makes a person physically unwell. This week is about the styling decisions that determine whether the accessible structure underneath actually reaches people.

You've already done part of this work. Colour contrast was Week 3, and it stays a requirement rather than becoming a separate topic here.

## Focus states

When someone navigates with the keyboard, pressing Tab moves through the interactive elements on a page. The **focus indicator** is the visible marker showing where they are. Without it, tabbing is like using a mouse with an invisible pointer.

Browsers supply a default focus ring. It is not beautiful, and the internet is full of advice to remove it:

```css
/* Never do this. */
:focus {
  outline: none;
}
```

That single declaration makes a page unusable for keyboard users, and it's a WCAG failure. If you don't like the default, **replace it, don't remove it.**

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

The contrast rules from Week 3 apply to the focus indicator itself. It needs at least a 3:1 ratio against what's behind it, or it's a marker nobody can see.

## Relative units and text scaling

Some people run their browser with a larger default text size. It's a setting, it's common, and honouring it costs nothing if your units are right.

This is why Week 3 said to use `rem` for font sizes. `rem` is relative to the browser's root font size, so when a visitor raises that from 16px to 24px, your whole page scales with it. A size in `px` ignores the setting entirely.

The same reasoning extends past font size. Padding, margins, and `max-width` set in `rem` grow along with the text, so a box sized to hold two lines still holds two lines when the text gets bigger. Set in `px`, the box stays put and the enlarged text overflows or clips.

```css
/* Scales with the visitor's text preference */
.card {
  padding: 1.5rem;
  max-width: 40rem;
  font-size: 1rem;
}
```

A useful rule of thumb: **`rem` for anything tied to text, `px` only for things that genuinely shouldn't scale**, such as a hairline border.

There's a related requirement in WCAG worth knowing by name. A page must remain usable when text is scaled to **200%**. Test it: press `Ctrl` and `+` (or `Cmd` and `+`) several times and look for text that gets cut off, overlapping elements, or content that becomes unreachable. Fixed heights on text containers are the usual culprit, which is why Week 2 warned against them.

## Accessible hiding

Sometimes you want content available to a screen reader but not shown on screen, most often a label or a heading that would be visually redundant. There's a right way and several wrong ways to do it.

**`display: none` and `visibility: hidden` hide content from everyone**, including assistive technology. That's correct when the content is genuinely irrelevant, and wrong when you meant "visually hidden only."

The pattern that works keeps the element rendered but clipped to nothing:

```css
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
```

It looks like a hack because it is one, but it's the long-standing standard implementation, and it's worth keeping in your stylesheet by name. Use it for things like a "Search" label on a search box whose purpose is obvious visually from an icon, but which a screen reader user needs announced.

Two related points. Setting `font-size: 0` or `color: transparent` to hide text is not equivalent and causes other problems. And a skip navigation link, which you met in MTM1511, is the classic case where content should be visually hidden **until focused**, then appear:

```css
.skip-link {
  position: absolute;
  top: -100px;
  left: 0;
  z-index: 100;
  background: #ffffff;
  padding: 8px 16px;
}
.skip-link:focus {
  top: 0;
}
```

The `top: -100px` alone gets it off-screen, but three more properties are what make it actually work on a real page. `left: 0` pins its horizontal position, since a plain `position: absolute` element with no `left` set can drift depending on whatever else is in the layout. `z-index` puts it above a header or hero image that would otherwise sit on top of it the moment it becomes visible. `background` gives the text something solid behind it instead of whatever's on the page underneath, which might make it unreadable or invisible depending on colour. Skip the last three and the link technically exists and even passes an automated audit, but a real keyboard user who tabs to it may not be able to see or read it.

## Reduced motion

Animation isn't only a taste question. For people with vestibular disorders, large motion on screen can cause genuine nausea and dizziness. Operating systems provide a "reduce motion" setting for this, and CSS can read it.

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

That block is the widely used blunt version, and it's a reasonable default to keep at the bottom of your stylesheet. It's also one of the very few legitimate uses of `!important`, because it needs to override whatever any other rule set.

A more considered approach reverses the default: write no motion as the base, then add it only for people who haven't asked for less.

```css
.card {
  /* no transition by default */
}
@media (prefers-reduced-motion: no-preference) {
  .card {
    transition: transform 200ms ease;
  }
}
```

This comes up again in the Transitions and Motion week, where you'll be adding the animation this rule protects people from.

## Touch targets and spacing

An interactive element that's hard to hit is an accessibility problem, not just an annoyance. It affects people with motor impairments and tremors most, and everyone on a phone on a bus.

The guideline is a minimum of **24 by 24 CSS pixels** for any target, with 44 by 44 a better goal for primary actions on touch screens. Padding is how you get there without making the text bigger:

```css
.nav a {
  display: inline-block;
  padding: 12px 16px;
}
```

That `display: inline-block` matters. Vertical padding on a plain inline element doesn't increase its clickable area the way you'd expect, so the target stays small even though it looks bigger.

Also leave space between adjacent targets. Two links directly touching each other are easy to mis-tap.

## Testing what you styled

Four checks, none of which takes long.

**Tab through the whole page** without touching the mouse. You should always be able to see where you are, and the order should follow the visual layout. If focus disappears or jumps somewhere unexpected, that's a bug.

**Zoom text to 200%** and look for clipping, overlap, or horizontal scrolling.

**Run an automated audit.** Lighthouse has an Accessibility category, and the [axe DevTools extension](https://www.deque.com/axe/devtools/) is more thorough. Both catch contrast failures and missing labels quickly. Neither can tell you whether your focus indicator is *usable*, only whether one exists, which is why the manual tab-through still matters.

**Turn on reduce motion in your operating system** and reload. Your animations should stop.

## Common mistakes to avoid

- **`outline: none` with nothing to replace it.** The single most damaging line in this chapter.
- **A focus indicator with poor contrast.** Present but invisible is the same as absent.
- **Font sizes and container widths in `px`.** They ignore a visitor's text size preference.
- **Fixed heights on containers holding text.** Content clips the moment text scales.
- **`display: none` when you meant visually hidden.** It hides from assistive technology too.
- **Animation with no `prefers-reduced-motion` fallback.** For some people this causes physical symptoms.
- **Small touch targets, or padding on an inline element** that doesn't actually enlarge the hit area.
- **Trusting an automated audit alone.** It catches maybe half of what matters. The keyboard test catches the rest.

## Keep learning

- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion). The media feature and how to use it well.
- [MDN: :focus-visible](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible). Why it exists and how it differs from `:focus`.
- [WebAIM: Keyboard Accessibility](https://webaim.org/techniques/keyboard/). What keyboard users actually need, in plain language.
- [The a11y project checklist](https://www.a11yproject.com/checklist/). A practical list to work through on a real project.
- [axe DevTools](https://www.deque.com/axe/devtools/). A browser extension that audits a page against WCAG.
- [Video: Accessible Focus Styles, by Kevin Powell](https://www.youtube.com/watch?v=6btMrs0YKuA). A short, concrete walkthrough of focus indicators.

## Try it yourself (about 50 minutes)

Start with the keyboard test on your current project. Put the mouse away, press Tab from the top of the page, and go all the way through. Write down every point where you lost track of where you were. Those are your bugs.

Then fix them. Give every interactive element a `:focus-visible` style with an `outline`, an `outline-offset`, and at least 3:1 contrast against its background. Check the contrast of the indicator itself, not just the text.

Convert your font sizes, padding, and any `max-width` values from `px` to `rem`. Then zoom to 200% and find what breaks. Fixed heights are the usual cause.

Add the `.visually-hidden` class to your stylesheet and use it at least once, for a label that's obvious visually but has nothing for a screen reader to announce. Add a skip link that's hidden until focused.

Add the `prefers-reduced-motion` block to the bottom of your stylesheet now. You won't write real animation until the Transitions and Motion week, but the guard belongs in place well before then, so it's never a decision you make under deadline.

Run both Lighthouse and axe on the page, fix what they flag, then repeat the keyboard test once more. Note anything the manual test found that neither tool did, because that gap is the reason the manual test exists.

Next week turns to a different kind of consistency: naming a value once instead of retyping it everywhere your stylesheet uses it.
