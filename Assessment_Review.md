# Assessment Ideas for Review
MTM1511 (Web Components) + MTM1544 (Web Styles)

Draft assessment plan for both courses, for review before anything moves to Brightspace. This is
a reference document living alongside the repo, not part of the built course site — the site
itself stays content-only.

**Format note.** This follows the same shape the pre-split MTM1519 shell already used for every
assignment (A01-A04, Final Project): a Goal, an AI Compatibility tag, Instructions, a Technical
Requirements checklist, a Submission section, and an analytic rubric with one row per requirement
scored across three levels (Needs Improvement / Satisfactory / Delivers Excellence). Reusing that
shape rather than inventing a new one, since it's already a format students and instructors both
know. Submission is updated to match this project's locked decision: a GitHub Pages link per
assignment repo, not a zip upload or FTP.

Both courses keep the checkpoint count low: a handful of graded assignments tied to specific
weeks, everything else covered by quizzes, and a cumulative joint project across the final two
weeks. Point values below are placeholders to give a sense of relative weight, not final numbers.

---

## MTM1511

### Wk4 — Semantic HTML checkpoint

**Goal:** Refactor the Week 2-3 page's generic wrapper elements into real semantic HTML5 regions.

**AI Compatibility:** No. This checks whether the student can make the structural judgment call
themselves.

**Instructions:**
1. Take the page built across Weeks 2-3.
2. Replace generic wrapping elements with the correct semantic tag for each region.
3. Keep every earlier requirement (heading order, lists, etc.) intact.

**Technical Requirements:**
- One `<header>` containing the page's `<h1>`
- One `<nav>` with at least 2 links
- One `<main>` wrapping the primary content
- At least one `<article>` or `<section>`
- One `<footer>`
- Zero W3C Validator errors

**Submission:** Push to the Week 4 assignment repo, submit the GitHub Pages link.

**Rubric shape:** one row per required element (Needs Improvement = missing/wrong tag, Satisfactory
= present but misused, Delivers Excellence = correct and properly nested). Suggested value: /20.

---

### Wk5 — Site Architecture checkpoint

**Goal:** Plan the structure of the eventual capstone site before building it.

**AI Compatibility:** Limited. AI can help brainstorm content ideas; the sitemap and wireframe
structure must be the student's own.

**Instructions:**
1. List every page the final site will need (minimum 5, following the old Final Project's
   convention: Home, About, Projects, Contact, one of the student's choice).
2. Build a sitemap showing how pages link to each other.
3. Sketch a low-fidelity wireframe for the homepage, one mobile and one desktop version.

**Technical Requirements:**
- Sitemap names all pages and shows the nav structure
- One mobile wireframe, one desktop wireframe
- Wireframe reflects actual planned content, not placeholder text

**Submission:** PDF or image files in the assignment repo. No live site required this week.

**Rubric shape:** completeness-based, same three levels, graded manually since there's no page to
audit yet. Suggested value: /15.

---

### Wk6 — Accessibility Fundamentals checkpoint

**Goal:** Audit and fix the accessibility of the student's page.

**AI Compatibility:** Limited. AI can suggest draft alt text, but the audit and fixes must be
verified by the student.

**Instructions:**
1. Add a skip link as the first element in `<body>`.
2. Add considered alt text to every image (empty `alt` for decorative images).
3. Run the WebAIM Contrast Checker on every text/background pair; fix anything under 4.5:1.
4. Tab through the whole page keyboard-only; confirm focus is always visible.
5. Run Lighthouse's accessibility audit and fix what it flags.

**Technical Requirements:**
- Skip link present and functional
- Every image has an `alt` attribute
- All text passes 4.5:1 contrast
- Lighthouse accessibility score at or above an agreed threshold

**Submission:** GitHub Pages link, with the Lighthouse report (screenshot or exported HTML)
attached to the submission.

**Rubric shape:** one row per requirement, same three-level scale. Suggested value: /20.

---

### Wk12 — Code Quality and Validation checkpoint

**Goal:** Ship a page with zero validation errors and clean, organized code.

**AI Compatibility:** No.

**Instructions:**
1. Run the most complex page built so far through the W3C Validator.
2. Fix every error and warning.
3. Check file and folder naming against course convention; fix anything non-compliant.
4. Add section-marker comments to the page's major regions.

**Technical Requirements:**
- Zero errors, zero warnings in the W3C Validator
- File and folder names follow course convention
- Comments mark major page regions

**Submission:** GitHub Pages link, plus a screenshot of the validator's clean result.

**Rubric shape:** mostly pass/fail per requirement, same three-level scale. Suggested value: /10,
deliberately small since the point is that it's fast to mark.

---

### Weeks 14-15 — Cumulative Project (joint with MTM1544)

See the joint Final Project section below.

---

## MTM1544

### Wk2-3 — Styling Fundamentals (carries A01 forward)

**Goal:** Style a page with a considered palette and typography.

**AI Compatibility:** No, matching the old A01 exactly.

**Instructions:** Style at minimum `body`, `h1`, `p`, `img`, and `a`. Change color, font family,
background, spacing, and border on at least one element each. Use proper indentation and comments.

**Technical Requirements:**
- Every listed tag is styled
- At least one property changed per category: color, font, background, spacing, border
- Palette checked against the WebAIM contrast checker (new, since Week 3 now teaches it directly)

**Submission:** GitHub Pages link (was zip + FTP in the old shell; now just the link).

**Rubric shape:** same as the old A01 rubric, one row per tag/property ("Not styled / Styled with
errors / Styled properly"). Suggested value: /20, matching A01's old role as the first real graded
piece.

---

### Wk5-6 — Responsive Store Page (carries A02 forward)

**Goal:** Build a page that works at mobile and desktop, using both Flexbox and Grid, styling the
HTML built in MTM1511.

**AI Compatibility:** Limited, matching the old tag. AI can help generate a working responsive
mobile menu; the rest is the student's own.

**Instructions:** Start with a plan (moodboard + 2 wireframes), build the content, style with
flexbox and grid, add at least one breakpoint switching from mobile to desktop.

**Technical Requirements:** (unchanged from the old A02) at least 2 flexbox uses, at least 2 grid
uses, at least 2 classes, at least 2 ids, a wrapper element, responsive images, zero syntax errors.

**Submission:** GitHub Pages link. OCN becomes a repo file rather than a document inside a zip
(open question, not yet finalized).

**Rubric shape:** same as the old A02 rubric, one row per technical requirement. Suggested value:
/25, the largest checkpoint besides the final project.

---

### Wk12 — Zen Garden

**Goal:** Redesign the supplied HTML using CSS only. No HTML edits allowed.

**AI Compatibility:** Limited, matching the old tag — troubleshooting help only, and any AI use
must be cited.

**Instructions / Technical Requirements:** essentially unchanged from the old A04 — start from the
provided markup only, all CSS in an external `styles.css` at the root, no other pre-made CSS beyond
an approved reset. Week 12 is now also a peer-critique workshop, so students bring their redesign
to the in-class critique session.

**Submission:** GitHub Pages link. Marking uses only the submitted CSS against the original,
unedited HTML, same as the old approach.

**Rubric shape:** same as the old rubric, plus a peer-critique participation component layered on
top since the week now runs as a workshop (open question: how the two combine into one grade).
Suggested value: /20 individual + a critique participation mark.

---

### Wk13 — Animated Landing Page (carries A03 forward)

**Goal:** Apply transitions and animation to a landing page, using a CSS reset or normalize.

**AI Compatibility:** Unlimited, matching the old tag exactly — this was already the "test AI's
limits" assignment.

**Instructions:** Plan with thumbnails, code with a reset/normalize linked above the main
stylesheet, add at least two transitions and two animations.

**Technical Requirements:** (same list as the old A03) proper folder structure, linked reset,
two transitions, two animations, the `translate` property used, responsive images, zero syntax
errors — plus one new item: `prefers-reduced-motion` respected, since the course now teaches it
this week.

**Submission:** GitHub Pages link.

**Rubric shape:** same as the old A03 rubric, one row per technical requirement. Suggested value:
/20.

---

### Weeks 14-15 — Cumulative Project (joint with MTM1511)

**Goal:** Build the full site, mobile-first and static only, integrating both courses' work: the
HTML structure from MTM1511, styled and made responsive in MTM1544.

**AI Compatibility:** Limited, matching the old Final Project's tag, with updated allowed-AI-use
language still an open item.

**Instructions:** Minimum 5 pages of real content (Home, About, Projects, Contact, one of the
student's choice), built mobile-first, static only. The old shell's WordPress and PSD-handoff
language is fully removed, since there's no CMS content in either course anymore.

**Technical Requirements:** builds on the Wk5 wireframe and Wk6 accessibility checkpoint from
MTM1511; adds the report bundle already described in the course's own Project Work Lab content —
Lighthouse (all three categories), W3C Validator, and axe DevTools reports submitted alongside the
live link.

**Submission:** one GitHub Pages link per student (single joint repo covering both courses' work).

**Rubric shape:** same multi-criterion analytic style as the old Final Project rubric. Suggested
value: /100, the largest item in either course.

---

## Open questions for discussion

1. Exact Lighthouse/axe score thresholds for the Wk6 and Final Project checkpoints.
2. How the Wk12 Zen Garden individual mark and peer-critique participation combine into one grade.
3. Revised AI-compatibility tagging language — the No/Limited/Unlimited tags above are carried
   forward from the old shell as a starting point, not finalized.
4. New OCN format for GitHub Pages / link-only submission — referenced above but not designed.
5. Final point values across all checkpoints, once the course's overall grading scheme is set.
