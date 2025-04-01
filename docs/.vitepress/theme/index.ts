// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import CarbonButton from '../components/CarbonButton.vue'
import CarbonBadge from '../components/CarbonBadge.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // https://vitepress.dev/guide/extending-default-theme#app-level-enhancements
    app.component('CarbonButton', CarbonButton)
    app.component('CarbonBadge', CarbonBadge)
  }
} satisfies Theme
