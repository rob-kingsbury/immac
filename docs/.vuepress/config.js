import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'

export default defineUserConfig({
  lang: 'en-US',
  title: 'IMM Web Courses',
  description: 'Algonquin College — Interactive Media Management',

  bundler: viteBundler(),

  theme: defaultTheme({
    navbar: [
      { text: 'Home', link: '/' },
      { text: 'MTM1511', link: '/mtm1511/' },
      { text: 'MTM1544', link: '/mtm1544/' },
    ],

    sidebar: {
      '/mtm1511/': [
        {
          text: 'MTM1511 — Web Components',
          children: [
            '/mtm1511/README.md',
            '/mtm1511/overview/README.md',
            '/mtm1511/content/README.md',
            '/mtm1511/resources/README.md',
          ],
        },
      ],
      '/mtm1544/': [
        {
          text: 'MTM1544 — Web Styles',
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
