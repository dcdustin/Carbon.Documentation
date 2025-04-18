import { defineConfig } from "vitepress";
import tailwindcss from "@tailwindcss/postcss7-compat";
import autoprefixer from "autoprefixer";
import { tabsMarkdownPlugin } from "vitepress-plugin-tabs";
import { ITEMS_API_URL, HOOKS_API_URL, BLUEPRINTS_API_URL } from "./shared/constants";
// import { getCategorized, getFiles } from './carbonUtils.mts';


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
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
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
    logo: "/img/carbon-logo.png",
    outlineTitle: "On this page",
    nav: [
      { text: "Home", link: "/" },
      { text: "Docs", items: [
        { text: "Users", link: "/users/introduction" },
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
          { text: "Commands", link: "/references/commands" },
          { text: "ConVars", link: "/references/convars" },
          { text: "Loot Tables", link: "/references/loot" },
        ],
      },
      { text: "Release Notes", link: "/release-notes" },
    ],

    sidebar: {

      '/references/': [
        {
          text: 'References',
          link: '/references',
          items: [ 
            {text: 'Hooks', link: '/references/hooks'},
            { text: 'Blueprints', link: '/references/blueprints' },
            { text: 'Items', link: '/references/items' },
            { text: 'Entities', link: '/references/entities' },
            { text: 'Commands', link: '/references/commands' },
            { text: 'ConVars', link: '/references/convars' },
            { text: 'Loot Tables', link: '/references/loot' },

            // { text: 'Prefabs', collapsed: true, items: getFiles("../references/prefabs") },

          ]
        } 
      ],

      '/users/': [
        {
          text: 'User Documentation',
          link: '/users',
          items: [
            {text: 'Introduction', link: '/users/introduction'},
            {text: 'Installing Carbon', link: '/users/installing-carbon'},
            {text: 'Configuring Carbon', link: '/users/configuring-carbon'},
            {
              text: 'Carbon Modules',
              collapsed: true,
              items: [
                { text: 'What are Modules?', link: '/users/modules/what-are-modules' },
                { text: 'Admin Module', link: '/users/modules/admin-module' },
                { text: 'Color Picker Module', link: '/users/modules/color-picker-module' },
                { text: 'Date Picker Module', link: '/users/modules/date-picker-module' },
                { text: 'File Picker Module', link: '/users/modules/file-picker-module' },
                {text: 'Image Database Module', link: '/users/modules/image-db-module' },
                { text: 'Modal Module', link: '/users/modules/modal-module' },
                { text: 'Optional Modules', collapsed: true, items: [
                  { text: 'AutoWipe Module', link: '/users/modules/optional-modules/autowipe-module' },
                  { text: 'Circular Networking Module', link: '/users/modules/optional-modules/circularnetworking-module' },
                  { text: 'Gather Manager Module', link: '/users/modules/optional-modules/gather-manager-module' },
                  { text: 'Moderation Tools Module', link: '/users/modules/optional-modules/moderation-tools-module' },
                  { text: 'Selective EAC Module', link: '/users/modules/optional-modules/selective-eac-module' },
                  { text: 'Stack Manager Module', link: '/users/modules/optional-modules/stack-manager-module' },
                  { text: 'Vanish Module', link: '/users/modules/optional-modules/vanish-module' },
                  { text: 'Whitelist Module', link: '/users/modules/optional-modules/whitelist-module' },
                ]
              }
              ]
            },
            { text: 'Developer Documentation', link: '/devs/local-server-hosting'},
            
          ]
        } 
      ],

      '/devs/': [
        {
          text: 'Developer Documentation',
          link: '/devs',
          items: [
            { text: 'Local Server Hosting', link: '/devs/local-server-hosting' },
            { text: 'Creating Your Project', link: '/devs/creating-your-project' },
            { text: 'Creating Your First Plugin', link: '/devs/creating-your-first-plugin' },
            {
              text: 'Core Features',
              collapsed: true,
              items: [
                { text: 'Extensions', link: '/devs/core/extensions'},
                { text: 'Permissions', link: '/devs/core/permissions' },
                { text: 'Client Entities', link: '/devs/core/client-entities' },
                { text: 'LUI (Lightweight UI)', link: '/devs/core/lightweight-ui' },
              ]
            },
            {
              text: 'Using Modules',
              collapsed: true,
              items: [
                {text: 'Integrating Modules', link: '/devs/modules/integrating-modules'},
                { text: 'Color Picker Module', link: '/devs/modules/color-picker-module' },
                { text: 'Date Picker Module', link: '/devs/modules/date-picker-module' },
                { text: 'File Picker Module', link: '/devs/modules/file-picker-module' },
                { text: 'Image Database Module', link: '/devs/modules/image-db-module' },
                { text: 'Modal Module', link: '/devs/modules/modal-module' },
              ]
            },
            { text: 'User Documentation', link: '/users/introduction' },
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
      message: "Released under the MIT License.",
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
              text: 1
            }
          }
        },
        _render: async (src, env, md) => {
          const html = await md.render(src, env)
          
          if (env.relativePath === 'references/items/index.md') {
            try {
              const items = await fetchItems()
              const itemContent = items.map(item => `
# [*Item*] ${item.DisplayName} 

${item.Description || ''}

[View Details](/Carbon.Documentation/references/items/details?id=${item.Id})
`).join('\n\n---\n\n')
              
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
                  hooks.map((hook: any) => `
# [*Hook*] ${hook.name || ''} 

${(hook.descriptions || []).join('\n\n') || ''}

**Category:** ${category}
${(hook.parameters || []).length ? `**Parameters:** ${(hook.parameters || []).map((p: any) => `${p.name}: ${p.typeName}`).join(', ')}` : ''}
${hook.returnTypeName ? `**Returns:** ${hook.returnTypeName}` : ''}

[View Details](/Carbon.Documentation/references/hooks/details?name=${encodeURIComponent(hook.fullName || hook.name || '')})
`)).join('\n\n---\n\n')
              
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
              const blueprintContent = blueprints.map((blueprint: any) => `
# [*Blueprint*] ${blueprint.Item.DisplayName || ''} {#${blueprint.Item.ShortName}}

${blueprint.Item.Description || ''}

**Category:** ${getItemCategoryText(blueprint.Item.Category)}
**Workbench Level:** ${blueprint.WorkbenchLevelRequired || 0}
${blueprint.Ingredients ? `**Ingredients:** ${blueprint.Ingredients.map((i: any) => `${i.Amount}x ${i.Item.DisplayName}`).join(', ')}` : ''}

[View Details](/Carbon.Documentation/references/blueprints/details?id=${encodeURIComponent(blueprint.Item.ShortName || '')})
`).join('\n\n---\n\n')
              
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
