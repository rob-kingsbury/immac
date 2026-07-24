import { defineClientConfig } from 'vuepress/client'
import CssDemo from './components/CssDemo.vue'
import SearchBox from './components/SearchBox.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component('CssDemo', CssDemo)
    app.component('SearchBox', SearchBox)
  },
})
