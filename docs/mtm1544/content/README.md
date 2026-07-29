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

</details>

<details class="week" open>
<summary id="week-2-the-box-model-and-spacing">Week 2: The Box Model and Spacing</summary>

- [The Box Model](/modules/css/css-box-model/README.md). Content, padding, border, and margin: the four layers wrapped around every element.
- [CSS Units](/modules/css/css-units/README.md). Pixels, ems, rems, percentages, and viewport units, and what each one is measured against.
- [Box Sizing](/modules/css/css-box-sizing/README.md). Why a box comes out wider than the width you set, and the one line that fixes it.
- [aspect-ratio](/modules/css/css-aspect-ratio/README.md). Holding a box to a fixed shape while its size flexes.

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

</details>

<details class="week" open>
<summary id="week-6-css-grid-layouts">Week 6: CSS Grid Layouts</summary>

- [CSS Grid Layouts](/modules/css/css-grid/README.md). Rows and columns at the same time, which is what page-level layout needs.
- [Subgrid](/modules/css/css-grid/subgrid.md). Lining content up across sibling cards by borrowing the parent grid's tracks.
- [Grid and Flexbox Together](/modules/css/css-grid/grid-and-flexbox-together.md). Grid for the page skeleton, Flexbox for what sits inside each region.
- [The position Property](/modules/css/css-position/README.md). Lifting one element out of normal flow and placing it deliberately.

</details>

<details class="week" open>
<summary id="week-7-responsive-design-and-media-queries">Week 7: Responsive Design and Media Queries</summary>

- [Responsive Design and Media Queries](/modules/css/css-media-queries/README.md). Changing styles at a breakpoint, with breakpoints chosen from content rather than device names.
- [CSS Units](/modules/css/css-units/README.md). Pixels, ems, rems, percentages, and viewport units, and what each one is measured against. Revisited from Week 2.
- [Fluid Sizing Without a Query](/modules/css/css-fluid-sizing/README.md). Sizing that scales on its own, before you reach for a breakpoint.
- [Layouts That Respond Without a Query](/modules/css/css-rwd-patterns/README.md). Patterns that reflow on their own, with no breakpoint involved.
- [Container Queries](/modules/css/css-container-queries/README.md). Asking about the size of a component's container instead of the whole window.
- [Responsive Images](/modules/html/responsive-images/README.md). srcset, sizes, and picture, so the browser can choose the right file for the screen.
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

- **Project Development**. No new material. Class time goes to your project, with guided troubleshooting and structured peer review.

</details>

<details class="week" open>
<summary id="week-15-project-work-lab">Week 15: Project Work Lab</summary>

- **Project Work Lab**. No new material. Open lab time on your project, with your instructor on hand.

</details>
