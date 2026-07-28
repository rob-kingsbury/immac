---
title: Code Quality and Validation
prerequisites:
  - html/html-validation
  - html/html-comments
  - welcome/introduction-to-the-web
---

# Code Quality and Validation

Code that works and code that's good aren't the same thing. A page can render fine in your browser and still be full of invalid markup, inconsistent naming, and structure no one else could maintain. This chapter is about the habits and tools that make your code correct, readable, and easy to debug, which is what "professional standards" actually means in practice. This is also, concretely, the difference an employer notices in a portfolio or a technical interview: not whether the page works, since almost every candidate's does, but whether the code behind it looks like something a team could safely hand off and build on. You started building the validator habit back in Forms and Data Structures. This chapter is where it becomes a full routine.

## How to read this chapter

**The core path is everything up to the closing checklist**, in order: validating your HTML, naming files and folders sensibly, writing comments that pull their weight, using developer tools to see what actually rendered, and understanding how a real team moves code from a branch into `main`. Budget about 30 minutes to read it, plus the 40 minutes the closing exercise takes.

Three sections headed **Going deeper** are optional, adding about 20 minutes combined. They cover a layer of editor and repository habits that go a step beyond the core workflow: catching problems before you even save, keeping repository clutter out of version control, and writing a README that actually tells a stranger what your project is. Skip them if you are short on time, but two years into a job, you'll likely be glad you read them once.

## Validating your HTML

A browser is forgiving. Leave off a closing tag or nest elements wrongly, and it will usually guess what you meant and render something. That guess can differ between browsers, and it hides mistakes that bite you later. A validator catches them.

The [W3C Markup Validation Service](https://validator.w3.org/) checks your HTML against the official rules and reports every error and warning with a line number. Paste in your markup, upload a file, or point it at a live URL, and it tells you exactly what's wrong.

Here's roughly what an error looks like when a closing tag is missing:

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
<div style="font-family: monospace; font-size: 0.85rem; border-left: 4px solid #cc0000; background: #fff0f0; padding: 0.6rem 0.9rem;">
<strong>Error:</strong> End tag for "body" seen, but there were open elements.<br>
<span style="opacity: 0.8;">From line 12, column 1; to line 12, column 7</span>
</div>
</div>
</details>

That message is telling you, in validator language, that something inside `<body>` was never closed, so the parser reached the end of the file still waiting for a closing tag. Read validator output carefully, because one real mistake often triggers several cascading errors below it. Fix the first error, revalidate, and the rest frequently disappear. Aim for zero errors on every page you build. It's a concrete, checkable bar, and clean validation is a habit that separates careful work from sloppy work.

### A second common error: tags closed out of order

The missing closing tag above is one common failure. The other is closing tags in the wrong order, which is easy to do once elements start nesting three or four deep:

```html
<!-- Wrong: </p> closes after </ul>, so the tags cross instead of nesting cleanly -->
<p>Read the list below.
<ul>
  <li>First item</li>
</ul></p>
```

```html
<!-- Right: each tag closes inside the one it opened inside -->
<p>Read the list below.</p>
<ul>
  <li>First item</li>
</ul>
```

Nesting has a simple rule: whatever you open last, you close first. The validator flags a crossed pair like the one above as an error, usually naming the tag it expected to see closed and the one it found instead. If a page throws a wall of errors that don't seem to relate to anything you actually did wrong, check for a crossed pair like this one first. It is one of the most common causes of a validator report that looks far worse than the actual mistake.

## File and folder naming standards

Naming rules that feel optional on a three-file project become non-negotiable once a project has thirty. The standards:

| Rule | Wrong | Right |
|---|---|---|
| Lowercase only | `About.html` | `about.html` |
| Hyphens, never spaces | `contact us.html` | `contact-us.html` |
| Descriptive names | `page2.html` | `services.html` |
| Sensible folders | everything in one folder | `images/`, `css/`, `js/` |

Lowercase matters because servers can treat `About.html` and `about.html` as two different files, so a link that works on your own computer can break the moment the site is deployed. Hyphens instead of spaces matter because a space in a URL becomes the messy `%20` code. Descriptive names and sensible folders don't change how a page looks, but they change whether a project is workable once it has real size to it.

The failure is easy to reproduce and easy to miss on your own machine, because Windows and macOS usually ignore case in filenames by default, so a mismatched link still opens locally without complaint. GitHub Pages is not forgiving in the same way. It runs on Linux, where `About.html` and `about.html` are genuinely two different files, so a link written against the wrong case works everywhere you tested it and fails the moment it goes live:

```html
<!-- Written when the file was actually saved as About.html -->
<a href="About.html">About us</a>
```

```text
Local machine (Windows/macOS): page loads, the mismatched case is ignored.
GitHub Pages (Linux): 404, because about.html and About.html are different files.
```

Rename the file to lowercase, update every link that points to it, and the mismatch is gone for good. This is exactly the kind of bug that costs you fifteen minutes right before a deadline if you build the naming habit late instead of early.

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

### Comments that outlive the code they describe

A comment that restates the next line goes stale the moment that line changes, because nobody remembers to update a sentence sitting next to code they're editing for an unrelated reason. A comment that explains a decision stays useful even after the code around it changes, because the reasoning behind a choice usually outlasts the choice itself:

```html
<!-- Bad: restates what the tag already says, and will drift out of sync -->
<!-- This is a div -->
<div class="card">

<!-- Good: explains a decision that isn't obvious from the markup alone -->
<!-- Card uses a div, not article, because these blocks aren't independently
     syndicated content, they're layout containers for the grid below -->
<div class="card">
```

If you can delete a comment and lose nothing, delete it. If you can delete a comment and lose the reason something is built the way it is, keep it.

## Developer tools for debugging

Your browser's developer tools are where you diagnose problems in a live page. Right-click any element and choose Inspect to open them. The panels you'll use most:

The **Elements** (or Inspector) panel shows the live HTML tree. You can expand and collapse elements to check your nesting, hover over one to highlight it on the page, and confirm the structure that's actually rendering matches what you intended. It's the fastest way to find a misplaced closing tag or an element that ended up in the wrong parent.

The **Console** panel reports errors, such as an image that failed to load or a broken link path. When something on a page isn't behaving, the console is the first place to look for a message explaining why.

A console error usually names the file and line it came from, which is where to start reading, not the sentence describing the error:

```text
GET https://example.com/images/hero.jpg 404 (Not Found)
    at index.html:14
```

Read that from the right: line 14 of `index.html` requested `images/hero.jpg`, and the server answered `404`, meaning it looked and found nothing at that path. The fix is almost always one of two things: the file isn't actually named or located where the markup says it is, or the path in the markup has a typo. Open the Elements panel, find the `<img>` on line 14, and compare its `src` attribute against the actual file in your project folder.

## Going deeper: your editor catches some of this before you even save

*(Optional. This adds a checkpoint earlier than either of the two you just read about, not a replacement for either.)*

The validator catches mistakes when you run it, and developer tools show you what actually rendered. Both of those happen after you've saved the file, and usually after you've already moved on to the next thing. VS Code has its own, smaller layer of checking that happens while you're still typing.

Problems VS Code recognizes, a closing tag that doesn't match the tag it was meant to close, a quote that never gets closed, an attribute written twice, get underlined directly in the editor with a red squiggly line, the same convention a spell-checker uses. Hover over the underline and a short description appears in a tooltip, without leaving the file.

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
Problems panel: 2 warnings. contact.html: attribute "class" already defined (line 9). contact.html: end tag "div" seen, but there were open elements (line 22).
</div>
</details>

This is narrower than what the W3C validator checks. It's built to catch obvious syntax slips as you make them, not to enforce the full specification the way the validator does, so a clean editor with no squiggly lines is not the same thing as a page that validates. Treat it as an early warning, not a substitute for running the validator before you consider a page done.

Every problem VS Code has flagged across your currently open files also collects in one place: the **Problems panel**, opened from the View menu or with `Ctrl+Shift+M` (`Cmd+Shift+M` on a Mac). Instead of hunting through a long file for a stray squiggly line, the panel lists every issue at once, each one a clickable link that jumps straight to the line it's on.

The order this gives you across the whole chapter is worth holding onto: your editor catches a slip before you save, the validator catches what's left before you publish, and developer tools catch whatever only shows up once the browser actually renders the page. Three checkpoints, each looking for something the others can't see.

## The validator, your editor, and developer tools: three checkpoints for three different questions

Now that all three have come up, it's worth stating plainly what each one actually checks, since they answer different questions and a clean result from one doesn't guarantee a clean result from another.

The **validator** checks your source code against the HTML specification: is this valid, well-formed markup, independent of how any particular browser happens to render it. It catches mistakes a forgiving browser would otherwise hide, and it's the most complete check of the three.

**Developer tools** show you what the browser actually built from your code, the live DOM, right now, in this browser. It catches mistakes in what actually renders, including things a validator can't see, like a `<div>` that ended up empty because a script failed partway through, or an image requesting the wrong path.

**Your editor**, if you worked through the optional section above, catches a narrower set of obvious slips while you're still typing, before either of the other two ever runs.

None of the three replaces the others. A page can pass every check your editor offers, validate cleanly, and still misbehave once you look at it in developer tools, because rendering behaviour and specification compliance are not the same question. Running all three, in that order, before you call anything finished, is what "professional standards" meant back in this chapter's first paragraph.

## Working like a team: branches and pull requests

Every push so far has gone straight to `main`, which is the right call for a solo project where you're the only person touching the repository. It's not how a real team works, and it's worth knowing the difference now rather than meeting it for the first time on the job.

A **branch** is a parallel copy of your repository's history that you can commit to without touching `main` at all. Every command in this section is typed into a terminal, unlike the staging/commit/push workflow from [Introduction to the Web](/modules/welcome/introduction-to-the-web.md), which you've done through VS Code's Source Control panel. Branching and pull requests are commands and a GitHub screen, not buttons in that same panel, so open a terminal (Git Bash, the one you set as your default back in Introduction to the Web) for this part. Create a branch before starting a risky change or a new feature:

```bash
git checkout -b add-contact-page
```

You're now on a branch called `add-contact-page`. Commits you make here don't appear on `main` until you explicitly bring them over, so `main` stays in a known-good state the whole time you're working, even mid-change.

When you're ready to bring those commits somewhere visible to anyone but you, push the branch itself, the same way you've been pushing to `main` all along, just with the branch's own name:

```bash
git push -u origin add-contact-page
```

A **pull request** (sometimes called a merge request) is how that pushed branch gets back into `main` on GitHub: opening one gives a teammate a dedicated screen to read every changed line before it lands, leave comments, and approve or request changes. That review step, not the branch itself, is the actual point. It's why "push straight to main" doesn't scale past a team of one.

<div class="diagram">
<svg viewBox="0 0 640 230" role="img" aria-label="A branch and pull request workflow. A line labelled main runs left to right with commits marked as dots. At a branch point, a second line labelled add-contact-page splits off below main and collects three of its own commits. That branch line then rejoins main through a pull request, shown as a labelled arrow, and a merge commit appears on main at the point where the branch rejoins it.">
  <text x="30" y="34" class="d-lbl">main</text>
  <line x1="30" y1="60" x2="600" y2="60" class="d-muted-stroke" stroke-width="3"/>
  <path d="M 594 54 L 604 60 L 594 66 Z" class="d-accent"/>

  <circle cx="70" cy="60" r="6" class="d-surface d-border" stroke-width="1.5"/>
  <circle cx="180" cy="60" r="6" class="d-accent d-accent-stroke" stroke-width="1.5"/>
  <text x="180" y="45" text-anchor="middle" class="d-lbl-mono">git checkout -b add-contact-page</text>

  <path d="M 180 60 L 220 130 L 420 130 L 460 60" fill="none" class="d-accent-stroke" stroke-width="2"/>
  <text x="320" y="150" text-anchor="middle" class="d-lbl-mono">add-contact-page</text>

  <circle cx="260" cy="130" r="6" class="d-accent-soft d-accent-stroke" stroke-width="1.5"/>
  <circle cx="320" cy="130" r="6" class="d-accent-soft d-accent-stroke" stroke-width="1.5"/>
  <circle cx="380" cy="130" r="6" class="d-accent-soft d-accent-stroke" stroke-width="1.5"/>
  <text x="320" y="112" text-anchor="middle" class="d-lbl-muted">three commits, main untouched</text>

  <text x="475" y="112" text-anchor="middle" class="d-lbl-muted">pull request,</text>
  <text x="475" y="124" text-anchor="middle" class="d-lbl-muted">reviewed and merged</text>

  <circle cx="470" cy="60" r="7" class="d-accent d-accent-stroke" stroke-width="1.5"/>
  <text x="470" y="42" text-anchor="middle" class="d-lbl">merge commit</text>

  <circle cx="560" cy="60" r="6" class="d-surface d-border" stroke-width="1.5"/>
</svg>
<figcaption>The branch collects its own commits without touching main. A pull request brings the changes back through review, and a merge commit on main is the only trace left of where the branch rejoined it.</figcaption>
</div>

This course's one-repo-per-project structure doesn't need you to branch every time, and nothing here changes that. But the habit is worth building on your own initiative at least once before you graduate: branch, commit, push the branch, open a pull request against your own `main`, and merge it yourself if nobody else is reviewing. Doing it once when nothing is at stake is exactly how you want to first encounter it, rather than on a real team, under a real deadline.

## Going deeper: keeping clutter out of your repository with .gitignore

*(Optional. Nothing about this section is required for this course, but it's a genuine habit worth having before your repositories start collecting files nobody meant to commit.)*

Your operating system writes small files into folders it doesn't own, silently, for its own bookkeeping. macOS drops a `.DS_Store` file into almost every folder you open in Finder. Windows writes `Thumbs.db` when it generates folder thumbnails, and sometimes a `desktop.ini`. Neither file has anything to do with your website. Both get swept up the moment you run `git add .`, because Git has no way to know the difference between a file you meant to commit and one your operating system left behind.

A `.gitignore` file tells Git which files to never stage, never commit, and never even show as a pending change, no matter how many times you run `git add .`. It's a plain text file, one pattern per line, saved at the top level of your repository:

```text
# macOS
.DS_Store

# Windows
Thumbs.db
desktop.ini

# Editor backup and swap files
*~
*.swp
```

Create it once, name it exactly `.gitignore`, the leading dot is part of the filename, not a typo, and commit it like any other file. From that point on, Git treats every pattern inside it as invisible: those files can sit in your project folder without ever appearing under **Changes** in the Source Control panel.

The list above is intentionally short. This course builds static HTML and CSS with no build step, so there's no `node_modules` folder, no compiled output, no generated cache directory to exclude, the kind of thing a `.gitignore` usually spends most of its lines on in a larger project. Add an entry only for a file you've actually seen show up uninvited. A `.gitignore` copied wholesale from an unrelated project tends to hide files you genuinely needed, which is worse than the clutter it was meant to solve.

## Going deeper: a README that actually tells someone what they're looking at

*(Optional, in the sense that GitHub already gave you a working `README.md` the moment you checked "Add a README file" back in Introduction to the Web. This section is about making that file worth reading.)*

A README is the first thing anyone sees when they land on your repository, before a single line of your actual code. That "anyone" is often a stranger opening the link cold, with no memory of what you were asked to build. A strong README answers the first three questions a stranger has before they have to ask:

- What is this project.
- Where is the live site.
- What am I looking at, if I open it.

That third question is what separates a README that does its job from one that's just a title. A short description of what the page contains, and a screenshot if you have one, saves the reader from clicking through just to find out:

```markdown
# Maplebrook Bakery: Contact Page

A single-page contact form built for MTM1511, Week 7. Semantic form
markup, labelled fields, and a confirmation message on submit.

**Live site:** https://your-username.github.io/contact-assignment/

![Screenshot of the contact page, showing a form with name, email,
and message fields above a submit button](screenshot.png)
```

Three plain sentences and a link do more work than a longer README with no structure. If you want to add a screenshot, drop the image file into your repository and reference it with the same relative-path thinking you already use for images in your pages, no new syntax involved.

A README this short takes two or three minutes once the rest of the project is done, and it's the difference between a repository that explains itself and one that makes the reader guess.

## The checklist

Run this over your page and your repository before you consider it finished:

- Zero errors and warnings from the W3C validator
- File and folder names follow the lowercase, hyphenated, descriptive standard
- Comments explain *why* a decision was made, not what a tag already says
- Comfortable finding your way around the Elements and Console panels
- Can explain the difference between what the validator checks and what developer tools show you
- `.gitignore` in place if your project folder has picked up OS clutter files
- A README that states what the project is and links to the live site

## Keep learning

- [W3C Markup Validation Service](https://validator.w3.org/). The tool itself, use it on every page before you consider it finished.
- [W3Schools: HTML5 Syntax](https://www.w3schools.com/html/html5_syntax.asp). A reference for the syntax rules the validator checks against.
- [Video: How to Validate HTML Code Online, W3C Validator Tutorial](https://www.youtube.com/watch?v=LXfwn-9dvcE). A step-by-step walkthrough of using the validator and reading its output.
- [GitHub Docs: Ignoring files](https://docs.github.com/en/get-started/git-basics/ignoring-files). The official reference for `.gitignore` syntax and patterns, beyond the short list in this chapter.
- [GitHub Docs: About READMEs](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes). What a strong README can include, from GitHub's own guidance.

## Try it yourself (about 40 minutes)

Take your most complex page so far and run it through the W3C validator. Fix every error and warning until it validates clean. While you're in there, audit your file and folder names against the standards above and rename anything that doesn't comply, updating the links that point to it. Add section-marker comments to the major regions of the page. Finally, open developer tools, inspect your nesting in the Elements panel, and check the Console for any errors you didn't know were there.

If your project folder has picked up a stray `.DS_Store` or `Thumbs.db`, add a `.gitignore` now and confirm the file disappears from the Source Control panel. Then look at your README and add whichever of the three things it's currently missing: what the project is, the live link, or a line describing what the page actually shows.

Your markup is clean and it validates. [Advanced HTML Patterns](/modules/html/advanced-html-patterns.md) rounds out the HTML you know with a few more elements that solve real, specific problems.
