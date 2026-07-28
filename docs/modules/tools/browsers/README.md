---
title: Browser Developer Tools
prerequisites:
  - html/html-basics
---

# Browser Developer Tools

Every browser ships with a set of tools that show you what it actually built from your code, as opposed to what you meant to write. That gap is where almost every confusing bug lives. A style that seems to do nothing, a gap you cannot account for, an image that will not appear: in each case the browser already knows the answer and will show it to you if you ask.

Asking is the skill. It is faster than editing your CSS hopefully and reloading, and unlike guessing, it teaches you something you keep.

## What is on the other pages

The pages below split into three groups, and they build in that order.

**Getting oriented.** [Developer Tools for Debugging](/modules/tools/browsers/devtools.md) covers opening the tools, the panels you will live in, and how to read a console error down to the file and line that caused it. Start here; everything else assumes you can find your way around.

**Inspecting one specific thing.** Four short pages, each for a question that comes up constantly. [Inspecting CSS Rules](/modules/tools/browsers/inspecting-css-rules.md) shows which rule won and which was struck out. [Inspecting the Box Model](/modules/tools/browsers/inspecting-the-box-model.md) draws the real padding, border, and margin values on screen. [Inspecting a Grid](/modules/tools/browsers/inspecting-a-grid.md) overlays a grid with every line numbered. [Inspecting Variables](/modules/tools/browsers/inspecting-variables.md) tells you whether a custom property resolved or quietly fell through.

**Working a problem to the end.** Two routines, for when a single look is not enough. [Debugging CSS Conflicts](/modules/tools/browsers/debugging-css-conflicts.md) is a five-step sequence for a rule that refuses to apply. [Diagnosing Rendering Problems](/modules/tools/browsers/diagnosing-rendering-problems.md) is a broader six-step order of checks for anything that looks wrong on screen, whether or not CSS is the cause.

[Testing Responsive Work](/modules/tools/browsers/testing-responsive-work.md) sits slightly apart from the other three groups. It is about confirming a layout holds up rather than about tracking down a fault, and it ends somewhere developer tools cannot follow: on a real phone, in a second browser.

## Read them when you need them

Only the first page is worth reading straight through before you need it. The rest are reference, and they land better the first time a real page misbehaves on you. Come back to them then, in whatever order the problem demands.

There is one habit worth forming now, though, ahead of any specific technique. When something does not look right, open the tools before you open your stylesheet. The instinct to start editing is strong and it is usually wrong, because a fix that lands by accident leaves you no wiser about why the page was broken in the first place.

## The checklist

- Comfortable opening developer tools and finding the Elements, Console, and Styles panels
- Inspecting an element before changing its CSS, rather than after
