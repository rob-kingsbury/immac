---
title: Staging, Committing, and Pushing
prerequisites:
  - git/git-basics
---

# Staging, Committing, and Pushing

This is the workflow you'll repeat constantly in this course, and it has three distinct steps that beginners often blur into one. They're not interchangeable, and understanding why each one exists is what makes the rest of this course make sense.

## The three places your work lives

Every file in a Git project passes through three places on its way to GitHub:

- **The working directory.** The actual files on your computer, exactly as you see them in VS Code. Editing and saving a file changes it here, and nowhere else, yet.
- **The staging area.** A holding pen for changes you've deliberately marked as ready to be saved permanently. Nothing goes here automatically.
- **The local repository.** Git's permanent record of every commit you've made, stored entirely on your own computer. This exists whether or not you're connected to the internet.

GitHub, the remote repository, is a fourth place entirely, and none of the first three steps touch it. That distinction is the single most important thing to understand: **committing and pushing are not the same action, and one of them doesn't involve GitHub at all.**

## Why staging is a separate step

Staging exists so you can build a commit on purpose, rather than saving every unsaved change in a folder whether it belongs together or not. If you've edited three unrelated files, staging lets you commit just one of them now, with a message that describes that one change accurately, and handle the other two separately. Without staging, "what did this commit actually do" would be a much harder question to answer later, for you or for anyone reviewing your project.

## Making your first commit

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

## Writing a good commit message

A commit message is a short, permanent label on a snapshot of your project, and a specific one is far more useful than a vague one, both to you later and to anyone else reading your project's history.

| Vague, avoid | Specific, use instead |
|---|---|
| `fix` | `Fix broken link to the contact page` |
| `update stuff` | `Add alt text to gallery images` |
| `asdf` | `Update README with setup instructions` |
| `final version` | `Correct heading order on the About page` |

Two conventions to build now, since they're standard across the whole industry, not just this course. Write the message in the imperative, present tense, "Add," "Fix," "Update," as if finishing the sentence "If applied, this commit will...", rather than "Added" or "Adding." And keep the first line short, under about 50 characters, a full sentence describing what changed, not why you're tired of looking at the file.

Commit often, in small, logical pieces. A commit that says "Add the contact form" and a separate one that says "Fix the contact form's validation" are far more useful later than a single commit that quietly did both along with four other things.

## Pushing: the step that actually reaches GitHub

Everything so far, staging and committing, happened entirely on your own computer. Your local repository now has a commit that GitHub has never seen. **Push** is the one action that sends your local commits to the remote repository:

Click **Sync Changes** (or the **...** menu, then **Push**) in the Source Control view.

<details class="demo" open>
<summary>Result</summary>
<div class="demo-render">
Source Control panel: Changes (0), Staged Changes (0), nothing pending to sync.
</div>
</details>

This is the distinction worth holding onto: you can commit many times in a row, building up local history, without ever touching GitHub. Nothing your instructor or a classmate can see changes until you push. If you finish your work locally but forget to push, GitHub still shows your old version, and so does the live link.

### The first time you push: signing in

The first time you push, VS Code needs to confirm it's really you. A browser tab opens automatically, asking you to authorize VS Code to access your GitHub account. Click **Authorize**, and the tab can be closed once it confirms success.

You will not be asked to do this again on this computer. VS Code remembers this sign-in for every future push and pull, the same way a browser stays signed in to a website you use regularly.

Refresh the repository's page on GitHub. Your change is now live there, exactly as you wrote it, because this time you pushed.

Work is on GitHub. [GitHub Pages](/modules/git/github-pages/README.md) turns that repository into an actual live website.

## The checklist

Run this over your own repository before you move on:

- Comfortable explaining the difference between the working directory, the staging area, and the local repository
- You've staged, committed, and pushed at least one change
- Commit messages are specific and written in the imperative present tense

## Keep learning

- [VS Code Docs: Source Control Overview](https://code.visualstudio.com/docs/sourcecontrol/overview). The full reference for everything the Source Control panel can do, beyond the workflow covered here.
- [Video: Git and GitHub Tutorial for Beginners, by Kevin Stratvert](https://www.youtube.com/watch?v=tRZGeaHPoaw). A clear, beginner-paced walkthrough of the same core workflow covered here.
