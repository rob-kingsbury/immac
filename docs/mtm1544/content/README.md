---
title: 'MTM1544: Weekly Content'
---

# MTM1544 Weekly Content

Every week below lists the modules to work through, in the order they are taught. A module is a single topic, and several of them are shared with MTM1511, so a link may take you somewhere that does not mention this course by name. That is deliberate. This page is the course side of it.

<details class="week" open>
<summary id="week-1-introduction-to-css">Week 1: Introduction to CSS</summary>

- [CSS Basics](/modules/css/css-basics/README.md). What CSS is, how a rule is put together, and what it can and cannot change.
- [Linking a Stylesheet](/modules/css/css-basics/linking-a-stylesheet.md). Three ways to attach CSS to HTML, and the one real projects use.
- [CSS Selectors](/modules/css/css-selectors/README.md). Element, class, and ID selectors, and how specific each one is.
- [The Cascade](/modules/css/css-cascade/README.md). What the browser does when two rules both apply and disagree.
- [Browser Developer Tools](/modules/tools/browsers/README.md). How to ask the browser what it actually did, instead of guessing. Introduced here because every week after this one assumes you can inspect an element and read which rule won. The sub-pages on inspecting the box model, grids, and variables become useful as you meet each of those.
- [Developer Tools for Debugging](/modules/tools/browsers/devtools.md). Opening the tools, the Elements and Console panels, and reading an error down to the file and line that caused it.

### Exercise: prove your stylesheet is actually attached (about 15 minutes)

Take the page you published in MTM1511 earlier this week and attach a stylesheet to it, without following [Linking a Stylesheet](/modules/css/css-basics/linking-a-stylesheet.md) as a script. Create `styles.css` next to your `index.html`, write one rule you cannot miss, `body { background: rebeccapurple; }` will do, link it from the `<head>`, and push.

Load the live Pages URL and confirm the colour changed. If it did not, that is the exercise. Open developer tools, check the Console for a 404 on `styles.css`, and check that the `href` in your `<link>` matches the filename exactly, including its case. GitHub Pages runs on Linux and cares about case even when your own machine does not.

Then replace that rule with something you actually want and push again.

A stylesheet that failed to load looks identical to a stylesheet with no rules in it. Being able to tell those two apart in under a minute is worth more this week than any property you learn.

</details>

<details class="week" open>
<summary id="week-2-the-box-model-and-spacing">Week 2: The Box Model and Spacing</summary>

- [The Box Model](/modules/css/css-box-model/README.md). Content, padding, border, and margin: the four layers wrapped around every element.
- [CSS Units](/modules/css/css-units/README.md). Pixels, ems, rems, percentages, and viewport units, and what each one is measured against.
- [Box Sizing](/modules/css/css-box-sizing/README.md). Why a box comes out wider than the width you set, and the one line that fixes it.
- [aspect-ratio](/modules/css/css-aspect-ratio/README.md). Holding a box to a fixed shape while its size flexes.
- [Inspecting the Box Model](/modules/tools/browsers/inspecting-the-box-model.md). Reading the real padding, border, and margin values off the page instead of working them out from memory.

### Exercise: predict the box, then check it (about 45 minutes)

This exercise pulls together [The Box Model](/modules/css/css-box-model/README.md), [CSS Units](/modules/css/css-units/README.md), [Box Sizing](/modules/css/css-box-sizing/README.md), and [Inspecting the Box Model](/modules/tools/browsers/inspecting-the-box-model.md). Read those first, then work through this once.

Before adding `box-sizing` anywhere, write a rule giving one element `width: 300px`, `padding: 20px`, and `border: 5px solid`. On paper, work out how wide the browser will actually paint it. Then inspect the element and read the box model diagram. If your number was not 350, find which layers you left out before going on.

Now add `* { box-sizing: border-box; }` at the top of your stylesheet and reload. Same three declarations, different result. Read the diagram again and notice where the 300 pixels went: padding and border now sit inside it, and the content box shrank to make room.

Next, margin collapse. Give one paragraph `margin-bottom: 40px` and the paragraph after it `margin-top: 20px`. Predict the gap, then measure it in the diagram. The answer is 40 and not 60, and the diagram shows you why.

Finally, change one padding value from `20px` to `1.5rem` and reload. Confirm in the diagram that the computed value is now 24 pixels, then change the root font size and watch it move again. That is the whole difference between a unit and a number.

Commit and push. What you keep from this is not the card, it is the habit of predicting first and measuring second, which is the only thing that makes box model bugs quick to solve.

</details>

<details class="week" open>
<summary id="week-3-typography-and-colour">Week 3: Typography and Colour</summary>

- [Typography](/modules/css/css-typography/README.md). Font stacks, size, line height, and the properties that decide whether text is comfortable to read.
- [Web Fonts](/modules/css/css-web-fonts/README.md). Shipping a typeface with the page instead of hoping the visitor already has it.
- [Colour Values](/modules/css/css-colors/README.md). Hex, RGB, and HSL, plus the newer notations you will meet in other people's stylesheets.
- [Colour Contrast](/modules/accessibility/colour-contrast/README.md). Measuring text against its background, and the ratios that count as readable.

</details>

<details class="week" open>
<summary id="week-4-selectors-specificity-and-inheritance">Week 4: Selectors, Specificity, and Inheritance</summary>

- [Pseudo-Classes](/modules/css/css-pseudo-classes/README.md). Selecting an element by its state: hovered, focused, checked, first of its kind.
- [Pseudo-Elements](/modules/css/css-pseudo-elements/README.md). Styling part of an element, or inserting content that is not in the markup at all.
- [Combinators](/modules/css/css-complex-selectors/README.md). Matching an element by its relationship to another one, rather than on its own.
- [Specificity](/modules/css/css-precedence/README.md). Calculating specificity properly instead of guessing which rule wins.
- [The Cascade](/modules/css/css-cascade/README.md). What the browser does when two rules both apply and disagree. Revisited from Week 1.

</details>

<details class="week" open>
<summary id="week-5-flexbox-layouts">Week 5: Flexbox Layouts</summary>

- [Flexbox Layouts](/modules/css/css-flexbox/README.md). Arranging a group of elements along a single axis.
- [Wrapped Rows and the flex-flow Shorthand](/modules/css/css-flexbox/wrapped-rows.md). What changes once a flex container wraps onto more than one line.
- [Controlling Individual Items](/modules/css/css-flexbox/item-sizing.md). The three properties that belong on the items rather than the container.
- [The order Property](/modules/css/css-flexbox/the-order-property.md). Moving an item visually without touching the markup, and what that costs a keyboard user.
- [Styling a Navigation Bar](/modules/css/css-styling-navigation/README.md). The most common Flexbox pattern on the web, built from the properties you just met.

### Exercise: build a navigation bar without copying one (about 45 minutes)

Read [Flexbox Layouts](/modules/css/css-flexbox/README.md) and [Styling a Navigation Bar](/modules/css/css-styling-navigation/README.md) first, then close them both and build this from the properties rather than from the finished example.

Start with a `<nav>` holding a `<ul>` of four or five links, the markup you already wrote in MTM1511. Strip the list styling, then make the `<ul>` a flex container. Before you type each of the next four declarations, say out loud what you expect it to do: `flex-direction`, `gap`, `justify-content`, `align-items`. Type it, then check whether the page agreed with you.

Add a site name before the `<ul>` and push the links to the opposite end. Try `justify-content: space-between` on the container first. Then take it back off and try `margin-left: auto` on the list instead. Both land the links on the right here, because there are only two items to place, but they are not the same tool: `space-between` spreads the free space out between every item, while an auto margin hands the whole lot to one side. Taking the first one off matters. An auto margin is resolved before `justify-content` is looked at, so leaving both in place means the `justify-content` does nothing whatsoever, and that is a good ten minutes of confusion if you do not know it. Keep whichever one you can explain to someone else.

Now break it on purpose. Add links until the row runs out of room. Two separate defaults are doing the work: `flex-wrap` starts at `nowrap`, which keeps everything on one line, and `flex-shrink` starts at `1`, which is what actually lets the items squash to fit. Keep going and you will find the floor, because an item will not shrink below the width of its own content, and past that point the row overflows the container rather than shrinking any further. Add `flex-wrap: wrap` and watch the whole behaviour change.

Last, tab through the bar with the keyboard rather than the mouse. Every link needs a visible focus ring, and the tab order has to follow the order you read them in. If you moved anything visually with `order`, this is where you find out what it cost, and [The order Property](/modules/css/css-flexbox/the-order-property.md) explains why.

</details>

<details class="week" open>
<summary id="week-6-css-grid-layouts">Week 6: CSS Grid Layouts</summary>

- [CSS Grid Layouts](/modules/css/css-grid/README.md). Rows and columns at the same time, which is what page-level layout needs.
- [Subgrid](/modules/css/css-grid/subgrid.md). Lining content up across sibling cards by borrowing the parent grid's tracks.
- [Grid and Flexbox Together](/modules/css/css-grid/grid-and-flexbox-together.md). Grid for the page skeleton, Flexbox for what sits inside each region.
- [The position Property](/modules/css/css-position/README.md). Lifting one element out of normal flow and placing it deliberately.
- [Inspecting a Grid](/modules/tools/browsers/inspecting-a-grid.md). Overlaying a grid on the page with every track drawn and every line numbered.

</details>

<details class="week" open>
<summary id="week-7-responsive-design-and-media-queries">Week 7: Responsive Design and Media Queries</summary>

- [Responsive Design and Media Queries](/modules/css/css-media-queries/README.md). Changing styles at a breakpoint, with breakpoints chosen from content rather than device names.
- [CSS Units](/modules/css/css-units/README.md). Pixels, ems, rems, percentages, and viewport units, and what each one is measured against. Revisited from Week 2.
- [Fluid Sizing Without a Query](/modules/css/css-fluid-sizing/README.md). Sizing that scales on its own, before you reach for a breakpoint.
- [Layouts That Respond Without a Query](/modules/css/css-rwd-patterns/README.md). Patterns that reflow on their own, with no breakpoint involved.
- [Container Queries](/modules/css/css-container-queries/README.md). Asking about the size of a component's container instead of the whole window.
- [Testing Responsive Work](/modules/tools/browsers/testing-responsive-work.md). Four ways to test a layout, in increasing order of trustworthiness, ending with a real phone in hand.

</details>

<details class="week" open>
<summary id="week-8-reading-week">Week 8: Reading Week</summary>

- **Reading Week**. No scheduled classes. Use the time to catch up on anything unfinished and to shore up whatever still feels shaky, because everything after this builds on the seven weeks behind it.

</details>

<details class="week" open>
<summary id="week-9-the-dom-and-css-targeting">Week 9: The DOM and CSS Targeting</summary>

- [The DOM](/modules/css/css-dom/README.md). The tree the browser builds from your markup, which is what a selector actually matches against.
- [Descendant, Child, Sibling, and Attribute Selectors](/modules/css/css-selectors-adv/README.md). Descendant, child, sibling, and attribute selectors, read against that tree.
- [Pseudo-Classes](/modules/css/css-pseudo-classes/README.md). Selecting an element by its state: hovered, focused, checked, first of its kind. Revisited from Week 4.
- [Inspecting CSS Rules](/modules/tools/browsers/inspecting-css-rules.md). Reading the Styles panel to see which rule won, which lost, and which one the browser rejected outright.
- [Diagnosing Rendering Problems](/modules/tools/browsers/diagnosing-rendering-problems.md). A six-step routine for when something looks wrong, worked through in order instead of edited hopefully.

### Exercise: read the cascade instead of guessing at it (about 45 minutes)

Open a page whose stylesheet has some history to it, ideally your midterm, and inspect it.

Pick one element that several rules are fighting over. A nav link is usually the busiest thing on a page. Open the Styles panel and read down the list. The panel sorts by specificity, with anything in `element.style` pinned above the rest and inherited rules in their own sections underneath. Read the strikethroughs rather than the positions, because a struck-through declaration lost and an intact one did not. In the ordinary case the rule at the top is the one that won, but `!important` does not move a rule up the list, so a rule sitting lower down can still be the winner. Find a struck-through declaration, work out which rule beat it and why, and reach for [Specificity](/modules/css/css-precedence/README.md) if it is not obvious.

Now write three selectors that reach the same element by different routes: one descendant, one child, one attribute selector. [Descendant, Child, Sibling, and Attribute Selectors](/modules/css/css-selectors-adv/README.md) covers all three. Give each a different colour, then predict which colour wins before you reload.

Next, use the Elements tree as a tree. Collapse it to the top level and expand only the branch holding your element. That path from `<html>` down is exactly what a descendant selector walks, and seeing it drawn is usually the moment the DOM stops feeling abstract.

Then break something quietly. Misspell a property name in one of your rules and reload. It does show up in the Styles panel, crossed out with a warning icon next to it, and that is the browser saying it rejected the declaration rather than that some other rule beat it. Check the Console while you are in there: a CSS typo produces nothing at all, no error and no warning, so the Styles panel is the only place this ever surfaces. Now misspell a value instead and compare the two. A bad property name crosses out the whole declaration, while a bad value crosses out only the value, which tells you which half to go and look at.

Finally, find the `:hov` toggle in the Styles panel and force `:hover` and `:focus` on without using the mouse or the keyboard. Confirm both states are actually styled. A hover style you can only test by hovering is a hover style you will forget to check.

</details>

<details class="week" open>
<summary id="week-10-accessible-styling">Week 10: Accessible Styling</summary>

- [Keyboard Access](/modules/accessibility/keyboard-access/README.md). Tabbing through a page, and why a link and a button answer to different keys.
- [Text Scaling](/modules/accessibility/text-scaling/README.md). Why a larger default text size should not break a layout, and which units keep it intact.
- [Visually Hidden](/modules/accessibility/visually-hidden/README.md). Content a screen reader announces but the page does not show, done the one right way.
- [Reduced Motion](/modules/accessibility/reduced-motion/README.md). Respecting a visitor who has told their system to cut animation down.
- [Contrast Preferences and Forced Colors](/modules/accessibility/colour-contrast/contrast-preferences.md). Honouring a visitor who asks for more contrast, and what happens when the operating system takes colour away from you.
- [Touch Targets](/modules/accessibility/touch-targets/README.md). Making an interactive element big enough to hit on the first try.
- [Testing for Accessibility](/modules/accessibility/testing/README.md). The checks you can run on your own page before anyone else sees it.

</details>

<details class="week" open>
<summary id="week-11-css-custom-properties-and-variables">Week 11: CSS Custom Properties and Variables</summary>

- [CSS Custom Properties and Variables](/modules/css/css-custom-properties/README.md). Declaring a value once and using it everywhere, in plain CSS.
- [Giving a Variable a Type with @property](/modules/css/css-custom-properties/property-rule.md). Giving a custom property a type so the browser can animate and validate it.
- [Custom Properties versus Preprocessor Variables](/modules/css/css-custom-properties/preprocessor-comparison.md). Why a Sass variable and a custom property are not the same thing.
- [CSS Design Tokens](/modules/css/css-design-tokens/README.md). Opening a stylesheet with its design decisions instead of burying them.
- [Theming](/modules/css/css-theming/README.md). Switching an entire interface by redeclaring one set of values.
- [CSS Nesting](/modules/css/css-nesting/README.md). Writing a component's rules inside the component, now that browsers support it natively.
- [Inspecting Variables](/modules/tools/browsers/inspecting-variables.md). Checking whether a custom property actually resolved, since a misspelled name fails silently.

</details>

<details class="week" open>
<summary id="week-12-visual-design-principles">Week 12: Visual Design Principles</summary>

- [Visual Design Principles](/modules/design/design-principles/README.md). Hierarchy, contrast, alignment, and proximity: what separates designed from merely assembled.
- [Putting the Four Together](/modules/design/design-principles/putting-it-together.md). The four principles working on the same page at the same time.
- [Building a Type Scale from a Ratio](/modules/css/css-typography/type-scale.md). Deriving a whole set of heading sizes from one ratio.

</details>

<details class="week" open>
<summary id="week-13-transitions-and-motion">Week 13: Transitions and Motion</summary>

- [Transitions](/modules/css/css-transitions/README.md). Animating between two states when something on the page changes.
- [will-change](/modules/css/css-transitions/will-change.md). A performance hint, and why it is mostly a way to make things slower.
- [A Complete Interactive Component](/modules/css/css-transitions/complete-component.md). Layout, transition, and transform assembled into one working card.
- [Transforms](/modules/css/css-transforms/README.md). Moving, scaling, and rotating an element without disturbing anything around it.
- [Keyframe Animations](/modules/css/css-animations/README.md). Named keyframe sequences, for motion that needs more than two states.
- [Scroll-Driven Animation](/modules/css/css-animations/scroll-driven-animation.md). Tying an animation to scroll position, treated strictly as an enhancement.

</details>

<details class="week" open>
<summary id="week-14-project-development">Week 14: Project Development</summary>

- [Running a Structured Peer Review](/modules/design/peer-review/README.md). How to run a review session that produces a list instead of "looks good", and the visual review list to work through.
- [Putting the Four Together](/modules/design/design-principles/putting-it-together.md). The four principles working on the same page at the same time. Revisited from Week 12.
- [Testing Responsive Work](/modules/tools/browsers/testing-responsive-work.md). Four ways to test a layout, in increasing order of trustworthiness, ending with a real phone in hand. Revisited from Week 7.

No new material this week. Class time goes to your project, with guided troubleshooting and a structured peer review session. The three pages above are the ones you work from, not new topics to learn.

This is the joint week with MTM1511. Both courses run their review session on the same project in the same week: the page whose structure was reviewed there is the page whose presentation you review here. Bring the same site to both.

### Exercise: run a visual review, both directions (about 45 minutes)

Pair up and run the session exactly as [Running a Structured Peer Review](/modules/design/peer-review/README.md) sets it out. Use the layout and visual design list. Your partner already reviewed this page's structure earlier in the week, so resist re-reviewing the markup: a heading that is semantically correct and visually indistinguishable from body text is this course's problem, not that one's.

Open your partner's site cold, at whatever window size your browser happens to be. Squint at it before you read anything, and say what stands out. If the thing that stands out is not the thing that matters most, you have found the most valuable item of the session and you found it in four seconds.

Work the seven visual checks in order: squint test, near-misses, alignment edges, grouping, count of distinct decisions, narrow and wide widths, focus visibility. Name a location and a reason every time, so "the spacing feels off" becomes "the gap above each heading is the same as the gap below it, so the headings float between sections instead of belonging to the one underneath."

Check the two things people forget because they need deliberate effort: resize to a narrow width and confirm nothing scrolls sideways, and tab through with the keyboard and confirm the focus ring is visible on every control, including any you restyled.

While you are being reviewed, write and do not talk. Then swap, and afterwards write your record: what was raised, what you are changing, and what you are deliberately leaving, with the reason. That record is what the reflection in your final submission is built from.

</details>

<details class="week" open>
<summary id="week-15-project-work-lab">Week 15: Project Work Lab</summary>

- **Project Work Lab**. No new material. Open lab time on your project, with your instructor on hand.

</details>
