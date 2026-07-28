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
      {
        text: 'Week 1: Introduction to the Web',
        collapsible: true,
        children: [
          { text: 'How the Web Works', link: '/modules/web-basics/how-the-web-works/README.md' },
          { text: 'HTML Basics', link: '/modules/html/html-basics/README.md' },
          { text: 'Setting Up Your Development Environment', link: '/modules/tools/vscode/README.md' },
          { text: 'Creating a GitHub Account and a Demo Repository', link: '/modules/git/github-basics/README.md' },
          { text: 'Git Basics', link: '/modules/git/git-basics/README.md' },
          { text: 'Staging, Committing, and Pushing', link: '/modules/git/git-basics/staging-committing-pushing.md' },
          { text: 'GitHub Pages', link: '/modules/git/github-pages/README.md' },
          { text: 'Git, GitHub, and Pages in Plain Terms', link: '/modules/git/git-basics/git-github-pages-in-plain-terms.md' },
        ],
      },
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
      {
        text: 'Week 4: Semantic HTML',
        collapsible: true,
        children: [
          { text: 'Semantic HTML', link: '/modules/html/html-semantics/README.md' },
          { text: 'A Full Worked Example', link: '/modules/html/html-semantics/worked-example.md' },
          { text: 'HTML Figure', link: '/modules/html/html-figure/README.md' },
        ],
      },
      {
        text: 'Week 5: Site Architecture and Planning',
        collapsible: true,
        children: [
          { text: 'Information Architecture', link: '/modules/web-basics/information-architecture/README.md' },
          { text: 'Site Maps', link: '/modules/web-basics/site-maps/README.md' },
          { text: 'Translating a Plan into Structure', link: '/modules/web-basics/site-maps/translating-to-structure.md' },
          { text: 'File and Folder Names', link: '/modules/web-basics/file-folder-names/README.md' },
          { text: 'Wireframes', link: '/modules/web-basics/wireframes/README.md' },
          { text: 'HTML Navigation', link: '/modules/html/html-navigation/README.md' },
        ],
      },
      {
        text: 'Week 6: Web Accessibility Fundamentals',
        collapsible: true,
        children: [
          { text: 'WCAG', link: '/modules/accessibility/wcag/README.md' },
          { text: 'ARIA', link: '/modules/accessibility/aria/README.md' },
          { text: 'Skip Navigation', link: '/modules/accessibility/skip-navigation/README.md' },
          { text: 'Keyboard Access', link: '/modules/accessibility/keyboard-access/README.md' },
          { text: 'Colour Contrast', link: '/modules/accessibility/colour-contrast/README.md' },
          { text: 'Testing for Accessibility', link: '/modules/accessibility/testing/README.md' },
        ],
      },
      {
        text: 'Week 7: HTML Forms and Data Structures',
        collapsible: true,
        children: [
          { text: 'HTML Form', link: '/modules/html/html-form/README.md' },
          { text: 'Accessible Forms, in Brief', link: '/modules/html/html-form/accessible-forms.md' },
          { text: 'HTML Input', link: '/modules/html/html-input/README.md' },
          { text: 'Built-in Form Validation', link: '/modules/html/html-form-validation/README.md' },
          { text: 'HTML Table', link: '/modules/html/html-table/README.md' },
        ],
      },
      { text: 'Week 8: Reading Week', link: '/modules/reading-week.md' },
      {
        text: 'Week 9: Optimizing Images and Media',
        collapsible: true,
        children: [
          { text: 'Optimizing Images and Media', link: '/modules/html/image-optimization/README.md' },
          { text: 'Responsive Images', link: '/modules/html/responsive-images/README.md' },
          { text: 'Putting It Together', link: '/modules/html/image-optimization/putting-it-together.md' },
          { text: 'Media Elements', link: '/modules/html/media-elements/README.md' },
        ],
      },
      {
        text: 'Week 10: SEO Fundamentals',
        collapsible: true,
        children: [
          { text: 'SEO Basics', link: '/modules/seo/seo-basics/README.md' },
          { text: 'SEO Meta Tags', link: '/modules/seo/seo-meta-tags/README.md' },
          { text: 'Canonical Links and URL Structure', link: '/modules/seo/seo-meta-tags/canonical-and-urls.md' },
          { text: 'SEO Content', link: '/modules/seo/seo-content/README.md' },
        ],
      },
      {
        text: 'Week 11: SEO in Practice',
        collapsible: true,
        children: [
          { text: 'Open Graph', link: '/modules/seo/open-graph/README.md' },
          { text: 'Structured Data', link: '/modules/seo/structured-data/README.md' },
          { text: 'SEO Audit', link: '/modules/seo/seo-audit/README.md' },
        ],
      },
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
      {
        text: 'Week 1: Introduction to CSS',
        collapsible: true,
        children: [
          { text: 'CSS Basics', link: '/modules/css/css-basics/README.md' },
          { text: 'Linking a Stylesheet', link: '/modules/css/css-basics/linking-a-stylesheet.md' },
          { text: 'CSS Selectors', link: '/modules/css/css-selectors/README.md' },
          { text: 'The Cascade', link: '/modules/css/css-cascade/README.md' },
        ],
      },
      {
        text: 'Week 2: The Box Model and Spacing',
        collapsible: true,
        children: [
          { text: 'The Box Model', link: '/modules/css/css-box-model/README.md' },
          { text: 'CSS Units', link: '/modules/css/css-units/README.md' },
          { text: 'Box Sizing', link: '/modules/css/css-box-sizing/README.md' },
          { text: 'aspect-ratio', link: '/modules/css/css-aspect-ratio/README.md' },
        ],
      },
      {
        text: 'Week 3: Typography and Colour',
        collapsible: true,
        children: [
          { text: 'Typography', link: '/modules/css/css-typography/README.md' },
          { text: 'Web Fonts', link: '/modules/css/css-web-fonts/README.md' },
          { text: 'Colour Values', link: '/modules/css/css-colors/README.md' },
        ],
      },
      {
        text: 'Week 4: Selectors, Specificity, and Inheritance',
        collapsible: true,
        children: [
          { text: 'Pseudo-Classes', link: '/modules/css/css-pseudo-classes/README.md' },
          { text: 'Pseudo-Elements', link: '/modules/css/css-pseudo-elements/README.md' },
          { text: 'Combinators', link: '/modules/css/css-complex-selectors/README.md' },
          { text: 'Specificity', link: '/modules/css/css-precedence/README.md' },
          { text: 'The Cascade', link: '/modules/css/css-cascade/README.md' },
        ],
      },
      {
        text: 'Week 5: Flexbox Layouts',
        collapsible: true,
        children: [
          { text: 'Flexbox Layouts', link: '/modules/css/css-flexbox/README.md' },
          { text: 'Wrapped Rows and the flex-flow Shorthand', link: '/modules/css/css-flexbox/wrapped-rows.md' },
          { text: 'Controlling Individual Items', link: '/modules/css/css-flexbox/item-sizing.md' },
          { text: 'The order Property', link: '/modules/css/css-flexbox/the-order-property.md' },
          { text: 'Styling a Navigation Bar', link: '/modules/css/css-styling-navigation/README.md' },
        ],
      },
      {
        text: 'Week 6: CSS Grid Layouts',
        collapsible: true,
        children: [
          { text: 'CSS Grid Layouts', link: '/modules/css/css-grid/README.md' },
          { text: 'Subgrid', link: '/modules/css/css-grid/subgrid.md' },
          { text: 'Grid and Flexbox Together', link: '/modules/css/css-grid/grid-and-flexbox-together.md' },
          { text: 'The position Property', link: '/modules/css/css-position/README.md' },
        ],
      },
      {
        text: 'Week 7: Responsive Design and Media Queries',
        collapsible: true,
        children: [
          { text: 'Responsive Design and Media Queries', link: '/modules/css/css-media-queries/README.md' },
          { text: 'CSS Units', link: '/modules/css/css-units/README.md' },
          { text: 'Fluid Sizing Without a Query', link: '/modules/css/css-fluid-sizing/README.md' },
          { text: 'Layouts That Respond Without a Query', link: '/modules/css/css-rwd-patterns/README.md' },
          { text: 'Container Queries', link: '/modules/css/css-container-queries/README.md' },
        ],
      },
      { text: 'Week 8: Reading Week', link: '/modules/css/reading-week.md' },
      {
        text: 'Week 9: The DOM and CSS Targeting',
        collapsible: true,
        children: [
          { text: 'The DOM', link: '/modules/css/css-dom/README.md' },
          { text: 'Descendant, Child, Sibling, and Attribute Selectors', link: '/modules/css/css-selectors-adv/README.md' },
          { text: 'Pseudo-Classes', link: '/modules/css/css-pseudo-classes/README.md' },
        ],
      },
      {
        text: 'Week 10: Accessible Styling',
        collapsible: true,
        children: [
          { text: 'Keyboard Access', link: '/modules/accessibility/keyboard-access/README.md' },
          { text: 'Text Scaling', link: '/modules/accessibility/text-scaling/README.md' },
          { text: 'Visually Hidden', link: '/modules/accessibility/visually-hidden/README.md' },
          { text: 'Reduced Motion', link: '/modules/accessibility/reduced-motion/README.md' },
          { text: 'Contrast Preferences and Forced Colors', link: '/modules/accessibility/colour-contrast/contrast-preferences.md' },
          { text: 'Touch Targets', link: '/modules/accessibility/touch-targets/README.md' },
          { text: 'Testing for Accessibility', link: '/modules/accessibility/testing/README.md' },
        ],
      },
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
