import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'

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
      '/modules/html/intro-to-the-web.md',
      '/modules/html/html-core-elements.md',
      '/modules/html/links-images-media.md',
      '/modules/html/semantic-html.md',
      '/modules/html/site-architecture-planning.md',
      '/modules/accessibility/web-accessibility-fundamentals.md',
      '/modules/html/html-forms.md',
      '/modules/html/image-optimization.md',
      '/modules/seo/seo-fundamentals.md',
      '/modules/seo/seo-in-practice.md',
      '/modules/html/code-quality-validation.md',
      '/modules/html/advanced-html-patterns.md',
      '/modules/project/project-development.md',
      '/modules/project/project-work-lab.md',
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

    colorMode: 'auto',
    colorModeSwitch: true,

    lastUpdated: false,
    contributors: false,
  }),
})
