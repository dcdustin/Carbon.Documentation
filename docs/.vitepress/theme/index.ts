// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import CarbonButton from '../components/CarbonButton.vue'
import CarbonBadge from '../components/CarbonBadge.vue'
import CarbonChange from '../components/CarbonChange.vue'
import CarbonIcons from '../components/CarbonIcons.vue'
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'
import SwitchesReference from '../components/SwitchesReference.vue'

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
    app.component('SwitchesReference', SwitchesReference)
    enhanceAppWithTabs(app)
  },
} satisfies Theme
