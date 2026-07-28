---
title: Keeping Clutter Out of Your Repository With .gitignore
prerequisites:
  - git/git-basics
---

# Keeping Clutter Out of Your Repository With .gitignore

*(Optional. Nothing about this is required for this course, but it's a genuine habit worth having before your repositories start collecting files nobody meant to commit.)*

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

## The checklist

Run this over your repository before you consider it finished:

- `.gitignore` in place if your project folder has picked up OS clutter files

## Keep learning

- [GitHub Docs: Ignoring files](https://docs.github.com/en/get-started/git-basics/ignoring-files). The official reference for `.gitignore` syntax and patterns, beyond the short list above.
