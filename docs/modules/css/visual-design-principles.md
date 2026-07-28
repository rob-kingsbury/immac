---
title: Visual Design Principles
prerequisites:
  - css/typography-colour
  - css/custom-properties
---

# Visual Design Principles

You can now build almost any layout you can describe. This chapter is about deciding what to describe.

The gap between a page that works and a page that looks designed is rarely more <abbr title="Cascading Style Sheets">CSS</abbr>. It's usually four principles applied consistently: **hierarchy, contrast, alignment, and proximity**. None of them is a matter of taste, all of them are teachable, and all of them are visible in a page's CSS once you know what to look for.

## How to read this chapter

**This chapter is shaped differently from the others.** The four principles below are still explained in full and still worth reading closely, but the second half isn't a set of steps you work through alone. It's a live peer critique workshop: you look at a classmate's project, and they look at yours. Read the whole page before the workshop. The four-principles section is what you'll be applying to both projects, and the feedback section further down is the actual format the workshop runs on, not background reading you can skip.

**The core path is everything on this page except the section marked Going deeper.** Budget about 25 minutes to read the principles and the critique format. Bring the audit from this chapter's Try it yourself exercise with you; the workshop uses it as the starting point for what gets critiqued.

The Going deeper section, on building a type scale from a ratio instead of picking sizes by eye, adds about 10 minutes. It's optional. It's here because restraint, using fewer sizes that are actually related to each other rather than more sizes chosen independently, is one of this chapter's core ideas, and a ratio is the most reliable way to get sizes that are genuinely related.

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

Two constraints on contrast, both already covered and both non-negotiable. **Colour contrast ratios** from [Typography and Colour](/modules/css/typography-colour.md) are a floor, not a goal. And **colour cannot be your only signal**, because it isn't available to everyone.

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

Grid and Flexbox make alignment mostly automatic, which is one more reason to lay out with them rather than with ad-hoc margins.

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

This is also where the spacing scale from [CSS Custom Properties and Variables](/modules/css/custom-properties.md) pays off. Consistent, related spacing values make grouping obvious. Twenty arbitrary numbers make everything feel equally distant.

## Putting the four together

The four principles reinforce each other. Hierarchy tells the eye what to read first. Contrast makes that ranking visible. Alignment makes the page feel intentional. Proximity says what belongs with what.

A short review pass on any page:

1. **Squint.** Does the thing that stands out match what matters most?
2. **Check the differences.** Is anything *nearly* the same as its neighbour? Make it clearly different or clearly identical.
3. **Look for edges.** Draw imaginary vertical lines. Does anything sit slightly off one?
4. **Look at the gaps.** Is spacing within groups smaller than spacing between them?
5. **Count your decisions.** How many font sizes, colours, and spacing values are actually in use? Fewer, used consistently, almost always looks better.

That last one is worth dwelling on. Restraint reads as confidence. A page with three font sizes, four spacing values, and two accent colours looks designed. A page with nine of each looks like a series of separate decisions, because it is.

## Going deeper: building a type scale from a ratio

*Optional, about 10 minutes. The four principles above are the required reading; this section is a technique for after you've got them, not a fifth principle.*

The restraint pass above tells you how many font sizes to use on a page: about three. It doesn't tell you which three. Left to guess, most people pick a body size, then "a bit bigger" for one heading, then "bigger again" for another. That produces three sizes that happen to sit on the same page, not three sizes that were designed to sit on the same page.

A **modular type scale** fixes that by generating every size from one base size and one **ratio**, instead of picking each size on its own. Multiply the base by the ratio to get the next step up. Multiply again for the step after that. Every size in the resulting scale is mathematically related to every other size in it, which is the actual reason a ratio-based scale reads as more intentional than a set of sizes chosen by eye: nothing in it is arbitrary, and that shows even to someone who couldn't say why.

### Picking a ratio

The ratio is usually one of a small set of named values, borrowed from musical intervals, that show up across most type-scale tools and typography references:

| Name | Ratio | Feel |
|---|---|---|
| Minor third | 1.2 | Subtle, close steps |
| Major third | 1.25 | A moderate, versatile default |
| Perfect fourth | 1.333 | Clearly stepped, still controlled |
| Perfect fifth | 1.5 | Dramatic jumps between levels |
| Golden ratio | 1.618 | The most dramatic common choice |

A larger ratio means a bigger jump between each step, which produces the kind of obvious, un-timid contrast the Contrast section above asks for. A smaller ratio produces a denser set of closely related sizes, better suited to an information-heavy interface where you want many small gradations rather than a few loud ones. Neither is correct in general. The point of naming a ratio before you start is that every size decision after that first choice gets settled by arithmetic instead of by a fresh guess.

### A worked example

Pick a base size of `1rem` and a ratio of `1.25` (a major third), and generate four steps by raising the ratio to increasing powers:

```text
Step 0:  1rem x 1.25^0 = 1rem       (16px)    body text
Step 1:  1rem x 1.25^1 = 1.25rem    (20px)    supporting heading
Step 2:  1rem x 1.25^2 = 1.5625rem  (25px)    secondary heading
Step 3:  1rem x 1.25^3 = 1.953rem   (~31px)   primary heading
```

Store the four values as custom properties, the way [CSS Custom Properties and Variables](/modules/css/custom-properties.md) set up a spacing scale, and every element on the page pulls from the same four numbers instead of repeating decimals in five places:

<CssDemo>

```html
<div class="scale">
  <p class="step-0">Nine kilometres, steady climb, mostly shaded.</p>
  <p class="step-1">Ridge Trail</p>
  <p class="step-2">Featured this week</p>
  <p class="step-3">TrailGuide</p>
</div>
```

```css
.scale {
  --step-0: 1rem;
  --step-1: 1.25rem;
  --step-2: 1.5625rem;
  --step-3: 1.953rem;
  font-family: system-ui, sans-serif;
  color: #0f172a;
}
.scale p {
  margin: 0 0 10px 0;
}
.step-0 {
  font-size: var(--step-0);
  color: #475569;
}
.step-1 {
  font-size: var(--step-1);
  font-weight: 600;
}
.step-2 {
  font-size: var(--step-2);
  font-weight: 700;
}
.step-3 {
  font-size: var(--step-3);
  font-weight: 800;
}
```

</CssDemo>

Compare this to the very first demo in this chapter, where the ranked heading used `1.6rem` for its title. That number was picked by eye, and it isn't a bad choice: it sits close to where this major-third scale lands, between step 2's `1.5625rem` and step 3's `1.953rem`. The difference isn't that a ratio-based size looks different from an eyeballed one. It's that once you've committed to a base and a ratio, the next size you need, a card title, a badge, a fourth heading level, already has an answer instead of requiring another guess. That's the same restraint principle from earlier in this chapter, applied one level deeper: fewer independent decisions, more consistency, less visible effort.

### What this doesn't cover

A production type system usually makes each step **fluid**, so the text scales smoothly between a phone and a wide monitor instead of jumping at a breakpoint, typically using `clamp()`. That's a tool for later in your CSS education, not this course. Treat the scale itself, fixed sizes related by a ratio, as the technique worth having now, and leave fluid sizing for when you meet `clamp()` properly.

## The peer critique workshop

The second half of this chapter is a critique session. Design work improves fastest when someone else looks at it, because you cannot see your own page fresh after staring at it for so long.

### Giving useful feedback

**Describe before you judge.** Start with what you actually see: "my eye goes to the photo first, then the button, then the heading." That's information the author can use even if they disagree about whether it's a problem.

**Name the principle.** "The heading and body are too close together" is vague. "The gap between the heading and its paragraph is the same as the gap between sections, so they don't read as grouped" tells the author exactly what to change, and it points at proximity.

**Separate the observation from the prescription.** Say what isn't working before you say how to fix it. The author often finds a better fix than your suggestion once they understand the problem.

**Be specific about location.** "The cards feel off" helps nobody. "The third card's text sits four pixels left of the other two" is a bug report.

**Say what's working, and why.** Not as politeness. If someone doesn't know which parts are succeeding, they'll change them by accident in the next revision.

### Receiving feedback

**Don't explain while they're talking.** The urge to justify a decision is strong and it stops you hearing the observation. Write it down, then respond after.

**Distinguish observations from suggestions.** If three people say their eye goes to the wrong place first, that's data and it's almost certainly true. If three people suggest three different fixes, that's opinion, and the decision stays yours.

**Look for the pattern.** One person's dislike is taste. Three people tripping on the same element is a problem.

**Take notes, not offence.** Critique is about a page you made, and the page is not you.

## Common mistakes to avoid

- **Everything emphasized.** If four things are bold, none of them is.
- **Timid contrast.** Differences too small to read as deliberate look like errors.
- **Uniform spacing.** Equal gaps everywhere destroy grouping.
- **Too many fonts, sizes, and colours.** Picking sizes one at a time instead of from a scale is how this happens; restraint reads as intention.
- **Centring long text.** No consistent edge for the eye to return to.
- **Decorating instead of ranking.** Shadows and gradients don't fix a hierarchy problem; they just make an unclear page more elaborate.
- **Defending your work during critique** instead of collecting the observations.

## The checklist

Confirm your own project against this before the critique session:

- Hierarchy is limited to about three levels: primary, secondary, and supporting
- Contrast between different elements is obvious, not timid
- Alignment commits to one consistent edge, with centring used sparingly
- Spacing within a group is smaller than spacing between groups
- Restraint applied: a small, consistent set of font sizes, colours, and spacing values, reused everywhere rather than invented per element
- Font sizes come from a consistent ratio rather than picked one at a time (optional technique, see Going deeper)
- You've completed the audit from Try it yourself and you're ready to give and receive feedback using the format above

## Keep learning

- [Refactoring <abbr title="User Interface">UI</abbr>](https://www.refactoringui.com/). Practical visual design advice aimed specifically at developers. The free articles cover hierarchy and spacing well.
- [MDN: Beginner's guide to design](https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Design_and_accessibility). Design fundamentals in a web context.
- [Laws of <abbr title="User Experience">UX</abbr>](https://lawsofux.com/). Short, well-illustrated explanations of the perceptual principles behind proximity and hierarchy.
- [Video: Design Tips for Developers, by Kevin Powell](https://www.youtube.com/watch?v=YIkFvIRcvSc). Concrete, CSS-focused suggestions in the same spirit as this chapter.

## Try it yourself (about 45 minutes, outside the critique session itself)

Before the workshop, audit your own project against the five-step review pass above and write down what you find, honestly. Bring that list to the critique session.

Then do a restraint pass. Count every distinct font size, colour, and spacing value currently in your stylesheet. Reduce each list until you have around three font sizes, five spacing values, and a palette of four or five colours, all declared as custom properties. If you'd rather not pick those three font sizes by eye, build them from a ratio instead: pick a base and a ratio from the Going deeper section above, and let the math generate the set for you. Rebuild the page from those. Most projects look substantially better after this step alone, and it's the cheapest improvement available.

Fix one hierarchy problem, one alignment problem, and one proximity problem that the audit found. Take a screenshot before and after each so you can see the change.

In the critique session, give feedback to at least two classmates using the format above: describe what you see, name the principle, locate it specifically, and hold the suggestion until after the observation. Write down every observation you receive without responding to it during the session, then decide afterwards which to act on and note why you rejected the rest.

Your page now looks deliberate. [Transitions and Motion](/modules/css/transitions-animation.md) adds the one thing a still image can't show: how it responds when someone actually touches it.
