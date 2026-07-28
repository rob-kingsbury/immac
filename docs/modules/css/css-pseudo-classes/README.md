---
title: Pseudo-Classes
prerequisites:
  - css/css-selectors
---

# Pseudo-Classes: Selecting by State

A **pseudo-class** selects an element based on its state rather than its markup. It's written as a selector followed by a colon and the state name. The states you'll use constantly relate to what the visitor is doing right now.

`:hover` matches while the pointer is over an element. `:focus` matches while an element is selected for keyboard input, which happens when a user tabs to it. `:active` matches during the moment of a click.

<CssDemo>

```html
<p><a href="#" class="demo-link">Hover me, or tab to me</a></p>
```

```css
.demo-link {
  color: #1d4ed8;
  padding: 6px 10px;
  border-radius: 4px;
  text-decoration: underline;
}
.demo-link:hover {
  background-color: #dbeafe;
  color: #1e3a8a;
}
.demo-link:focus {
  outline: 3px solid #f59e0b;
  outline-offset: 2px;
}
```

</CssDemo>

**Never style `:hover` without also styling `:focus`.** Hover only exists for people using a pointer. A keyboard user, or someone using assistive technology, navigates with Tab and sees focus states instead. Styling one and not the other builds a page that works for mouse users and quietly fails for everyone else. This comes back in depth in [Keyboard Access](/modules/accessibility/keyboard-access/README.md), but the habit starts now.

Two more pseudo-classes matter for links specifically. `:visited` matches a link the visitor has already been to, and `:link` matches one they haven't.

## Structural pseudo-classes

Another group selects elements by their position among their siblings, with no class or ID needed.

`:first-child` and `:last-child` match an element that is the first or last among its siblings. `:nth-child()` is the flexible one: it takes a number, a keyword such as `odd` or `even`, or a formula.

<CssDemo>

```html
<ul class="rows">
  <li>First row</li>
  <li>Second row</li>
  <li>Third row</li>
  <li>Fourth row</li>
  <li>Fifth row</li>
</ul>
```

```css
.rows {
  list-style: none;
  padding: 0;
  font-family: system-ui, sans-serif;
}
.rows li {
  padding: 8px 12px;
}
.rows li:nth-child(odd) {
  background-color: #f1f5f9;
}
.rows li:first-child {
  font-weight: 700;
  border-bottom: 2px solid #94a3b8;
}
```

</CssDemo>

Striped table rows, a first item styled as a header, a last item with no bottom border: all of it without adding a single class to the <abbr title="HyperText Markup Language">HTML</abbr>. That's the point of structural pseudo-classes. The styling survives when the content changes, because it's based on position rather than on labels somebody has to remember to apply.

## Common mistakes to avoid

- **Styling `:hover` without `:focus`.** Keyboard users get nothing, and it's an accessibility failure, not a nicety.

## The checklist

Run this over your interactive styling before you move on:

- Every `:hover` style has a matching `:focus` style, so keyboard users see the same feedback mouse users do
- Structural pseudo-classes are used for position-based styling instead of adding classes by hand

## Keep learning

- [MDN: Pseudo-classes](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes). The complete list, including everything this module didn't cover.
- [Video: CSS Specificity Explained, by Kevin Powell](https://www.youtube.com/watch?v=CHyPGSpIhSs). Covers pseudo-classes alongside the specificity they contribute to.
