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
      { text: 'Week 2: Core HTML Elements', link: '/modules/html/html-core-elements.md' },
      { text: 'Week 3: Links, Images, and Media', link: '/modules/html/links-images-media.md' },
      { text: 'Week 4: Semantic HTML', link: '/modules/html/semantic-html.md' },
      { text: 'Week 5: Site Architecture and Planning', link: '/modules/html/site-architecture-planning.md' },
      { text: 'Week 6: Web Accessibility Fundamentals', link: '/modules/accessibility/web-accessibility-fundamentals.md' },
      { text: 'Week 7: HTML Forms and Data Structures', link: '/modules/html/html-forms.md' },
      { text: 'Week 8: Reading Week', link: '/modules/reading-week.md' },
      { text: 'Week 9: Optimizing Images and Media', link: '/modules/html/image-optimization.md' },
      { text: 'Week 10: SEO Fundamentals', link: '/modules/seo/seo-fundamentals.md' },
      { text: 'Week 11: SEO in Practice', link: '/modules/seo/seo-in-practice.md' },
      { text: 'Week 12: Code Quality and Validation', link: '/modules/html/code-quality-validation.md' },
      { text: 'Week 13: Advanced HTML Patterns', link: '/modules/html/advanced-html-patterns.md' },
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
