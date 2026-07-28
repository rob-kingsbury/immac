---
title: The Box Model
prerequisites:
  - css/css-selectors
---

# Every Element Is a Box

Open any web page, inspect any element, and the browser will show you a rectangle. A heading is a box. A paragraph is a box. An image is a box. Even a single word wrapped in a `<span>` is a box, just a small one that sits in the flow of a line.

This is the single most important structural idea in <abbr title="Cascading Style Sheets">CSS</abbr>, and the one that explains most of the layout confusion beginners run into: **every element on a page is a rectangular box**, and every box is built from the same four layers. Once you can see those layers, spacing stops being guesswork. Almost every "why is there a gap there" question is answered by knowing which of the four layers put it there.

The boxes are usually invisible, which is why they take a while to see. Give them a background colour and they appear:

<CssDemo>

```html
<h2>A heading is a box</h2>
<p>So is this paragraph, and it stretches the full width available to it.</p>
```

```css
h2 {
  background-color: #cffafe;
}
p {
  background-color: #fef3c7;
}
```

</CssDemo>

Notice that both boxes run the full width of the space available, even though neither piece of text does. That's the default behaviour of a **block** element: it claims a whole row for itself. There's also a visible gap between the two boxes that you didn't write. That gap is the browser's default margin on headings and paragraphs, and this module covers exactly how to control it.

## The four layers

Every box is made of four layers, working outward from the middle:

![The CSS box model shown as four nested rectangles. The innermost is the content area, surrounded by padding, then the border, then the margin on the outside.](/images/box-model.jpg)

- **Content.** The text, image, or whatever the element actually holds. Its size is the `width` and `height`.
- **Padding.** Space *inside* the box, between the content and the border. Padding is part of the box, so a background colour extends through it.
- **Border.** A line drawn around the padding. It has a thickness, a style, and a colour.
- **Margin.** Space *outside* the box, pushing other elements away. Margin is always transparent, so a background colour never reaches it.

The distinction that matters most is **padding versus margin**. Both create space, and beginners use them interchangeably for months. They aren't interchangeable. Padding is space the box keeps *inside* itself, and margin is space the box demands *around* itself. The clearest way to see it is a background colour, which fills the padding and stops at the border:

<CssDemo>

```html
<p class="padded">This box has 30px of padding.</p>
<p class="margined">This box has 30px of margin instead.</p>
```

```css
.padded {
  background-color: #cffafe;
  border: 2px solid #0891b2;
  padding: 30px;
}
.margined {
  background-color: #fef3c7;
  border: 2px solid #d97706;
  margin: 30px;
}
```

</CssDemo>

The first box got bigger. The second box stayed the same size and moved away from its neighbours. That's the whole difference, and it's worth staring at until it's automatic.

## Padding

Padding is written with the `padding` property. Give it one value and all four sides get it:

<CssDemo>

```html
<p class="card">Comfortable padding makes text much easier to read inside a coloured box.</p>
<p class="tight">Without it, the text presses right against the edge.</p>
```

```css
.card {
  background-color: #e0f2fe;
  padding: 20px;
}
.tight {
  background-color: #fee2e2;
  padding: 0;
}
```

</CssDemo>

You can also set sides individually with `padding-top`, `padding-right`, `padding-bottom`, and `padding-left`.

## Border

A border needs three pieces of information: how thick, what style, and what colour. The `border` shorthand takes all three in one line:

<CssDemo>

```html
<p class="solid">A solid border.</p>
<p class="dashed">A dashed border, thicker.</p>
<p class="one-side">A border on one side only, useful for pull quotes.</p>
```

```css
p {
  padding: 12px;
}
.solid {
  border: 2px solid #0f766e;
}
.dashed {
  border: 4px dashed #b45309;
}
.one-side {
  border-left: 6px solid #7c3aed;
}
```

</CssDemo>

Common styles are `solid`, `dashed`, `dotted`, and `none`. You'll use `solid` far more than the rest.

Related and worth knowing now: `border-radius` rounds the corners, and it works whether or not there's a visible border, because it clips the background too.

<CssDemo>

```html
<p class="rounded">Rounded corners soften a box.</p>
<p class="pill">A large radius on a short box makes a pill.</p>
```

```css
p {
  padding: 12px 20px;
  background-color: #ede9fe;
}
.rounded {
  border-radius: 8px;
}
.pill {
  border-radius: 999px;
}
```

</CssDemo>

## Margin

Margin pushes other elements away. It's written the same way as padding, and it has one extra trick: setting the left and right margins to `auto` on a box with a set width centres it horizontally in its container.

<CssDemo>

```html
<p class="centred">A box with a width and auto side margins sits in the centre.</p>
```

```css
.centred {
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  background-color: #dcfce7;
  padding: 16px;
}
```

</CssDemo>

That `margin: auto` centring trick is one you'll use constantly, on page wrappers especially.

## Shorthand and the clock order

Writing four separate properties for four sides gets tedious, so both `padding` and `margin` accept multiple values in one declaration. The order runs clockwise from the top:

```css
padding: 10px;                  /* all four sides */
padding: 10px 20px;             /* top and bottom | left and right */
padding: 10px 20px 30px;        /* top | left and right | bottom */
padding: 10px 20px 30px 40px;   /* top | right | bottom | left */
```

The two-value form is the one you'll reach for most, because vertical and horizontal spacing usually want different amounts. The four-value form runs top, right, bottom, left, clockwise from twelve o'clock. If you can never remember the order, the mnemonic most people use is TRouBLe.

<CssDemo>

```html
<p class="two-value">Ten top and bottom, forty left and right.</p>
```

```css
.two-value {
  padding: 10px 40px;
  background-color: #fce7f3;
  border: 1px solid #db2777;
}
```

</CssDemo>

## Margin collapse

One more piece of default behaviour that looks like a bug until you know about it. When two block elements sit on top of each other and both have vertical margins, the margins don't add up. Instead, the larger of the two wins and the smaller is ignored. This is called **margin collapse**.

<CssDemo>

```html
<p class="a">This box has a 40px bottom margin.</p>
<p class="b">This one has a 20px top margin. The gap is 40px, not 60px.</p>
```

```css
p {
  background-color: #e0e7ff;
  padding: 10px;
  margin: 0;
}
.a {
  margin-bottom: 40px;
}
.b {
  margin-top: 20px;
}
```

</CssDemo>

Collapse only happens on **vertical** margins between block elements. Horizontal margins never collapse, and padding never collapses. Knowing this saves you from adding margin to both elements and wondering why the gap is smaller than the arithmetic says. A common habit that sidesteps the whole issue is to set margins in one direction only, usually `margin-bottom`, so two elements never both contribute to the same gap.

## Common mistakes to avoid

- **Using padding when you meant margin.** If the background colour grows, you wanted margin. If the neighbours should move away, you wanted margin. Padding grows the box itself.
- **Adding vertical margin to both neighbours.** Margin collapse means you get the larger one, not the sum.
- **Using margin to fake a gap inside a coloured box.** Margin is outside the background, so it can't put space between the edge of a card and its text. That's padding's job.

## The checklist

Run this over your own page before you move on:

- You can say, without checking, whether a gap between two elements is padding or margin
- You can explain margin collapse, and you default to setting margin in one direction to avoid it
- You can open DevTools and read the box model diagram to check the padding, border, and margin on any element

## Keep learning

- [MDN: The box model](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Box_model). Mozilla's full walkthrough, with interactive examples of every property in this module.
- [MDN: Mastering margin collapsing](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_model/Mastering_margin_collapsing). The complete rules, for when a collapse surprises you.
- [Video: The CSS Box Model, by Kevin Powell](https://www.youtube.com/watch?v=rIO5326FgPE). A clear visual explanation from a CSS teacher worth following generally.
