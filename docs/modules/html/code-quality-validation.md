---
title: Code Quality and Validation
---

# Code Quality and Validation

Code that works and code that's good aren't the same thing. A page can render fine in your browser and still be full of invalid markup, inconsistent naming, and structure no one else could maintain. This week is about the habits and tools that make your code correct, readable, and easy to debug, which is what "professional standards" actually means in practice.

## Validating your HTML

A browser is forgiving. Leave off a closing tag or nest elements wrongly, and it will usually guess what you meant and render something. That guess can differ between browsers, and it hides mistakes that bite you later. A validator catches them.

The W3C Markup Validation Service checks your HTML against the official rules and reports every error and warning with a line number. Paste in your markup or point it at a URL, and it tells you exactly what's wrong: an unclosed element, a misspelled attribute, content in a place it isn't allowed.

Read validator output carefully, because one real mistake often triggers several cascading errors. Fix the first error, revalidate, and the rest frequently disappear. Aim for zero errors on every page you submit. It's a concrete, checkable bar, and clean validation is a habit that separates careful work from sloppy work.

## File and folder naming standards

The naming rules from week one become non-negotiable once a project has many files. The standards:

- Lowercase only. Servers can treat `About.html` and `about.html` as different files, so mixed case causes links that work on your machine and break once deployed.
- Hyphens between words, never spaces. `contact-us.html`, not `contact us.html`. Spaces become messy `%20` codes in URLs.
- Descriptive names. `services.html` tells you what a file is; `page2.html` doesn't.
- A sensible folder structure. Group assets by type, for example an `images/` folder and a `css/` folder, so a growing project stays navigable.

None of this changes how a page looks. All of it changes whether a project is workable when it has thirty files instead of three.

## Commenting conventions

Comments explain code that isn't self-evident and mark the structure of a long file. Good comments label regions and note anything surprising.

```html
<!-- ===== Site header ===== -->
<header>
  ...
</header>

<!-- Promo banner: remove after March campaign -->
<aside class="promo">
  ...
</aside>
```

Comment the *why*, not the obvious *what*. `<!-- paragraph -->` above a `<p>` is noise. `<!-- Promo banner: remove after March campaign -->` is genuinely useful to the next person, who might be you. Section markers on the major regions of a page make a long file easy to scan.

## Developer tools for debugging

Your browser's developer tools are where you diagnose problems in a live page. Right-click any element and choose Inspect to open them. The panels you'll use most:

The Elements (or Inspector) panel shows the live HTML tree. You can expand and collapse elements to check your nesting, hover over one to highlight it on the page, and confirm the structure that's actually rendering matches what you intended. It's the fastest way to find a misplaced closing tag or an element that ended up in the wrong parent.

The Console panel reports errors, such as an image that failed to load or a broken link path. When something on a page isn't behaving, the console is the first place to look for a message explaining why.

Between the validator (which checks your code against the rules) and developer tools (which show what the browser actually did with it), you can find and fix almost any structural problem yourself, before you ask anyone else to look.

## Try it yourself

Take your most complex page so far and run it through the W3C validator. Fix every error and warning until it validates clean. While you're in there, audit your file and folder names against the standards above and rename anything that doesn't comply, updating the links that point to it. Add section-marker comments to the major regions of the page. Finally, open developer tools, inspect your nesting in the Elements panel, and check the Console for any errors you didn't know were there.
