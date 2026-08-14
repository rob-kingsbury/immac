---
title: Running a Structured Peer Review
prerequisites:
  - design/design-principles
---

# Running a Structured Peer Review

You cannot see your own page fresh. After enough hours in a file you stop reading what is on the screen and start reading what you meant to put there. Someone else opening it cold for ninety seconds will find things you have walked past twenty times.

That is the whole argument for a review session, and it is also why an unstructured one fails. "Any thoughts?" gets you "looks good." A structured review gets you a list.

Structure here means three things: everyone reviews against the same list, observations are recorded rather than argued with, and the author stays quiet while receiving.

## The session, start to finish

A review works in pairs or in threes, one page at a time, roughly fifteen minutes per page.

1. **The author says nothing except which page to open.** No tour, no apology, no "I know the footer is broken." Every sentence of setup is a finding you just spent.
2. **The reviewer opens it cold and narrates.** Say what you notice, in the order you notice it, for the first thirty seconds. First impressions are the part the author can never recover on their own.
3. **The reviewer works the list.** Take the review list below and go through it in order, out loud, saying what passes as well as what does not.
4. **The author writes everything down and does not respond.** Not to agree, not to explain. Write it, keep going.
5. **Swap.** Then, alone, each author decides what to act on.

That fourth step is the one people skip and it is the one that makes the rest work. The urge to explain a decision is strong, and every second spent explaining is a second the reviewer is not looking at the page.

## What to review, by layer

Two different passes, because structure and presentation fail in different ways and catching one tells you nothing about the other. Run whichever matches the work in front of you, or both.

### Reviewing structure and semantics

Read the markup, not just the rendered page. Open the element inspector.

- Does the heading outline make sense read on its own, top to bottom, with nothing skipped?
- Is every region of the page inside a landmark, and is there exactly one main?
- Does every image have alt text that says what the image conveys, and do decorative images carry empty alt rather than a filename?
- Is each element chosen for what the content is, or for how it happened to look?
- Does the page validate, and if not, is the reviewer looking at a real error or a warning the author already understood?
- Do all the internal links actually resolve, including the ones in the navigation?
- Can you reach every interactive element with the keyboard alone, in an order that matches how the page reads?

### Reviewing layout and visual design

Now stop reading the markup and look at the page.

- Squint. Does the thing that stands out match what actually matters most?
- Is anything nearly the same as its neighbour without being clearly either the same or different?
- Draw imaginary vertical lines. Does anything sit slightly off an edge?
- Is spacing within a group smaller than spacing between groups?
- Count the distinct font sizes, colours, and spacing values in use. Is the number small enough to look deliberate?
- Does it hold together at a narrow width, and at a wide one, without a horizontal scrollbar appearing?
- Do focus states stay visible against the background they sit on?

## Giving useful feedback

**Describe before you judge.** Start with what you actually see: "my eye goes to the photo first, then the button, then the heading." That is usable information even if you disagree about whether it is a problem.

**Name the reason.** "Too close together" is vague. "The gap between the heading and its paragraph matches the gap between sections, so they do not read as grouped" tells the author what to change and why.

**Separate the observation from the prescription.** Say what is not working before you say how to fix it. The author often finds a better fix than yours once they understand the problem.

**Be specific about location.** "The cards feel off" helps nobody. "The third card's text sits a few pixels left of the other two" is a bug report.

**Say what is working, and why.** Not as politeness. If someone does not know which parts are succeeding, they will change them by accident on the next pass.

## Receiving feedback

**Do not explain while they are talking.** Write it down, respond after, or do not respond at all.

**Distinguish observations from suggestions.** If three people say their eye goes to the wrong place first, that is data and it is almost certainly true. If three people propose three different fixes, that is opinion, and the decision stays yours.

**Look for the pattern.** One person's dislike is taste. Three people tripping on the same element is a problem.

**Take notes, not offence.** The critique is about a page you made, and the page is not you.

## Recording it

Keep a short written record: what you were told, what you changed because of it, and what you deliberately did not change. That last column is the useful one. Choosing not to act on feedback is a legitimate decision when you can say why, and writing it down is what separates a decision from an oversight.

## Common mistakes to avoid

- **Reviewing the person's effort instead of the page.** How long it took is not a finding.
- **Only reporting problems.** An author who cannot tell which parts are working will break them next.
- **Debating during the session.** It converts a list of observations into one argument about the first item.
- **Reviewing the rendered page only.** Half the structural problems are invisible until you open the inspector.
- **Accepting every suggestion.** Three reviewers can be right about the problem and wrong about the fix.
- **Taking no notes.** By the next day you will remember the two comments that stung and none of the ones that were useful.

## The checklist

Confirm your own review session against this list:

- The author opened cold, without a guided tour
- The reviewer narrated first impressions before working the list
- Both layers were covered, or the one that applies was covered fully
- Findings named a location and a reason, not just a verdict
- The author recorded everything without responding during the session
- Both people gave feedback, not just one
- The author has a written record of what was raised, what changed, and what deliberately did not

## Keep learning

- [Visual Design Principles](/modules/design/design-principles/README.md) is where the hierarchy, contrast, alignment, and proximity vocabulary comes from.
- [Putting the Four Together](/modules/design/design-principles/putting-it-together.md) walks the same four principles over a single page.
- [Testing for Accessibility](/modules/accessibility/testing/README.md) covers the checks worth running before a reviewer ever sees the page.
