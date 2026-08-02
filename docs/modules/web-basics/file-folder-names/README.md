---
title: File and Folder Names
prerequisites:
  - web-basics/file-paths
  - web-basics/site-maps
---

# File and Folder Names

## File and folder naming standards

Naming rules that feel optional on a three-file project become non-negotiable once a project has thirty. The standards:

| Rule | Wrong | Right |
|---|---|---|
| Lowercase only | `About.html` | `about.html` |
| Hyphens, never spaces | `contact us.html` | `contact-us.html` |
| Descriptive names | `page2.html` | `services.html` |
| Sensible folders | everything in one folder | `images/`, `css/`, `js/` |

Lowercase matters because servers can treat `About.html` and `about.html` as two different files, so a link that works on your own computer can break the moment the site is deployed. Hyphens instead of spaces matter because a space in a URL becomes the messy `%20` code. Descriptive names and sensible folders don't change how a page looks, but they change whether a project is workable once it has real size to it.

The failure is easy to reproduce and easy to miss on your own machine, because most desktop operating systems ignore case in filenames by default, so a mismatched link still opens locally without complaint. GitHub Pages is not forgiving in the same way. It runs on Linux, where `About.html` and `about.html` are genuinely two different files, so a link written against the wrong case works everywhere you tested it and fails the moment it goes live:

```html
<!-- Written when the file was actually saved as About.html -->
<a href="About.html">About us</a>
```

```text
Local machine: page loads, the mismatched case is ignored.
GitHub Pages (Linux): 404, because about.html and About.html are different files.
```

Rename the file to lowercase, update every link that points to it, and the mismatch is gone for good. This is exactly the kind of bug that costs you fifteen minutes right before a deadline if you build the naming habit late instead of early.

## Mirroring your file structure to your site map

A [site map](/modules/web-basics/site-maps/README.md) is a planning tool, but it also doubles as a specification for your folder structure, if you let it.

Take a bakery site map:

```text
Home
├── About
├── Menu
│   ├── Food
│   └── Drinks
└── Contact
```

A folder structure that mirrors it exactly looks like this:

```text
/
├── index.html
├── about.html
├── menu/
│   ├── food.html
│   └── drinks.html
└── contact.html
```

Every branch in the tree became either a file or a folder at the same depth. "Menu" is a section with two pages under it, so it became a folder, `menu/`, holding `food.html` and `drinks.html`. A page with nothing nested under it, like About or Contact, is just a file at the top level.

This isn't a rule GitHub Pages enforces. Nothing stops you from putting every file in one folder with names like `menu-food.html`. But when the folder structure matches the site map, the relative path from anywhere in the project matches the branch you already drew, which is one less thing to hold in your head:

```html
<!-- Written from a page inside /menu/, linking back to the home page -->
<a href="../index.html">Home</a>

<!-- Written from the home page, linking into the Menu section -->
<a href="menu/drinks.html">Drinks</a>
```

Six months from now, when you or someone else opens this project cold, a folder named `menu/` containing `food.html` and `drinks.html` reads as self-documenting. A flat folder of eleven similarly named files does not. Decide your folder structure at the same time you draw your site map, not after you've already started creating files, and the two will always agree with each other.

## The checklist

Run this over your project before you consider it finished:

- File and folder names follow the lowercase, hyphenated, descriptive standard
- Every link's path matches the real file name and case exactly
- Folder structure mirrors the site map, so a relative link matches the branch it lives on

## Keep learning

- [GitHub Pages documentation](https://docs.github.com/en/pages). Confirms the Linux, case-sensitive hosting behaviour this module warns about.
