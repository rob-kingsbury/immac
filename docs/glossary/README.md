---
title: Glossary
---

# Glossary

A quick-reference list of terms used across both MTM1511 and MTM1544, in plain language. Each entry links back to the week that actually teaches it, so use this page to jog your memory, not to learn a term for the first time. Anything not fully explained here has a fuller treatment at the linked chapter.

## A

**Absolute path.** A full web address, starting with the protocol, `https://`. Used to link to another website. See [Links, Images, and Media](/modules/html/links-images-media.md).

**Alt text.** The `alt` attribute on an `<img>`, describing what the image shows. Read aloud by screen readers, shown if the image fails to load, and read by search engines. See [Links, Images, and Media](/modules/html/links-images-media.md).

**ARIA.** Accessible Rich Internet Applications, a set of attributes that add accessibility information HTML alone can't provide. Use only when a native HTML element can't do the job. See [Web Accessibility Fundamentals](/modules/accessibility/web-accessibility-fundamentals.md).

**Attribute.** Extra information carried inside an opening tag, written as `name="value"`, such as `href` on an `<a>`. See [Introduction to the Web](/modules/welcome/introduction-to-the-web.md).

**Attribute selector.** A CSS selector that targets elements by an attribute's value, such as `[href^="https"]`. See [The DOM and CSS Targeting](/modules/css/dom-css-targeting.md).

## B

**Baseline.** A web-standards designation meaning a feature is well supported across current browsers and safe to rely on. Referenced throughout MTM1544 whenever a newer CSS feature is introduced.

**Box model.** The four layers around any element's content: content, padding, border, and margin. See [The Box Model and Spacing](/modules/css/box-model-spacing.md).

**Branch.** A parallel copy of a Git repository's history you can commit to without touching `main`. See [Code Quality and Validation](/modules/html/code-quality-validation.md).

**Breakpoint.** A viewport width at which a responsive layout changes. Chosen from where your own content starts to look wrong, not from a list of devices. See [Responsive Design and Media Queries](/modules/css/responsive-media-queries.md).

## C

**Cascade.** The set of tie-breakers, in order, a browser uses when more than one CSS rule could apply to the same element: origin and importance, then specificity, then source order. See [Selectors, Specificity, and Inheritance](/modules/css/selectors-specificity-inheritance.md).

**Class.** A label you assign to any elements you choose, using the `class` attribute, then target in CSS with a dot in front of the name (`.intro`). See [Introduction to CSS](/modules/css/intro-to-css.md).

**Client.** The machine making a web request, in this course your browser. See [Introduction to the Web](/modules/welcome/introduction-to-the-web.md).

**CLS (Cumulative Layout Shift).** A Core Web Vital measuring how much a page's content jumps around as it loads. Prevented by setting `width` and `height` on images. See [Links, Images, and Media](/modules/html/links-images-media.md).

**Combinator.** A symbol that selects elements by their relationship to another element: descendant (a space), child (`>`), or adjacent sibling (`+`). See [The DOM and CSS Targeting](/modules/css/dom-css-targeting.md).

**Commit.** A permanent, named snapshot of staged changes, saved to your local Git repository. Distinct from pushing, which sends commits to GitHub. See [Introduction to the Web](/modules/welcome/introduction-to-the-web.md).

**Container query.** A CSS rule that responds to the size of a component's own container, not the browser viewport. See [Responsive Design and Media Queries](/modules/css/responsive-media-queries.md).

**Containing block.** The ancestor element an absolutely positioned element measures its `top`/`right`/`bottom`/`left` values against: the nearest ancestor with a `position` other than `static`. See [CSS Grid Layouts](/modules/css/grid-layouts.md).

**Custom property.** A named, reusable CSS value, declared with `--name: value` and read with `var(--name)`. See [CSS Custom Properties and Variables](/modules/css/custom-properties.md).

## D

**Declaration.** One property-and-value pair inside a CSS rule, such as `color: red;`. See [Introduction to CSS](/modules/css/intro-to-css.md).

**DNS (Domain Name System).** The lookup service that turns a human-readable domain into the numeric address a browser connects to. See [Introduction to the Web](/modules/welcome/introduction-to-the-web.md).

**DOM (Document Object Model).** The live, in-memory tree structure a browser builds from your HTML, and what developer tools' Elements panel actually shows. See [The DOM and CSS Targeting](/modules/css/dom-css-targeting.md).

## E

**Element.** The smallest unit of HTML, usually an opening tag, content, and a closing tag. See [Introduction to the Web](/modules/welcome/introduction-to-the-web.md).

**Element selector.** A CSS selector that targets every element of a given tag name, such as `p`. See [Introduction to CSS](/modules/css/intro-to-css.md).

## F

**Fixed positioning.** `position: fixed`, which measures from the browser window and stays in place when the page scrolls. See [CSS Grid Layouts](/modules/css/grid-layouts.md).

**Flexbox.** A one-dimensional CSS layout system for arranging items in a row or a column. See [Flexbox Layouts](/modules/css/flexbox-layouts.md).

**`fr` unit.** A Grid-specific unit meaning "a fraction of the leftover space" in a grid container. See [CSS Grid Layouts](/modules/css/grid-layouts.md).

## G

**GET.** An HTTP method that appends form data to the URL as a query string. Correct for anything that only retrieves or filters information. See [HTML Forms and Data Structures](/modules/html/html-forms.md).

**Git.** Version control software that runs on your own computer, tracking every committed change. See [Introduction to the Web](/modules/welcome/introduction-to-the-web.md).

**GitHub.** A website that hosts Git repositories online, where this course's work is shared and graded from a link. See [Introduction to the Web](/modules/welcome/introduction-to-the-web.md).

**GitHub Pages.** A free GitHub feature that publishes a repository's files as a live website. See [Introduction to the Web](/modules/welcome/introduction-to-the-web.md).

## H

**Heading hierarchy.** The logical order of `<h1>` through `<h6>` elements on a page, with no skipped levels, which screen reader users navigate by. See [Web Accessibility Fundamentals](/modules/accessibility/web-accessibility-fundamentals.md).

**HSL.** A colour notation of hue, saturation, and lightness, useful for building a palette of related colours by hand. See [Typography and Colour](/modules/css/typography-colour.md).

**HTML.** HyperText Markup Language, which describes a page's structure and meaning, not its appearance. See [Introduction to the Web](/modules/welcome/introduction-to-the-web.md).

**HTTP / HTTPS.** The protocol a browser and server use to communicate; HTTPS is the encrypted version. See [Introduction to the Web](/modules/welcome/introduction-to-the-web.md).

## I

**ID.** A label meant to identify one single, unique element on a page, targeted in CSS with a hash (`#lead`). See [Introduction to CSS](/modules/css/intro-to-css.md).

**Implicit grid.** Grid rows or columns the browser creates automatically when there are more items than explicitly defined space. See [CSS Grid Layouts](/modules/css/grid-layouts.md).

**Inheritance.** The automatic passing of certain CSS properties, mostly text-related ones, from a parent element to its children. See [Selectors, Specificity, and Inheritance](/modules/css/selectors-specificity-inheritance.md).

## J

**JSON-LD.** The current recommended format for structured data, a block of machine-readable facts about a page placed in the document head. See [SEO in Practice](/modules/seo/seo-in-practice.md).

## L

**LCP (Largest Contentful Paint).** A Core Web Vital measuring how long the largest visible element takes to appear. See [Optimizing Images and Media](/modules/html/image-optimization.md).

**Landmark region.** A semantic element like `<header>`, `<nav>`, `<main>`, or `<footer>` that a screen reader user can jump to directly. See [Web Accessibility Fundamentals](/modules/accessibility/web-accessibility-fundamentals.md).

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

**POST.** An HTTP method that sends form data in the request body, used for anything that changes something or carries sensitive data. See [HTML Forms and Data Structures](/modules/html/html-forms.md).

**Protocol.** An agreed set of rules for how two machines communicate, such as HTTP. See [Introduction to the Web](/modules/welcome/introduction-to-the-web.md).

**Pseudo-class.** A CSS selector that targets an element by its state, such as `:hover` or `:focus`. See [Selectors, Specificity, and Inheritance](/modules/css/selectors-specificity-inheritance.md).

**Pseudo-element.** A CSS selector that targets part of an element or inserts generated content, written with two colons, such as `::before`. See [Selectors, Specificity, and Inheritance](/modules/css/selectors-specificity-inheritance.md).

**Pull request.** A request on GitHub to merge one branch into another, giving a reviewer a dedicated screen to read the change before it lands. See [Code Quality and Validation](/modules/html/code-quality-validation.md).

**Push.** The Git action that sends local commits to a remote repository like GitHub. See [Introduction to the Web](/modules/welcome/introduction-to-the-web.md).

## R

**Relative path.** A link written relative to the current page's location, used to link between your own site's pages. See [Links, Images, and Media](/modules/html/links-images-media.md).

**Repository.** A project folder that Git is tracking, one per assignment in this course. See [Introduction to the Web](/modules/welcome/introduction-to-the-web.md).

**Responsive design.** The practice of building one page that works well across every screen size, rather than separate sites per device. See [Responsive Design and Media Queries](/modules/css/responsive-media-queries.md).

## S

**Selector.** The part of a CSS rule that decides which elements the rule applies to. See [Introduction to CSS](/modules/css/intro-to-css.md).

**Semantic HTML.** Using elements for what their content actually is, rather than a generic `<div>` for everything. See [Semantic HTML](/modules/html/semantic-html.md).

**Server.** A machine that stores a website's files and sends them out when a client requests them. See [Introduction to the Web](/modules/welcome/introduction-to-the-web.md).

**Skip link.** A hidden-until-focused link, first in the page, that jumps a keyboard user straight to the main content. See [Web Accessibility Fundamentals](/modules/accessibility/web-accessibility-fundamentals.md).

**Specificity.** The calculated score (IDs, then classes, then elements) a browser uses to decide which of two conflicting, equally-recent CSS rules wins. See [Selectors, Specificity, and Inheritance](/modules/css/selectors-specificity-inheritance.md).

**Sticky positioning.** `position: sticky`, which acts like normal flow until a scroll threshold, then locks in place. See [CSS Grid Layouts](/modules/css/grid-layouts.md).

**Structured data.** Machine-readable facts about a page's content, written in a vocabulary search engines understand. See [SEO in Practice](/modules/seo/seo-in-practice.md).

**Subgrid.** A nested grid that reuses its parent grid's track sizing instead of inventing its own, used to align independent cards' internal content. See [CSS Grid Layouts](/modules/css/grid-layouts.md).

## T

**Type selector.** See element selector.

## U

**URL.** The full address of a resource, made up of a protocol, a domain, and a path. See [Introduction to the Web](/modules/welcome/introduction-to-the-web.md).

## V

**Viewport.** The visible area of a web page inside the browser window. See [Responsive Design and Media Queries](/modules/css/responsive-media-queries.md).

**Viewport units.** `vw`/`vh` and their dynamic variants `dvh`/`svh`/`lvh`, which size an element relative to the browser's viewport rather than a parent. See [Responsive Design and Media Queries](/modules/css/responsive-media-queries.md).

## W

**WCAG.** The Web Content Accessibility Guidelines, the international standard for accessible web content, built on the POUR principles (Perceivable, Operable, Understandable, Robust). See [Web Accessibility Fundamentals](/modules/accessibility/web-accessibility-fundamentals.md).

**Web font.** A typeface downloaded along with the page, rather than relying on a font already installed on the visitor's machine. See [Typography and Colour](/modules/css/typography-colour.md).

## Z

**z-index.** A CSS property that decides which element sits on top when two positioned elements overlap. Only works on an element with a `position` other than `static`. See [CSS Grid Layouts](/modules/css/grid-layouts.md).
