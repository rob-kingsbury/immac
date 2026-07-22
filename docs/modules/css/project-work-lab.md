---
title: Project Work Lab
---

# Project Work Lab

The final week is open lab time to complete your responsive, fully styled website. There's no new material and no lecture. The instructor is available for individual support while you finish, run your last checks, and get the project ready to submit. Use the time to polish, not to start anything you should have built earlier.

## What to finish

By now your styling should be solid and the problems found in the Project Development week resolved. This week is for the final pass: making every page consistent with every other, completing anything unfinished, and confirming the whole site holds together at every screen size and for every visitor.

Bring the specific questions that come up in that pass to the instructor while there's still time to act on them.

## Pre-submission checklist

Run every page through this before you consider the project done. It's the whole course condensed into yes-or-no checks, drawn from what each week taught.

**Structure and stylesheet**

- All styling lives in an external stylesheet linked from every page. No inline `style` attributes, no `<style>` blocks.
- `box-sizing: border-box` is set globally at the top of the file.
- Repeated values are declared as custom properties in one place, named for meaning.
- There are no `!important` declarations, apart from the reduced-motion block.
- IDs are not used as styling hooks where a class would do.
- The stylesheet is commented, with sections a reader can navigate.

**Typography and colour**

- Font sizes are set in `rem`, not `px`.
- Body text has a `line-height` between roughly 1.5 and 1.7, and a `max-width` that keeps lines readable.
- The type scale is consistent across pages, with a clear step between heading levels.
- Every text and background pair meets at least 4.5:1, and large text at least 3:1.
- Colour is never the only way information is conveyed.

**Layout**

- The layout holds at every width from a narrow phone to a wide monitor, with no horizontal scrolling.
- Grid and Flexbox are each used where they fit, and you can say why for each.
- Breakpoints were chosen from where your content breaks, not from a device list.
- The stylesheet is written mobile-first, with `min-width` queries.
- `img { max-width: 100%; height: auto; }` is present.

**Accessibility**

- The `viewport` meta tag is in the `<head>` of every page, and zoom is not disabled.
- Every interactive element has a visible `:focus-visible` style with at least 3:1 contrast.
- The entire site is usable with the keyboard alone, in a sensible order.
- The page still works at 200% text zoom, with nothing clipped or overlapping.
- A `prefers-reduced-motion` rule is present and actually stops the motion.
- Touch targets are large enough to hit comfortably.
- Lighthouse and axe both pass, with anything flagged addressed.

**Design**

- Each page has a clear visual hierarchy that matches what actually matters on it.
- Spacing, alignment, and colour are consistent from page to page, so the site reads as one thing.
- The number of distinct font sizes, spacing values, and colours is small and deliberate.
- Motion, if present, communicates something rather than decorating.

## Testing before you submit

Do all four of these on the **live** site, not on your local copy.

1. **Click through every page** as a visitor would, following links rather than typing URLs.
2. **Resize from narrow to wide** in one continuous drag, watching for anything that breaks in between rather than only at your breakpoints.
3. **Put the mouse away** and navigate the whole site with Tab and Enter.
4. **Open it on a real phone.** Your project is at a public URL, so this takes seconds and catches what nothing else does.

A project that works on your computer and breaks once published is almost always a file path or naming problem: a stylesheet linked as `CSS/Styles.css` when the folder is `css/styles.css` works locally on Windows and fails on GitHub's servers, which treat capitalisation as significant. Checking the live site is how you catch it.

## Submitting your work

Your site is submitted as a link to its live GitHub Pages URL, using the workflow you set up in Week 1. Confirm the URL loads in a fresh browser tab, on a machine you aren't signed in on if you can, before you submit it.

Have your notes from the Project Development week to hand as well. Being able to explain the palette, the breakpoints, the layout choices, and what you did with the feedback you received is part of the deliverable, not an extra.

When the live site passes every check on the list above, you're done.
