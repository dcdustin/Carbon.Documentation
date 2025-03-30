import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Carbon Documentation",
  description: "Carbon Mod Documentation",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/introduction' }
    ],

    sidebar: [
      {text: 'Introduction', link: '/introduction'},
      {
        text: 'Development',
        items: [
          { text: 'Creating Your Project', link: '/development/creating-your-project' },
          { text: 'Local Server Hosting', link: '/development/local-server-hosting' }
        ]
      },
      {
        text: 'Core',
        items: [
          { text: 'Commands', link: '/core/commands' },
          { text: 'Extensions', link: '/core/extensions' }
        ]
      },
      {
        text: 'Archived',
        items: [
          { text: 'Markdown Examples', link: '/archive/markdown-examples' },
          { text: 'Runtime API Examples', link: '/archive/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
