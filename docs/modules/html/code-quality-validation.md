---
title: Code Quality and Validation
---

# Code Quality and Validation

Code that works and code that's good aren't the same thing. A page can render fine in your browser and still be full of invalid markup, inconsistent naming, and structure no one else could maintain. This chapter is about the habits and tools that make your code correct, readable, and easy to debug, which is what "professional standards" actually means in practice. This is also, concretely, the difference an employer notices in a portfolio or a technical interview: not whether the page works, since almost every candidate's does, but whether the code behind it looks like something a team could safely hand off and build on. You started building the validator habit back in Forms and Data Structures. This chapter is where it becomes a full routine.

## Validating your HTML

A browser is forgiving. Leave off a closing tag or nest elements wrongly, and it will usually guess what you meant and render something. That guess can differ between browsers, and it hides mistakes that bite you later. A validator catches them.

The [W3C Markup Validation Service](https://validator.w3.org/) checks your HTML against the official rules and reports every error and warning with a line number. Paste in your markup, upload a file, or point it at a live URL, and it tells you exactly what's wrong.

Here's roughly what an error looks like when a closing tag is missing:

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<div style="font-family: monospace; font-size: 0.85rem; border-left: 4px solid #cc0000; background: #fff0f0; padding: 0.6rem 0.9rem;">
<strong>Error:</strong> End tag for "body" seen, but there were open elements.<br>
<span style="opacity: 0.7;">From line 12, column 1; to line 12, column 7</span>
</div>
</div>
</details>

That message is telling you, in validator language, that something inside `<body>` was never closed, so the parser reached the end of the file still waiting for a closing tag. Read validator output carefully, because one real mistake often triggers several cascading errors below it. Fix the first error, revalidate, and the rest frequently disappear. Aim for zero errors on every page you submit. It's a concrete, checkable bar, and clean validation is a habit that separates careful work from sloppy work.

## File and folder naming standards

Naming rules that feel optional on a three-file project become non-negotiable once a project has thirty. The standards:

| Rule | Wrong | Right |
|---|---|---|
| Lowercase only | `About.html` | `about.html` |
| Hyphens, never spaces | `contact us.html` | `contact-us.html` |
| Descriptive names | `page2.html` | `services.html` |
| Sensible folders | everything in one folder | `images/`, `css/`, `js/` |

Lowercase matters because servers can treat `About.html` and `about.html` as two different files, so a link that works on your own computer can break the moment the site is deployed. Hyphens instead of spaces matter because a space in a URL becomes the messy `%20` code. Descriptive names and sensible folders don't change how a page looks, but they change whether a project is workable once it has real size to it.

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

Comment the *why*, not the obvious *what*. `<!-- paragraph -->` above a `<p>` is noise. `<!-- Promo banner: remove after March campaign -->` is genuinely useful to the next person, who might be you in six weeks, having forgotten why that section exists at all. Section markers on the major regions of a page make a long file easy to scan.

## Developer tools for debugging

Your browser's developer tools are where you diagnose problems in a live page. Right-click any element and choose Inspect to open them. The panels you'll use most:

The **Elements** (or Inspector) panel shows the live HTML tree. You can expand and collapse elements to check your nesting, hover over one to highlight it on the page, and confirm the structure that's actually rendering matches what you intended. It's the fastest way to find a misplaced closing tag or an element that ended up in the wrong parent.

The **Console** panel reports errors, such as an image that failed to load or a broken link path. When something on a page isn't behaving, the console is the first place to look for a message explaining why.

## The validator versus developer tools: two different jobs

It's worth being precise about what each tool actually checks, since they answer different questions.

The **validator** checks your source code against the HTML specification: is this valid, well-formed markup, regardless of how any particular browser happens to render it. It catches mistakes a forgiving browser would otherwise hide.

**Developer tools** show you what the browser actually built from your code, the live DOM, right now, in this browser. It catches mistakes in what actually renders, including things a validator can't see, like a `<div>` that ended up empty because a JavaScript error stopped a script partway through.

Between the two, checking your source against the rules and checking what the browser actually did with it, you can find and fix almost any structural problem yourself, before you ask anyone else to look.

## Working like a team: branches and pull requests

Every push so far has gone straight to `main`, which is the right call for a solo assignment where you're the only person touching the repository. It's not how a real team works, and it's worth knowing the difference now rather than meeting it for the first time on the job.

A **branch** is a parallel copy of your repository's history that you can commit to without touching `main` at all. Create one before starting a risky change or a new feature:

```bash
git checkout -b add-contact-page
```

You're now on a branch called `add-contact-page`. Commits you make here don't appear on `main` until you explicitly bring them over, so `main` stays in a known-good state the whole time you're working, even mid-change.

A **pull request** (sometimes called a merge request) is how that branch gets back into `main` on GitHub: you push the branch, then open a pull request asking to merge it, which gives a teammate a dedicated screen to read every changed line before it lands, leave comments, and approve or request changes. That review step, not the branch itself, is the actual point. It's why "push straight to main" doesn't scale past a team of one.

This course's one-repo-per-assignment structure doesn't need you to branch for every submission, and nothing here changes that. But the habit is worth building on your own initiative at least once before you graduate: branch, commit, push the branch, open a pull request against your own `main`, and merge it yourself if nobody else is reviewing. Doing it once when nothing is at stake is exactly how you want to first encounter it, rather than on a real team, under a real deadline.

## Keep learning

- [W3C Markup Validation Service](https://validator.w3.org/). The tool itself, use it on every page before you consider it finished.
- [W3Schools: HTML5 Syntax](https://www.w3schools.com/html/html5_syntax.asp). A reference for the syntax rules the validator checks against.
- [Video: How to Validate HTML Code Online, W3C Validator Tutorial](https://www.youtube.com/watch?v=LXfwn-9dvcE). A step-by-step walkthrough of using the validator and reading its output.

## Try it yourself (about 40 minutes)

Take your most complex page so far and run it through the W3C validator. Fix every error and warning until it validates clean. While you're in there, audit your file and folder names against the standards above and rename anything that doesn't comply, updating the links that point to it. Add section-marker comments to the major regions of the page. Finally, open developer tools, inspect your nesting in the Elements panel, and check the Console for any errors you didn't know were there.

Your markup is clean and it validates. Next week rounds out the HTML you know with a few more elements that solve real, specific problems.
