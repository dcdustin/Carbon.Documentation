import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'

function getHooks(dir: string): { text: string; link: string }[] {
  const fullDir = path.resolve(__dirname, dir)
  const files = fs.readdirSync(fullDir)
  return files
    .filter(file => file.endsWith('.md') && file.toLowerCase() !== 'index.md')
    .map(file => {
      const name = file.replace(/\.md$/, '')
      return {
        text: name.replace(/-/g, ' '),
        link: `/${dir}/${name}`
      }
    })  
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Carbon Documentation",
  description: "Carbon Mod Documentation",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/introduction' },
      { text: 'Hooks', link: '/hooks' },
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
          text: "Hooks",
          items: [
            {
              text: "Animal (31)",
              items: getHooks("../hooks/Animal")
            }
          ]
        }
      ]
    },
 
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
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
 