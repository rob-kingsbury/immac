# GitHub Classroom Setup — Instructor Guide
MTM1511 (Web Components) + MTM1544 (Web Styles)

**This document is for instructors only.** Upload it to Brightspace as a hidden/instructor-only
resource, not a student-facing one. It exists so any instructor teaching these courses, this term
or a future one, can set up and run the GitHub Classroom workflow without re-deriving it.

**Why this exists at all.** Both courses require students to submit work via GitHub Pages, one
repository per assignment. Free GitHub accounts can only run Pages from a **public** repository, so
without any changes, every student's code and commit history would be visible to the whole class
and the public. The fix is two-sided: students get free GitHub Pro through the [GitHub Student
Developer Pack](https://github.com/education/students) (already referenced in MTM1511 Week 1), and
the course uses GitHub Classroom so private repos are created correctly and the instructor gets
access automatically, with no manual per-repo invites.

---

## Part 1: One-time setup

Do this once. It does not repeat each semester.

### 1.1 Create the GitHub Organization

This is the umbrella account that will host every student repository, for every course, every
semester, going forward.

1. Go to [github.com/account/organizations/new](https://github.com/account/organizations/new).
2. Choose the free plan to start (see 1.2 below for the private-repo upgrade).
3. Name it `imm-ac` (matching the immac project name), or a name your institution prefers.
4. Add any co-instructors or TAs you already know you'll be working with as organization owners:
   organization page → **People** → **Invite member** → set role to **Owner**.

### 1.2 Apply for GitHub Education benefits (for the organization)

This is separate from the Student Developer Pack — that one is for students, this one is for the
organization itself, and it's what unlocks unlimited private repositories for free.

1. Go to [github.com/education](https://github.com/education) and apply as an educator/institution,
   linking the `imm-ac` organization.
2. Verification is not instant. Apply well before the semester starts, not the week classes begin.
3. Once approved, the organization is upgraded (Team-plan features) at no cost, including private
   repositories with GitHub Pages.

### 1.3 Authorize GitHub Classroom

1. Go to [classroom.github.com](https://classroom.github.com/) and sign in.
2. Authorize the Classroom app to access your GitHub account.
3. When prompted to connect an organization, select `imm-ac`.

### 1.4 Build each assignment's starter repository as a template

GitHub Classroom creates each student's repo by cloning a **template repository**, not from
nothing. For each assignment in the [assessment plan](Assessment_Review.md):

1. Create a repository in the `imm-ac` organization containing whatever starter files the
   assignment needs (this may be nothing more than an empty `index.html`, or planted bugs for an
   exercise like MTM1544's DOM/CSS Targeting checkpoint).
2. In that repository's **Settings**, check **Template repository**.
3. Name it clearly, e.g. `mtm1511-wk4-semantic-html-template`, so it's identifiable when linking it
   to an assignment later.

This is real work and takes time to build out properly — it isn't done as part of this setup guide,
it's the next task once the organization exists.

---

## Part 2: Every semester

This is what repeats. With Part 1 already done, this is fast.

### 2.1 Create a new Classroom for the term

1. Go to [classroom.github.com/classrooms](https://classroom.github.com/classrooms) → **New
   classroom**.
2. Select the `imm-ac` organization.
3. Name it for the term and section, e.g. `MTM1511-010-F26`.

### 2.2 Add any new TAs or co-instructors

If your teaching team changed since last term, add them as organization owners (see 1.1, step 4)
so they automatically get access to every student repository this term.

### 2.3 Import the roster

In the classroom, go to the **Students** tab and add your roster: CSV upload, manual entry, or an
LMS import if Brightspace supports one (check this — worth confirming once, not re-checking every
term if it works).

### 2.4 Create each assignment

For every checkpoint in the assessment plan, repeat:

1. In the classroom, click **New assignment**.
2. Title it to match the course content, e.g. "MTM1511 Wk4: Semantic HTML."
3. Set visibility to **Private**.
4. Under starter code, link the template repository built in step 1.4.
5. Set a deadline if you want Classroom to flag late submissions (optional).
6. Save, and Classroom generates a unique invite link for that assignment.

### 2.5 Share the invite links with students

Post each assignment's invite link in Brightspace, in the relevant week's content. A student who
clicks it gets their own private repository, auto-created from the template, with you already
added as a collaborator. Nothing further to configure per student.

### 2.6 End of term

Nothing is required. The organization and its repositories persist. Archiving the term's classroom
is optional and mostly cosmetic, for keeping the classroom list readable across multiple terms.

---

## Troubleshooting

- **A student's GitHub Pages link doesn't load.** Check that GitHub Pages is actually enabled in
  their repo's Settings → Pages, and that it's set to build from the correct branch. Classroom does
  not enable Pages automatically.
- **Student Developer Pack verification is stuck.** It can take a few days and sometimes asks for
  additional proof of enrollment. This is between the student and GitHub, not something an
  instructor can expedite.
- **A student's repo isn't private / you can't see it.** Confirm the assignment was set to Private
  visibility in Classroom (2.4, step 3) before the student accepted the invite. Changing visibility
  after the fact is a manual per-repo fix, not automatic.
- **Roster import doesn't match GitHub usernames.** Classroom's roster identifies students by name
  or ID, not GitHub username, precisely so students can use personal accounts. Students link their
  own GitHub account the first time they accept an assignment invite.

## Related documents

- [Assessment_Review.md](Assessment_Review.md) — the checkpoint plan these assignments are built
  from.
- MTM1511 Week 1 ("Introduction to the Web") — the student-facing half of this setup: creating a
  GitHub account and applying for the Student Developer Pack.
