---
title: Responsive Design and Media Queries
---

# Responsive Design and Media Queries

You have no idea what your visitor is looking at. A phone held vertically, a tablet, a laptop, a wall-mounted display, a browser window dragged to a third of the screen. **Responsive design** is the practice of building one page that works on all of them, rather than building separate sites and guessing which to serve.

This week covers the three pieces that make it work: the viewport meta tag, media queries, and a mobile-first way of writing them. You've already met the fourth piece without calling it that, since Flexbox wrapping and Grid's `auto-fit` are responsive behaviour with no media query at all.

![The same web page shown on a desktop monitor and a mobile phone, with the layout rearranged to suit each screen width.](/images/mobile-desktop.jpg)

## The viewport meta tag

Before any CSS matters, one line of HTML has to be right. Without it, everything else in this chapter silently fails.

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

That goes in the `<head>` of every page, and it's already in the starter page from Week 1.

Here's the problem it solves. Mobile browsers were built when almost no site was designed for phones, so they invented a defensive default: pretend the screen is about 980 pixels wide, render the desktop layout into that imaginary space, then shrink the whole thing down to fit the real screen. The result is a readable-shaped page at unreadably small text, which the user pinches and zooms around.

That default is still there. `width=device-width` turns it off, telling the browser to treat the viewport as the actual width of the device. `initial-scale=1` sets the starting zoom to 100%.

**Without this tag, your media queries will appear not to work.** They're being evaluated against that imaginary 980 pixel width, so a phone matches your desktop rules. This is the single most common cause of "my responsive CSS works when I resize my laptop but not on my actual phone," and it's a one-line fix.

Two things not to do with it. Don't set `maximum-scale=1` or `user-scalable=no`, both of which block pinch zoom. People with low vision rely on zoom, and disabling it is a WCAG failure.

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

## Layouts that respond without a query

Some of the best responsive behaviour needs no media query at all, and reaching for one first is a habit worth resisting.

You've already built two examples. Flexbox with `flex-wrap: wrap` reflows items onto new lines as space runs out. Grid with `repeat(auto-fit, minmax(200px, 1fr))` changes its column count on its own.

<CssDemo>

```html
<div class="auto-grid">
  <div class="c">One</div><div class="c">Two</div>
  <div class="c">Three</div><div class="c">Four</div>
</div>
```

```css
.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 10px;
}
.c {
  background-color: #dbeafe;
  border: 1px solid #60a5fa;
  padding: 18px;
  text-align: center;
  font-family: system-ui, sans-serif;
}
```

</CssDemo>

Resize this page and that grid rearranges itself. No breakpoint was chosen and no query was written.

Two more query-free tools. `max-width` on a text container stops lines getting uncomfortably long on wide screens, and setting it in `ch` units ties it to the text itself, since `1ch` is roughly the width of one character. Around 60 to 75 characters is the readable range.

```css
.prose {
  max-width: 65ch;
}
```

And `clamp()` scales a value smoothly between a floor and a ceiling, which is how you get type that grows with the screen without stepping at breakpoints:

```css
h1 {
  font-size: clamp(1.75rem, 5vw, 3.5rem);
}
```

That reads as: never smaller than 1.75rem, never larger than 3.5rem, and 5% of the viewport width in between.

## Responsive images

An image that's fine on a desktop can overflow a phone screen and force horizontal scrolling. One rule prevents it, and it belongs in every stylesheet you write:

```css
img {
  max-width: 100%;
  height: auto;
}
```

`max-width: 100%` stops the image ever being wider than its container. `height: auto` keeps the aspect ratio correct as the width changes, rather than squashing it.

That handles layout. Handling *file size* is the other half, and you met it in MTM1511: `srcset` and the `<picture>` element let the browser download a smaller file on a small screen instead of shrinking a huge one. Those live in the HTML, and the CSS rule above works alongside them.

## Testing your work

Three ways to test, in increasing order of trustworthiness.

**Resize the browser window.** Fast, and fine for finding breakpoints.

**Use device emulation in developer tools.** The toggle looks like a phone and tablet icon. It simulates specific device widths and lets you rotate between portrait and landscape. Better than dragging, because you can test exact widths repeatedly.

**Look at it on a real phone.** This is the one that catches what the others miss: actual touch target sizes, actual text legibility, actual rendering. Your project is published to GitHub Pages at a public URL, so you can open it on your own phone in seconds. Do this before you submit anything.

## Common mistakes to avoid

- **A missing viewport meta tag.** Every media query appears broken on real phones, and only on real phones.
- **Disabling zoom** with `user-scalable=no` or `maximum-scale=1`. It's an accessibility failure with no upside.
- **Mixing `min-width` and `max-width` queries in one stylesheet.** The overlaps get very hard to reason about. Pick mobile-first and stay with it.
- **Choosing breakpoints from a device list.** Devices change. Your content doesn't. Let the content tell you where it breaks.
- **Testing only by resizing a desktop browser.** It won't reveal a missing viewport tag, touch targets that are too small, or how the page actually reads at arm's length.
- **Reaching for a media query first.** Try `flex-wrap`, `auto-fit`, `max-width`, and `clamp()` before adding a breakpoint.
- **Forgetting `img { max-width: 100% }`.** One oversized image causes horizontal scrolling across the whole page.

## Keep learning

- [MDN: Responsive design](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design). The full walkthrough, including the history of why the viewport tag exists.
- [MDN: Using media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries). Complete syntax reference, including features beyond width.
- [Chrome DevTools: Simulate mobile devices](https://developer.chrome.com/docs/devtools/device-mode). How to use the device emulation described above.
- [MDN: clamp()](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp). The function behind fluid type.
- [Video: Responsive Design Tutorial, by Kevin Powell](https://www.youtube.com/watch?v=srvUrASNj0s). A practical mobile-first build from scratch.

## Try it yourself

First, confirm the viewport meta tag is in the `<head>` of every page you've built. Then deliberately break it: comment it out, push, and open the page on a real phone to see what happens. Put it back. That's a lesson worth having once.

Rewrite your card layout mobile-first. Make the base rule a single column, then add a `min-width` query for two columns and another for three. Delete any `max-width` queries you had and confirm the page still behaves.

Find your own breakpoints rather than copying the table above. Widen the browser one step at a time and write down the exact width where each part of your layout stops looking right. Use those numbers.

Add `img { max-width: 100%; height: auto; }` to your stylesheet, and `max-width: 65ch` to your main text container. Widen the window to full screen and confirm your paragraphs stopped stretching.

Finally, open your live Pages URL on an actual phone. Check that nothing scrolls sideways, that every link is big enough to tap without care, and that you can read the body text without zooming. Fix whatever fails, push, and check again.
