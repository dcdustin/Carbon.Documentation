---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Carbon Documentation"
  icon: "/dev/public/logos/carbon-log.png"
  text: "Innovating Rust Modding"
  tagline: Carbon, making up most of the known universe since at least 1992
  actions:
    - theme: brand
      text: Join our Discord
      link: https://discord.gg/carbonmod
    - theme: alt
      text: User Docs
      link: /users/introduction
    - theme: alt
      text: Developer Docs
      link: /devs/local-server-hosting
    - theme: alt
      text: Hooks
      link: /references/hooks

features:
  - title: High Performance
    details: Carbon offers a carefully written framework with performance as the number one factor to provide an even better experience for your players.
  - title: Oxide Support
    details: We have made it very easy to make the switch from Oxide to Carbon by keeping the folder/plugin structure the same.
  - title: Scalability
    details: We have made Carbon super lightweight by only providing the very essential hooks needed.
  - title: Permissions
    details: We have created a more optimized modular permission system that allows for users to create thier own serializers.
  - title: Dynamic Hooks
    details: Hooks are loaded dynamically to ensure only the hooks used by plugins are loaded. This eliminates a ton of redundant calls and will improve the performance of your server.
  - title: Hot Reload
    details: Carbon allows for your Harmony mods to be reloaded on the fly when changes are made.
---