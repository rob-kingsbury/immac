---
title: Git, GitHub, and GitHub Pages Setup
---

# Git, GitHub, and GitHub Pages Setup

Every project you submit this semester lives as a real, public website, hosted on GitHub Pages. This week sets up the entire pipeline that makes that possible: Git tracking your changes, GitHub storing them, VS Code tying it all together, and Pages publishing the result. It's a lot in one class, but it's a one-time setup. Once it works, the weekly workflow is three clicks.

## Installing Git

Git is the version control system that records every change you make to your files, and it's what connects your computer to GitHub. The install method differs by operating system, so follow whichever section matches your laptop.

### Windows

Download the installer from [git-scm.com/downloads](https://git-scm.com/downloads) and run it, accepting the default options throughout. The defaults are correct for this course. This also installs Git Bash, the terminal you'll set as your default in VS Code shortly.

### macOS

The [git-scm.com Mac page](https://git-scm.com/install/mac) lists several ways to install Git, Homebrew, MacPorts, a standalone binary, but they either require installing a separate package manager first or, in the binary installer's case, are explicitly discontinued and no longer updated. The simplest path, and the one this course uses, is **Xcode Command Line Tools**, a small developer toolkit Apple ships directly, with Git already included. Nothing extra to install first.

Open **Terminal** (search for it with Spotlight, `Cmd+Space`, then type "Terminal"), and run:

```bash
xcode-select --install
```

A system dialog appears within a few seconds, asking to confirm the install:

<div class="mock-dialog">
  <div class="mock-dialog-icon">
    <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><line x1="8" y1="9" x2="16" y2="9"/><line x1="8" y1="13" x2="14" y2="13"/></svg>
  </div>
  <div>
    <p class="mock-dialog-title">Install Command Line Developer Tools</p>
    <p class="mock-dialog-message">The xcode-select command requires the command line developer tools. Would you like to install the tools now?</p>
    <div class="mock-dialog-actions">
      <span class="mock-dialog-btn">Not Now</span>
      <span class="mock-dialog-btn mock-dialog-btn-primary">Install</span>
    </div>
  </div>
</div>

Click **Install**, then agree to the license. The download typically finishes in under ten minutes, faster on a good connection, and needs no further action once it completes. If the command instead prints a message saying the tools are already installed, that's fine too, it means a prior install (from Xcode itself, or an earlier course) already covered it.

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

## <span class="step-icon"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7 L9 7 L11 9 L21 9 L21 19 L3 19 Z"/></svg></span> Creating a GitHub account and a demo repository

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

## <span class="step-icon"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="3" x2="12" y2="15"/><polyline points="7 10 12 15 17 10"/><polyline points="4 19 4 21 20 21 20 19"/></svg></span> Cloning the repository in VS Code

Cloning downloads a copy of a GitHub repository onto your computer, while keeping it linked to the original online. Do this once, per repository.

1. On your repository's GitHub page, click the green **Code** button and copy the URL shown (it ends in `.git`).
2. In VS Code, open the Command Palette and run **Git: Clone**.
3. Paste the URL when prompted, and press Enter.
4. Choose a folder on your computer to save it in, such as a `projects` folder you create for this course.
5. When VS Code asks, click **Open** to open the cloned folder.

You now have a local, working copy of the repository, connected to GitHub. This is a one-time step per repository, not something you repeat every class.

## <span class="step-icon"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="7 12 10 15 17 8"/></svg></span> Staging, committing, and pushing

This is the workflow you'll repeat constantly this semester, and it has three distinct steps that beginners often blur into one. They're not interchangeable, and understanding why each one exists is what makes the rest of this course make sense.

### The three places your work lives

Every file in a Git project passes through three places on its way to GitHub:

- **The working directory.** The actual files on your computer, exactly as you see them in VS Code. Editing and saving a file changes it here, and nowhere else, yet.
- **The staging area.** A holding pen for changes you've deliberately marked as ready to be saved permanently. Nothing goes here automatically.
- **The local repository.** Git's permanent record of every commit you've made, stored entirely on your own computer. This exists whether or not you're connected to the internet.

GitHub, the remote repository, is a fourth place entirely, and none of the first three steps touch it. That distinction is the single most important thing to understand this week: **committing and pushing are not the same action, and one of them doesn't involve GitHub at all.**

### Why staging is a separate step

Staging exists so you can build a commit on purpose, rather than saving every unsaved change in a folder whether it belongs together or not. If you've edited three unrelated files, staging lets you commit just one of them now, with a message that describes that one change accurately, and handle the other two separately. Without staging, "what did this commit actually do" would be a much harder question to answer later, for you or for anyone reviewing your project.

### Making your first commit

Make a small change first, to have something to commit. Open `README.md` in your cloned folder and add a line of text, then save the file.

Open the Source Control view (the icon in the Activity Bar, or `Ctrl+Shift+G`). Your changed file appears under **Changes**, in the working directory, not yet staged.

1. Hover over the file and click the **+** that appears, to stage it. The file moves from **Changes** to **Staged Changes**, VS Code's visual confirmation that it's now marked ready.
2. Type a message describing the change in the message box at the top, then press `Ctrl+Enter` (or click the checkmark) to commit. This creates a permanent entry in your **local** repository. Nothing has reached GitHub yet.

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
Source Control panel: Changes (0), Staged Changes (0), 1 commit ready to sync.
</div>
</details>

### Writing a good commit message

A commit message is a short, permanent label on a snapshot of your project, and a specific one is far more useful than a vague one, both to you later and to anyone else reading your project's history.

| Vague, avoid | Specific, use instead |
|---|---|
| `fix` | `Fix broken link to the contact page` |
| `update stuff` | `Add alt text to gallery images` |
| `asdf` | `Update README with setup instructions` |
| `final version` | `Correct heading order on the About page` |

Two conventions to build now, since they're standard across the whole industry, not just this course. Write the message in the imperative, present tense, "Add," "Fix," "Update," as if finishing the sentence "If applied, this commit will...", rather than "Added" or "Adding." And keep the first line short, under about 50 characters, a full sentence describing what changed, not why you're tired of looking at the file.

Commit often, in small, logical pieces. A commit that says "Add the contact form" and a separate one that says "Fix the contact form's validation" are far more useful later than a single commit that quietly did both along with four other things.

### Pushing: the step that actually reaches GitHub

Everything so far, staging and committing, happened entirely on your own computer. Your local repository now has a commit that GitHub has never seen. **Push** is the one action that sends your local commits to the remote repository:

Click **Sync Changes** (or the **...** menu → **Push**) in the Source Control view.

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
Source Control panel: Changes (0), Staged Changes (0), nothing pending to sync.
</div>
</details>

This is the distinction worth holding onto for the rest of the semester: you can commit many times in a row, building up local history, without ever touching GitHub. Nothing your instructor or a classmate can see changes until you push. If you finish an assignment locally but forget to push, GitHub still shows your old version, and so does your submission link.

### The first time you push: signing in

The first time you push, VS Code needs to confirm it's really you. A browser tab opens automatically, asking you to authorize VS Code to access your GitHub account. Click **Authorize**, and the tab can be closed once it confirms success.

You will not be asked to do this again on this computer. VS Code remembers this sign-in for every future push and pull, the same way a browser stays signed in to a website you use regularly.

Refresh the repository's page on GitHub. Your change is now live there, exactly as you wrote it, because this time you pushed.

## <span class="step-icon"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><line x1="3" y1="12" x2="21" y2="12"/></svg></span> Publishing to GitHub Pages

Everything above, staging, committing, pushing, gets your work onto GitHub. None of it makes that work a website. Publishing is a separate, one-time switch, and it's the last piece of this week's setup.

### Why this is a per-repository setting

GitHub Pages isn't something you turn on once for the whole course. It's tied to one specific repository, and every assignment this semester lives in its own repository. That means this short setup repeats once per assignment, not once ever. It's quick once you've done it the first time, but it's easy to forget on a new repository and then wonder why the submission link doesn't load.

### Turning on Pages for this repository

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

Saving triggers a short build on GitHub's side, usually well under ten minutes. Refresh the Pages settings page and a **Visit site** link appears once it's ready. That link is a real, public URL, and it's what you submit for every assignment from here on.

You only need to repeat the toggle itself once per repository. After that, every push you make automatically republishes the live site within a minute or two, the same way pushing updated your commit history a moment ago.

## GitHub 101: the concepts behind the clicks

You've now done the whole workflow once. Here's what each piece actually is, so the steps above make sense as concepts, not just a sequence to memorize.

**Git** is version control software that runs on your computer. It tracks every change you commit, so you can see the full history of a project and, if needed, go back to any earlier point. Git works entirely on your machine and doesn't need the internet.

**GitHub** is a website that hosts Git repositories online. It's where your code lives so it can be shared, backed up, and, in this course, graded from a link. Git and GitHub are related but distinct: Git is the tool, GitHub is one place (among several) that hosts what Git tracks.

**A repository** (or "repo") is a project folder that Git is tracking. Every assignment this semester is its own repository.

**GitHub Pages** is a free feature of GitHub that takes the files in a repository and publishes them as a real, live website, at a URL like `your-username.github.io/repository-name`. It's how every project you submit this semester becomes something you can actually visit in a browser, not just a folder of files. You turned it on above for your practice repository. Every assignment repository needs that same one-time switch, covered in Publishing to GitHub Pages.

## Keep learning

- [GitHub Docs: Hello World](https://docs.github.com/en/get-started/quickstart/hello-world). GitHub's own walkthrough of creating a repository and making your first commit, a good page to revisit if any step above felt rushed.
- [VS Code Docs: Source Control Overview](https://code.visualstudio.com/docs/sourcecontrol/overview). The full reference for everything the Source Control panel can do, beyond the stage/commit/push workflow covered here.
- [pages.github.com](https://pages.github.com/). GitHub's own short introduction to what Pages is and how it works.
- [Video: Git and GitHub Tutorial for Beginners, by Kevin Stratvert](https://www.youtube.com/watch?v=tRZGeaHPoaw). A clear, beginner-paced walkthrough covering the same core workflow from today's class.

## Before next class

Confirm your setup works end to end: clone your practice repository (or a fresh one) on your own, make any small change, push it, and confirm Pages is turned on with the live URL loading in a browser, all without following the steps above. If you get stuck at any point, note exactly where, that's exactly the kind of thing worth asking about at the start of next class, before we build on top of this foundation.
