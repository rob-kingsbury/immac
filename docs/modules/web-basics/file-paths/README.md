---
title: File Paths
prerequisites:
  - html/html-anchors
---

# File Paths

## Absolute versus relative paths

Where a link points depends on the kind of path you give it, and this is one of the most common places beginners get stuck.

An absolute path is the full address, starting with the protocol. Use it to link to another website:

```html
<a href="https://developer.mozilla.org">MDN Web Docs</a>
```

A relative path points to a file in relation to the current page. Use it to link between pages of your own site:

```html
<!-- A file in the same folder -->
<a href="about.html">About</a>

<!-- A file in a subfolder -->
<a href="pages/contact.html">Contact</a>

<!-- Go up one folder, then into another -->
<a href="../index.html">Home</a>
```

`../` means "go up one level." This is exactly why consistent, lowercase, no-spaces file naming matters, a topic [File and Folder Names](/modules/web-basics/file-folder-names/README.md) covers in full. A link to `About.html` will break on a web server if the file is actually named `about.html`, even though it worked on your own computer, since most servers treat file names as case-sensitive.

The part that trips people up is that a relative path is read from the file doing the linking, not from some fixed starting point for the whole site. The same destination file gets written differently depending on where the link lives.

<div class="diagram">
<svg viewBox="0 0 640 250" role="img" aria-label="A small file structure and two links written from different files. The structure has a project folder containing index.html and about.html directly, and a pages subfolder containing contact.html. A link written inside index.html pointing to about.html, a file in the same folder, is just the filename: about.html. A link written inside index.html pointing to contact.html, a file inside the pages subfolder, includes that folder: pages slash contact.html. A link written inside contact.html pointing back to index.html has to step up out of the pages folder first, so it reads dot dot slash index.html. Three links, three different paths, because each one is written from a different starting file.">
  <text x="10" y="18" class="d-lbl">The file structure</text>
  <rect x="10" y="30" width="290" height="205" rx="8" class="d-surface d-border" stroke-width="1.5"/>
  <text x="26" y="58" class="d-lbl-muted">project/</text>
  <text x="34" y="86" class="d-lbl-mono">├─ about.html</text>
  <text x="34" y="112" class="d-lbl-mono">├─ index.html</text>
  <text x="34" y="138" class="d-lbl-muted">└─ pages/</text>
  <text x="54" y="164" class="d-lbl-mono">└─ contact.html</text>
  <text x="155" y="205" text-anchor="middle" class="d-lbl-muted">two files, one subfolder</text>

  <text x="340" y="18" class="d-lbl">Reading the paths</text>
  <rect x="340" y="30" width="290" height="205" rx="8" class="d-surface d-border" stroke-width="1.5"/>

  <text x="356" y="50" class="d-lbl-muted">from index.html to about.html</text>
  <rect x="356" y="58" width="180" height="24" rx="4" class="d-accent-soft d-accent-stroke" stroke-width="1.5"/>
  <text x="366" y="74" class="d-lbl-mono">about.html</text>

  <text x="356" y="102" class="d-lbl-muted">from index.html to contact.html</text>
  <rect x="356" y="110" width="230" height="24" rx="4" class="d-accent-soft d-accent-stroke" stroke-width="1.5"/>
  <text x="366" y="126" class="d-lbl-mono">pages/contact.html</text>

  <text x="356" y="154" class="d-lbl-muted">from contact.html to index.html</text>
  <rect x="356" y="162" width="180" height="24" rx="4" class="d-accent-soft d-accent-stroke" stroke-width="1.5"/>
  <text x="366" y="178" class="d-lbl-mono">../index.html</text>

  <text x="485" y="205" text-anchor="middle" class="d-lbl-muted">../ steps up before going back down</text>
</svg>
<figcaption>Three links to the same two destinations, each written differently. A relative path is written from the file doing the linking, not from the project's root folder.</figcaption>
</div>

## The checklist

Run this over your page before you move on:

- Absolute paths point to other sites, relative paths point to your own pages
- A relative path is written from the file doing the linking, not from the project's root folder
- Every path matches the real file name and case, since a working local link can still 404 once deployed

## Keep learning

- [MDN: File paths](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/File_paths). A fuller reference on absolute and relative paths, including query strings and fragments.
