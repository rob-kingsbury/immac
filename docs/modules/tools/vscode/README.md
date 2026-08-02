---
title: Setting Up Your Development Environment
---

# Setting Up Your Development Environment

By the end of this setup, three things need to be true. Check yourself against this list as you go, not just at the very end:

1. VS Code is installed and opens.
2. `git --version` returns a real version number in a terminal.
3. A bash-style terminal is the default in VS Code.

If a step stalls or throws an error partway through, that's often a connection blip or a one-off installer hiccup, not something you did wrong. Try it once more before you assume you've broken something. If it still won't go, don't sit with it alone: flag it right away, since the rest of this setup sequence, [GitHub Basics](/modules/git/github-basics/README.md), [Git Basics](/modules/git/git-basics/README.md), and [GitHub Pages](/modules/git/github-pages/README.md), all assume this part already works.

## Installing Visual Studio Code

VS Code is the editor you'll write every line of code in this course. Download it from [code.visualstudio.com](https://code.visualstudio.com/) and run the installer with the default options. It's free, and it runs on every major desktop platform.

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

Click **Install**, then agree to the license. The download typically finishes in under ten minutes, faster on a good connection, and needs no further action once it completes. If the command instead prints a message saying the tools are already installed, that's fine too. It means a prior install already covered it.

### Confirming it worked

Use VS Code's built-in terminal rather than a separate terminal app. Open it with `` Ctrl+` ``, or from the View menu. Whichever shell it opens with for now is fine for this check, and you'll set it to Git Bash further down this page.

Check the version:

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

## Telling Git who you are

Git needs to know who you are before it will let you commit changes. Set your name and email once, globally, and every commit you ever make on this machine will be signed with them:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

Use the same email address you'll use for your GitHub account. This is a one-time setup per computer, not something you'll repeat each time.

## Installing Live Server and Live Share

Open the Extensions view in VS Code (the icon in the Activity Bar on the left, or `Ctrl+Shift+X`) and install these two extensions, both required for this course:

- **[Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)**. Right-click any HTML file and choose "Open with Live Server" to preview it in a browser, and the page automatically refreshes every time you save. You'll use this every time you build a page from here on.
- **[Live Share](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare)**. Lets you share your live coding session with an instructor or classmate for real-time help, without either of you leaving VS Code.

## Setting the default terminal

VS Code has a built-in terminal panel, and the shell it opens by default depends on the machine. This course standardizes on a **bash-style** terminal, so that every command in every module works the same way for everyone whatever they're running.

**Restart VS Code now, if you haven't already since installing Git.** VS Code only offers terminals it detected when it started, so if it's been open through the Git install above, a newly installed one won't appear yet.

Open the Command Palette from the View menu, or with `Ctrl/Cmd+Shift+P`, type "Terminal: Select Default Profile," and choose the bash option from the list. On some systems that's a profile Git installed alongside itself, on others bash or zsh is already there. The next terminal you open (`` Ctrl+` ``) will use it.

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
Command Palette lists the terminal profiles it found, with a <strong>bash</strong> option among them
</div>
</details>

If no bash option appears, close and reopen VS Code once more, this restart is the fix for almost every case.

Editor installed and Git working, [GitHub Basics](/modules/git/github-basics/README.md) is next: creating the account everything else in this sequence connects to.

## The checklist

Run this over your own machine before you move on:

- VS Code is installed and opens
- `git --version` returns a real version number in a terminal
- Git knows your name and email (`git config --global user.name` and `user.email` are set)
- A bash-style terminal is the default in VS Code

## Keep learning

- [VS Code Docs: Source Control Overview](https://code.visualstudio.com/docs/sourcecontrol/overview). The full reference for everything the Source Control panel can do, beyond the workflow covered in [Git Basics](/modules/git/git-basics/README.md).
