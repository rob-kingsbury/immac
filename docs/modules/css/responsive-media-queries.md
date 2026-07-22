---
title: Responsive Design and Media Queries
---

# Responsive Design and Media Queries

You have no idea what your visitor is looking at. A phone held vertically, a tablet, a laptop, a wall-mounted display, a browser window dragged to a third of the screen. **Responsive design** is the practice of building one page that works on all of them, rather than building separate sites and guessing which to serve.

This is the longest chapter in the course, because it covers everything that reacts to size: the viewport meta tag, media queries and a mobile-first way of writing them, the viewport units Week 2 promised were coming, fluid sizing that needs no breakpoint at all, and container queries, a newer tool that responds to a component's own space rather than the whole screen. You've already met one piece without calling it that, since Flexbox wrapping and Grid's `auto-fit` are responsive behaviour with no media query at all.

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

## Viewport units, and the mobile browser bug they fix

Back in Week 2 you met `%`, which measures against a parent. **Viewport units** measure against the browser's viewport instead. `1vw` is 1% of the viewport's width, `1vh` is 1% of its height. A box set to `width: 100vw; height: 100vh;` fills the screen, full stop, no matter what its parent is doing.

That's exactly the tool for a full-screen hero section, and for years `100vh` was the standard way to build one. It has a real bug on phones, though, and it's common enough to be worth understanding precisely rather than working around by accident.

**A phone's browser chrome, the address bar and toolbar, can show or hide as you scroll.** When it's showing, it takes up real screen space. When it hides, the page gets taller. `100vh` was defined against the *larger* of those two states, the one with the chrome hidden. So the moment the chrome is actually showing, which is most of the time, a `100vh` box is taller than what's genuinely visible, and its bottom portion sits behind the browser's own UI or pushes the page into an unwanted scroll.

<div class="diagram">
<svg viewBox="0 0 520 340" role="img" aria-label="Two identical phones, both with the browser address bar visible. On the left, a box sized with 100vh is calculated for the larger viewport the chrome would allow, so it extends past the visible screen and is cut off at the bottom. On the right, the same box sized with 100dvh matches the actual current visible area exactly, with no overflow.">
  <text x="115" y="24" text-anchor="middle" class="d-lbl-muted">100vh</text>
  <rect x="20" y="34" width="190" height="290" rx="20" class="d-surface d-border" stroke-width="2"/>
  <rect x="34" y="50" width="162" height="26" rx="4" class="d-muted-stroke" fill="var(--vp-c-bg-soft, #f6f6f7)" stroke-width="1"/>
  <circle cx="46" cy="63" r="3" class="d-muted-stroke" fill="var(--vp-c-text-2, #5c6773)"/>
  <text x="58" y="67" class="d-lbl-mono" font-size="9">example.com</text>
  <text x="34" y="90" class="d-lbl-muted" font-size="9">address bar, visible</text>
  <rect x="34" y="98" width="162" height="256" class="d-accent-soft d-accent-stroke" stroke-width="1.5"/>
  <line x1="34" y1="300" x2="196" y2="300" class="d-border" stroke-width="1.5" stroke-dasharray="4 3"/>
  <text x="115" y="290" text-anchor="middle" class="d-lbl-mono" font-size="10">box continues,</text>
  <text x="115" y="316" text-anchor="middle" class="d-lbl-muted" font-size="9">hidden below the fold</text>

  <path d="M225 170 L295 170" class="d-accent-stroke" stroke-width="2" marker-end="url(#vh-arrow)"/>

  <text x="405" y="24" text-anchor="middle" class="d-lbl-muted">100dvh</text>
  <rect x="310" y="34" width="190" height="290" rx="20" class="d-surface d-accent-stroke" stroke-width="2"/>
  <rect x="324" y="50" width="162" height="26" rx="4" class="d-muted-stroke" fill="var(--vp-c-bg-soft, #f6f6f7)" stroke-width="1"/>
  <circle cx="336" cy="63" r="3" class="d-muted-stroke" fill="var(--vp-c-text-2, #5c6773)"/>
  <text x="348" y="67" class="d-lbl-mono" font-size="9">example.com</text>
  <text x="324" y="90" class="d-lbl-muted" font-size="9">address bar, visible</text>
  <rect x="324" y="98" width="162" height="212" class="d-accent-soft d-accent-stroke" stroke-width="1.5"/>
  <text x="405" y="210" text-anchor="middle" class="d-lbl-mono" font-size="10">fits exactly</text>

  <defs>
    <marker id="vh-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 Z" fill="var(--vp-c-text-accent, #3b82f6)"/>
    </marker>
  </defs>
</svg>
</div>

**`dvh`, the dynamic viewport height unit, fixes this by tracking whatever is actually visible right now.** As the chrome shows and hides, `100dvh` updates to match, so the box never overflows and never leaves an unexpected gap.

```css
.hero {
  height: 100dvh;
}
```

Two related units round out the family, and you'll see them named in other people's code even if you reach for `dvh` most often yourself. `svh`, the small viewport height, is always calculated as if the chrome is fully showing, the smallest the visible area ever gets. `lvh`, the large viewport height, is calculated as if the chrome is fully hidden, which is the same number the old, buggy `100vh` used. `dvh` is the one that actually tracks reality as it changes, and it's the one to default to for anything meant to fill the screen.

`vw` doesn't have the same bug, since browser chrome eats vertical space, not horizontal, so `100vw` behaves as expected. The dynamic variants exist for height specifically.

## Fluid sizing without a query

Some responsive behaviour needs no breakpoint at all, and reaching for a media query first is a habit worth resisting when one of these will do.

You already know `%`, `rem`, and now viewport units. Three more tools combine them into sizing that adjusts continuously rather than jumping at fixed widths.

`max-width` in `ch` units ties a text container's width to the text itself, since `1ch` is roughly the width of one character in the current font. Around 60 to 75 characters is the readable range for a line of body text.

<CssDemo>

```html
<p class="prose">This paragraph is capped at a comfortable reading width using the ch unit, so the line length stays reasonable no matter how wide the surrounding page gets. Resize the panel and the text keeps wrapping at roughly the same number of characters per line.</p>
```

```css
.prose {
  max-width: 65ch;
  font-family: system-ui, sans-serif;
  line-height: 1.6;
}
```

</CssDemo>

`min()` and `max()` pick the smaller or larger of two values, evaluated live as the page resizes. `min()` is how you cap something without hardcoding when the cap kicks in: `width: min(90%, 600px)` is never wider than 600 pixels, and on a narrow screen where 90% is already less than that, it shrinks with the screen instead.

<CssDemo>

```html
<div class="capped">width: min(90%, 300px)</div>
```

```css
.capped {
  width: min(90%, 300px);
  background-color: #dbeafe;
  border: 1px solid #60a5fa;
  padding: 12px;
  font-family: system-ui, sans-serif;
  text-align: center;
}
```

</CssDemo>

`clamp()` combines both directions into one: a floor, a preferred value, and a ceiling. It's how you get type that grows smoothly with the screen instead of jumping at breakpoints.

<CssDemo>

```html
<h2 class="fluid">Fluid heading</h2>
```

```css
.fluid {
  font-size: clamp(1.5rem, 5vw, 3rem);
  font-family: system-ui, sans-serif;
  margin: 0;
}
```

</CssDemo>

Resize this panel and the heading scales continuously between its floor and its ceiling. Read `clamp(1.5rem, 5vw, 3rem)` as: never smaller than 1.5rem, never larger than 3rem, and 5% of the viewport width whenever that lands between the two. The middle value is what actually grows; the outer two just fence it in.

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

## Container queries: responding to a component's own space, not the screen

Everything so far, media queries included, reacts to one thing: **the size of the whole browser window.** That's the right question for a page's overall structure. It's the wrong question for a single reusable piece of it.

Picture a card component you intend to use in two places on the same page: full width in the main column, and narrow inside a sidebar. A media query can't tell those two spots apart. It only knows the viewport is, say, 1200 pixels wide, and it applies the same rule to the card everywhere that card appears, regardless of which column it landed in.

**A container query answers a different question: how much space does *this component itself* actually have, right now, in whatever it's sitting inside?** The viewport can be exactly the same size in both cases:

<div class="diagram">
<svg viewBox="0 0 520 260" role="img" aria-label="Two browser windows of identical width. In the left window, a card sits inside a narrow sidebar and stacks its content vertically. In the right window, the same card sits inside a wide main column and lays its content out horizontally. The viewport width is the same in both; only the card's own container width differs.">
  <text x="130" y="18" text-anchor="middle" class="d-lbl-muted">SAME VIEWPORT WIDTH</text>
  <text x="390" y="18" text-anchor="middle" class="d-lbl-muted">SAME VIEWPORT WIDTH</text>

  <rect x="20" y="28" width="220" height="210" rx="6" class="d-surface d-border" stroke-width="1.5"/>
  <circle cx="34" cy="42" r="3" class="d-border" fill="var(--vp-c-divider, #e2e2e3)"/>
  <circle cx="44" cy="42" r="3" class="d-border" fill="var(--vp-c-divider, #e2e2e3)"/>
  <circle cx="54" cy="42" r="3" class="d-border" fill="var(--vp-c-divider, #e2e2e3)"/>
  <line x1="20" y1="52" x2="240" y2="52" class="d-border" stroke-width="1"/>
  <rect x="34" y="66" width="70" height="150" class="d-border" fill="none" stroke-dasharray="3 2"/>
  <text x="69" y="80" text-anchor="middle" class="d-lbl-muted" font-size="9">narrow</text>
  <text x="69" y="92" text-anchor="middle" class="d-lbl-muted" font-size="9">container</text>
  <rect x="40" y="102" width="58" height="100" rx="4" class="d-accent-soft d-accent-stroke" stroke-width="1.5"/>
  <rect x="48" y="110" width="42" height="30" rx="3" fill="var(--vp-c-text-accent, #3b82f6)" opacity="0.5"/>
  <text x="69" y="158" text-anchor="middle" class="d-lbl-mono" font-size="9">title</text>
  <text x="69" y="172" text-anchor="middle" class="d-lbl-mono" font-size="9">text</text>
  <text x="69" y="186" text-anchor="middle" class="d-lbl-mono" font-size="9">stacked</text>

  <rect x="280" y="28" width="220" height="210" rx="6" class="d-surface d-border" stroke-width="1.5"/>
  <circle cx="294" cy="42" r="3" class="d-border" fill="var(--vp-c-divider, #e2e2e3)"/>
  <circle cx="304" cy="42" r="3" class="d-border" fill="var(--vp-c-divider, #e2e2e3)"/>
  <circle cx="314" cy="42" r="3" class="d-border" fill="var(--vp-c-divider, #e2e2e3)"/>
  <line x1="280" y1="52" x2="500" y2="52" class="d-border" stroke-width="1"/>
  <rect x="294" y="66" width="192" height="150" class="d-border" fill="none" stroke-dasharray="3 2"/>
  <text x="390" y="80" text-anchor="middle" class="d-lbl-muted" font-size="9">wide container</text>
  <rect x="304" y="100" width="172" height="70" rx="4" class="d-accent-soft d-accent-stroke" stroke-width="1.5"/>
  <rect x="312" y="108" width="54" height="54" rx="3" fill="var(--vp-c-text-accent, #3b82f6)" opacity="0.5"/>
  <text x="420" y="126" class="d-lbl-mono" font-size="9">title</text>
  <text x="420" y="140" class="d-lbl-mono" font-size="9">text, side</text>
  <text x="420" y="154" class="d-lbl-mono" font-size="9">by side</text>
</svg>
</div>

Same card, same rule written once, two different results, because the rule asked about the container, not the window.

### Setting it up

Container queries need two steps: mark an element as a **container** for its descendants to query, then write a query that targets that container.

```css
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card {
    display: flex;
    gap: 16px;
  }
}
```

`container-type: inline-size` tells the browser to track this element's width and let descendants query it. `container-name` is optional, a label so a query can target a specific ancestor when more than one container might otherwise apply. The `@container` block reads almost exactly like `@media`, `min-width` and all, except the width it's measuring is the named container's, not the viewport's.

<CssDemo>

```html
<div class="wrapper narrow">
  <div class="card">
    <div class="thumb"></div>
    <div class="body">
      <strong>Lakeside Loop</strong>
      <p>4 km, easy</p>
    </div>
  </div>
</div>
<div class="wrapper wide">
  <div class="card">
    <div class="thumb"></div>
    <div class="body">
      <strong>Lakeside Loop</strong>
      <p>4 km, easy</p>
    </div>
  </div>
</div>
```

```css
.wrapper {
  container-type: inline-size;
  border: 1px dashed #94a3b8;
  padding: 10px;
  margin-bottom: 10px;
  font-family: system-ui, sans-serif;
}
.narrow { width: 160px; }
.wide { width: 100%; }
.card {
  background-color: #f1f5f9;
  border-radius: 6px;
  padding: 10px;
}
.thumb {
  width: 100%;
  aspect-ratio: 16 / 9;
  background-color: #cbd5e1;
  border-radius: 4px;
}
@container (min-width: 320px) {
  .card {
    display: flex;
    gap: 12px;
    align-items: center;
  }
  .thumb {
    width: 90px;
    flex-shrink: 0;
  }
}
```

</CssDemo>

Same card markup, same CSS, and it lays out differently depending on which wrapper it's inside. Resize your browser and nothing changes, because neither wrapper's width depends on the viewport. That's the point.

### Container query units

Just as `vw` and `vh` measure against the viewport, `cqw` and `cqi` measure against the nearest container. `cqi` matches the container's **inline size**, which is its width in the normal left-to-right, top-to-bottom writing direction this course uses. A heading that should scale with its own container, not the whole page, can use it exactly like `clamp()` used `vw` earlier:

```css
.card h3 {
  font-size: clamp(1rem, 4cqi, 1.5rem);
}
```

That heading grows and shrinks with the *card's* width, whichever container the card happens to be sitting in, completely independent of the browser window.

## Media queries or container queries?

You now have two tools that look similar and answer different questions. The rule that separates them:

**Use media queries for your page's overall structure. Use container queries for the components inside it.**

| | Media queries | Container queries |
|---|---|---|
| Reacts to | the viewport | the nearest container |
| Best for | page-level layout, navigation, global grid changes | reusable components: cards, sidebars, anything used in more than one spot |
| Example | collapse a three-column page into one column on a phone | a card that switches from stacked to side-by-side once *it* has enough room, wherever it's placed |

Container queries don't replace media queries, and there's a specific, permanent reason for that: **some questions are viewport questions and cannot be asked any other way.** A container has no idea what device it's on, whether the visitor prefers reduced motion, or whether the page is being printed. Those live only at the level of the whole browser and the user's system, so media queries stay essential for:

- **User and system preferences.** `prefers-color-scheme` and `prefers-reduced-motion`, which you'll meet properly later in the course, only exist as media features.
- **Orientation and device characteristics.** Portrait versus landscape, or a `print` stylesheet for a page heading to a printer, are viewport-level questions by definition.
- **Global layout decisions.** The page's own header, primary navigation, and outermost grid respond to the screen the visitor actually has, not to a container, because at that level the container *is* the viewport.

So the practical habit for the rest of this course: reach for a media query when you're deciding how the *page* is arranged, and a container query when you're deciding how one *reusable piece* of it behaves, wherever it ends up living.

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
- **Using `100vh` for a full-screen mobile section.** Use `100dvh` instead, so it doesn't overflow behind the browser's address bar.
- **Testing only by resizing a desktop browser.** It won't reveal a missing viewport tag, touch targets that are too small, or how the page actually reads at arm's length.
- **Reaching for a media query first.** Try `flex-wrap`, `auto-fit`, `ch`, `min()`, `max()`, and `clamp()` before adding a breakpoint.
- **Reaching for a container query when a media query was the right tool.** A page's own header and primary navigation are viewport-level decisions. Save container queries for reusable components.
- **Forgetting `img { max-width: 100% }`.** One oversized image causes horizontal scrolling across the whole page.

## Keep learning

- [MDN: Responsive design](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design). The full walkthrough, including the history of why the viewport tag exists.
- [MDN: Using media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries). Complete syntax reference, including features beyond width.
- [MDN: Viewport concepts](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_viewport_units). The full explanation of `vh`, `dvh`, `svh`, and `lvh`.
- [MDN: CSS container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries). The complete guide, including container types beyond `inline-size`.
- [Chrome DevTools: Simulate mobile devices](https://developer.chrome.com/docs/devtools/device-mode). How to use the device emulation described above.
- [MDN: clamp()](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp). The function behind fluid type.
- [Video: Responsive Design Tutorial, by Kevin Powell](https://www.youtube.com/watch?v=srvUrASNj0s). A practical mobile-first build from scratch.

## Try it yourself

First, confirm the viewport meta tag is in the `<head>` of every page you've built. Then deliberately break it: comment it out, push, and open the page on a real phone to see what happens. Put it back. That's a lesson worth having once.

Rewrite your card layout mobile-first. Make the base rule a single column, then add a `min-width` query for two columns and another for three. Delete any `max-width` queries you had and confirm the page still behaves.

Find your own breakpoints rather than copying the table above. Widen the browser one step at a time and write down the exact width where each part of your layout stops looking right. Use those numbers.

If your project has a full-screen section, give it `height: 100dvh` rather than `100vh`, and check it on an actual phone with the address bar showing.

Add `img { max-width: 100%; height: auto; }` to your stylesheet, and `max-width: 65ch` to your main text container. Widen the window to full screen and confirm your paragraphs stopped stretching. Give one heading a `clamp()`-based `font-size` and watch it scale as you resize.

Take one component you plan to reuse in more than one layout, a card is the natural choice, mark its wrapper as a container, and write a container query that changes its layout once it has enough width. Place it in two different spots on your page, a wide one and a narrow one, and confirm it responds to each independently of the viewport.

Finally, open your live Pages URL on an actual phone. Check that nothing scrolls sideways, that every link is big enough to tap without care, and that you can read the body text without zooming. Fix whatever fails, push, and check again.

That's the toolkit for making a layout hold together at any size. Reading week follows, then Week 9 goes underneath the visual layer entirely: what the browser actually builds from your HTML, and how to target it precisely.
