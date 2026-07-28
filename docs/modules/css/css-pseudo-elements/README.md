---
title: Pseudo-Elements
prerequisites:
  - css/css-selectors
---

# Pseudo-Elements: Styling Parts of an Element

A **pseudo-element** styles a portion of an element, or inserts content that isn't in the HTML at all. It's written with two colons.

`::before` and `::after` insert generated content at the start or end of an element. Both require a `content` property, even if it's an empty string, or nothing appears.

<CssDemo>

```html
<p class="note">This paragraph has a marker added by CSS.</p>
<blockquote class="quoted">Design is not just what it looks like. Design is how it works.</blockquote>
```

```css
.note {
  font-family: system-ui, sans-serif;
}
.note::before {
  content: "Note: ";
  font-weight: 700;
  color: #b45309;
}
.quoted {
  font-family: Georgia, serif;
  font-style: italic;
  margin: 0;
  padding-left: 1.5rem;
  border-left: 4px solid #cbd5e1;
}
.quoted::before {
  content: open-quote;
  font-size: 2rem;
  line-height: 0;
  vertical-align: -0.4rem;
  color: #94a3b8;
}
```

</CssDemo>

There's an important limit. Content inserted with `::before` and `::after` is **decorative from the point of view of assistive technology**, and support for reading it varies. Never put information a visitor needs into generated content. Use it for quote marks, icons, decorative separators, and visual flourishes, and keep real content in the HTML where it belongs.

Two more pseudo-elements are worth knowing: `::first-line` and `::first-letter`, which style exactly what their names say, and are how you get a drop cap without wrapping the letter in a `<span>`.

## Common mistakes to avoid

- **A `::before` with no `content` property.** Nothing renders, and there's no error to tell you why.
- **Putting real information in generated content.** It isn't reliably available to assistive technology.

## The checklist

Run this over your generated content before you move on:

- Every `::before` and `::after` has a `content` property, and never carries information a visitor needs

## Keep learning

- [MDN: Pseudo-elements](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements). The complete list, including everything this module didn't cover.
