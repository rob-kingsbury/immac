---
title: Canonical Links and URL Structure
prerequisites:
  - seo/seo-meta-tags
  - web-basics/file-folder-names
---

# Canonical Links and URL Structure

## Canonical links

Sometimes the same content is reachable at more than one URL. A site might serve the same page with and without a trailing slash, or with tracking parameters appended, or under two different paths. A canonical link tells search engines which URL is the official one, so they don't split ranking signals across duplicates or treat the repetition as a problem.

```html
<link rel="canonical" href="https://example.com/classes/sourdough">
```

For a simple site where each page has one address, this is straightforward: each page's canonical points to itself. That's called a self-referencing canonical, and including it is a cheap habit that prevents a category of problem before it starts. It matters much more on large sites, but knowing the tag exists and what it solves is part of understanding how search engines see your URLs.

### Going deeper: URL structure as a signal

*Optional, about 6 minutes.*

[File and Folder Names](/modules/web-basics/file-folder-names/README.md) already covered file naming in the context of relative paths breaking: keep names lowercase and consistent, because most servers treat `About.html` and `about.html` as two different files. That same habit turns out to matter for search too, and the same module gave you the other half of it, a folder structure that mirrors your site map so a URL like `menu/drinks.html` tells you exactly where the file lives before you open it.

A URL is metadata a searcher sees before they ever click. It shows in the results list under your title, and it shows in the browser's address bar for as long as someone stays on the page.

```text
https://cornerbakeryottawa.com/menu/drinks.html
```

That tells a person, and a search engine, what the page is about before either one reads a word of content. Compare it with:

```text
https://cornerbakeryottawa.com/index.php?page_id=17&cat=3a5f
```

Same hypothetical page, no information in the address at all. Nobody can guess what that page holds, and a search engine has only the words on the page itself to go on, none of the free signal the first version gives away for nothing.

Two conventions make a URL work in your favour, and you've effectively already been following one of them without the SEO framing. Use hyphens to separate words, not underscores:

```text
sourdough-class.html   reads as: sourdough class
sourdough_class.html   reads as: sourdoughclass
```

Search engines read a hyphen as a word break and an underscore as a character that glues two words into one, which is backwards from what you want when the words are the whole point. And keep the whole thing lowercase, for the same case-sensitivity reason [File and Folder Names](/modules/web-basics/file-folder-names/README.md) already gave you.

None of this asks you to do extra work. It asks you to keep doing the file naming and folder planning you already learned, and to notice that the same discipline that keeps your own links from breaking is also the discipline that makes a URL a small, free piece of SEO.

## Common mistakes to avoid

- **A canonical pointing at the wrong URL.** A canonical that points somewhere else tells the search engine to rank that other page instead of yours, which is worse than having no canonical at all.
- **Underscores or mixed case in a URL.** `Sourdough_Class.html` reads as one glued word to a search engine, and can 404 on a case-sensitive server besides.

## The checklist

Run this over your project before you move on:

- A self-referencing canonical link is present on every page
- URLs are short, descriptive, hyphenated, and lowercase

## Keep learning

- [Google Search Central: URL structure](https://developers.google.com/search/docs/crawling-indexing/url-structure). The source behind this module's hyphens-over-underscores and lowercase guidance.
