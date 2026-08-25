import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { getDirname, path } from 'vuepress/utils'
import { COURSES, readCourseStructure, courseSidebar } from './course-structure.js'

const __dirname = getDirname(import.meta.url)

const structure = readCourseStructure(path.resolve(__dirname, '..'))

// Navigation follows the course, not the discipline.
//
// A student reads a week, and a week is a set of modules in a set order. So the
// sidebar on a module page shows that student's course: the weeks, each holding
// the modules it lists, with the current week expanded. Prev and Next walk the
// same order, from the first module of Week 1 to the last of Week 15, the way
// chapters run.
//
// All of it is derived from /<course>/content/ at build time by
// course-structure.js. That page stays the single source of truth: a module
// added to a week there appears in the sidebar and in the chain on the next
// build, and nothing in this file has to be edited to match.
//
// Three things this has to get right, all enforced by scripts/check-nav.mjs:
//
//   1. A module appears in exactly one sidebar, exactly once. The theme
//      resolves prev/next by finding the current page among its siblings, so a
//      page listed twice resolves against whichever copy it finds first. Both
//      courses teach two accessibility modules, and nineteen modules are taught
//      twice within one course; each is owned by the first week that lists it.
//      The course content page is prose and still lists it under both.
//
//   2. Prev/next comes from frontmatter, set by extendsPage below, not from the
//      sidebar. Sibling lookup does not cross nesting levels, so with weeks as
//      groups the last module of a week would have no Next at all. Frontmatter
//      is checked first and bridges the boundary.
//
//   3. A module in no week still needs navigation. Those fall back to their
//      discipline list further down, which is also what the /modules/ index
//      pages use.

const htmlSidebar = [
  {
    text: 'HTML',
    collapsible: false,
    children: [
      { text: 'All HTML Modules', link: '/modules/html/README.md' },
      { text: 'HTML Basics', link: '/modules/html/html-basics/README.md' },
      { text: 'HTML Document Structure', link: '/modules/html/html-document-structure/README.md' },
      { text: 'Document Head Best Practices', link: '/modules/html/html-document-structure/head-best-practices.md' },
      { text: 'HTML Headings', link: '/modules/html/html-headings/README.md' },
      { text: 'HTML Text', link: '/modules/html/html-text/README.md' },
      { text: 'Quotations', link: '/modules/html/html-text/quotations.md' },
      { text: 'HTML Lists', link: '/modules/html/html-lists/README.md' },
      { text: 'Inline and Block Elements', link: '/modules/html/html-inline-block/README.md' },
      { text: 'HTML Comments', link: '/modules/html/html-comments/README.md' },
      { text: 'Comments That Outlive the Code They Describe', link: '/modules/html/html-comments/comment-longevity.md' },
      { text: 'HTML Validation', link: '/modules/html/html-validation/README.md' },
      { text: 'HTML Anchors', link: '/modules/html/html-anchors/README.md' },
      { text: 'HTML Images', link: '/modules/html/html-images/README.md' },
      { text: 'Media Elements', link: '/modules/html/media-elements/README.md' },
      { text: 'Semantic HTML', link: '/modules/html/html-semantics/README.md' },
      { text: 'Document Landmarks', link: '/modules/html/html-semantics/document-landmarks.md' },
      { text: 'Grouping Content', link: '/modules/html/html-semantics/grouping-content.md' },
      { text: 'Smaller Semantic Elements', link: '/modules/html/html-semantics/smaller-semantic-elements.md' },
      { text: 'A Full Worked Example', link: '/modules/html/html-semantics/worked-example.md' },
      { text: 'HTML Figure', link: '/modules/html/html-figure/README.md' },
      { text: 'HTML Navigation', link: '/modules/html/html-navigation/README.md' },
      { text: 'HTML Form', link: '/modules/html/html-form/README.md' },
      { text: 'Accessible Forms, in Brief', link: '/modules/html/html-form/accessible-forms.md' },
      { text: 'HTML Input', link: '/modules/html/html-input/README.md' },
      { text: 'Built-in Form Validation', link: '/modules/html/html-form-validation/README.md' },
      { text: 'HTML Table', link: '/modules/html/html-table/README.md' },
      { text: 'Optimizing Images and Media', link: '/modules/html/image-optimization/README.md' },
      { text: 'Putting It Together', link: '/modules/html/image-optimization/putting-it-together.md' },
      { text: 'Responsive Images', link: '/modules/html/responsive-images/README.md' },
      { text: 'HTML Iframes', link: '/modules/html/html-iframes/README.md' },
      { text: 'Responsive Media Containers', link: '/modules/html/html-iframes/responsive-containers.md' },
      { text: 'HTML Details and Summary', link: '/modules/html/html-details/README.md' },
      { text: 'Elements This Course Names But Doesn\'t Build With', link: '/modules/html/html-details/elements-not-built-with.md' },
    ],
  },
]

const cssSidebar = [
  {
    text: 'CSS',
    collapsible: false,
    children: [
      { text: 'All CSS Modules', link: '/modules/css/README.md' },
      { text: 'CSS Basics', link: '/modules/css/css-basics/README.md' },
      { text: 'Linking a Stylesheet', link: '/modules/css/css-basics/linking-a-stylesheet.md' },
      { text: 'CSS Selectors', link: '/modules/css/css-selectors/README.md' },
      { text: 'The Cascade', link: '/modules/css/css-cascade/README.md' },
      { text: 'The Box Model', link: '/modules/css/css-box-model/README.md' },
      { text: 'CSS Units', link: '/modules/css/css-units/README.md' },
      { text: 'Box Sizing', link: '/modules/css/css-box-sizing/README.md' },
      { text: 'aspect-ratio', link: '/modules/css/css-aspect-ratio/README.md' },
      { text: 'Typography', link: '/modules/css/css-typography/README.md' },
      { text: 'Building a Type Scale from a Ratio', link: '/modules/css/css-typography/type-scale.md' },
      { text: 'Web Fonts', link: '/modules/css/css-web-fonts/README.md' },
      { text: 'Colour Values', link: '/modules/css/css-colors/README.md' },
      { text: 'Pseudo-Classes', link: '/modules/css/css-pseudo-classes/README.md' },
      { text: 'Pseudo-Elements', link: '/modules/css/css-pseudo-elements/README.md' },
      { text: 'Combinators', link: '/modules/css/css-complex-selectors/README.md' },
      { text: 'Specificity', link: '/modules/css/css-precedence/README.md' },
      { text: 'Flexbox Layouts', link: '/modules/css/css-flexbox/README.md' },
      { text: 'Wrapped Rows and the flex-flow Shorthand', link: '/modules/css/css-flexbox/wrapped-rows.md' },
      { text: 'Controlling Individual Items', link: '/modules/css/css-flexbox/item-sizing.md' },
      { text: 'The order Property', link: '/modules/css/css-flexbox/the-order-property.md' },
      { text: 'Styling a Navigation Bar', link: '/modules/css/css-styling-navigation/README.md' },
      { text: 'CSS Grid Layouts', link: '/modules/css/css-grid/README.md' },
      { text: 'Subgrid', link: '/modules/css/css-grid/subgrid.md' },
      { text: 'Grid and Flexbox Together', link: '/modules/css/css-grid/grid-and-flexbox-together.md' },
      { text: 'The position Property', link: '/modules/css/css-position/README.md' },
      { text: 'Responsive Design and Media Queries', link: '/modules/css/css-media-queries/README.md' },
      { text: 'Fluid Sizing Without a Query', link: '/modules/css/css-fluid-sizing/README.md' },
      { text: 'Layouts That Respond Without a Query', link: '/modules/css/css-rwd-patterns/README.md' },
      { text: 'Container Queries', link: '/modules/css/css-container-queries/README.md' },
      { text: 'The DOM', link: '/modules/css/css-dom/README.md' },
      { text: 'Descendant, Child, Sibling, and Attribute Selectors', link: '/modules/css/css-selectors-adv/README.md' },
      { text: 'CSS Custom Properties and Variables', link: '/modules/css/css-custom-properties/README.md' },
      { text: 'Giving a Variable a Type with @property', link: '/modules/css/css-custom-properties/property-rule.md' },
      { text: 'Custom Properties versus Preprocessor Variables', link: '/modules/css/css-custom-properties/preprocessor-comparison.md' },
      { text: 'CSS Design Tokens', link: '/modules/css/css-design-tokens/README.md' },
      { text: 'Theming', link: '/modules/css/css-theming/README.md' },
      { text: 'CSS Nesting', link: '/modules/css/css-nesting/README.md' },
      { text: 'Transitions', link: '/modules/css/css-transitions/README.md' },
      { text: 'will-change', link: '/modules/css/css-transitions/will-change.md' },
      { text: 'Transforms', link: '/modules/css/css-transforms/README.md' },
      { text: 'A Complete Interactive Component', link: '/modules/css/css-transitions/complete-component.md' },
      { text: 'Keyframe Animations', link: '/modules/css/css-animations/README.md' },
      { text: 'Scroll-Driven Animation', link: '/modules/css/css-animations/scroll-driven-animation.md' },
    ],
  },
]

const accessibilitySidebar = [
  {
    text: 'Accessibility',
    collapsible: false,
    children: [
      { text: 'All Accessibility Modules', link: '/modules/accessibility/README.md' },
      { text: 'WCAG', link: '/modules/accessibility/wcag/README.md' },
      { text: 'ARIA', link: '/modules/accessibility/aria/README.md' },
      { text: 'Skip Navigation', link: '/modules/accessibility/skip-navigation/README.md' },
      { text: 'Keyboard Access', link: '/modules/accessibility/keyboard-access/README.md' },
      { text: 'Colour Contrast', link: '/modules/accessibility/colour-contrast/README.md' },
      { text: 'Contrast Preferences and Forced Colors', link: '/modules/accessibility/colour-contrast/contrast-preferences.md' },
      { text: 'Text Scaling', link: '/modules/accessibility/text-scaling/README.md' },
      { text: 'Visually Hidden', link: '/modules/accessibility/visually-hidden/README.md' },
      { text: 'Touch Targets', link: '/modules/accessibility/touch-targets/README.md' },
      { text: 'Reduced Motion', link: '/modules/accessibility/reduced-motion/README.md' },
      { text: 'Testing for Accessibility', link: '/modules/accessibility/testing/README.md' },
    ],
  },
]

const seoSidebar = [
  {
    text: 'SEO',
    collapsible: false,
    children: [
      { text: 'All SEO Modules', link: '/modules/seo/README.md' },
      { text: 'SEO Basics', link: '/modules/seo/seo-basics/README.md' },
      { text: 'SEO Meta Tags', link: '/modules/seo/seo-meta-tags/README.md' },
      { text: 'Canonical Links and URL Structure', link: '/modules/seo/seo-meta-tags/canonical-and-urls.md' },
      { text: 'SEO Content', link: '/modules/seo/seo-content/README.md' },
      { text: 'Open Graph', link: '/modules/seo/open-graph/README.md' },
      { text: 'Structured Data', link: '/modules/seo/structured-data/README.md' },
      { text: 'SEO Audit', link: '/modules/seo/seo-audit/README.md' },
    ],
  },
]

const webBasicsSidebar = [
  {
    text: 'Web Basics',
    collapsible: false,
    children: [
      { text: 'All Web Basics Modules', link: '/modules/web-basics/README.md' },
      { text: 'How the Web Works', link: '/modules/web-basics/how-the-web-works/README.md' },
      { text: 'File Paths', link: '/modules/web-basics/file-paths/README.md' },
      { text: 'File and Folder Names', link: '/modules/web-basics/file-folder-names/README.md' },
      { text: 'Information Architecture', link: '/modules/web-basics/information-architecture/README.md' },
      { text: 'Site Maps', link: '/modules/web-basics/site-maps/README.md' },
      { text: 'Wireframes', link: '/modules/web-basics/wireframes/README.md' },
      { text: 'Translating a Plan into Structure', link: '/modules/web-basics/site-maps/translating-to-structure.md' },
    ],
  },
]

const gitSidebar = [
  {
    text: 'Git and GitHub',
    collapsible: false,
    children: [
      { text: 'All Git and GitHub Modules', link: '/modules/git/README.md' },
      { text: 'Creating a GitHub Account and a Demo Repository', link: '/modules/git/github-basics/README.md' },
      { text: 'Git Basics', link: '/modules/git/git-basics/README.md' },
      { text: 'Staging, Committing, and Pushing', link: '/modules/git/git-basics/staging-committing-pushing.md' },
      { text: 'Publishing to GitHub Pages', link: '/modules/git/github-pages/README.md' },
      { text: 'Git, GitHub, and Pages in Plain Terms', link: '/modules/git/git-basics/git-github-pages-in-plain-terms.md' },
      { text: 'A README That Actually Tells Someone What They\'re Looking At', link: '/modules/git/github-basics/writing-a-readme.md' },
      { text: 'Keeping Clutter Out of Your Repository With .gitignore', link: '/modules/git/git-basics/gitignore.md' },
      { text: 'Working Like a Team, Branches and Pull Requests', link: '/modules/git/github-collaboration/README.md' },
    ],
  },
]

const toolsSidebar = [
  {
    text: 'Tools',
    collapsible: false,
    children: [
      { text: 'All Tools Modules', link: '/modules/tools/README.md' },
      { text: 'Setting Up Your Development Environment', link: '/modules/tools/vscode/README.md' },
      { text: 'Your Editor Catches Some of This Before You Even Save', link: '/modules/tools/vscode/editor-diagnostics.md' },
      { text: 'Browser Developer Tools', link: '/modules/tools/browsers/README.md' },
      { text: 'Developer Tools for Debugging', link: '/modules/tools/browsers/devtools.md' },
      { text: 'Inspecting CSS Rules', link: '/modules/tools/browsers/inspecting-css-rules.md' },
      { text: 'Inspecting the Box Model', link: '/modules/tools/browsers/inspecting-the-box-model.md' },
      { text: 'Debugging CSS Conflicts', link: '/modules/tools/browsers/debugging-css-conflicts.md' },
      { text: 'Inspecting a Grid', link: '/modules/tools/browsers/inspecting-a-grid.md' },
      { text: 'Inspecting Variables', link: '/modules/tools/browsers/inspecting-variables.md' },
      { text: 'Testing Responsive Work', link: '/modules/tools/browsers/testing-responsive-work.md' },
      { text: 'Diagnosing Rendering Problems', link: '/modules/tools/browsers/diagnosing-rendering-problems.md' },
    ],
  },
]

const designSidebar = [
  {
    text: 'Design',
    collapsible: false,
    children: [
      { text: 'All Design Modules', link: '/modules/design/README.md' },
      { text: 'Visual Design Principles', link: '/modules/design/design-principles/README.md' },
      { text: 'Putting the Four Together', link: '/modules/design/design-principles/putting-it-together.md' },
      { text: 'Running a Structured Peer Review', link: '/modules/design/peer-review/README.md' },
    ],
  },
]

const courseSidebars = Object.fromEntries(
  COURSES.map((course) => [course, courseSidebar(course, structure)])
)

// Every module directory that a course week lists, pointed at that course's
// sidebar. Keys are longer than the '/modules/<discipline>/' keys below, and
// VuePress resolves by longest matching prefix, so these win for a placed
// module and the discipline list catches everything else.
const placedModuleSidebars = Object.fromEntries(
  [...structure.dirToCourse].map(([dir, course]) => [dir, courseSidebars[course]])
)

// Anything under /modules/ that is not inside a discipline folder, which is the
// six course-layer placeholder pages left in the pool. They are linked from the
// course content pages; this gives them a way back into the pool.
const modulePoolSidebar = [
  {
    text: 'Module Pool',
    collapsible: false,
    children: [
      { text: 'Web Basics', link: '/modules/web-basics/README.md' },
      { text: 'Tools', link: '/modules/tools/README.md' },
      { text: 'Git and GitHub', link: '/modules/git/README.md' },
      { text: 'HTML', link: '/modules/html/README.md' },
      { text: 'CSS', link: '/modules/css/README.md' },
      { text: 'Accessibility', link: '/modules/accessibility/README.md' },
      { text: 'Design', link: '/modules/design/README.md' },
      { text: 'SEO', link: '/modules/seo/README.md' },
    ],
  },
]

export default defineUserConfig({
  lang: 'en-US',
  base: '/immac/',
  title: 'IMM Web Courses',
  description: 'Algonquin College, Interactive Media Management',

  bundler: viteBundler(),
  clientConfigFile: path.resolve(__dirname, './client.js'),

  // Without this the site declares no icon at all, so every browser falls back
  // to requesting /favicon.ico and every page load takes a 404. It also leaves
  // a blank tab, which matters more here than usual: the tab is what a student
  // uses to find this site among the other tabs they keep open beside it.
  // SVG only, deliberately. Every browser this course targets supports it, and
  // an .ico would be a binary asset in a repo that currently has none.
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: `${'/immac/'}favicon.svg` }]],

  // The theme registers an alias for every one of its own components, so
  // pointing this one at ours replaces the sidebar list while leaving the
  // <aside> around it, the mobile drawer, and the navbar items untouched.
  alias: {
    '@theme/VPSidebarItems.vue': path.resolve(__dirname, './components/CourseSidebarItems.vue'),
    '@theme/VPNavbarItems.vue': path.resolve(__dirname, './components/CourseNavbarItems.vue'),
    // Marks a page's first heading active while route.hash is empty, which
    // the theme cannot do on its own: it matches a heading child on
    // `route.hash === item.link`, and the active-header-links plugin clears
    // route.hash outright whenever the reader is within 5px of the top of a
    // page. See ReactiveSidebarItem.vue, which also records why this file's
    // original justification (an isOpen resync race, issue #32) was wrong.
    '@theme/VPSidebarItem.vue': path.resolve(__dirname, './components/ReactiveSidebarItem.vue'),
  },

  // Prev and Next for every module a course week places, taken from that
  // course's reading order. Set here rather than written into each module's
  // frontmatter so the module files themselves still say nothing about weeks.
  // Pages outside any week are left alone and fall back to sidebar order.
  extendsPage(page) {
    // Where this module is placed, for ModuleWeekContext.vue. Set for every
    // placed module, including the ones in a single week: a reader who followed
    // a link out of a week needs to know which week they are reading for, not
    // only on the thirteen pages where the answer is ambiguous.
    const used = structure.whereUsed.get(page.path)
    if (used) page.frontmatter.whereUsed = used

    const links = structure.chain.get(page.path)
    if (!links) return
    page.frontmatter.prev = links.prev ? { text: links.prev.text, link: links.prev.link } : false
    page.frontmatter.next = links.next ? { text: links.next.text, link: links.next.link } : false
  },

  theme: defaultTheme({
    // No logo image is configured, so the navbar brand renders as a plain
    // text link ("IMM Web Courses"). VPNavbarBrand.vue only hides that text
    // from screen readers (aria-hidden) when it's decided the text is
    // redundant with a logo's own alt text -- but its check compares
    // logoAlt against the site title and *defaults logoAlt to the title
    // itself* when unset, so with no logo at all the comparison still comes
    // back true and the link's only text gets hidden, leaving the link with
    // no accessible name (an axe-core "link-name" violation). Setting
    // logoAlt to something that can never equal the title keeps that text
    // visible to assistive tech, which is correct here since there's no
    // logo image to fall back on.
    logoAlt: '',
    // "Home" is not listed here: a student is in one course, and offering
    // both course links at the top of every page invites wandering into the
    // wrong one, while the sidebar already establishes which one a reader is
    // in. Home itself is prepended by CourseNavbarItems.vue (aliased above),
    // computed per route rather than fixed, so it reads "Course Home" and
    // points at the reader's own course everywhere that course owns the
    // page, falling back to the real site root everywhere else.
    navbar: [{ text: 'Glossary', link: '/glossary/' }],

    sidebar: {
      // Longest matching prefix wins. A module placed in a course week is
      // keyed by its own directory and gets that course's sidebar; anything
      // left over falls back to its discipline, then to the pool index.
      ...placedModuleSidebars,
      '/modules/accessibility/': accessibilitySidebar,
      '/modules/web-basics/': webBasicsSidebar,
      '/modules/design/': designSidebar,
      '/modules/tools/': toolsSidebar,
      '/modules/html/': htmlSidebar,
      '/modules/css/': cssSidebar,
      '/modules/seo/': seoSidebar,
      '/modules/git/': gitSidebar,
      '/modules/': modulePoolSidebar,
      '/mtm1511/': courseSidebars.mtm1511,
      '/mtm1544/': courseSidebars.mtm1544,
      // The glossary belongs to no course, so no course sidebar is correct for
      // it. Declaring that explicitly rather than leaving it unmatched: an
      // unmatched path makes the theme log "/glossary/ is missing sidebar
      // config" on every build and again in the browser console, which trains
      // everyone to ignore build output. The rendered result is the same.
      '/glossary/': false,
    },

    // Show the active page's H2 sections nested under it (one level of
    // sub-nav). Styling in styles/index.scss defines the hierarchy clearly.
    sidebarDepth: 1,

    colorMode: 'auto',
    colorModeSwitch: true,

    lastUpdated: false,
    contributors: false,
  }),
})
