---
title: HTML Comments
prerequisites:
  - html/html-basics
---

# <abbr title="HyperText Markup Language">HTML</abbr> Comments

## Comments and clean code

HTML comments are notes for you and your teammates that the browser ignores entirely, so there's nothing to render for this one:

```html
<!-- Main navigation -->
<nav>
  ...
</nav>
<!-- End main navigation -->
```

Use them to label the major regions of a page. Combined with consistent indentation (nest each child element one level deeper than its parent), comments are what keep a file readable when it grows past a screen or two. Getting this habit now, on small files, means it's automatic by the time your project files are long.

Comment the *why*, not the obvious *what*. `<!-- paragraph -->` above a `<p>` is noise. `<!-- Promo banner: remove after March campaign -->` is genuinely useful to the next person, who might be you in six weeks, having forgotten why that section exists at all. Section markers on the major regions of a page make a long file easy to scan:

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

A comment worth keeping is [one that outlives the code it describes](/modules/html/html-comments/comment-longevity.md), which is worth a closer look once the habit above feels automatic.

## The checklist

Run this over your page before you move on:

- A comment labels each major section of the file
- Comments explain *why* a decision was made, not what a tag already says

## Keep learning

- [MDN: HTML comments](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Syntax#comments). Reference for comment syntax and the handful of rules around what can and can't appear inside one.
