# Archive

Just-in-case backups. **Nothing here is built or published.** This folder sits outside `docs/`, so
VuePress ignores it entirely.

## `modules/` — original content of the six placeholder weeks, 2026-07-28

The week slots themselves are **still live** in both course sidebars: Week 8 (Reading Week), Week 14
(Project Development), Week 15 (Project Work Lab). Only the prose inside them was replaced, with the
originals kept here.

| Archived file | Replaced by |
|---|---|
| `reading-week.md`, `css/reading-week.md` | Standard reading-week placeholder |
| `project/project-development.md`, `css/project-development.md` | Standard project-development placeholder |
| `project/project-work-lab.md`, `css/project-work-lab.md` | Standard work-lab placeholder |

### Why

`docs/modules/` holds **independent study resources**. A module teaches a topic, knows nothing about
weeks, worklabs, quizzes, or assignments, and can be dropped into any week of any course by any
instructor. The long-term goal is one shared module pool for the whole School of Media and Design, with
each program pulling what it wants.

These six weeks have no topic to teach, so their pages were carrying delivery scaffolding instead:
"these final two weeks," "this week is guided development," "the week runs as a working studio,"
"classes resume the following week with The DOM and CSS Targeting," "the first seven weeks covered a lot
of ground." All of that hard-codes one course's calendar into a page meant to be reusable.

The replacements are deliberately generic. They say what kind of session it is, give one genuinely
useful piece of advice, and send students to Brightspace for anything schedule-specific. That makes the
same placeholder reusable in any course that needs a lab week, without editing.

Brightspace owns week structure, studio scheduling, peer-review mechanics, and due dates. It is the
right home for everything stripped out here.

### Why the duplicates stay

`project-development.md` and `project-work-lab.md` exist under both `project/` and `css/`, and the two
copies are now identical. That looks redundant, and it is, but it is load-bearing: the sidebar in
`docs/.vuepress/config.js` is keyed by path, and `/modules/css/` is more specific than `/modules/`. A
single shared file would show MTM1511's sidebar to MTM1544 students. Since the placeholder content is
generic and identical, there is nothing course-specific left to drift apart.

### If you need this back

The content is here and in git history. Before restoring any of it to `docs/modules/`, note that doing
so reintroduces course chronology into the module pool. If a project week needs richer student-facing
material, write it at the course layer or in Brightspace instead.
