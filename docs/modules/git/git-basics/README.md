---
title: Git Basics
prerequisites:
  - tools/vscode
  - git/github-basics
---

# Git Basics

## Cloning the repository in VS Code

Cloning downloads a copy of a GitHub repository onto your computer, while keeping it linked to the original online. Do this once, per repository.

1. On your repository's GitHub page, click the green **Code** button and copy the URL shown (it ends in `.git`).
2. In VS Code, open the Command Palette and run **Git: Clone**.
3. Paste the URL when prompted, and press Enter.
4. Choose a folder on your computer to save it in, such as a `projects` folder you create for this course.
5. When VS Code asks, click **Open** to open the cloned folder.

You now have a local, working copy of the repository, connected to GitHub. This is a one-time step per repository, not something you repeat every time.

With a repository cloned, [Staging, Committing, and Pushing](/modules/git/git-basics/staging-committing-pushing.md) covers the workflow you'll repeat constantly from here on.

Two more pages sit alongside this one, for when you need them rather than now. [Ignoring Files with .gitignore](/modules/git/git-basics/gitignore.md) is how you keep files you never want published out of a repository. [Git, GitHub, and Pages in Plain Terms](/modules/git/git-basics/git-github-pages-in-plain-terms.md) separates the three names, which are easy to hear as one thing.

## The checklist

Run this over your own machine before you move on:

- Your practice repository is cloned onto your computer in VS Code

## Keep learning

- [GitHub Docs: Hello World](https://docs.github.com/en/get-started/quickstart/hello-world). GitHub's walkthrough of cloning a repository and making your first commit.
