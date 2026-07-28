---
title: Box Sizing
prerequisites:
  - css/css-box-model
---

# The Width Problem, and box-sizing

Here's the behaviour that catches everyone. By default, `width` sets the width of the **content area only**. Padding and border are added on top of it.

So a box with `width: 200px`, `padding: 20px`, and a `2px` border is not 200 pixels wide on the page. It's 200 + 20 + 20 + 2 + 2, which is 244 pixels. Put two of those side by side in a 400 pixel space expecting a perfect fit, and they overflow.

<CssDemo>

```html
<p class="default-box">width: 200px, but I'm actually 244px wide.</p>
<p class="border-box">width: 200px, and I really am 200px wide.</p>
```

```css
p {
  width: 200px;
  padding: 20px;
  border: 2px solid #334155;
  background-color: #e2e8f0;
  margin-bottom: 10px;
}
.border-box {
  box-sizing: border-box;
  background-color: #bbf7d0;
}
```

</CssDemo>

The fix is the `box-sizing` property. Setting it to `border-box` changes what `width` means: the content, padding, and border all fit *inside* the number you gave. Set a width of 200 pixels and the box occupies 200 pixels, with the padding eating into the content area rather than adding to the outside.

This behaviour is so much easier to reason about that essentially every professional stylesheet turns it on globally, at the top of the file, for everything:

```css
* {
  box-sizing: border-box;
}
```

The `*` is the **universal selector**, matching every element on the page. Put those three lines at the top of your `styles.css` and leave them there for the rest of the project. It's the single most useful line of boilerplate in CSS.

## Common mistakes to avoid

- **Forgetting `box-sizing: border-box`.** Every layout that mysteriously overflows by a few pixels traces back to this.

## The checklist

Run this over your stylesheet before you move on:

- `* { box-sizing: border-box; }` is the first rule in your stylesheet
- You can explain why a box with `width: 200px` and padding isn't actually 200px wide without it

## Keep learning

- [MDN: The box model](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Box_model). Covers `box-sizing` alongside the rest of the box model.
- [Chrome DevTools: Inspect the box model](https://developer.chrome.com/docs/devtools/css/reference). Reference for reading computed width, padding, and border in developer tools.
