---
title: Project Work Lab
---

# Project Work Lab

The final week is open lab time to complete your multi-page website. There's no new material and no lecture. The instructor is available for individual support while you finish, do your last checks, and get your project ready to submit. Use the time to polish, not to start anything you should have built earlier.

## What to finish

By now your site's structure should be solid and its known problems resolved from week 13. This week is for completing content, making a final pass over every page, and confirming the whole site holds together: all pages present, all links working, all standards met. Bring the specific questions that come up in that final pass to the instructor while there's still time to act on them.

## Pre-submission checklist

Before you consider the project done, run every page through the checklist below. It's the whole course condensed into a set of yes-or-no checks, drawn straight from what each week taught.

Structure and validation:

- Every page validates with zero errors in the W3C validator.
- Each page has one `<h1>` and a heading order that never skips a level.
- The markup is semantic: one `<main>` per page, with `<header>`, `<nav>`, and `<footer>` used correctly.
- File and folder names are lowercase, hyphenated, and descriptive, and every internal link works.

Content and media:

- Every image has an appropriate `alt` value (descriptive, or empty for decorative images).
- Images are sized and compressed for the web, using responsive techniques where it helps.
- Any embedded media has a `title` and is wrapped for responsive display.

Accessibility:

- The entire site is usable with the keyboard alone, with a visible focus indicator throughout.
- A skip link is present, and forms have real `<label>` elements on every field.
- The Lighthouse accessibility audit passes, with any flagged issues addressed.

Discoverability:

- Each page has a unique, specific `<title>` and a `<meta name="description">`.
- The document head includes the `charset` and `viewport` meta tags.
- Pages are linked together so every one is reachable from the home page.

## Submitting your work

Your site is submitted as a link to its live GitHub Pages URL, following the process covered in the Git and GitHub onboarding. Before you submit, open that live URL yourself in a fresh browser tab and click through the whole site as a visitor would. A project that works on your computer but breaks once published is almost always a file-path or naming problem, exactly the kind of issue the checklist above is built to catch. When the live site passes every check, you're done.
