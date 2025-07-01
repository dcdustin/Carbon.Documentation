// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import CarbonBadge from '@/components/CarbonBadge.vue'
import CarbonButton from '@/components/CarbonButton.vue'
import CarbonChange from '@/components/CarbonChange.vue'
import CarbonIcons from '@/components/CarbonIcons.vue'
import './style.css'

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
    app.component('CarbonChange', CarbonChange)
    app.component('CarbonIcons', CarbonIcons)
    enhanceAppWithTabs(app)
  },
} satisfies Theme
