---
layout: doc
title: Blueprints Reference
description: Complete reference for all blueprints in the game
---

# Blueprints Reference

Welcome to the blueprints reference section. Here you can find detailed information about all crafting blueprints in the game.

<BlueprintsReference />

## Blueprint Properties

Each blueprint contains the following information:

- **Item**: The item being crafted
  - `DisplayName`: Human-readable name
  - `ShortName`: Game identifier
  - `Description`: Item description
  - `Stack`: Maximum stack size
  - `Category`: Item category
  - `Rarity`: Item rarity level

- **Crafting Requirements**
  - `Ingredients`: List of required items and amounts
  - `CraftAmount`: Number of items crafted at once
  - `ScrapRequired`: Amount of scrap needed to research
  - `WorkbenchLevelRequired`: Minimum workbench level needed
  - `UserCraftable`: Whether players can craft this item
  - `NeedsSteamItem`: Whether a Steam item is required
  - `NeedsSteamDLC`: Whether a Steam DLC is required

## Blueprint API

The blueprint data is available at:

```
https://carbonmod.gg/redist/metadata/rust/blueprints.json
```

This endpoint returns an array of all available blueprints in the game.
