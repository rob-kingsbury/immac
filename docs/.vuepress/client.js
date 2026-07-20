import { defineClientConfig } from 'vuepress/client'
import CssDemo from './components/CssDemo.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component('CssDemo', CssDemo)
  },
})
