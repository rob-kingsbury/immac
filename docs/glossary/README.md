---
title: Glossary
---

# Glossary

A quick-reference list of terms used across both MTM1511 and MTM1544, in plain language. Each entry links back to the week that actually teaches it, so use this page to jog your memory, not to learn a term for the first time. Anything not fully explained here has a fuller treatment at the linked chapter.

## A

**Absolute path.** A full web address, starting with the protocol, `https://`. Used to link to another website. See [File Paths](/modules/web-basics/file-paths/README.md).

**Alt text.** The `alt` attribute on an `<img>`, describing what the image shows. Read aloud by screen readers, shown if the image fails to load, and read by search engines. See [HTML Images](/modules/html/html-images/README.md).

**<abbr title="Accessible Rich Internet Applications">ARIA</abbr>.** Accessible Rich Internet Applications, a set of attributes that add accessibility information <abbr title="HyperText Markup Language">HTML</abbr> alone can't provide. Use only when a native HTML element can't do the job. See [ARIA](/modules/accessibility/aria/README.md).

**Attribute.** Extra information carried inside an opening tag, written as `name="value"`, such as `href` on an `<a>`. See [HTML Basics](/modules/html/html-basics/README.md).

**Attribute selector.** A <abbr title="Cascading Style Sheets">CSS</abbr> selector that targets elements by an attribute's value, such as `[href^="https"]`. See [The <abbr title="Document Object Model">DOM</abbr> and CSS Targeting](/modules/css/dom-css-targeting.md).

## B

**Baseline.** A web-standards designation meaning a feature is well supported across current browsers and safe to rely on. Referenced throughout MTM1544 whenever a newer CSS feature is introduced.

**Box model.** The four layers around any element's content: content, padding, border, and margin. See [The Box Model and Spacing](/modules/css/box-model-spacing.md).

**Branch.** A parallel copy of a Git repository's history you can commit to without touching `main`. See [Working Like a Team](/modules/git/github-collaboration/README.md).

**Breakpoint.** A viewport width at which a responsive layout changes. Chosen from where your own content starts to look wrong, not from a list of devices. See [Responsive Design and Media Queries](/modules/css/responsive-media-queries.md).

## C

**Cascade.** The set of tie-breakers, in order, a browser uses when more than one CSS rule could apply to the same element: origin and importance, then specificity, then source order. See [Selectors, Specificity, and Inheritance](/modules/css/selectors-specificity-inheritance.md).

**Class.** A label you assign to any elements you choose, using the `class` attribute, then target in CSS with a dot in front of the name (`.intro`). See [Introduction to CSS](/modules/css/intro-to-css.md).

**Client.** The machine making a web request, in this course your browser. See [How the Web Works](/modules/web-basics/how-the-web-works/README.md).

**CLS (Cumulative Layout Shift).** A Core Web Vital measuring how much a page's content jumps around as it loads. Prevented by setting `width` and `height` on images. See [HTML Images](/modules/html/html-images/README.md).

**Combinator.** A symbol that selects elements by their relationship to another element: descendant (a space), child (`>`), or adjacent sibling (`+`). See [The DOM and CSS Targeting](/modules/css/dom-css-targeting.md).

**Commit.** A permanent, named snapshot of staged changes, saved to your local Git repository. Distinct from pushing, which sends commits to GitHub. See [Staging, Committing, and Pushing](/modules/git/git-basics/staging-committing-pushing.md).

**Container query.** A CSS rule that responds to the size of a component's own container, not the browser viewport. See [Responsive Design and Media Queries](/modules/css/responsive-media-queries.md).

**Containing block.** The ancestor element an absolutely positioned element measures its `top`/`right`/`bottom`/`left` values against: the nearest ancestor with a `position` other than `static`. See [CSS Grid Layouts](/modules/css/grid-layouts.md).

**Custom property.** A named, reusable CSS value, declared with `--name: value` and read with `var(--name)`. See [CSS Custom Properties and Variables](/modules/css/custom-properties.md).

## D

**Declaration.** One property-and-value pair inside a CSS rule, such as `color: red;`. See [Introduction to CSS](/modules/css/intro-to-css.md).

**<abbr title="Domain Name System">DNS</abbr> (Domain Name System).** The lookup service that turns a human-readable domain into the numeric address a browser connects to. See [How the Web Works](/modules/web-basics/how-the-web-works/README.md).

**DOM (Document Object Model).** The live, in-memory tree structure a browser builds from your HTML, and what developer tools' Elements panel actually shows. See [The DOM and CSS Targeting](/modules/css/dom-css-targeting.md).

## E

**Element.** The smallest unit of HTML, usually an opening tag, content, and a closing tag. See [HTML Basics](/modules/html/html-basics/README.md).

**Element selector.** A CSS selector that targets every element of a given tag name, such as `p`. See [Introduction to CSS](/modules/css/intro-to-css.md).

## F

**Fixed positioning.** `position: fixed`, which measures from the browser window and stays in place when the page scrolls. See [CSS Grid Layouts](/modules/css/grid-layouts.md).

**Flexbox.** A one-dimensional CSS layout system for arranging items in a row or a column. See [Flexbox Layouts](/modules/css/flexbox-layouts.md).

**`fr` unit.** A Grid-specific unit meaning "a fraction of the leftover space" in a grid container. See [CSS Grid Layouts](/modules/css/grid-layouts.md).

## G

**<abbr title="HTTP method for retrieving data">GET</abbr>.** An <abbr title="Hypertext Transfer Protocol">HTTP</abbr> method that appends form data to the <abbr title="Uniform Resource Locator">URL</abbr> as a query string. Correct for anything that only retrieves or filters information. See [HTML Form](/modules/html/html-form/README.md).

**Git.** Version control software that runs on your own computer, tracking every committed change. See [Git, GitHub, and Pages in Plain Terms](/modules/git/git-basics/git-github-pages-in-plain-terms.md).

**GitHub.** A website that hosts Git repositories online, where this course's work is shared and graded from a link. See [Git, GitHub, and Pages in Plain Terms](/modules/git/git-basics/git-github-pages-in-plain-terms.md).

**GitHub Pages.** A free GitHub feature that publishes a repository's files as a live website. See [GitHub Pages](/modules/git/github-pages/README.md).

## H

**Heading hierarchy.** The logical order of `<h1>` through `<h6>` elements on a page, with no skipped levels, which screen reader users navigate by. See [HTML Headings](/modules/html/html-headings/README.md).

**<abbr title="Hue, Saturation, Lightness">HSL</abbr>.** A colour notation of hue, saturation, and lightness, useful for building a palette of related colours by hand. See [Typography and Colour](/modules/css/typography-colour.md).

**HTML.** HyperText Markup Language, which describes a page's structure and meaning, not its appearance. See [HTML Basics](/modules/html/html-basics/README.md).

**HTTP / <abbr title="Hypertext Transfer Protocol Secure">HTTPS</abbr>.** The protocol a browser and server use to communicate; HTTPS is the encrypted version. See [How the Web Works](/modules/web-basics/how-the-web-works/README.md).

## I

**ID.** A label meant to identify one single, unique element on a page, targeted in CSS with a hash (`#lead`). See [Introduction to CSS](/modules/css/intro-to-css.md).

**Implicit grid.** Grid rows or columns the browser creates automatically when there are more items than explicitly defined space. See [CSS Grid Layouts](/modules/css/grid-layouts.md).

**Inheritance.** The automatic passing of certain CSS properties, mostly text-related ones, from a parent element to its children. See [Selectors, Specificity, and Inheritance](/modules/css/selectors-specificity-inheritance.md).

## J

**<abbr title="JSON for Linking Data">JSON-LD</abbr>.** The current recommended format for structured data, a block of machine-readable facts about a page placed in the document head. See [<abbr title="Search Engine Optimization">SEO</abbr> in Practice](/modules/seo/seo-in-practice.md).

## L

**LCP (Largest Contentful Paint).** A Core Web Vital measuring how long the largest visible element takes to appear. See [Optimizing Images and Media](/modules/html/image-optimization/README.md).

**Landmark region.** A semantic element like `<header>`, `<nav>`, `<main>`, or `<footer>` that a screen reader user can jump to directly. See [Semantic HTML](/modules/html/html-semantics/README.md).

## M

**Media query.** A CSS rule wrapped in a condition based on the viewport, most often its width. See [Responsive Design and Media Queries](/modules/css/responsive-media-queries.md).

**Mobile-first.** Writing the narrow-screen layout as your CSS base, then adding complexity upward with `min-width` queries. See [Responsive Design and Media Queries](/modules/css/responsive-media-queries.md).

## N

**Nesting (CSS).** Writing one CSS rule inside another, using `&` to refer to the parent selector. See [CSS Custom Properties and Variables](/modules/css/custom-properties.md).

## O

**oklch().** A newer colour function where equal steps in lightness look like equal steps to the human eye, unlike HSL. See [Typography and Colour](/modules/css/typography-colour.md).

**Open Graph.** A vocabulary of `<meta>` tags controlling how a page appears as a preview card when shared on social platforms. See [SEO in Practice](/modules/seo/seo-in-practice.md).

## P

**Positioning context.** See containing block.

**<abbr title="HTTP method for submitting data">POST</abbr>.** An HTTP method that sends form data in the request body, used for anything that changes something or carries sensitive data. See [HTML Form](/modules/html/html-form/README.md).

**Protocol.** An agreed set of rules for how two machines communicate, such as HTTP. See [How the Web Works](/modules/web-basics/how-the-web-works/README.md).

**Pseudo-class.** A CSS selector that targets an element by its state, such as `:hover` or `:focus`. See [Selectors, Specificity, and Inheritance](/modules/css/selectors-specificity-inheritance.md).

**Pseudo-element.** A CSS selector that targets part of an element or inserts generated content, written with two colons, such as `::before`. See [Selectors, Specificity, and Inheritance](/modules/css/selectors-specificity-inheritance.md).

**Pull request.** A request on GitHub to merge one branch into another, giving a reviewer a dedicated screen to read the change before it lands. See [Working Like a Team](/modules/git/github-collaboration/README.md).

**Push.** The Git action that sends local commits to a remote repository like GitHub. See [Staging, Committing, and Pushing](/modules/git/git-basics/staging-committing-pushing.md).

## R

**Relative path.** A link written relative to the current page's location, used to link between your own site's pages. See [File Paths](/modules/web-basics/file-paths/README.md).

**Repository.** A project folder that Git is tracking, one per assignment in this course. See [Creating a GitHub Account and a Demo Repository](/modules/git/github-basics/README.md).

**Responsive design.** The practice of building one page that works well across every screen size, rather than separate sites per device. See [Responsive Design and Media Queries](/modules/css/responsive-media-queries.md).

## S

**Selector.** The part of a CSS rule that decides which elements the rule applies to. See [Introduction to CSS](/modules/css/intro-to-css.md).

**Semantic HTML.** Using elements for what their content actually is, rather than a generic `<div>` for everything. See [Semantic HTML](/modules/html/html-semantics/README.md).

**Server.** A machine that stores a website's files and sends them out when a client requests them. See [How the Web Works](/modules/web-basics/how-the-web-works/README.md).

**Skip link.** A hidden-until-focused link, first in the page, that jumps a keyboard user straight to the main content. See [Skip Navigation](/modules/accessibility/skip-navigation/README.md).

**Specificity.** The calculated score (IDs, then classes, then elements) a browser uses to decide which of two conflicting, equally-recent CSS rules wins. See [Selectors, Specificity, and Inheritance](/modules/css/selectors-specificity-inheritance.md).

**Sticky positioning.** `position: sticky`, which acts like normal flow until a scroll threshold, then locks in place. See [CSS Grid Layouts](/modules/css/grid-layouts.md).

**Structured data.** Machine-readable facts about a page's content, written in a vocabulary search engines understand. See [SEO in Practice](/modules/seo/seo-in-practice.md).

**Subgrid.** A nested grid that reuses its parent grid's track sizing instead of inventing its own, used to align independent cards' internal content. See [CSS Grid Layouts](/modules/css/grid-layouts.md).

## T

**Type selector.** See element selector.

## U

**URL.** The full address of a resource, made up of a protocol, a domain, and a path. See [How the Web Works](/modules/web-basics/how-the-web-works/README.md).

## V

**Viewport.** The visible area of a web page inside the browser window. See [Responsive Design and Media Queries](/modules/css/responsive-media-queries.md).

**Viewport units.** `vw`/`vh` and their dynamic variants `dvh`/`svh`/`lvh`, which size an element relative to the browser's viewport rather than a parent. See [Responsive Design and Media Queries](/modules/css/responsive-media-queries.md).

## W

**<abbr title="Web Content Accessibility Guidelines">WCAG</abbr>.** The Web Content Accessibility Guidelines, the international standard for accessible web content, built on the <abbr title="Perceivable, Operable, Understandable, Robust">POUR</abbr> principles (Perceivable, Operable, Understandable, Robust). See [WCAG](/modules/accessibility/wcag/README.md).

**Web font.** A typeface downloaded along with the page, rather than relying on a font already installed on the visitor's machine. See [Typography and Colour](/modules/css/typography-colour.md).

## Z

**z-index.** A CSS property that decides which element sits on top when two positioned elements overlap. Only works on an element with a `position` other than `static`. See [CSS Grid Layouts](/modules/css/grid-layouts.md).
