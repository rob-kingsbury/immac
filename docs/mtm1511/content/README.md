---
title: 'MTM1511: Weekly Content'
---

# MTM1511 Weekly Content

Every week below lists the modules to work through, in the order they are taught. A module is a single topic, and several of them are shared with MTM1544, so a link may take you somewhere that does not mention this course by name. That is deliberate. This page is the course side of it.

## Week 1: Introduction to the Web

- [How the Web Works](/modules/web-basics/how-the-web-works/README.md). Client, server, request, response: the whole exchange behind a page load.
- [HTML Basics](/modules/html/html-basics/README.md). Elements, attributes, and nesting: the vocabulary everything else in HTML is built from.
- [Setting Up Your Development Environment](/modules/tools/vscode/README.md). Installing and configuring the editor, Git, and the extensions you will actually use.
- [Creating a GitHub Account and a Demo Repository](/modules/git/github-basics/README.md). Creating an account and your first repository.
- [Git Basics](/modules/git/git-basics/README.md). Cloning a repository and working on a local copy that stays linked to the original.
- [Staging, Committing, and Pushing](/modules/git/git-basics/staging-committing-pushing.md). The three-step workflow you will repeat constantly, and why the steps are separate.
- [Publishing to GitHub Pages](/modules/git/github-pages/README.md). Turning a repository into a live website. One switch, once per repository.
- [Git, GitHub, and Pages in Plain Terms](/modules/git/git-basics/git-github-pages-in-plain-terms.md). What Git, GitHub, and Pages each actually are, explained once you have used all three.

### Exercise: publish a page end to end (about 15 minutes)

Confirm your setup works end to end, without following [Publishing to GitHub Pages](/modules/git/github-pages/README.md) as a script: clone your practice repository (or a fresh one), make any small change, push it, and confirm the Pages URL loads in a browser. This is meant to be a genuine test, so work through a snag before reaching for help. But if you're stuck for more than a few minutes, that's not a sign you're behind. Either way, note exactly which step gave you trouble, because that's worth raising before you build on top of it.

## Week 2: Core HTML Elements

- [HTML Basics](/modules/html/html-basics/README.md). Elements, attributes, and nesting: the vocabulary everything else in HTML is built from. Revisited from Week 1.
- [HTML Document Structure](/modules/html/html-document-structure/README.md). The skeleton every page starts from, doctype through body.
- [HTML Headings](/modules/html/html-headings/README.md). Six levels that describe structure, not text size.
- [HTML Text](/modules/html/html-text/README.md). Paragraphs, emphasis, and the entities for characters you cannot type directly.
- [Quotations](/modules/html/html-text/quotations.md). blockquote and q, and which one a given quote calls for.
- [HTML Lists](/modules/html/html-lists/README.md). Ordered, unordered, and description lists, chosen by what the content is.
- [Inline and Block Elements](/modules/html/html-inline-block/README.md). The two default display behaviours, and how to tell which one you are looking at.
- [HTML Comments](/modules/html/html-comments/README.md). Notes the browser ignores entirely, written for whoever reads the source next.
- [HTML Validation](/modules/html/html-validation/README.md). Checking markup against the specification rather than trusting a forgiving browser.

### Exercise: build a page from the skeleton up (about 45 minutes)

This exercise pulls together the whole group of elements that live inside the skeleton from [HTML Document Structure](/modules/html/html-document-structure/README.md): [HTML Headings](/modules/html/html-headings/README.md), [HTML Text](/modules/html/html-text/README.md), [Quotations](/modules/html/html-text/quotations.md), [HTML Lists](/modules/html/html-lists/README.md), [Inline and Block Elements](/modules/html/html-inline-block/README.md), and [HTML Comments](/modules/html/html-comments/README.md). Read those first, then work through this once.

Create a new folder in your cloned repository, add an `index.html` file, and build out the document skeleton, `<!DOCTYPE>` through `<body>`, from memory rather than copying it. Include the charset and viewport meta tags, both belong in every page you'll ever build from here on. Inside `<body>`, add one `<h1>`, at least two `<h2>` sections, a paragraph or two under each, one ordered and one unordered list, and a `<blockquote>`. Mark one or two words with `<strong>` or `<em>` where the meaning calls for it. Somewhere in your text, work in an ampersand or a copyright line and write it with the matching entity, `&amp;` or `&copy;`, instead of typing the character directly. Add a comment above each major section.

Open the page in your browser, then open developer tools and inspect your own elements. Watch how the block elements each claim a full row while the inline ones share a line. Then commit and push your change using the workflow from [Staging, Committing, and Pushing](/modules/git/git-basics/staging-committing-pushing.md), stage, commit, sync, and confirm it shows up on GitHub.

## Week 3: Links, Images, and Media

- [HTML Anchors](/modules/html/html-anchors/README.md). The link element, and the href values it will accept.
- [File Paths](/modules/web-basics/file-paths/README.md). Relative, root-relative, and absolute paths, and why links break.
- [HTML Images](/modules/html/html-images/README.md). Placing an image, and the two attributes that matter every single time.
- [Media Elements](/modules/html/media-elements/README.md). Native audio and video, with captions and a fallback.

## Week 4: Semantic HTML

- [Semantic HTML](/modules/html/html-semantics/README.md). Elements that say what content is rather than how it should look.
- [A Full Worked Example](/modules/html/html-semantics/worked-example.md). A realistic article page marked up semantically from top to bottom.
- [HTML Figure](/modules/html/html-figure/README.md). Tying an image, diagram, or code sample to its caption as one unit.

## Week 5: Site Architecture and Planning

- [Information Architecture](/modules/web-basics/information-architecture/README.md). Deciding which pages exist and how someone moves between them.
- [Site Maps](/modules/web-basics/site-maps/README.md). Drawing a site's shape as a tree, and the three-click check that keeps it shallow.
- [Translating a Plan into Structure](/modules/web-basics/site-maps/translating-to-structure.md). Turning a wireframe region into the semantic skeleton it implies.
- [File and Folder Names](/modules/web-basics/file-folder-names/README.md). Naming conventions that feel optional at three files and are not at thirty.
- [Wireframes](/modules/web-basics/wireframes/README.md). Low-detail sketches that settle arrangement before anything gets built.
- [HTML Navigation](/modules/html/html-navigation/README.md). Navigation landmarks and breadcrumbs, for a site with any depth to it.

### Exercise: plan a small site and write its skeleton (about 45 minutes)

Pick a small site you'd realistically build, three to five pages. Draw its site map as an indented list, and check it against the [three-click guideline](/modules/web-basics/site-maps/README.md). Choose one of those pages and sketch a [wireframe](/modules/web-basics/wireframes/README.md) of it, boxes and labels only, no colour or real content.

Then, without adding any real content, write the HTML skeleton for that page using semantic elements that match your wireframe regions. Name each region out loud before you type it: "this is the header, this is the main, these three repeated blocks are articles." You now have a plan and a structure ready to fill in.

If your site map has any page nested under a section rather than sitting directly off Home, add a [breadcrumb](/modules/html/html-navigation/README.md) to that page's skeleton too: a `<nav aria-label="Breadcrumb">` holding an `<ol>` that matches the branch you drew, with `aria-current="page"` marking the page you're on.

## Week 6: Web Accessibility Fundamentals

- [WCAG](/modules/accessibility/wcag/README.md). The four principles behind every accessibility guideline, and what A, AA, and AAA actually ask for.
- [ARIA](/modules/accessibility/aria/README.md). Attributes that add accessibility information when HTML alone cannot, and why they are a last resort.
- [Skip Navigation](/modules/accessibility/skip-navigation/README.md). The link that lets a keyboard user jump past the navigation straight to the content.
- [Keyboard Access](/modules/accessibility/keyboard-access/README.md). Tabbing through a page, and why a link and a button answer to different keys.
- [Colour Contrast](/modules/accessibility/colour-contrast/README.md). Measuring text against its background, and the ratios that count as readable.
- [Testing for Accessibility](/modules/accessibility/testing/README.md). The checks you can run on your own page before anyone else sees it.

## Week 7: HTML Forms and Data Structures

- [HTML Form](/modules/html/html-form/README.md). Building a form that is well structured and properly labelled.
- [Accessible Forms, in Brief](/modules/html/html-form/accessible-forms.md). Grouping related controls, and the mistakes that make a form unusable with a screen reader.
- [HTML Input](/modules/html/html-input/README.md). The input element, and a type attribute that changes both behaviour and the phone keyboard.
- [Built-in Form Validation](/modules/html/html-form-validation/README.md). Rules the browser enforces before anything is submitted, with no scripting.
- [HTML Table](/modules/html/html-table/README.md). Tabular data with real headers, and why a table is never a layout tool.

## Week 8: Reading Week

- **Reading Week**. No scheduled classes. Use the time to catch up on anything unfinished and to shore up whatever still feels shaky, because everything after this builds on the seven weeks behind it.

## Week 9: Optimizing Images and Media

- [Optimizing Images and Media](/modules/html/image-optimization/README.md). Format, compression, and dimensions, so images stop being the heaviest thing on the page.
- [Responsive Images](/modules/html/responsive-images/README.md). srcset, sizes, and picture, so the browser can choose the right file for the screen.
- [Putting It Together](/modules/html/image-optimization/putting-it-together.md). One image with every optimization technique applied at once.
- [Media Elements](/modules/html/media-elements/README.md). Native audio and video, with captions and a fallback. Revisited from Week 3.

### Exercise: watch the browser choose an image (about 45 minutes)

Take one large photograph, ideally straight off a phone, and note its file size.

Export it at three widths, roughly 400, 800, and 1600 pixels, saving each as WebP at about 80 percent quality. In Squoosh that is the Resize panel for the width, the format dropdown set to WebP, and the quality slider, then Download. Repeat three times. Write down the four file sizes together, because the comparison is the point of the exercise.

Put the three files into an `<img>` with `srcset` and `sizes`, and add `alt` plus `width` and `height`. Use the dimensions of your **largest** file for those two attributes, since all three share the same shape and the browser only needs the ratio.

Open your page and open developer tools with **F12**, or **Ctrl+Shift+I**, or **Cmd+Option+I** on a Mac. Switch to the **Network** tab, in the same row of tabs as Elements and Console. Reload the page, then use the **Img** filter button below that row to hide the CSS, font, and favicon requests so only images remain. Resize the browser window and reload at a narrow width and again at a wide one. Confirm that a different file is requested each time.

Then add a second image lower down the page with `loading="lazy"`, reload at the top, and confirm in the Network panel that it does not appear in the list until you scroll toward it.

Finally, remove the `width` and `height` from one image. In the Network panel toolbar, find the throttling dropdown, which reads **No throttling** by default and sits near the top of the panel, and set it to **Slow 4G**. Reload and watch the text below the image jump when it arrives. Put the attributes back, reload again, and watch the jump disappear.

## Week 10: SEO Fundamentals

- [SEO Basics](/modules/seo/seo-basics/README.md). How a search engine reads a page, and why good markup does most of the work.
- [SEO Meta Tags](/modules/seo/seo-meta-tags/README.md). Title and description: the tags that decide what a results list shows.
- [Canonical Links and URL Structure](/modules/seo/seo-meta-tags/canonical-and-urls.md). Telling search engines which URL is the official one when several would work.
- [SEO Content](/modules/seo/seo-content/README.md). Headings, copy, and internal links, which are what actually gets ranked.

## Week 11: SEO in Practice

- [Open Graph](/modules/seo/open-graph/README.md). The preview card that appears when someone shares your link.
- [Structured Data](/modules/seo/structured-data/README.md). Stating facts about a page in a vocabulary search engines already understand.
- [SEO Audit](/modules/seo/seo-audit/README.md). Running Lighthouse against your own site and acting on what it reports.

## Week 12: Code Quality and Validation

- [HTML Validation](/modules/html/html-validation/README.md). Checking markup against the specification rather than trusting a forgiving browser. Revisited from Week 2.
- [HTML Comments](/modules/html/html-comments/README.md). Notes the browser ignores entirely, written for whoever reads the source next. Revisited from Week 2.
- [File and Folder Names](/modules/web-basics/file-folder-names/README.md). Naming conventions that feel optional at three files and are not at thirty. Revisited from Week 5.
- [Working Like a Team, Branches and Pull Requests](/modules/git/github-collaboration/README.md). Branches and pull requests, which is how a team actually works.

## Week 13: Advanced HTML Patterns

- [HTML Iframes](/modules/html/html-iframes/README.md). Embedding something you did not build, without handing it your page.
- [HTML Details and Summary](/modules/html/html-details/README.md). An expand-and-collapse disclosure widget, built into HTML, needing no JavaScript.

## Week 14: Project Development

- **Project Development**. No new material. Class time goes to your project, with guided troubleshooting and structured peer review.

## Week 15: Project Work Lab

- **Project Work Lab**. No new material. Open lab time on your project, with your instructor on hand.

