import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { copyCodePlugin } from '@vuepress/plugin-copy-code'

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
      { text: 'Week 1: Welcome to the Course', link: '/modules/welcome/welcome-to-the-course.md' },
      { text: 'Week 2: Git, GitHub, and Pages Setup', link: '/modules/git/git-github-pages-setup.md' },
      { text: 'Week 3: Core HTML Elements', link: '/modules/html/html-core-elements.md' },
      { text: 'Week 4: Semantic HTML', link: '/modules/html/semantic-html.md' },
      { text: 'Week 5: Site Architecture and Planning', link: '/modules/html/site-architecture-planning.md' },
      { text: 'Week 6: Links, Images, and Media', link: '/modules/html/links-images-media.md' },
      { text: 'Week 7: Web Accessibility Fundamentals', link: '/modules/accessibility/web-accessibility-fundamentals.md' },
      { text: 'Week 8: Reading Week', link: '/modules/reading-week.md' },
      { text: 'Week 9: HTML Forms and Data Structures', link: '/modules/html/html-forms.md' },
      { text: 'Week 10: Optimizing Images and Media', link: '/modules/html/image-optimization.md' },
      { text: 'Week 11: SEO for Web Pages', link: '/modules/seo/seo-for-web-pages.md' },
      { text: 'Week 12: Code Quality and Validation', link: '/modules/html/code-quality-validation.md' },
      { text: 'Week 13: Advanced HTML Patterns', link: '/modules/html/advanced-html-patterns.md' },
      { text: 'Week 14: Project Development', link: '/modules/project/project-development.md' },
      { text: 'Week 15: Project Work Lab', link: '/modules/project/project-work-lab.md' },
    ],
  },
  { text: 'Resources', link: '/mtm1511/resources/' },
]

export default defineUserConfig({
  lang: 'en-US',
  base: '/immac/',
  title: 'IMM Web Courses',
  description: 'Algonquin College, Interactive Media Management',

  bundler: viteBundler(),

  // Copy button on every code block.
  plugins: [
    copyCodePlugin({}),
  ],

  theme: defaultTheme({
    navbar: [
      { text: 'Home', link: '/' },
      { text: 'MTM1511', link: '/mtm1511/' },
      { text: 'MTM1544', link: '/mtm1544/' },
    ],

    sidebar: {
      '/mtm1511/': mtm1511Sidebar,
      '/modules/': mtm1511Sidebar,
      '/mtm1544/': [
        {
          text: 'MTM1544: Web Styles',
          children: [
            '/mtm1544/README.md',
            '/mtm1544/overview/README.md',
            '/mtm1544/content/README.md',
            '/mtm1544/resources/README.md',
          ],
        },
      ],
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
