---
title: Project Development
---

# Project Development

The teaching chapters are done. These final two weeks are where the site you've been building all term becomes a finished piece. This week is guided development: refining your styling, getting feedback, and joining your CSS to the HTML project from MTM1511. No new CSS is introduced. The work is applying what you already know to your own project.

## The cross-course connection

This is where the two courses meet. The multi-page site you structured in MTM1511 is the site you style here. Your HTML is the structural layer, your CSS is the visual layer on top of it, and this week they stop being two assignments and become one project.

That connection is why the habits from both courses matter now. Semantic markup gives your CSS meaningful things to select: a `<nav>` you can target directly beats a `<div>` you have to remember the class name for. A logical heading order gives you a hierarchy to express visually rather than one to invent. And the class names you chose in MTM1511 are the interface between the two halves of your own work.

If styling your own markup turns out to be awkward this week, that's useful information rather than a failure. Note where the structure fought you, because "what would have made this easier to style" is one of the most valuable things you can learn from a first full project.

## What this week looks like

The week runs as a working studio rather than a lecture. Time is set aside for instructor-guided troubleshooting, where you bring the specific problems in your own site, a layout that won't hold together, a specificity conflict you can't untangle, a responsive breakpoint that breaks something else, and work through them with help.

Alongside that, you'll take part in structured peer review, looking at a classmate's styled site and having yours looked at in turn. This is the second critique of the term, and it should be sharper than the Week 12 workshop, because now there's a whole site to look at rather than a page.

## Making peer review useful

The format from the Visual Design Principles week still applies: describe before you judge, name the principle, be specific about location, and hold the suggestion until after the observation.

What changes is that you now have a full term of concrete criteria to review against. Work from these rather than from taste alone:

**Design:** Is there a clear visual hierarchy on every page? Are spacing and alignment consistent from page to page, or does each one look separately designed? Is the palette restrained, and does the type scale hold together?

**Layout:** Does the layout hold at every width between a phone and a wide monitor, or are there sizes where it falls apart? Are Grid and Flexbox each used where they fit?

**Accessibility:** Does every text and background pair meet 4.5:1? Can you navigate the entire site by keyboard with a visible focus indicator throughout? Does it still work at 200% text zoom? Does motion respect a reduced-motion preference?

**Code:** Is the stylesheet organized, with custom properties at the top and a sensible order below? Are there `!important` declarations papering over specificity problems? Are IDs being used for styling where classes would do?

Feedback tied to those points gives someone a real to-do list. "Your card headings and body text are only two pixels apart in size, so the hierarchy doesn't read" is worth ten times more than "the cards look a bit flat."

## Refining your own site

Use the feedback and the studio time to raise the whole project to a professional standard. A productive order to work in:

1. **Fix what's broken before improving what works.** Layout failures at particular widths, contrast failures, and missing focus states come first. They're the things that make a site unusable rather than unpolished.
2. **Then unify.** Pull repeated values into custom properties, reduce your font sizes and spacing values to a consistent scale, and make sure every page draws from the same system. Most of the visible improvement at this stage comes from consistency rather than from new ideas.
3. **Then polish.** Transitions, hover states, and the small details, with the restraint pass from Week 13 applied.
4. **Then re-audit.** Lighthouse and axe on every page, the keyboard test, the 200% zoom test, and a real phone.

The goal by the end of this week is a site with no outstanding problems, so the final week is completion and final checks rather than repair.

## Being able to explain it

One requirement of this course is that you can explain the design and technical choices you made, not just produce them. That's worth preparing for deliberately rather than assembling at the last minute.

As you work this week, keep a short set of notes answering questions like these:

- Why this palette, and how do you know it's accessible?
- Why these breakpoints? What did you see happen at those widths?
- Where did you use Grid and where Flexbox, and why each?
- What does your custom property block say about your design system?
- What feedback did you receive, what did you act on, and what did you consciously decide not to change?

That last one carries the most weight. Being able to say "three people suggested a different navigation layout and I kept mine because of X" demonstrates judgment, where changing everything anyone suggested demonstrates the opposite. It's also, plainly, interview practice: this is close to word-for-word the question a hiring manager asks about a portfolio piece, and this project is likely to be exactly that.

## Looking ahead to the final week

The Project Work Lab that follows is open lab time to finish. Come into it with your styling solid and your known issues resolved, so the last week is about completion and final checks rather than firefighting. The full pre-submission checklist is on that page, and it's worth reading it this week rather than next, so nothing on it is a surprise.
