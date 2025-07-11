---
title: SQLite Permissions & More
description: Forget giant Oxide data files filled with players that joined your server about 6 years ago for 2 sec., data being stored in your memory whenever your server is online.
header: https://files.facepunch.com/paddy/20230904/homingrocketlauncher_01.jpg
logo: /news/sql-perms.webp
author: Raul
date: 2025-07-11T15:14:38.470Z
tags:
    - docs
    - news
    - server owners
    - sql
    - permissions
layout: news-layout
category: news
sidebar: false
fmContentType: blogpost
published: false
---

<NewsSection>

Forget giant `oxide.users.data` files filled with players that joined your server about 6 years ago for 2 seconds, all of that stored in your memory. Experience seamless transition to SQL-based permission management, which only keeps in memory what is necessary.

</NewsSection>

<NewsSectionTitle text="Motivation"/>
<NewsSection>
A few years ago when Carbon was just a concept — and initially called Rexide🤮 (that name still haunts me) — one of the bigger things we wanted to do with Carbon besides dynamic patching, was to have a more performant permissions system which takes memory usage into account as well as data it stores in memory at server runtime.
</NewsSection>

<NewsSectionTitle text="Protobuf to SQL Migration" author="raulssorban"/>
<NewsImage src="/news/sql-1-showcase.webp"/>
<NewsSection>
The migration process is as simple as running a command on the server.

:::tip HOW TO MIGRATE
To begin migrating, run **`c.migrate_sql`**, then a new SQLite database will be created at `<root>/servers/<identity>/carbon.perms.db`
:::
<NewsSectionSubtitle text="What's Happening?"/>
The **`c.migrate_sql`** command will:
1. Copy over all of your groups and group permissions associated 
1. User info with their associated groups and permissions 
1. Switching your server Permissions serialization setting to SQL **without** requiring a server restart or plugin reloads.

You can continue using the server as you normally would. **Your permissions system is now fully switched to SQL.**

:::tip NOTICE
An important thing to note is that while the server is active using SQL mode, the database is locked; cannot R/W to it while server's online.
:::

</NewsSection>

<NewsSectionTitle text="Teleport Marker Module" author="bubbafett5611"/>
<NewsImage src="/news/teleportmarker-1.webp" h="200px"/>
<NewsSection>

This month we've added a new Carbon module everyone — **that's not on Minimal build** — can use. It's a basic module which automatically teleports the person with the permission when you right-click on the map at the cursor's position.

<NewsSectionSubtitle text="Configuration"/>

The default permission is `teleportmarker.use` but is configurable, as well as the command, which defaults to `tpm`. 
</NewsSection>

<NewsSectionTitle text="Redirect URI" author="raulssorban"/>
<NewsSection>

We've added a new configuration option in Carbon's config file under the `SelfUpdating` section called `RedirectURI`, designed for the self-updating process to use as Carbon's endpoint it will automatically update from. This could be ideally used to build and maintain your own Carbon build in-house.
</NewsSection>

<NewsReleaseNotes version="2.0.196"/>