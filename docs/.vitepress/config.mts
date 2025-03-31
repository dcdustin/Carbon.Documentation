import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'

function getHooks(dir: string): { text: string; items: { text: string; link: string }[] }[] {
  const fullDir = path.resolve(__dirname, dir)
  const categories = fs.readdirSync(fullDir, { withFileTypes: true })

  return categories
    .filter(entry => entry.isDirectory())
    .map(category => { 
      const categoryPath = path.join(fullDir, category.name)
      const files = fs.readdirSync(categoryPath)
      const items = files
        .filter(file => file.endsWith('.md') && file.toLowerCase() !== 'index.md')
        .map(file => {
          const name = file.replace(/\.md$/, '')
          return {
            text: name, 
            link: `/${dir}/${category.name}/${name}`
          }
        }) 
      return {
        text: category.name + " (" + getHookCount(categoryPath) + ")",
        collapsed: true,
        items
      }  
    }) 
} 
 
function getHookCount(dir: string): number {
  const fullDir = path.resolve(__dirname, dir);
  const files = fs.readdirSync(fullDir);
  return files
    .filter(file => file.endsWith('.md'))
    .length;
}
 
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Carbon Documentation",
  description: "Carbon Mod Documentation",
  base: '/Carbon.Documentation/',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/introduction' },
      { text: 'Hooks', link: '/hooks' },
      { text: 'References', link: '/references' },
      { text: 'Release Notes', link: '/release-notes'},
    ],

    sidebar: {
      '/': [
        {text: 'Introduction', link: '/introduction'},
        {text: 'Installing Carbon', link: '/installing-carbon'},
        {text: 'Configuring Carbon', link: '/configuring-carbon'},
        {
          text: 'Development',
          items: [
            { text: 'Creating Your Project', link: '/development/creating-your-project' },
            { text: 'Local Server Hosting', link: '/development/local-server-hosting' },
            { text: 'Creating Your First Plugin', link: '/development/creating-your-first-plugin' },
          ]
        },
        {
          text: 'Core',
          items: [
            { text: 'Extensions', link: '/core/extensions' }
          ]
        },
      ],
      
      '/hooks/': [
        {
          text: 'Hooks',
          link: '/hooks',
          items: getHooks("../hooks")
        } 
      ],
      
      '/references/': [
        {
          text: 'References',
          link: '/references',
          items: [
            { text: 'Blueprints', link: '/references/blueprints' },
            { text: 'Commands', link: '/references/commands' },
            { text: 'ConVars', link: '/references/convars' },
            { text: 'Entities', link: '/references/entities' },
            { text: 'Items', link: '/references/items' },
            { text: 'Loot Tables', link: '/references/loot-tables' },
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
    },

    editLink: {
      pattern: 'https://github.com/CarbonCommunity/Carbon.Documentation/edit/main/docs/:path',
      text: 'Suggest a change'
    },
    
  },
})
