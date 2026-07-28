import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { getDirname, path } from 'vuepress/utils'

const __dirname = getDirname(import.meta.url)

// The weekly lesson pages live under /modules/. This sidebar is shared by the
// course landing pages and the module pages so the weekly list stays visible as
// soon as a student enters /mtm1511/ and while they read each week.
const mtm1511Sidebar = [
  { text: 'Course Home', link: '/mtm1511/' },
  { text: 'Overview', link: '/mtm1511/overview/' },
  {
    text: 'Weekly Content',
    collapsible: false,
    children: [
      { text: 'Week 1: Introduction to the Web', link: '/modules/welcome/introduction-to-the-web.md' },
      {
        // Week 2 is the first week split from one week-shaped page into
        // topic-shaped modules. The week is a group; each child is a module
        // folder that another course could pick up on its own.
        text: 'Week 2: Core HTML Elements',
        collapsible: true,
        children: [
          { text: 'HTML Basics', link: '/modules/html/html-basics/README.md' },
          { text: 'HTML Document Structure', link: '/modules/html/html-document-structure/README.md' },
          { text: 'HTML Headings', link: '/modules/html/html-headings/README.md' },
          { text: 'HTML Text', link: '/modules/html/html-text/README.md' },
          { text: 'Quotations', link: '/modules/html/html-text/quotations.md' },
          { text: 'HTML Lists', link: '/modules/html/html-lists/README.md' },
          { text: 'Inline and Block Elements', link: '/modules/html/html-inline-block/README.md' },
          { text: 'HTML Comments', link: '/modules/html/html-comments/README.md' },
          { text: 'HTML Validation', link: '/modules/html/html-validation/README.md' },
        ],
      },
      {
        text: 'Week 3: Links, Images, and Media',
        collapsible: true,
        children: [
          { text: 'HTML Anchors', link: '/modules/html/html-anchors/README.md' },
          { text: 'File Paths', link: '/modules/web-basics/file-paths/README.md' },
          { text: 'HTML Images', link: '/modules/html/html-images/README.md' },
          { text: 'Media Elements', link: '/modules/html/media-elements/README.md' },
        ],
      },
      { text: 'Week 4: Semantic HTML', link: '/modules/html/semantic-html.md' },
      { text: 'Week 5: Site Architecture and Planning', link: '/modules/html/site-architecture-planning.md' },
      { text: 'Week 6: Web Accessibility Fundamentals', link: '/modules/accessibility/web-accessibility-fundamentals.md' },
      {
        text: 'Week 7: HTML Forms and Data Structures',
        collapsible: true,
        children: [
          { text: 'HTML Form', link: '/modules/html/html-form/README.md' },
          { text: 'HTML Input', link: '/modules/html/html-input/README.md' },
          { text: 'Built-in Form Validation', link: '/modules/html/html-form-validation/README.md' },
          { text: 'HTML Table', link: '/modules/html/html-table/README.md' },
        ],
      },
      { text: 'Week 8: Reading Week', link: '/modules/reading-week.md' },
      { text: 'Week 9: Optimizing Images and Media', link: '/modules/html/image-optimization.md' },
      { text: 'Week 10: SEO Fundamentals', link: '/modules/seo/seo-fundamentals.md' },
      { text: 'Week 11: SEO in Practice', link: '/modules/seo/seo-in-practice.md' },
      {
        text: 'Week 12: Code Quality and Validation',
        collapsible: true,
        children: [
          { text: 'HTML Validation', link: '/modules/html/html-validation/README.md' },
          { text: 'HTML Comments', link: '/modules/html/html-comments/README.md' },
          { text: 'File and Folder Names', link: '/modules/web-basics/file-folder-names/README.md' },
          { text: 'Working Like a Team', link: '/modules/git/github-collaboration/README.md' },
        ],
      },
      {
        text: 'Week 13: Advanced HTML Patterns',
        collapsible: true,
        children: [
          { text: 'HTML Iframes', link: '/modules/html/html-iframes/README.md' },
          { text: 'HTML Details and Summary', link: '/modules/html/html-details/README.md' },
        ],
      },
      { text: 'Week 14: Project Development', link: '/modules/project/project-development.md' },
      { text: 'Week 15: Project Work Lab', link: '/modules/project/project-work-lab.md' },
    ],
  },
  { text: 'Resources', link: '/mtm1511/resources/' },
  { text: 'Glossary', link: '/glossary/' },
]

// MTM1544 (CSS) weekly lessons live under /modules/css/. Shared by the course
// landing pages and the module pages, the same way the MTM1511 sidebar is, so
// the weekly list stays visible throughout the course. Its /modules/css/ key is
// more specific than MTM1511's /modules/ key, so VuePress shows this sidebar on
// CSS pages and the MTM1511 sidebar everywhere else under /modules/.
const mtm1544Sidebar = [
  { text: 'Course Home', link: '/mtm1544/' },
  { text: 'Overview', link: '/mtm1544/overview/' },
  {
    text: 'Weekly Content',
    collapsible: false,
    children: [
      { text: 'Week 1: Introduction to CSS', link: '/modules/css/intro-to-css.md' },
      { text: 'Week 2: The Box Model and Spacing', link: '/modules/css/box-model-spacing.md' },
      { text: 'Week 3: Typography and Colour', link: '/modules/css/typography-colour.md' },
      { text: 'Week 4: Selectors, Specificity, and Inheritance', link: '/modules/css/selectors-specificity-inheritance.md' },
      { text: 'Week 5: Flexbox Layouts', link: '/modules/css/flexbox-layouts.md' },
      { text: 'Week 6: CSS Grid Layouts', link: '/modules/css/grid-layouts.md' },
      { text: 'Week 7: Responsive Design and Media Queries', link: '/modules/css/responsive-media-queries.md' },
      { text: 'Week 8: Reading Week', link: '/modules/css/reading-week.md' },
      { text: 'Week 9: The DOM and CSS Targeting', link: '/modules/css/dom-css-targeting.md' },
      { text: 'Week 10: Accessible Styling', link: '/modules/css/accessible-styling.md' },
      { text: 'Week 11: CSS Custom Properties and Variables', link: '/modules/css/custom-properties.md' },
      { text: 'Week 12: Visual Design Principles', link: '/modules/css/visual-design-principles.md' },
      { text: 'Week 13: Transitions and Motion', link: '/modules/css/transitions-animation.md' },
      { text: 'Week 14: Project Development', link: '/modules/css/project-development.md' },
      { text: 'Week 15: Project Work Lab', link: '/modules/css/project-work-lab.md' },
    ],
  },
  { text: 'Resources', link: '/mtm1544/resources/' },
  { text: 'Glossary', link: '/glossary/' },
]

export default defineUserConfig({
  lang: 'en-US',
  base: '/immac/',
  title: 'IMM Web Courses',
  description: 'Algonquin College, Interactive Media Management',

  bundler: viteBundler(),
  clientConfigFile: path.resolve(__dirname, './client.js'),

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
    navbar: [
      { text: 'Home', link: '/' },
      { text: 'MTM1511', link: '/mtm1511/' },
      { text: 'MTM1544', link: '/mtm1544/' },
      { text: 'Glossary', link: '/glossary/' },
    ],

    sidebar: {
      // Order matters only for readability; VuePress resolves by longest
      // matching prefix, so '/modules/css/' wins over '/modules/' on CSS pages.
      '/modules/css/': mtm1544Sidebar,
      '/mtm1544/': mtm1544Sidebar,
      '/mtm1511/': mtm1511Sidebar,
      '/modules/': mtm1511Sidebar,
    },

    // Show the active chapter's H2 sections under its week (one level of
    // sub-nav). Styling in styles/index.scss defines the hierarchy clearly.
    sidebarDepth: 1,

    colorMode: 'auto',
    colorModeSwitch: true,

    lastUpdated: false,
    contributors: false,
  }),
})
