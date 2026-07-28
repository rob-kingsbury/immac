---
title: SEO Audit
prerequisites:
  - seo/seo-meta-tags
  - seo/open-graph
  - seo/structured-data
---

# <abbr title="Search Engine Optimization">SEO</abbr> Audit

A clean Lighthouse SEO score you can point to is a concrete thing a hiring manager can look at directly, not just take your word for.

## Running an SEO audit

The tools you already have will grade a page. **Lighthouse**, built into Chrome and Edge developer tools, has an SEO category that checks for a title, a meta description, valid crawlable links, readable font sizes, and more, then gives a score with a list of what to fix.

Open developer tools, choose the Lighthouse panel, tick the SEO category, and run it against your page. Then work the list.

The score itself is the least useful part of the output. Lighthouse checks what an automated tool can check, so a page can score 100 and still have a title nobody would click. Treat the score as a floor rather than a goal, and treat the itemized list as the actual deliverable: each flagged item is a concrete, fixable problem with a link explaining why it matters.

A full audit pass on a page looks like this:

1. Run Lighthouse and record the SEO score and every flagged item.
2. Check the document head by eye against [SEO Meta Tags](/modules/seo/seo-meta-tags/README.md)'s checklist and [HTML Document Structure](/modules/html/html-document-structure/README.md)'s: unique title, description, canonical, charset, viewport.
3. Paste any JSON-LD into the [Schema Markup Validator](https://validator.schema.org/) and fix what it reports.
4. Check the preview card in a social platform's own sharing debugger.
5. Confirm every page of the site is reachable by following links from the home page.
6. Fix what you found, then run Lighthouse again to confirm the change landed.

That last step matters more than it looks. Re-running is how you learn which changes actually moved the result and which just felt productive.

## Common mistakes to avoid

- **Treating the Lighthouse score as the goal.** A perfect score on a page with a useless title is a page nobody clicks.

## The checklist

Run this over a page before you move on:

- Lighthouse SEO audit run, the flagged items fixed, and the audit run a second time to confirm the fix landed
