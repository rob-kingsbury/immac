---
title: "Building a Type Scale from a Ratio"
prerequisites:
  - css/css-typography
  - design/design-principles
---

# Going Deeper: Building a Type Scale from a Ratio

*Optional. A technique for after you've read [Visual Design Principles](/modules/design/design-principles/README.md), not a fifth principle.*

The restraint pass in [Visual Design Principles](/modules/design/design-principles/README.md) tells you how many font sizes to use on a page: about three. It doesn't tell you which three. Left to guess, most people pick a body size, then "a bit bigger" for one heading, then "bigger again" for another. That produces three sizes that happen to sit on the same page, not three sizes that were designed to sit on the same page.

A **modular type scale** fixes that by generating every size from one base size and one **ratio**, instead of picking each size on its own. Multiply the base by the ratio to get the next step up. Multiply again for the step after that. Every size in the resulting scale is mathematically related to every other size in it, which is the actual reason a ratio-based scale reads as more intentional than a set of sizes chosen by eye: nothing in it is arbitrary, and that shows even to someone who couldn't say why.

## Picking a ratio

The ratio is usually one of a small set of named values, borrowed from musical intervals, that show up across most type-scale tools and typography references:

| Name | Ratio | Feel |
|---|---|---|
| Minor third | 1.2 | Subtle, close steps |
| Major third | 1.25 | A moderate, versatile default |
| Perfect fourth | 1.333 | Clearly stepped, still controlled |
| Perfect fifth | 1.5 | Dramatic jumps between levels |
| Golden ratio | 1.618 | The most dramatic common choice |

A larger ratio means a bigger jump between each step, which produces the kind of obvious, un-timid contrast [Visual Design Principles](/modules/design/design-principles/README.md) asks for. A smaller ratio produces a denser set of closely related sizes, better suited to an information-heavy interface where you want many small gradations rather than a few loud ones. Neither is correct in general. The point of naming a ratio before you start is that every size decision after that first choice gets settled by arithmetic instead of by a fresh guess.

## A worked example

Pick a base size of `1rem` and a ratio of `1.25` (a major third), and generate four steps by raising the ratio to increasing powers:

```text
Step 0:  1rem x 1.25^0 = 1rem       (16px)    body text
Step 1:  1rem x 1.25^1 = 1.25rem    (20px)    supporting heading
Step 2:  1rem x 1.25^2 = 1.5625rem  (25px)    secondary heading
Step 3:  1rem x 1.25^3 = 1.953rem   (~31px)   primary heading
```

Store the four values as custom properties, the way [CSS Design Tokens](/modules/css/css-design-tokens/README.md) built a spacing scale, and every element on the page pulls from the same four numbers instead of repeating decimals in five places:

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

Compare this to the ranked heading example in [Visual Design Principles](/modules/design/design-principles/README.md), where the heading used `1.6rem` for its title. That number was picked by eye, and it isn't a bad choice: it sits close to where this major-third scale lands, between step 2's `1.5625rem` and step 3's `1.953rem`. The difference isn't that a ratio-based size looks different from an eyeballed one. It's that once you've committed to a base and a ratio, the next size you need, a card title, a badge, a fourth heading level, already has an answer instead of requiring another guess. That's the same restraint principle, applied one level deeper: fewer independent decisions, more consistency, less visible effort.

## What this doesn't cover

A production type system usually makes each step **fluid**, so the text scales smoothly between a phone and a wide monitor instead of jumping at a breakpoint, typically using `clamp()`. See [Fluid Sizing Without a Query](/modules/css/css-fluid-sizing/README.md) for that technique. Treat the scale itself, fixed sizes related by a ratio, as the foundation, and layer fluid sizing on top of it once you've met `clamp()` properly.
