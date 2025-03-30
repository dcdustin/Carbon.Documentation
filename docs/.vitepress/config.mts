import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Carbon Documentation",
  description: "Carbon Mod Documentation",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/introduction' },
      { text: 'Hooks', link: '/hooks', activeMatch: '/hooks/' },
    ],

    sidebar: {
      '/': [
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
            { text: 'ConVars', link: '/core/convars' },
            { text: 'Extensions', link: '/core/extensions' }
          ]
        },
        {
          text: 'Archived',
          items: [
            { text: 'Markdown Examples', link: '/archive/markdown-examples' },
            { text: 'Runtime API Examples', link: '/archive/api-examples' }
          ]
        },
      ],
      
      '/hooks/': [
        {
          text: 'Hooks',
          link: '/hooks',
          items: [
            { text: 'Using Hooks', link: '/hooks/' },
            { text: 'OnPlayerConnected', link: '/hooks/onplayerconnected' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/CarbonCommunity/Carbon.Documentation' },
      { icon: 'discord', link: 'https://discord.com/invite/carbonmod' },
      { icon: 'twitter', link: 'https://twitter.com/CarbonModGG' },
      { icon: 'youtube', link: 'https://www.youtube.com/@carbonmodgg' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'All trademarks referenced are the properties of their respective owners. © 2025 carbonmod.gg and codefling.com All rights reserved.'
    },

    search: {
      provider: 'local'
    }
  }
})
