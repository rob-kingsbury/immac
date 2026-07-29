---
title: Working Like a Team, Branches and Pull Requests
prerequisites:
  - git/git-basics
  - git/github-basics
---

# Working Like a Team: Branches and Pull Requests

Pushing straight to `main` is the right call for a solo project where you're the only person touching the repository. It's not how a real team works, and it's worth knowing the difference now rather than meeting it for the first time on the job.

A **branch** is a parallel copy of your repository's history that you can commit to without touching `main` at all. Every command in this module is typed into a terminal, unlike the staging/commit/push workflow you've done through VS Code's Source Control panel. Branching and pull requests are commands and a GitHub screen, not buttons in that same panel, so open a terminal (Git Bash, the one you set as your default earlier) for this part. Create a branch before starting a risky change or a new feature:

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

A one-repo-per-project structure doesn't need you to branch every time, and nothing here changes that. But the habit is worth building on your own initiative at least once before you graduate: branch, commit, push the branch, open a pull request against your own `main`, and merge it yourself if nobody else is reviewing. Doing it once when nothing is at stake is exactly how you want to first encounter it, rather than on a real team, under a real deadline.

## The checklist

Run this over your workflow before you consider it finished:

- Comfortable creating a branch, pushing it, and opening a pull request against your own `main`

## Keep learning

- [GitHub Docs: About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests). The official reference for the review workflow this module introduces.
- [Video: Learning GitHub - Branches and Merges, by Steve Griffith](https://www.youtube.com/watch?v=s0qk9qutycg). A practical walkthrough of branching and merging on GitHub.
