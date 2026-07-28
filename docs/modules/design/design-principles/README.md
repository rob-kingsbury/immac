---
title: Visual Design Principles
prerequisites:
  - accessibility/colour-contrast
---

# Visual Design Principles

You can build a layout that works. This chapter is about what makes one look designed rather than merely assembled.

The gap between a page that works and a page that looks designed is rarely more code. It's usually four principles applied consistently: **hierarchy, contrast, alignment, and proximity**. None of them is a matter of taste, all of them are teachable, and all of them are visible in a finished page once you know what to look for. They apply whether the page is built by hand, assembled in a design tool, or printed.

## Hierarchy

**Visual hierarchy** is the order in which things get noticed. Every page has one whether you designed it or not. The question is whether it matches the order you actually want people to read in.

The eye ranks by size, weight, colour, and position. Something large, bold, dark, and near the top is read first. Something small, light, grey, and lower down is read last, if at all.

<CssDemo>

```html
<div class="flat">
  <p class="t">Ridge Trail</p>
  <p class="m">Nine kilometres, steady climb</p>
  <p class="b">Last updated March 3</p>
</div>
<div class="ranked">
  <p class="t">Ridge Trail</p>
  <p class="m">Nine kilometres, steady climb</p>
  <p class="b">Last updated March 3</p>
</div>
```

```css
.flat, .ranked {
  font-family: system-ui, sans-serif;
  padding: 14px;
  border: 1px solid #cbd5e1;
  margin-bottom: 12px;
}
.flat p {
  font-size: 1rem;
  margin: 4px 0;
}
.ranked .t {
  font-size: 1.6rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 2px 0;
}
.ranked .m {
  font-size: 1rem;
  color: #334155;
  margin: 0 0 8px 0;
}
.ranked .b {
  font-size: 0.8rem;
  color: #5b6b85;
  margin: 0;
}
```

</CssDemo>

Same three pieces of content, same order. The first block makes you read all of it to find out what matters. The second tells you in one glance. Nothing was added, only ranked.

The practical test: squint at your page until the text blurs, or step back from the screen. What still stands out is your real hierarchy. If it isn't what you intended, the fix is usually to make the important thing more different from its neighbours rather than to make everything bigger.

A useful discipline is to allow yourself **three levels** on any given screen: primary, secondary, and supporting. More than that and the ranking stops reading as a ranking.

## Contrast

**Contrast** is difference used deliberately. Hierarchy is one thing it produces, but contrast does more: it separates regions, signals interactivity, and gives a page energy.

The rule worth internalising is that **contrast has to be obvious or it reads as a mistake.** Two font sizes a couple of pixels apart look like an error rather than a decision. Two greys almost the same look like a rendering problem. If two things should be different, make them clearly different.

<CssDemo>

```html
<p class="timid">Heading-ish</p>
<p class="body1">Body text underneath it.</p>
<p class="strong">Heading</p>
<p class="body2">Body text underneath it.</p>
```

```css
p { font-family: system-ui, sans-serif; margin: 2px 0; }
.timid { font-size: 1.1rem; font-weight: 500; color: #475569; }
.body1 { font-size: 1rem; color: #475569; margin-bottom: 16px; }
.strong { font-size: 1.6rem; font-weight: 700; color: #0f172a; }
.body2 { font-size: 1rem; color: #475569; }
```

</CssDemo>

Contrast comes from more than size. Weight, colour, spacing, case, and font family are all available, and combining two or three of them is what makes a difference read clearly.

Two constraints on contrast, both already covered and both non-negotiable. **Colour contrast ratios** from [Colour Contrast](/modules/accessibility/colour-contrast/README.md) are a floor, not a goal. And **colour cannot be your only signal**, because it isn't available to everyone.

## Alignment

**Alignment** is the principle that costs nothing and is skipped most often. Every element on a page should line up with something else. Invisible vertical lines running down a layout are most of what makes it look professional rather than assembled.

<CssDemo>

```html
<div class="ragged">
  <h4>Lakeside Loop</h4>
  <p>Four kilometres, mostly flat.</p>
  <span class="pill">Easy</span>
</div>
<div class="aligned">
  <h4>Lakeside Loop</h4>
  <p>Four kilometres, mostly flat.</p>
  <span class="pill">Easy</span>
</div>
```

```css
.ragged, .aligned {
  font-family: system-ui, sans-serif;
  border: 1px solid #cbd5e1;
  padding: 14px;
  margin-bottom: 12px;
}
.ragged h4 { margin: 0 0 6px 10px; }
.ragged p { margin: 0 0 8px 24px; }
.ragged .pill { margin-left: 4px; }
.aligned h4 { margin: 0 0 6px 0; }
.aligned p { margin: 0 0 8px 0; }
.aligned .pill { margin-left: 0; }
.pill {
  display: inline-block;
  background-color: #dcfce7;
  border: 1px solid #4ade80;
  border-radius: 999px;
  padding: 3px 12px;
  font-size: 0.85rem;
}
```

</CssDemo>

The first card's indents are small and inconsistent. Nothing is dramatically wrong, and it still looks careless, because the eye notices a broken line even when the mind doesn't name it.

Two working rules. **Pick one edge and commit to it**, usually the left for text in English, since a strong left edge is what the eye tracks back to on every line. And **centre sparingly**: centred text has no consistent edge, which makes multiple centred blocks hard to relate to each other. Centre a single short heading, not paragraphs.

In a hand-coded layout, Flexbox and Grid make this mostly automatic once the alignment properties are set correctly, which is one more reason to lay out with them rather than with ad-hoc margins.

## Proximity

**Proximity** says that things placed close together are read as belonging together. Spacing is not decoration. It's how you communicate structure without drawing a single line.

The most common failure is uniform spacing, where every gap is the same and nothing groups.

<CssDemo>

```html
<div class="even">
  <p class="h">Lakeside Loop</p>
  <p class="d">4 km, easy</p>
  <p class="h">Ridge Trail</p>
  <p class="d">9 km, moderate</p>
</div>
<div class="grouped">
  <p class="h">Lakeside Loop</p>
  <p class="d">4 km, easy</p>
  <p class="h sep">Ridge Trail</p>
  <p class="d">9 km, moderate</p>
</div>
```

```css
.even, .grouped {
  font-family: system-ui, sans-serif;
  border: 1px solid #cbd5e1;
  padding: 14px;
  margin-bottom: 12px;
}
.even p { margin: 0 0 14px 0; }
.h { font-weight: 700; color: #0f172a; }
.d { color: #5b6b85; font-size: 0.9rem; }
.grouped p { margin: 0; }
.grouped .d { margin-bottom: 0; }
.grouped .sep { margin-top: 20px; }
```

</CssDemo>

In the first block, everything is equally spaced and it reads as four unrelated lines. In the second, the gap *within* each pair is small and the gap *between* pairs is large, so it reads as two groups of two. The change is entirely in the margins.

The rule to carry away: **the space inside a group must be smaller than the space around it.** When a layout feels muddled and you can't say why, this is the first thing to check.

In CSS this is also where a consistent spacing scale, the kind built in [CSS Design Tokens](/modules/css/css-design-tokens/README.md), pays off. A small set of related spacing values makes grouping obvious. Twenty arbitrary numbers make everything feel equally distant.

## Putting the four together

The four principles reinforce each other. Hierarchy tells the eye what to read first. Contrast makes that ranking visible. Alignment makes the page feel intentional. Proximity says what belongs with what. [Putting the Four Together](/modules/design/design-principles/putting-it-together.md) turns that into a review pass you can run on any page, plus a checklist and the common mistakes worth watching for.

## Keep learning

- [Refactoring <abbr title="User Interface">UI</abbr>](https://www.refactoringui.com/). Practical visual design advice aimed specifically at developers. The free articles cover hierarchy and spacing well.
- [MDN: Beginner's guide to design](https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Design_and_accessibility). Design fundamentals in a web context.
- [Laws of <abbr title="User Experience">UX</abbr>](https://lawsofux.com/). Short, well-illustrated explanations of the perceptual principles behind proximity and hierarchy.
- [Video: Design Tips for Developers, by Kevin Powell](https://www.youtube.com/watch?v=YIkFvIRcvSc). Concrete, CSS-focused suggestions in the same spirit as this chapter.
