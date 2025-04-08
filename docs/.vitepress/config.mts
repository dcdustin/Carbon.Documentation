import { defineConfig } from "vitepress";
import tailwindcss from "@tailwindcss/postcss7-compat";
import autoprefixer from "autoprefixer";
import { tabsMarkdownPlugin } from "vitepress-plugin-tabs";
import { ITEMS_API_URL } from "./shared/constants";
// import { getCategorized, getFiles } from './carbonUtils.mts';

// Function to fetch items data
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
    nav: [
      { text: "Home", link: "/" },
      { text: "Docs", link: "/introduction" },
      {
        text: "References",
        items: [
          { text: "Hooks", link: "/references/hooks" },
          { text: "Blueprints", link: "/references/blueprints" },
          { text: "Items", link: "/references/items" },
          { text: "Entities", link: "/references/entities" },
          { text: "Commands", link: "/references/commands" },
          { text: "ConVars", link: "/references/convars" },
          { text: "Permissions", link: "/references/permissions" },
          { text: "Loot Tables", link: "/references/loot" },
        ],
      },
      { text: "Release Notes", link: "/release-notes" },
    ],

    sidebar: {
      "/": [
        { text: "Introduction", link: "/introduction" },
        { text: "Installing Carbon", link: "/installing-carbon" },
        { text: "Configuring Carbon", link: "/configuring-carbon" },
        {
          text: "Development",
          items: [
            {
              text: "Local Server Hosting",
              link: "/development/local-server-hosting",
            },
            {
              text: "Creating Your Project",
              link: "/development/creating-your-project",
            },
            {
              text: "Creating Your First Plugin",
              link: "/development/creating-your-first-plugin",
            },
          ],
        },
        {
          text: "Core",
          items: [
            { text: "Extensions", link: "/core/extensions" },
            {
              text: "Modules",
              collapsed: false,
              items: [
                {
                  text: "What are Modules?",
                  link: "/core/modules/what-are-modules",
                },
                { text: "Admin Module", link: "/core/modules/admin-module" },

                {
                  text: "Image Database Module",
                  link: "/core/modules/image-db-module",
                },
                {
                  text: "Optional Modules",
                  collapsed: true,
                  items: [
                    {
                      text: "AutoWipe Module",
                      link: "/core/modules/optional-modules/autowipe-module",
                    },
                    {
                      text: "Circular Networking Module",
                      link: "/core/modules/optional-modules/circularnetworking-module",
                    },
                    {
                      text: "Gather Manager Module",
                      link: "/core/modules/optional-modules/gather-manager-module",
                    },
                    {
                      text: "Moderation Tools Module",
                      link: "/core/modules/optional-modules/moderation-tools-module",
                    },
                    {
                      text: "Selective EAC Module",
                      link: "/core/modules/optional-modules/selective-eac-module",
                    },
                    {
                      text: "Stack Manager Module",
                      link: "/core/modules/optional-modules/stack-manager-module",
                    },
                    {
                      text: "Vanish Module",
                      link: "/core/modules/optional-modules/vanish-module",
                    },
                    {
                      text: "Whitelist Module",
                      link: "/core/modules/optional-modules/whitelist-module",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],

      "/references/": [
        {
          text: "References",
          link: "/references",
          items: [
            { text: "Hooks", link: "/references/hooks" },
            { text: "Blueprints", link: "/references/blueprints" },
            { text: "Items", link: "/references/items" },
            { text: "Entities", link: "/references/entities" },
            { text: "Commands", link: "/references/commands" },
            { text: "ConVars", link: "/references/convars" },
            { text: "Permissions", link: "/references/permissions" },
            { text: "Loot Tables", link: "/references/loot" },

            // { text: 'Prefabs', collapsed: true, items: getFiles("../references/prefabs") },
          ],
        },
      ],
    },

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/CarbonCommunity/Carbon.Documentation",
      },
      { icon: "discord", link: "https://discord.com/invite/carbonmod" },
      { icon: "twitter", link: "https://twitter.com/CarbonModGG" },
      { icon: "youtube", link: "https://www.youtube.com/@carbonmodgg" },
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
          
          // Only add items data to the search index for the items reference page
          if (env.relativePath === 'references/items/index.md') {
            try {
              const items = await fetchItems()
              // Transform items into searchable documents with proper structure
              const itemContent = items.map(item => `
# ${item.DisplayName}

${item.Description || ''}

[View Details](/Carbon.Documentation/references/items/details?id=${item.Id})
`).join('\n\n---\n\n')
              
              return html + '\n\n' + await md.render(itemContent)
            } catch (error) {
              console.error('Error processing items for search:', error)
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
