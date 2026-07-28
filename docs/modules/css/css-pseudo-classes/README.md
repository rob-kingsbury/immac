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

## Going deeper: the `:not()` pseudo-class

`:not()` matches an element that would otherwise match the selector inside its parentheses, but doesn't. Read it as "everything except." It targets by structural relationship, the same way the combinators in [Descendant, Child, Sibling, and Attribute Selectors](/modules/css/css-selectors-adv/README.md) do, just by exclusion instead of inclusion.

A common case: style every item in a list except the last one, useful for adding a separator between items without leaving a dangling one after the final entry.

<CssDemo>

```html
<nav class="crumbs">
  <a href="#">Routes</a>
  <a href="#">Ridge Loop</a>
  <a href="#">Trail Notes</a>
</nav>
```

```css
.crumbs {
  font-family: system-ui, sans-serif;
}
.crumbs a {
  color: #1d4ed8;
  text-decoration: none;
}
.crumbs a:not(:last-child) {
  margin-right: 6px;
  padding-right: 6px;
  border-right: 1px solid #94a3b8;
}
```

</CssDemo>

Every link except the last one gets a right-hand divider. Without `:not()` you'd need a class on every link except one, and remembering to leave it off the last one is exactly the kind of manual bookkeeping structural selectors exist to avoid.

`:not()` also combines naturally with attribute selectors: a form where every input should look the same except the submit button:

<CssDemo>

```html
<form class="signup">
  <input type="text" placeholder="Name">
  <input type="email" placeholder="Email">
  <input type="submit" value="Sign up">
</form>
```

```css
.signup {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 240px;
  font-family: system-ui, sans-serif;
}
.signup input:not([type="submit"]) {
  border: 1px solid #94a3b8;
  border-radius: 4px;
  padding: 8px;
}
.signup input[type="submit"] {
  background-color: #0f766e;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px;
  cursor: pointer;
}
```

</CssDemo>

`input:not([type="submit"])` reads naturally: every input, except the one whose type is submit. That's usually clearer than writing a rule for every input type you happen to be using and hoping you didn't miss one.

One specificity note, since [Specificity, Calculated Properly](/modules/css/css-precedence/README.md) covers the A-B-C method: `:not()` itself adds nothing to a selector's specificity. What counts is whatever is inside the parentheses. `a:not(:last-child)` scores the same as `a:last-child` would, one pseudo-class, not two.

## Going deeper: `:nth-child()` and `:nth-of-type()`

The structural pseudo-classes section above used `:nth-child(odd)` to stripe a list, without explaining what's actually happening behind that keyword. Here's the formula, and the sibling pseudo-class that section didn't cover.

### The `an+b` formula

`:nth-child()` takes an expression in the form `an+b`. CSS starts a counter, `n`, at 0 and counts up forever: 0, 1, 2, 3, and so on. For each value of `n`, it works out `an+b` and matches the child sitting at that position. Positions that don't exist, zero, negative, or past the last child, are simply skipped.

Work through `:nth-child(2n)`: at `n=0` that's position 0, which doesn't exist, so nothing matches yet. At `n=1` it's position 2. At `n=2` it's position 4. The pattern continues: 2, 4, 6, 8. Every even position. That's exactly what the keyword `even` means, and `:nth-child(2n)` and `:nth-child(even)` are the same selector.

<CssDemo>

```html
<ul class="cards">
  <li>Ridge Loop</li>
  <li>Harbour Path</li>
  <li>Meadow Circuit</li>
  <li>Summit Trail</li>
  <li>Creekside Walk</li>
</ul>
```

```css
.cards {
  list-style: none;
  padding: 0;
  font-family: system-ui, sans-serif;
}
.cards li {
  padding: 8px 12px;
}
.cards li:nth-child(2n) {
  background-color: #f1f5f9;
}
```

</CssDemo>

The second and fourth cards are shaded. Run the same formula for `:nth-child(2n+1)` and you'd get positions 1, 3, 5, which is `odd`.

Now a formula with no keyword shorthand: `:nth-child(3n+1)`, which reads as "every third item, starting from the first." At `n=0` that's position 1. At `n=1` it's position 4. At `n=2` it's position 7. At `n=3`, position 10.

<CssDemo>

```html
<ul class="cards">
  <li>Ridge Loop</li>
  <li>Harbour Path</li>
  <li>Meadow Circuit</li>
  <li>Summit Trail</li>
  <li>Creekside Walk</li>
  <li>Overlook Trail</li>
  <li>Marsh Boardwalk</li>
</ul>
```

```css
.cards {
  list-style: none;
  padding: 0;
  font-family: system-ui, sans-serif;
}
.cards li {
  padding: 8px 12px;
}
.cards li:nth-child(3n+1) {
  border-left: 3px solid #0f766e;
  font-weight: 600;
}
```

</CssDemo>

The first, fourth, and seventh cards get the marked border, three apart, starting from the first. A card grid displaying three per row is a real case for this: `:nth-child(3n+1)` marks the start of every row, which is useful for a left-edge style that shouldn't appear mid-row.

A single number with no `n` at all, like `:nth-child(3)`, skips the formula entirely and matches only the third child. No pattern, one position.

### `:nth-child()` versus `:nth-of-type()`

Both count position among siblings, but they count differently, and mixing them up is a common source of a selector that matches the wrong element or nothing at all.

**`:nth-child()` counts every sibling, regardless of what element it is.** **`:nth-of-type()` counts only siblings of the same element type as the one you're selecting.**

Here's where that distinction bites. This markup has a heading followed by two paragraphs, all siblings of each other:

```html
<div class="route">
  <h3>Ridge Loop</h3>
  <p>4.2 km, moderate difficulty.</p>
  <p>Trailhead parking on Birch Street.</p>
</div>
```

A rule meant to bold the first paragraph, written as `.route p:nth-child(1)`, will not match anything. `:nth-child()` counts across all children of `.route`, and the `h3` occupies position 1. The first `p` is at position 2, so `p:nth-child(1)` is asking for an element that is both a `p` and in position 1, and no element satisfies both.

`:nth-of-type()` fixes it, because it only counts among elements of the same type:

<CssDemo>

```html
<div class="route">
  <h3>Ridge Loop</h3>
  <p>4.2 km, moderate difficulty.</p>
  <p>Trailhead parking on Birch Street.</p>
</div>
```

```css
.route {
  font-family: system-ui, sans-serif;
}
.route p:nth-of-type(1) {
  font-weight: 700;
  color: #0f766e;
}
```

</CssDemo>

`p:nth-of-type(1)` means "the first `p` among the `p` siblings," ignoring that an `h3` came before it. It matches the first paragraph exactly as intended.

The rule of thumb: reach for `:nth-of-type()` whenever the element you're counting shares its parent with other kinds of elements, the way a heading sits alongside paragraphs above. Reach for `:nth-child()` when every sibling is the same type anyway, such as the `<li>` elements in the card examples earlier, where the two selectors would have matched identically.

## Common mistakes to avoid

- **Styling `:hover` without `:focus`.** Keyboard users get nothing, and it's an accessibility failure, not a nicety.
- **Reaching for `:nth-child()` when siblings of mixed types are involved.** If a heading sits among the paragraphs you're counting, `:nth-of-type()` is almost always what you meant.

## The checklist

Run this over your interactive styling before you move on:

- Every `:hover` style has a matching `:focus` style, so keyboard users see the same feedback mouse users do
- Structural pseudo-classes are used for position-based styling instead of adding classes by hand
- Comfortable with `:not()` for exclusion, and with the difference between `:nth-child()` and `:nth-of-type()`

## Keep learning

- [MDN: Pseudo-classes](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes). The complete list, including everything this module didn't cover.
- [Video: CSS Specificity Explained, by Kevin Powell](https://www.youtube.com/watch?v=CHyPGSpIhSs). Covers pseudo-classes alongside the specificity they contribute to.
- [MDN: :not()](https://developer.mozilla.org/en-US/docs/Web/CSS/:not). The negation pseudo-class, with the selector-list form this module didn't need.
- [MDN: :nth-child()](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child). The full `an+b` reference, including `of` syntax beyond what this module covers.
