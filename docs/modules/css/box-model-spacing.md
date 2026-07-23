---
title: The Box Model and Spacing
---

# The Box Model and Spacing

Last week you connected a stylesheet and wrote your first rules. This week is the single most important structural idea in CSS, and the one that explains most of the layout confusion beginners run into: **every element on a page is a rectangular box**, and every box is built from the same four layers.

Once you can see those layers, spacing stops being guesswork. Almost every "why is there a gap there" question in your first months of CSS is answered by knowing which of the four layers put it there.

## Every element is a box

Open any web page, inspect any element, and the browser will show you a rectangle. A heading is a box. A paragraph is a box. An image is a box. Even a single word wrapped in a `<span>` is a box, just a small one that sits in the flow of a line.

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

Notice that both boxes run the full width of the space available, even though neither piece of text does. That's the default behaviour of a **block** element, which you met in MTM1511: it claims a whole row for itself. There's also a visible gap between the two boxes that you didn't write. That gap is the browser's default margin on headings and paragraphs, and by the end of this chapter you'll know exactly how to control it.

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

## Units: absolute versus relative

Every size in CSS needs a unit, and so far you've only seen `px`. Before writing more spacing, it's worth knowing what the alternatives actually mean, because the choice affects whether your layout holds together when the page changes.

An **absolute** unit always means the same physical size, no matter what's around it. `px` is the one you'll use, and one pixel is one pixel whether it's inside a tiny card or a full-width banner.

A **relative** unit is measured against something else: the size of the parent, the size of the root, or the size of the viewport. Change that something else, and the relative value changes with it automatically.

`%` is the relative unit you'll meet constantly, and it needs care, because **a percentage doesn't mean the same thing on every property.** It always resolves against a base, and the base depends on which property you're setting.

<CssDemo>

```html
<div class="parent">
  Parent: 300px wide, 150px tall
  <p class="p-width">width: 50%</p>
  <p class="p-padding">padding: 10%</p>
</div>
```

```css
.parent {
  width: 300px;
  height: 150px;
  background-color: #f1f5f9;
  border: 2px dashed #94a3b8;
  padding: 8px;
  font-family: system-ui, sans-serif;
  font-size: 0.85rem;
}
.p-width {
  width: 50%;
  background-color: #dbeafe;
  border: 1px solid #60a5fa;
  margin: 6px 0;
}
.p-padding {
  padding: 10%;
  background-color: #fef3c7;
  border: 1px solid #fbbf24;
  margin: 6px 0;
}
```

</CssDemo>

`width: 50%` resolves against the **parent's width**, so it's 150px here. That one is intuitive. `padding: 10%` is the one that catches people, because padding's percentage, on every side including top and bottom, resolves against the parent's **width** too, never its height. Set `padding: 10%` on a wide box and you get noticeably more vertical padding than you probably expected.

<div class="diagram">
<svg viewBox="0 0 640 190" role="img" aria-label="Three labelled boxes showing percentage resolving against different bases. Width at 50% measures against the parent's width. Padding at 10% also measures against the parent's width, even for top and bottom. Line-height at 150% measures against the element's own font size, not its parent.">
  <rect x="10" y="10" width="190" height="170" rx="8" class="d-surface d-border" stroke-width="1.5"/>
  <text x="24" y="32" class="d-lbl-muted">WIDTH: 50%</text>
  <rect x="24" y="44" width="162" height="52" rx="4" fill="none" class="d-muted-stroke" stroke-dasharray="3 2"/>
  <rect x="24" y="44" width="81" height="52" rx="4" class="d-accent-soft d-accent-stroke" stroke-width="1.5"/>
  <text x="64" y="74" text-anchor="middle" class="d-lbl-mono">50%</text>
  <line x1="24" y1="110" x2="186" y2="110" class="d-muted-stroke" stroke-width="1"/>
  <line x1="24" y1="107" x2="24" y2="113" class="d-muted-stroke" stroke-width="1"/>
  <line x1="186" y1="107" x2="186" y2="113" class="d-muted-stroke" stroke-width="1"/>
  <text x="105" y="128" text-anchor="middle" class="d-lbl-muted">parent's width</text>

  <rect x="225" y="10" width="190" height="170" rx="8" class="d-surface d-border" stroke-width="1.5"/>
  <text x="239" y="32" class="d-lbl-muted">PADDING: 10%</text>
  <rect x="239" y="44" width="162" height="52" rx="4" fill="none" class="d-muted-stroke" stroke-dasharray="3 2"/>
  <rect x="239" y="58" width="162" height="24" class="d-accent-soft d-accent-stroke" stroke-width="1.5"/>
  <text x="320" y="74" text-anchor="middle" class="d-lbl-mono">10%</text>
  <text x="239" y="118" class="d-lbl-muted">top and bottom too,</text>
  <text x="239" y="131" class="d-lbl-muted">measured against width</text>

  <rect x="440" y="10" width="190" height="170" rx="8" class="d-surface d-border" stroke-width="1.5"/>
  <text x="454" y="32" class="d-lbl-muted">LINE-HEIGHT: 150%</text>
  <text x="454" y="70" class="d-lbl-mono" font-size="18">Aa</text>
  <line x1="600" y1="46" x2="600" y2="80" class="d-accent-stroke" stroke-width="2"/>
  <text x="454" y="118" class="d-lbl-muted">of its own font size,</text>
  <text x="454" y="131" class="d-lbl-muted">not the parent at all</text>
</svg>
</div>

`line-height` at `150%` is different again: it resolves against the element's **own font size**, not its parent. Three properties, three different bases, one symbol. That's the reason Week 3 will tell you to prefer `rem` over `%` for font-related sizing, and it's why `%` is worth understanding precisely rather than by feel.

Two more relative units are common enough to name here, and you'll see both properly in later weeks. `rem` measures against the root font size. `vw` and `vh` measure against the viewport. Both are covered in depth when they matter, `rem` next week and viewport units in the Responsive Design week.

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

## The width problem, and box-sizing

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

The `*` is the **universal selector**, matching every element on the page. Put those three lines at the top of your `styles.css` now and leave them there for the rest of the course. It's the single most useful line of boilerplate in CSS.

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

## Sizing a box by its shape: aspect-ratio

You'll often want a box that keeps a fixed shape, an image container, a video embed, a map, no matter how wide it ends up being. Setting a fixed `height` looks like the answer, and it's the mistake this chapter already warned about: content spills out the moment the box's width changes and the height doesn't follow.

The `aspect-ratio` property solves this properly. Give it a ratio, and the box calculates its own height from whatever width it happens to have.

<CssDemo>

```html
<div class="frame">16:9, whatever width I end up</div>
```

```css
.frame {
  aspect-ratio: 16 / 9;
  width: 100%;
  max-width: 320px;
  background-color: #e0e7ff;
  border: 2px solid #818cf8;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 12px;
}
```

</CssDemo>

Resize your browser and that box's height adjusts on its own, always in proportion. No JavaScript, no fixed number to get wrong. `1 / 1` gives a square, `4 / 3` an older photo shape, `21 / 9` an ultra-wide banner. This is the property to reach for whenever "fixed height" was your instinct, particularly for image and video placeholders later in the course.

## Inspecting the box model

You do not have to reason about any of this from memory. Right-click an element, choose **Inspect**, and look for the box model diagram in developer tools, usually under a Computed or Layout tab. It draws the four layers as nested rectangles with the real pixel value of each side filled in.

This is the fastest way to answer three questions that come up constantly:

- **"Where is this gap coming from?"** Hover the margin and padding regions in the diagram and the browser highlights the matching area on the page in colour.
- **"Why is this box wider than I set?"** The diagram shows content, padding, and border separately, so you can see exactly what's adding up.
- **"Is my rule even applying?"** The values shown are the computed ones actually in effect, not what you hoped you wrote.

You can also edit values directly in that diagram and watch the page respond, which is a much faster way to find the right spacing than saving and reloading.

## Common mistakes to avoid

- **Using padding when you meant margin.** If the background colour grows, you wanted margin. If the neighbours should move away, you wanted margin. Padding grows the box itself.
- **Forgetting `box-sizing: border-box`.** Every layout that mysteriously overflows by a few pixels traces back to this.
- **Adding vertical margin to both neighbours.** Margin collapse means you get the larger one, not the sum.
- **Using margin to fake a gap inside a coloured box.** Margin is outside the background, so it can't put space between the edge of a card and its text. That's padding's job.
- **Setting a fixed `height` on a box holding text.** Text length changes, and the content spills out. Let padding define the vertical space and the height follow the content, or use `aspect-ratio` when the box genuinely needs a fixed shape.
- **Assuming `%` always means "of my own size."** It resolves against different bases depending on the property. Padding's percentage is always relative to the parent's width, even top and bottom.

## Keep learning

- [MDN: The box model](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Box_model). Mozilla's full walkthrough, with interactive examples of every property in this chapter.
- [MDN: Mastering margin collapsing](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_model/Mastering_margin_collapsing). The complete rules, for when a collapse surprises you.
- [MDN: Values and units](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Values_and_units). The full reference for absolute and relative units, including the ones later weeks build on.
- [MDN: aspect-ratio](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio). The property reference, with the shorthand forms.
- [Chrome DevTools: Inspect the box model](https://developer.chrome.com/docs/devtools/css/reference). Reference for the diagram described above.
- [Video: The CSS Box Model, by Kevin Powell](https://www.youtube.com/watch?v=rIO5326FgPE). A clear visual explanation from a CSS teacher worth following generally.

## Try it yourself (about 45 minutes)

Add `* { box-sizing: border-box; }` to the top of your stylesheet before anything else, and leave it there permanently.

Then build a card. Take one section of your page and give it a background colour, a visible border, comfortable padding, a `border-radius`, and a bottom margin that separates it from the next section. Set an explicit `width` on it and confirm with developer tools that the box measures exactly that width, proving `border-box` is working.

Centre that card horizontally using `margin-left: auto` and `margin-right: auto`.

Now investigate spacing deliberately. Set a bottom margin on one paragraph and a top margin on the next, both different values, and use the developer tools diagram to confirm the gap equals the larger of the two rather than the sum. Then convert one of your paddings into a margin and watch where the background colour stops. Being able to predict that before you save is the goal of this week.

Finally, give one image or media placeholder on your page an `aspect-ratio` instead of a fixed height, and set its `width` to `100%` of its container. Resize your browser and confirm the box keeps its shape at every width.

You now have every property that gives a box its shape, spacing, and proportions. Next week turns to what goes inside it: fonts, colour, and the units that make text scale properly for every reader.
