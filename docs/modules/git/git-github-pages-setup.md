---
title: Git, GitHub, and GitHub Pages Setup
---

# Git, GitHub, and GitHub Pages Setup

Every project you submit this semester lives as a real, public website, hosted on GitHub Pages. This week sets up the entire pipeline that makes that possible: Git tracking your changes, GitHub storing them, VS Code tying it all together, and Pages publishing the result. It's a lot in one class, but it's a one-time setup. Once it works, the weekly workflow is three clicks.

## Installing Git

Git is the version control system that records every change you make to your files, and it's what connects your computer to GitHub. If you haven't already, download it from [git-scm.com/downloads](https://git-scm.com/downloads) and run the installer, accepting the default options throughout. The defaults are correct for this course.

Confirm the install worked by opening a terminal and checking the version:

```bash
git --version
```

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
git version 2.45.1
</div>
</details>

The exact version number doesn't matter. Any recent version is fine. What matters is that the command is recognized at all, rather than an error saying `git` is not a known command.

Git needs to know who you are before it will let you commit changes. Set your name and email once, globally, and every commit you ever make on this machine will be signed with them:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

Use the same email address you'll use for your GitHub account. This is a one-time setup per computer, not something you'll repeat each class.

## Setting up VS Code

VS Code is the editor you'll write every line of code in this semester. If you haven't installed it, get it from [code.visualstudio.com](https://code.visualstudio.com/), then set up two extensions and one terminal setting.

### Installing Live Server and Live Share

Open the Extensions view (the icon in the Activity Bar on the left, or `Ctrl+Shift+X`) and install these two extensions, required for this course:

- **[Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)**. Right-click any HTML file and choose "Open with Live Server" to preview it in a browser, and the page automatically refreshes every time you save. You'll use this every single class from here on.
- **[Live Share](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare)**. Lets you share your live coding session with an instructor or classmate for real-time help, without either of you leaving VS Code.

### Setting the default terminal to Git Bash

VS Code has a built-in terminal panel, and on Windows it defaults to PowerShell. This course standardizes on **Git Bash**, since it's the terminal Git itself ships with, and its commands work identically on Windows, macOS, and Linux.

Open the Command Palette (`Ctrl+Shift+P`, or `Cmd+Shift+P` on macOS), type "Terminal: Select Default Profile," and choose **Git Bash** from the list. The next terminal you open (`` Ctrl+` ``) will use it.

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
Command Palette shows: PowerShell, Command Prompt, <strong>Git Bash</strong>, Azure Cloud Shell
</div>
</details>

If Git Bash doesn't appear in that list, close and reopen VS Code after installing Git. The two installs need to happen in that order for VS Code to detect it.

## Creating a GitHub account and a demo repository

If you don't already have one, create a free account at [github.com](https://github.com/). Use an email address you'll still control after you graduate, not a college address that expires.

Once signed in, create a new repository to practice with today:

1. Click the **+** icon in the top right of any GitHub page, then **New repository**.
2. Name it something like `git-practice`.
3. Leave it **Public**, and check **Add a README file**.
4. Click **Create repository**.

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
github.com/your-username/git-practice, a new repository containing one file, README.md
</div>
</details>

This is now a real, live **repository**, a project folder that Git tracks and GitHub hosts. Everything you build this semester follows this same pattern: one repository per assignment.

## Cloning the repository in VS Code

Cloning downloads a copy of a GitHub repository onto your computer, while keeping it linked to the original online. Do this once, per repository.

1. On your repository's GitHub page, click the green **Code** button and copy the URL shown (it ends in `.git`).
2. In VS Code, open the Command Palette and run **Git: Clone**.
3. Paste the URL when prompted, and press Enter.
4. Choose a folder on your computer to save it in, such as a `projects` folder you create for this course.
5. When VS Code asks, click **Open** to open the cloned folder.

You now have a local, working copy of the repository, connected to GitHub. This is a one-time step per repository, not something you repeat every class.

## Staging, committing, and pushing

This is the workflow you'll repeat constantly this semester: make a change, save it locally as a **commit**, then **push** it up to GitHub. All three steps happen in VS Code's Source Control view.

Make a small change first, to have something to commit. Open `README.md` in your cloned folder and add a line of text, then save the file.

Open the Source Control view (the icon in the Activity Bar, or `Ctrl+Shift+G`). Your changed file appears under **Changes**.

1. Hover over the file and click the **+** that appears, to stage it. Staging marks a change as ready to be committed.
2. Type a short message describing the change in the message box at the top, for example "Update README," and press `Ctrl+Enter` (or click the checkmark) to commit.
3. Click **Sync Changes** (or the **...** menu → **Push**) to send your commit up to GitHub.

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
Source Control panel: Changes (0), 1 commit ready to sync. Click Sync Changes to push.
</div>
</details>

### The first time you push: signing in

The first time you push, VS Code needs to confirm it's really you. A browser tab opens automatically, asking you to authorize VS Code to access your GitHub account. Click **Authorize**, and the tab can be closed once it confirms success.

You will not be asked to do this again on this computer. VS Code remembers this sign-in for every future push and pull, the same way a browser stays signed in to a website you use regularly.

Refresh the repository's page on GitHub. Your change is now live there, exactly as you wrote it.

## GitHub 101: the concepts behind the clicks

You've now done the whole workflow once. Here's what each piece actually is, so the steps above make sense as concepts, not just a sequence to memorize.

**Git** is version control software that runs on your computer. It tracks every change you commit, so you can see the full history of a project and, if needed, go back to any earlier point. Git works entirely on your machine and doesn't need the internet.

**GitHub** is a website that hosts Git repositories online. It's where your code lives so it can be shared, backed up, and, in this course, graded from a link. Git and GitHub are related but distinct: Git is the tool, GitHub is one place (among several) that hosts what Git tracks.

**A repository** (or "repo") is a project folder that Git is tracking. Every assignment this semester is its own repository.

**GitHub Pages** is a free feature of GitHub that takes the files in a repository and publishes them as a real, live website, at a URL like `your-username.github.io/repository-name`. It's how every project you submit this semester becomes something you can actually visit in a browser, not just a folder of files. You'll enable it on your first real assignment repository, and the steps are identical to what you just practiced: push a commit, and the live site updates automatically within a minute or two.

## Keep learning

- [GitHub Docs: Hello World](https://docs.github.com/en/get-started/quickstart/hello-world). GitHub's own walkthrough of creating a repository and making your first commit, a good page to revisit if any step above felt rushed.
- [VS Code Docs: Source Control Overview](https://code.visualstudio.com/docs/sourcecontrol/overview). The full reference for everything the Source Control panel can do, beyond the stage/commit/push workflow covered here.
- [pages.github.com](https://pages.github.com/). GitHub's own short introduction to what Pages is and how it works.
- [Video: Git and GitHub Tutorial for Beginners, by Kevin Stratvert](https://www.youtube.com/watch?v=tRZGeaHPoaw). A clear, beginner-paced walkthrough covering the same core workflow from today's class.

## Before next class

Confirm your setup works end to end: clone your practice repository (or a fresh one) on your own, make any small change, and push it, without following the steps above. If you get stuck at any point, note exactly where, that's exactly the kind of thing worth asking about at the start of next class, before we build on top of this foundation.
