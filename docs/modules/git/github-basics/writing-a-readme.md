---
title: A README That Actually Tells Someone What They're Looking At
prerequisites:
  - git/github-basics
---

# A README That Actually Tells Someone What They're Looking At

*(Optional, in the sense that GitHub already gives you a working `README.md` the moment you check "Add a README file" when you create a repository. This module is about making that file worth reading.)*

A README is the first thing anyone sees when they land on your repository, before a single line of your actual code. That "anyone" is often a stranger opening the link cold, with no memory of what you were asked to build. A strong README answers the first three questions a stranger has before they have to ask:

- What is this project.
- Where is the live site.
- What am I looking at, if I open it.

That third question is what separates a README that does its job from one that's just a title. A short description of what the page contains, and a screenshot if you have one, saves the reader from clicking through just to find out:

```markdown
# Maplebrook Bakery: Contact Page

A single-page contact form. Semantic form markup, labelled fields, and a
confirmation message on submit.

**Live site:** https://your-username.github.io/contact-page/

![Screenshot of the contact page, showing a form with name, email,
and message fields above a submit button](screenshot.png)
```

Three plain sentences and a link do more work than a longer README with no structure. If you want to add a screenshot, drop the image file into your repository and reference it with the same relative-path thinking you already use for images in your pages, no new syntax involved.

A README this short takes two or three minutes once the rest of the project is done, and it's the difference between a repository that explains itself and one that makes the reader guess.

## The checklist

Run this over your repository before you consider it finished:

- A README that states what the project is and links to the live site

## Keep learning

- [GitHub Docs: About READMEs](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes). What a strong README can include, from GitHub's own guidance.
