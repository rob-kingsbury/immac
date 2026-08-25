# Handover: MTM1511 and MTM1544

Everything needed to run, change, or rebuild the two web courses. Written for whoever takes these
over from Rob Kingsbury.

## The three repositories

| Repository | What it holds | Who needs it |
|---|---|---|
| [immac](https://github.com/rob-kingsbury/immac) (public) | The course website students read. Weekly content, lesson modules, glossary. Published to GitHub Pages. | Everyone. This is the student-facing site. |
| [imm-ac-assessments](https://github.com/rob-kingsbury/imm-ac-assessments) (private) | Every assignment, quiz, rubric and course overview, as markdown. The source of truth for anything graded. | Whoever changes an assignment. |
| [brightspace-creator](https://github.com/rob-kingsbury/brightspace-creator) (private) | The tool that turns the assessment markdown into a Brightspace import package. | Only when rebuilding a package. |

There is also one starter template, [mtm1544-week01-starter](https://github.com/rob-kingsbury/mtm1544-week01-starter),
covered under "Starter repositories" in [README.md](README.md).

## How a change reaches students

Assignments are not edited in Brightspace. They are edited as markdown, rebuilt into a package, and
imported. Two commands, in this order:

```bash
# 1. In imm-ac-assessments: read the markdown, write a build config
node scripts/build-coursedoc.mjs --course mtm1511      # or mtm1544
# writes output/mtm1511.courseDoc.json

# 2. In brightspace-creator: turn that config into an importable zip
node scripts/generate.js --course ../imm-ac-assessments/output/mtm1511.courseDoc.json \
  --out output/mtm1511.zip
```

That JSON is the generator's config directly, with no translation step. There is no
`courses/mtm1511.yaml`; do not go looking for one.

Then import the zip in Brightspace: **Course Admin, Import/Export/Copy Components, Import
Components**.

**Import into an empty shell.** Importing on top of a shell that already has content produces
duplicate grade categories and duplicate topics. If a shell already has a previous import in it,
either clear it first or hand-edit the specific thing that changed.

## The courses

|  | MTM1511 Web Components | MTM1544 Web Styles |
|---|---|---|
| Subject | HTML: structure, semantics, accessibility, SEO | CSS: layout, type, colour, responsive, motion |
| Order in the week | Taught first | Taught second, styles what 1511 built |
| Dev shell | `918359` | `943024` |
| Grade weights | Assignment(s) 40, Evaluation Assignment(s) 20, Project(s) 30, In-class Work 10 | Assignment(s) 45, Project(s) 15, Final Project 25, Quiz(zes) 15 |
| Assignments | 11 weekly, plus midterm and final | 11 weekly, plus midterm and final |
| Quizzes | 12 | 12 |

The two weightings are different on purpose. Both course outlines were approved separately. Do not
copy one course's table into the other.

Semester shape is 7 teaching weeks, Reading Week, 7 teaching weeks. Reading Week is numbered Week 8,
so the term runs Weeks 1 to 15 with no assignment in 8, 9 or 14.

## How the courses fit together

The work is one site, carried across both courses and across the semester:

1. MTM1511 Week 5, the student plans a five-page site: site map, wireframes, HTML skeleton.
2. MTM1511 Weeks 6 and 7 build pieces of it. The midterm, assigned Week 6 and due at the start of
   Week 9, is that site built out.
3. MTM1544 Weeks 1 to 4 work on a supplied starter page instead, because 1511 has not produced
   enough HTML yet. From 1544 Week 5 onward, students style their own 1511 site.
4. MTM1544 Weeks 6 and 7 are the exception: students build from a mockup they made in MTM1537
   (UX Design), handed off as a PDF or JPG export so it opens without Figma. A fallback design is
   published at `/design/mtm1544/` on this site for students who have no 1537 mockup.
5. Both finals in Week 15 are the same site, finished: 1511 marks the HTML, 1544 marks the CSS.

Every assignment brief names its own artifact, so each one can be read on its own without the
student having to reconstruct that chain.

## Submission and gating

- All student work is submitted as a **GitHub Pages link**. No zip files, no attachments.
- One repository per assignment. Students are assumed to have no Git experience, which is what
  MTM1511 Week 1 exists for.
- Each weekly assignment is **hidden until the student scores 9 out of 10 or better on that week's
  quiz**. This is a Brightspace release condition on the assignment folder, and it is in the
  import package. The midterm and final are not gated.
- Quizzes have unlimited attempts, no time limit, and the highest attempt counts.
- Quizzes import **inactive on purpose**. Rob opens each one by hand at the end of the class it
  belongs to. An inactive quiz is not a broken import.

## Traps that have already cost time

**Brightspace rejects `/ " * < > + = | , %` in a grade item name, but only when you edit it.** An
import carrying one succeeds, and that grade item can then never be saved again, through the
interface or the API. The generator now strips those characters from grade item names while leaving
the assignment's own title alone, so an assignment can keep its commas.

**Check the package, not the date on it.** A package can be days behind the markdown it came from.
Before importing, search the zip for a phrase you know is new.

**Only labelled fields reach Brightspace, plus the prose under the Goal.** In an assignment markdown
file the parser reads `**Goal:**`, `**Deliverable:**`, `**Instructions:**`, `**Technical
Requirements:**`, `**AI Compatibility:**`, `**Submission:**`, `**Released after:**`, `**Weight:**`,
and any unlabelled paragraphs sitting between the Goal and the next label. Anything written
elsewhere in the file stays in the repository and never reaches a student.

**`diff-package.js` cannot compare two generated packages.** It matches items on identifiers that
are regenerated every build, so two builds of identical content report every item as both missing
and extra. It is only useful for comparing a generated package against a shell exported from
Brightspace. To compare two builds, compare the titles in `imsmanifest.xml`.

**Editing a shell by hand puts it out of step with its package.** Both dev shells currently match
their packages exactly. If you hand-edit one, either make the same change in the markdown or expect
the next import to overwrite it.

## What is still open

- **No program organisation on GitHub.** All four repositories sit under `rob-kingsbury`. When a
  program account exists, move them, then update the starter link in [README.md](README.md), in
  `mtm1544/assignments/week-01-styling-the-starter-page.md`, and in the assignment description
  inside the Brightspace shell, which does not update itself.
- **Week 14, Project Development, has no assessment in either course.** Students are working on the
  final that week. Whether it should carry a checkpoint is an open decision, not an oversight.
- **These are DV+ development shells.** The teaching sections still need both packages imported.
- The remaining open items are tracked as issues on
  [immac](https://github.com/rob-kingsbury/immac/issues).

## Who to ask

Course design decisions and the reasoning behind the grade weights sit with Rob Kingsbury. The
program coordinator handles scheduling and the MTM1537 handoff. Anything about the Brightspace
shells themselves goes to the Digital Learning Environment Support Team at
brightspace@algonquincollege.com.
