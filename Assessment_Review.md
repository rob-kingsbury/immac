# Assessment Ideas for Review
MTM1511 (Web Components) + MTM1544 (Web Styles)

Draft assessment plan for both courses, for review before anything moves to Brightspace. This is
a reference document living alongside the repo, not part of the built course site — the site
itself stays content-only.

Both courses follow the same shape: a small number of graded checkpoints tied to specific weeks,
everything else covered by quizzes, and a cumulative project across the final two weeks. The
checkpoint count is deliberately kept low, and the grading method for each one is chosen so any
instructor teaching the course can mark it the same way, without needing custom scripts or tooling
that only work if someone builds and maintains them.

**Grading key:**
- **Self-serve tool** — the student runs a standalone tool (W3C Validator, the Lighthouse panel
  built into Chrome/Edge, the axe DevTools browser extension, the WebAIM Contrast Checker, Chrome
  DevTools' built-in prefers-reduced-motion emulation) and submits its report. The instructor reads
  a score or a pass/fail line — no programming or pipeline involved.
- **Manual** — a judgment or critique artifact, or a quick visual check with no standalone tool for
  it. Bounded and fast, but not zero-touch.

---

## MTM1511 — 4 checkpoints + final project

| Wk | Topic | Assignment idea | Grading | How |
|----|---|---|---|---|
| 4 | Semantic HTML | Refactor the Wk2-3 page into semantic regions (`header`, `nav`, `main`, `article`/`section`, `aside`, `footer`) | Self-serve tool | Student submits the W3C Validator report plus a quick view-source scan; instructor reads the report |
| 5 | Site Architecture and Planning | Site map + wireframe for the eventual project site | Manual | Completeness pass/fail, cheap to mark by hand |
| 6 | Web Accessibility Fundamentals | Skip link, alt text audit, contrast check, keyboard-only pass, Lighthouse accessibility run | Self-serve tool | Student submits the Lighthouse accessibility report + WebAIM contrast checker results for their palette; instructor reads the score and the tool's own flagged-item list |
| 12 | Code Quality and Validation | "Validate this page, zero errors" | Self-serve tool | Student submits a screenshot of the W3C Validator's "no errors or warnings" result |
| 14-15 | Project Development / Project Work Lab | Cumulative project site | Self-serve tool + manual | Student submits Lighthouse (all 3 categories), W3C Validator, and axe DevTools reports as required attachments; instructor reads those first, then grades design/content judgment on top |

Weeks 2, 3, 7, 9, 10-11, and 13 stay quiz-only — real content, but not a standalone graded build.

## MTM1544 — inherits the pre-split shell's A01-A03 + Zen Garden, 4 assignments + final project

| Wk | Topic | Assignment idea | Grading | How |
|----|---|---|---|---|
| 2-3 | Box Model / Typography and Colour | Styling fundamentals on the student's own palette (A01-style) | Self-serve tool | Student submits WebAIM Contrast Checker results for their palette |
| 5-6 | Flexbox / Grid | "Responsive Store Web Page" (A02-style) | Manual | No standalone tool for "does the layout hold." Instructor resizes the browser window at a couple of breakpoints and looks — a minute or two per student. |
| 12 | Visual Design Principles | Zen Garden peer critique | Manual, by design | A critique workshop, not a build. The subjectivity is the point. |
| 13 | Transitions and Motion | "Animated Landing Page" (A03-style) | Self-serve tool | Chrome DevTools' Rendering panel has a built-in "emulate CSS prefers-reduced-motion" toggle — flip it and confirm animation is suppressed |
| 14-15 | Project Development / Project Work Lab | Cumulative project site | Self-serve tool + manual | Same report-bundle approach as MTM1511, joint with that course's HTML |

Weeks 4, 7, 9, 10, and 11 (Selectors/Specificity, Responsive Design, DOM/CSS Targeting, Accessible
Styling, Custom Properties) stay quiz-only, or fold into whichever of the four assignments above
they feed, rather than standing alone as separately graded checkpoints.

---

## Open questions for discussion

1. Whether the MTM1544 Wk5-6 "does it hold" check needs a rubric (specific breakpoints to test,
   what counts as a pass) so it stays fast and consistent across instructors.
2. Revised AI-compatibility tagging language (currently No / Limited / Unlimited).
3. New OCN format for GitHub Pages / link-only submission.
4. MTM1511's exact assignment count and deliverables, beyond the four checkpoints above.
