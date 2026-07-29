---
title: Transitions
prerequisites:
  - css/css-pseudo-classes
  - accessibility/reduced-motion
---

# Transitions

Motion is the last layer of styling a project usually gets. Used well, it makes an interface feel responsive and explains what just changed. Used carelessly, it makes a page feel slow, and for some people it causes genuine physical symptoms, which is why the `prefers-reduced-motion` guard from [Reduced Motion](/modules/accessibility/reduced-motion/README.md) has to be in place before any of what follows goes live.

## What a transition does

By default, a <abbr title="Cascading Style Sheets">CSS</abbr> change is instant. A `:hover` rule that changes a background colour switches it in a single frame. The `transition` property tells the browser to move between the two values over time instead.

<CssDemo>

```html
<p class="row">
  <a href="#" class="btn instant">No transition</a>
  <a href="#" class="btn smooth">With transition</a>
</p>
```

```css
.row {
  font-family: system-ui, sans-serif;
  display: flex;
  gap: 12px;
}
.btn {
  background-color: #0e7490;
  color: #ffffff;
  padding: 10px 18px;
  border-radius: 6px;
  text-decoration: none;
}
.instant:hover, .instant:focus-visible {
  background-color: #f59e0b;
}
.smooth {
  transition: background-color 250ms ease;
}
.smooth:hover, .smooth:focus-visible {
  background-color: #f59e0b;
}
```

</CssDemo>

Hover both. The first snaps, the second eases. Note that the transition is declared on the **base rule**, not on `:hover`. That's deliberate: putting it on the base means the element eases both on the way in and on the way back out. Put it only on `:hover` and it eases in, then snaps back.

## The four parts

The `transition` shorthand takes up to four values:

```css
transition: background-color 250ms ease-out 0ms;
/*          property         duration timing  delay */
```

**Property** names what to animate. You can list several separated by commas, or use `all`, though naming them explicitly is better practice because `all` animates things you didn't intend.

**Duration** is how long it takes, in `ms` or `s`. This is the value that most affects how a page feels.

**Timing function** is how the speed is distributed across the duration.

**Delay** waits before starting, and is usually left at zero.

Multiple properties, each with their own timing, are written as a comma-separated list:

```css
transition: background-color 200ms ease, transform 300ms ease-out;
```

## Duration

Duration is where most beginner motion goes wrong, almost always by being too slow.

| Duration | Feels like |
|---|---|
| Under 100ms | essentially instant, the motion isn't perceived |
| 150 to 250ms | responsive; the right range for hover and focus states |
| 300 to 500ms | deliberate; suits larger elements and panels opening |
| Over 500ms | sluggish; the user is waiting for your animation |

**Small things move fast, large things move slower.** A button changing colour wants 150 to 200ms. A panel sliding open can justify 300 to 400ms because it travels further and the eye needs to follow it.

<CssDemo>

```html
<p class="row">
  <a href="#" class="btn t150">150ms</a>
  <a href="#" class="btn t400">400ms</a>
  <a href="#" class="btn t1200">1200ms</a>
</p>
```

```css
.row { font-family: system-ui, sans-serif; display: flex; gap: 12px; }
.btn {
  background-color: #334155;
  color: #ffffff;
  padding: 10px 18px;
  border-radius: 6px;
  text-decoration: none;
}
.btn:hover, .btn:focus-visible { background-color: #db2777; }
.t150 { transition: background-color 150ms ease; }
.t400 { transition: background-color 400ms ease; }
.t1200 { transition: background-color 1200ms ease; }
```

</CssDemo>

The third one is the mistake people make when they're pleased with themselves for adding a transition. It makes the interface feel unresponsive, because the user has already moved on.

## Timing functions

The timing function shapes the speed curve. Real objects don't start and stop instantly, and matching that makes motion feel natural.

- `linear` moves at a constant speed. It looks mechanical and is rarely right for interface motion.
- `ease` starts slow, speeds up, slows down. The default, and a reasonable choice for most things.
- `ease-in` starts slow and accelerates. Suits something leaving.
- `ease-out` starts fast and decelerates. Suits something arriving, and it's the best default for interface motion because the response feels immediate.
- `cubic-bezier()` defines your own curve when the keywords aren't enough.

<CssDemo>

```html
<p class="row">
  <a href="#" class="bar linear">linear</a>
  <a href="#" class="bar in">ease-in</a>
  <a href="#" class="bar out">ease-out</a>
</p>
```

```css
.row { font-family: system-ui, sans-serif; }
.bar {
  display: block;
  background-color: #6d28d9;
  color: #ffffff;
  padding: 8px 14px;
  margin-bottom: 8px;
  width: 120px;
  text-decoration: none;
  border-radius: 4px;
}
.bar:hover, .bar:focus-visible { width: 300px; }
.linear { transition: width 600ms linear; }
.in { transition: width 600ms ease-in; }
.out { transition: width 600ms ease-out; }
```

</CssDemo>

**When in doubt, use `ease-out`.** It makes the interface feel like it responded instantly and then settled, which is exactly the impression you want.

Transitions on their own only ease between two states of the properties a browser can animate cheaply, which is exactly the subject of [Transforms](/modules/css/css-transforms/README.md) next.

## Common mistakes to avoid

- **Transitions that are too slow.** Anything over 500ms on an interface element feels broken.
- **Declaring the transition on `:hover` instead of the base rule.** It eases in and snaps back.
- **`transition: all`.** It animates properties you never intended, sometimes expensively.
- **Motion with no `prefers-reduced-motion` handling.** A real accessibility failure with real physical consequences.
- **Animating `:hover` but not `:focus-visible`.** Keyboard users get nothing, again.
- **Motion as the only indicator of a state change.** Pair it with something static.
- **Animating everything.** If every element moves, none of the movement means anything.

## The checklist

Run this over every transition you wrote before you move on:

- The transition is declared on the base rule, not only on `:hover`
- Properties are named explicitly, rather than using `transition: all`
- Duration falls in the 150 to 400ms range for most interface motion
- `:focus-visible` gets the same treatment as `:hover`
- `prefers-reduced-motion` handling is in place, covered in [Reduced Motion](/modules/accessibility/reduced-motion/README.md)

## Keep learning

- [MDN: Using CSS transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_transitions/Using_CSS_transitions). The full property reference.
- [cubic-bezier.com](https://cubic-bezier.com/). Draw a custom timing curve and preview it.
- [Video: All About CSS Transitions, by Steve Griffith](https://www.youtube.com/watch?v=alxljWzQoY4). A practical walkthrough with good taste about restraint.
