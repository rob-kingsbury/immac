---
title: File and Folder Names
prerequisites:
  - web-basics/file-paths
---

# File and Folder Names

*This module is a partial deposit: it covers naming files and folders. A later pass adds mirroring your file structure to your site map.*

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

## The checklist

Run this over your project before you consider it finished:

- File and folder names follow the lowercase, hyphenated, descriptive standard
- Every link's path matches the real file name and case exactly

## Keep learning

- [GitHub Pages documentation](https://docs.github.com/en/pages). Confirms the Linux, case-sensitive hosting behaviour this module warns about.
