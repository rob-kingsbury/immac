---
title: Publishing to GitHub Pages
prerequisites:
  - git/git-basics
---

# Publishing to GitHub Pages

Cloning, staging, committing, and pushing gets your work onto GitHub. None of it makes that work a website. Publishing is a separate, one-time switch.

## Why this is a per-repository setting

GitHub Pages isn't something you turn on once for the whole course. It's tied to one specific repository, and this course uses one repository per project. That means this short setup repeats once per project, not once ever. It's quick once you've done it the first time, but it's easy to forget on a new repository and then wonder why the live link doesn't load.

## Turning on Pages for this repository

1. On the repository's GitHub page, click the **Settings** tab.
2. In the left sidebar, under **Code and automation**, click **Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Under **Branch**, choose **main** and **/ (root)**, then click **Save**.

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
GitHub Pages settings: Source: Deploy from a branch. Branch: main, folder: / (root). A green banner reads: your site is live at https://your-username.github.io/git-practice/
</div>
</details>

The branch and folder you pick tell GitHub which files to publish. **main** because that's the branch your finished work lives on, and **root** because your `index.html` sits at the top level of the repository rather than inside a subfolder. A project structured differently, say with everything inside a `/docs` folder, would need that setting changed to match.

Saving triggers a short build on GitHub's side, usually well under ten minutes. Refresh the Pages settings page and a **Visit site** link appears once it's ready. That link is a real, public URL that stays live for as long as the repository does.

You only need to repeat the toggle itself once per repository. After that, every push you make automatically republishes the live site within a minute or two, the same way pushing updated your commit history a moment ago.

## The checklist

Run this over your repository before you move on:

- Pages is turned on, source set to **Deploy from a branch**, branch **main**, folder **/ (root)**
- Your repository's GitHub Pages site loads at a real URL in a browser

## Keep learning

- [pages.github.com](https://pages.github.com/). GitHub's short introduction to what Pages is and how it works.

## Try it yourself (about 15 minutes)

Confirm your setup works end to end, without following the steps above as a script: clone your practice repository (or a fresh one), make any small change, push it, and confirm the Pages URL loads in a browser. This is meant to be a genuine test, so work through a snag before reaching for help. But if you're stuck for more than a few minutes, that's not a sign you're behind. Either way, note exactly which step gave you trouble, because that's worth raising before you build on top of it.

[HTML Basics](/modules/html/html-basics/README.md) is where you write your first real HTML, so make sure you have a working editor and a repository you can push to.
