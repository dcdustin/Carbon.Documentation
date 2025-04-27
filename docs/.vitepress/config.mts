import { defineConfig } from "vitepress";
import tailwindcss from "@tailwindcss/postcss7-compat";
import autoprefixer from "autoprefixer";
import { tabsMarkdownPlugin } from "vitepress-plugin-tabs";
import { ITEMS_API_URL, HOOKS_API_URL, BLUEPRINTS_API_URL } from "./shared/constants";
// import { getCategorized, getFiles } from './carbonUtils.mts';
import fs from 'fs'
import path from 'path'


async function fetchItems() {
  try {
    const response = await fetch(ITEMS_API_URL);
    const items = await response.json();
    return items;
  } catch (error) {
    console.error("Failed to fetch items for search indexing:", error);
    return [];
  }
} 

// Function to convert category numbers to readable names
function getItemCategoryText(category: number): string {
  const categories: Record<number, string> = {
    0: 'Weapon',
    1: 'Construction',
    2: 'Items',
    3: 'Resources',
    4: 'Attire',
    5: 'Tools',
    6: 'Medical',
    7: 'Food',
    8: 'Ammunition',
    9: 'Traps',
    10: 'Misc',
    11: 'Common',
    12: 'Component',
    13: 'Component',
    14: 'Electrical',
    15: 'Fun',
    16: 'Decor',
    17: 'Vehicle',
    18: 'Misc',
    19: 'All',
  }
  return categories[category] || 'Uncategorized'
}

export default defineConfig({
  title: "Carbon Documentation",
  description: "Documentation for Carbon",
  base: "/Carbon.Documentation/",
  head: [["link", { rel: "icon", href: "/Carbon.Documentation/favicon.ico" }]],
  ignoreDeadLinks: true,
  cleanUrls: true,
  lastUpdated: true,
  markdown: {
    image: {
      lazyLoading: true,
    },
    config(md) {
      md.use(tabsMarkdownPlugin);
    },
  },
  themeConfig: {
    logo: "/logos/carbon-logo.webp",
    outlineTitle: "On this page",
    nav: [
      { text: "Home", link: "/" },
      { text: "Docs", items: [
        { text: "Owners", link: "/owners/introduction" },
        { text: "Developers", link: "/devs/local-server-hosting" },
      ]
    },
      {
        text: "References",
        items: [
          { text: "Hooks", link: "/references/hooks" },
          { text: "Blueprints", link: "/references/blueprints" },
          { text: "Items", link: "/references/items" },
          { text: "Entities", link: "/references/entities" },
          { text: "Prefabs", link: "/references/prefabs" },
          { text: "Commands", link: "/references/commands" },
          { text: "ConVars", link: "/references/convars" }
        ],
      },
      { text: "Release Notes", link: "/release-notes" },
    ],

    sidebar: {
      '/': [
        {
          text: 'Owners Documentation',
          collapsed: false,
          items: [
            { text: 'Getting Started', link: '/owners/introduction'},
            { text: '⚙️ Installing Carbon', link: '/owners/installing-carbon'},
            { text: '⚙️ Configuring Carbon', link: '/owners/configuring-carbon'},
            {
              text: '🎳 Carbon Modules',
              link: '/owners/modules/what-are-modules',
              collapsed: true,
              items: [
                { text: 'What are Modules?', link: '/owners/modules/what-are-modules' },
                { text: 'Admin Module', link: '/owners/modules/admin-module' },
                { text: 'Color Picker Module', link: '/owners/modules/color-picker-module' },
                { text: 'Date Picker Module', link: '/owners/modules/date-picker-module' },
                { text: 'File Picker Module', link: '/owners/modules/file-picker-module' },
                { text: 'Image Database Module', link: '/owners/modules/image-db-module' },
                { text: 'Modal Module', link: '/owners/modules/modal-module' },
                { text: 'Optional Modules', collapsed: true, items: [
                  { text: 'AutoWipe Module', link: '/owners/modules/optional-modules/autowipe-module' },
                  { text: 'Circular Networking Module', link: '/owners/modules/optional-modules/circularnetworking-module' },
                  { text: 'Gather Manager Module', link: '/owners/modules/optional-modules/gather-manager-module' },
                  { text: 'Moderation Tools Module', link: '/owners/modules/optional-modules/moderation-tools-module' },
                  { text: 'Selective EAC Module', link: '/owners/modules/optional-modules/selective-eac-module' },
                  { text: 'Stack Manager Module', link: '/owners/modules/optional-modules/stack-manager-module' },
                  { text: 'Vanish Module', link: '/owners/modules/optional-modules/vanish-module' },
                  { text: 'Whitelist Module', link: '/owners/modules/optional-modules/whitelist-module' },
                ]
              }
              ]
            },
            { text: '🥳 Oxide Porting', link: '/owners/oxide-porting'},
          ]
        },
        {
          text: 'Developer Documentation',
          collapsed: false,
          items: [
            { text: '🖥️ Local Server Hosting', link: '/devs/local-server-hosting' },
            { text: '📦 Creating Your Project', link: '/devs/creating-your-project' },
            { text: '🐒 Creating Your First Plugin', link: '/devs/creating-your-first-plugin' },
            {
              text: '🧱 Features',
              collapsed: true,
              items: [
                { text: '🔧 Extensions', link: '/devs/core/extensions' },
                { text: '🔧 Permissions', link: '/devs/core/permissions' },
                { text: '🔧 Client Entities', link: '/devs/core/client-entities' },
                { text: '🔧 LUI (Lightweight UI)', link: '/devs/core/lightweight-ui' },
                { text: '🔧 Conditionals', link: '/devs/core/conditionals' },
                { text: '🔧 Async Shutdown', link: '/devs/core/async-shutdown' },
                { text: '🔧 ZIP Scripts & Packages', link: '/devs/core/zip-script-packages' },
                { text: '🔧 Profiler (Mono)', link: '/devs/core/mono-profiler' }
              ]
            },
            {
              text: '🛠️ Modules',
              collapsed: true,
              items: [
                { text: '🛠️ Integrating Modules', link: '/devs/modules/integrating-modules'},
                { text: '🛠️ Color Picker Module', link: '/devs/modules/color-picker-module' },
                { text: '🛠️ Date Picker Module', link: '/devs/modules/date-picker-module' },
                { text: '🛠️ File Picker Module', link: '/devs/modules/file-picker-module' },
                { text: '🛠️ Image Database Module', link: '/devs/modules/image-db-module' },
                { text: '🛠️ Modal Module', link: '/devs/modules/modal-module' },
              ]
            }
          ]
        },
        {
          text: 'Carbon References',
          collapsed: false,
          items: [ 
            { text: 'Hooks', link: '/references/hooks'},
            { text: 'Commands', link: '/references/commands' },
            { text: 'ConVars', link: '/references/convars' }
          ]
        },
        {
          text: 'Rust References',
          collapsed: false,
          items: [ 
            { text: 'Blueprints', link: '/references/blueprints' },
            { text: 'Items', link: '/references/items' },
            { text: 'Entities', link: '/references/entities' },
            { text: 'Prefabs', link: '/references/prefabs' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/CarbonCommunity/Carbon.Documentation' },
      { icon: 'discord', link: 'https://discord.gg/carbonmod' },
      { icon: 'twitter', link: 'https://twitter.com/CarbonModGG' },
      { icon: 'youtube', link: 'https://www.youtube.com/@carbonmodgg' },
    ],

    footer: {
      message: "Released under the MIT License. Feel free to <a href='https://github.com/CarbonCommunity/Carbon.Documentation' target='_blank'>help us improve</a>!",
      copyright:
        "All trademarks referenced are the properties of their respective owners. © 2025 carbonmod.gg and codefling.com All rights reserved.",
    },

    search: {
      provider: 'local',
      options: {
        detailedView: true,
        miniSearch: {
          searchOptions: {
            fuzzy: 0.2,
            prefix: true,
            boost: {
              title: 5,
              headers: 4,
              text: 2
            }
          }
        },
        _render: async (src, env, md) => {
          const html = await md.render(src, env)
          
          if (env.relativePath === 'references/items/index.md') {
            try {
              const items = await fetchItems()
              const itemContent = items.map(item => `# [*Item*] ${item.DisplayName} 

${item.Description || ''}`).join('\n\n---\n\n')
              
              return html + '\n\n' + await md.render(itemContent)
            } catch (error) {
              console.error('Error processing items for search:', error)
              return html
            }
          }

          if (env.relativePath === 'references/hooks/index.md') {
            try {
              const response = await fetch(HOOKS_API_URL)
              const data = await response.json()
              const hookContent = Object.entries(data as Record<string, any[]>)
                .flatMap(([category, hooks]) => 
                  hooks.map((hook: any) => `# [*Hook*] ${hook.name || ''}`)).join('\n\n---\n\n')
              
              return html + '\n\n' + await md.render(hookContent)
            } catch (error) {
              console.error('Error processing hooks for search:', error)
              return html
            }
          }

          if (env.relativePath === 'references/blueprints/index.md') {
            try {
              const response = await fetch(BLUEPRINTS_API_URL)
              const blueprints = await response.json()
              const blueprintContent = blueprints.map((blueprint: any) => `# [*Blueprint*] ${blueprint.Item.DisplayName || ''} {#${blueprint.Item.ShortName}}

${blueprint.Item.Description || ''}`).join('\n\n---\n\n')
              return html + '\n\n' + await md.render(blueprintContent)
            } catch (error) {
              console.error('Error processing blueprints for search:', error)
              return html
            }
          }
    
          return html
        }
      }
    },

    editLink: {
      pattern:
        "https://github.com/CarbonCommunity/Carbon.Documentation/edit/main/docs/:path",
      text: "Suggest a change",
    },
  },
  vite: {
    css: {
      postcss: {
        plugins: [tailwindcss, autoprefixer],
      },
    },
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes("node_modules")) {
              if (id.includes("@vueuse")) return "vueuse";
              if (id.includes("markdown-it")) return "markdown";
              if (id.includes("lucide-vue-next")) return "icons";
              if (
                id.includes("class-variance-authority") ||
                id.includes("clsx") ||
                id.includes("tailwind-merge") ||
                id.includes("tailwindcss-animate")
              )
                return "ui";
            }
          },
        },
      },
    },
    optimizeDeps: {
      exclude: ["@tailwindcss/postcss7-compat"],
    },
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.includes("-"),
      },
    },
  },
});
