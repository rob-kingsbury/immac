---
title: Responsive Design and Media Queries
prerequisites:
  - css/css-grid
---

# Responsive Design and Media Queries

You have no idea what your visitor is looking at. A phone held vertically, a tablet, a laptop, a wall-mounted display, a browser window dragged to a third of the screen. **Responsive design** is the practice of building one page that works on all of them, rather than building separate sites and guessing which to serve.

Responsive design covers everything that reacts to size: the viewport meta tag, media queries and a mobile-first way of writing them, the viewport units covered in [CSS Units](/modules/css/css-units/README.md), fluid sizing that needs no breakpoint at all, and container queries, a newer tool that responds to a component's own space rather than the whole screen. You've already met one piece of this without calling it that, since Flexbox wrapping and Grid's `auto-fit` are responsive behaviour with no media query at all.

![The same web page shown on a desktop monitor and a mobile phone, with the layout rearranged to suit each screen width.](/images/mobile-desktop.jpg)

## The viewport meta tag

Before any <abbr title="Cascading Style Sheets">CSS</abbr> matters, one line of <abbr title="HyperText Markup Language">HTML</abbr> has to be right. Without it, everything else in this module silently fails.

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

That goes in the `<head>` of every page, alongside the rest of the essentials covered in [Document Head Best Practices](/modules/html/html-document-structure/head-best-practices.md).

Here's the problem it solves. Mobile browsers were built when almost no site was designed for phones, so they invented a defensive default: pretend the screen is about 980 pixels wide, render the desktop layout into that imaginary space, then shrink the whole thing down to fit the real screen. The result is a readable-shaped page at unreadably small text, which the user pinches and zooms around.

That default is still there. `width=device-width` turns it off, telling the browser to treat the viewport as the actual width of the device. `initial-scale=1` sets the starting zoom to 100%.

**Without this tag, your media queries will appear not to work.** They're being evaluated against that imaginary 980 pixel width, so a phone matches your desktop rules. This is the single most common cause of "my responsive CSS works when I resize my laptop but not on my actual phone," and it's a one-line fix.

Two things not to do with it. Don't set `maximum-scale=1` or `user-scalable=no`, both of which block pinch zoom. People with low vision rely on zoom, and disabling it is a <abbr title="Web Content Accessibility Guidelines">WCAG</abbr> failure.

## Media query syntax

A **media query** wraps a block of CSS in a condition. The rules inside apply only when the condition is true.

```css
@media (min-width: 700px) {
  .card {
    padding: 32px;
  }
}
```

Read it as: when the viewport is at least 700 pixels wide, apply what's inside. Below that, the block is ignored entirely and whatever you wrote outside it still applies.

The two conditions you'll use almost exclusively are `min-width` and `max-width`.

`min-width` means "this width **and up**." `max-width` means "this width **and down**." Mixing them carelessly is a reliable way to confuse yourself, so the advice below is to pick one and stay with it.

Conditions combine with `and`:

```css
@media (min-width: 700px) and (max-width: 1100px) {
  /* only between those two widths */
}
```

Media queries can go anywhere in your stylesheet, but the conventional place is at the bottom, or grouped near the rules they modify. Because they're normal CSS, the cascade still applies: a media query doesn't automatically beat a rule outside one. If the specificity ties, the later rule wins, which is another reason to put your queries after your base rules.

## Mobile-first

You can write responsive CSS in two directions, and the choice shapes everything.

**Desktop-first** means writing the wide layout as your base and using `max-width` queries to override it downward for smaller screens.

**Mobile-first** means writing the narrow layout as your base and using `min-width` queries to add complexity upward as space allows.

**Write mobile-first.** Three reasons, and they're practical rather than ideological.

A narrow screen is the harder constraint, so designing into it first forces the real decisions about what matters early, rather than deciding what to cut at the end. Adding complexity as space appears is easier to reason about than removing it. And a single-column stack is what most elements do naturally, so the base stylesheet ends up smaller with fewer overrides fighting each other.

Here's the same layout written both ways. Mobile-first:

```css
/* Base: applies everywhere, designed for narrow screens */
.cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

/* Add a second column when there's room */
@media (min-width: 600px) {
  .cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* And a third when there's more */
@media (min-width: 900px) {
  .cards {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

The base rule is the simple case. Each query adds one thing. Nothing is undone.

## Breakpoints

A **breakpoint** is a width at which your layout changes. The most common mistake is choosing them from a list of device sizes, which is a losing game, because there are hundreds of devices and the list changes yearly.

**Choose breakpoints from your own content.** Widen your browser slowly from narrow to wide, and watch for the moment the layout stops looking right: text lines get uncomfortably long, cards get too narrow to read, a navigation bar starts to crowd. That width is your breakpoint, whatever number it happens to be.

That said, a rough set of starting values for a course project:

| Roughly | Width | Typical device |
|---|---|---|
| Small | base, no query | phones |
| Medium | `min-width: 600px` | large phones and small tablets |
| Large | `min-width: 900px` | tablets and small laptops |
| Extra large | `min-width: 1200px` | desktop monitors |

Use fewer than you think you need. Two well-chosen breakpoints usually beat five arbitrary ones, and every extra query is more code to keep consistent.

## Common mistakes to avoid

- **A missing viewport meta tag.** Every media query appears broken on real phones, and only on real phones.
- **Disabling zoom** with `user-scalable=no` or `maximum-scale=1`. It's an accessibility failure with no upside.
- **Mixing `min-width` and `max-width` queries in one stylesheet.** The overlaps get very hard to reason about. Pick mobile-first and stay with it.
- **Choosing breakpoints from a device list.** Devices change. Your content doesn't. Let the content tell you where it breaks.
- **Reaching for a media query first.** Try `flex-wrap`, `auto-fit`, `ch`, `min()`, `max()`, and `clamp()` before adding a breakpoint. See [Layouts That Respond Without a Query](/modules/css/css-rwd-patterns/README.md) and [Fluid Sizing Without a Query](/modules/css/css-fluid-sizing/README.md).

## The checklist

Run this over your layout before you move on:

- Viewport meta tag present in the `<head>` of every page
- Media queries written mobile-first, using `min-width`, not `max-width`
- Breakpoints chosen from where your own content starts to look wrong, not from a device list

## Keep learning

- [MDN: Responsive design](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design). The full walkthrough, including the history of why the viewport tag exists.
- [MDN: Using media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries). Complete syntax reference, including features beyond width.
- [Video: Introduction to Media Queries, by Steve Griffith](https://www.youtube.com/watch?v=B6l6Wzmj4pA). A practical walkthrough of writing breakpoints from scratch.
