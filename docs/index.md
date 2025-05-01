---
layout: home

hero:
  name: "Carbon Documentation"
  text: "Innovating Rust Modding"
  tagline: A fully up-to-date documentation of all things Carbon, Rust index and somewhat Oxide.
  actions:
    - theme: brand
      text: Join our Discord
      link: https://discord.gg/carbonmod
    - theme: alt
      text: Owner Docs
      link: /owners/introduction
    - theme: alt
      text: Developer Docs
      link: /devs/local-server-hosting
    - theme: alt
      text: Hooks
      link: /references/hooks

features:
  - title: High Performance
    details: Carbon offers a carefully written framework with performance as the number one factor to provide an even better experience for your players.
    icon: 📈
  - title: Oxide Support
    details: We have made it very easy to make the switch from Oxide to Carbon by keeping the folder/plugin structure the same. <a class="textLink" href="/owners/oxide-porting">Learn more</a>
    icon: 🎯
  - title: Scalability
    details: Carbon super lightweight by only providing the very essential hooks needed, keeping things vanilla when there are no changes made by plugins.
    icon: ⚖️
  - title: Permissions
    details: We have created a more optimized modular permission system that allows for users to create thier own serializers. <a class="textLink" href="/devs/core/permissions">Learn more</a>
    icon: ⚙️
  - title: Dynamic Hooks
    details: Hooks are loaded dynamically to ensure only the hooks used by plugins are loaded. This eliminates a ton of redundant calls and will improve the performance of your server. <a class="textLink" href="/references/hooks">Learn more</a>
    icon: 🪝
  - title: Hot Reload
    details: Carbon allows for your Harmony mods to be reloaded on the fly when changes are made.
    icon: 🔥
---

<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const mainMembers = [
  {
    avatar: '/team/Raul.webp',
    name: 'Raul',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/raulssorban' },
      { icon: 'twitter', link: 'https://twitter.com/raulssorban' },
      { icon: 'cf', link: 'https://codefling.com/raul' }
    ]
  },
  {
    avatar: '/team/Death.webp',
    name: 'Death',
    title: 'Co-Producer',
    links: [
      { icon: 'github', link: 'https://github.com/Deathicated' },
      { icon: 'cf', link: 'https://twitter.com/raulssorban' }
    ]
  },
  {
    avatar: '/team/MalS.webp',
    name: 'MalS',
    title: 'Moderator',
    links: [
      { icon: 'cf', link: 'https://codefling.com/mals' }
    ]
  },
  {
    avatar: '/team/Steenamaroo.webp',
    name: 'Steenamaroo',
    title: 'Emotional Support',
    links: [
      { icon: 'github', link: 'https://github.com/steenamaroo' },
      { icon: 'cf', link: 'https://codefling.com/steenamaroo' }
    ]
  }
]

const docsMembers = [
  {
    avatar: '/team/Bubbafett.webp',
    name: 'Bubbafett',
    title: 'Documentation',
    links: [
      { icon: 'cf', link: 'https://codefling.com/bubbafett' }
    ]
  },
  {
    avatar: '/team/Goo.webp',
    name: 'Goo',
    title: 'Documentation',
    links: [
      { icon: 'cf', link: 'https://codefling.com/goo_' }
    ]
  }
]

const contributorMembers = [
  {
    avatar: '/team/Patrette.webp',
    name: 'Patrette',
    title: 'Contributor',
    links: [
      { icon: 'cf', link: 'https://codefling.com/patrette' }
    ]
  },
  {
    avatar: '/team/ThePitereq.webp',
    name: 'ThePitereq',
    title: 'Contributor',
    links: [
      { icon: 'cf', link: 'https://codefling.com/thepitereq' }
    ]
  },
  {
    avatar: '/team/DezLife.webp',
    name: 'DezLife',
    title: 'Contributor',
    links: [
      { icon: 'github', link: 'https://github.com/DezLife' },
      { icon: 'cf', link: 'https://codefling.com/dezlife' }
    ]
  },
  {
    avatar: '/team/Kulltero.webp',
    name: 'Kulltero',
    title: 'Contributor',
    links: [
      { icon: 'github', link: 'https://github.com/Kulltero' },
      { icon: 'cf', link: 'https://codefling.com/Kulltero' }
    ]
  },
  {
    avatar: '/team/JakeRich.webp',
    name: 'JakeRich',
    title: 'Contributor',
    links: [
      { icon: 'github', link: 'https://github.com/Jake-Rich' }
    ]
  },
  {
    avatar: '/team/Grimston.webp',
    name: 'Grimston',
    title: 'Contributor',
    links: [
      { icon: 'github', link: 'https://github.com/Grimston' },
      { icon: 'cf', link: 'https://codefling.com/grimston' }
    ]
  },
  {
    avatar: '/team/BillyJoe.webp',
    name: 'BillyJoe',
    title: 'Contributor',
    links: [
      { icon: 'cf', link: 'https://codefling.com/Billy-Joe' }
    ]
  },
  {
    avatar: '/team/Farkas.webp',
    name: 'Farkas',
    title: 'Contributor',
    links: [
      { icon: 'cf', link: 'https://codefling.com/farkas' }
    ]
  },
  {
    avatar: '/team/Kopter.webp',
    name: 'Kopter',
    title: 'Contributor',
    links: [
      { icon: 'cf', link: 'https://codefling.com/kopter' }
    ]
  },
  {
    avatar: '/team/Hizen.webp',
    name: 'Hizen',
    title: 'Contributor',
    links: [
      { icon: 'github', link: 'https://github.com/hizenxyz' },
      { icon: 'cf', link: 'https://codefling.com/hizenxyz' }
    ]
  },
  {
    avatar: '/team/Whispers88.webp',
    name: 'Whispers88',
    title: 'Contributor',
    links: [
      { icon: 'github', link: 'https://github.com/Whispers88' },
      { icon: 'cf', link: 'https://codefling.com/Whispers88' }
    ]
  },
  {
    avatar: '/team/Raichu.webp',
    name: 'Raichu',
    title: 'Bug Finder',
    links: [
      { icon: 'cf', link: 'https://codefling.com/Raichu' }
    ]
  }
]

</script>

<h1 style="padding-top: 40px;">Only on Carbon</h1>
<CarbonProducts />

<h1 style="padding-top: 40px;">Our Team</h1>

<VPTeamMembers size="small" :members=mainMembers />

<h2>Docs</h2>
<VPTeamMembers size="small" :members=docsMembers />

<h2>Contributor</h2>
<VPTeamMembers size="small" :members=contributorMembers />