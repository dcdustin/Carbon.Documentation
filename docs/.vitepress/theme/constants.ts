export enum ItemFlag {
  NoDropping = 1,
  NotStraightToBelt = 2,
  NotAllowedInBelt = 4,
  Backpack = 8,
}

export enum ItemCategory {
  Weapon = 0,
  Construction = 1,
  Items = 2,
  Resources = 3,
  Attire = 4,
  Tool = 5,
  Medical = 6,
  Food = 7,
  Ammunition = 8,
  Traps = 9,
  Misc = 10,
  All = 11,
  Common = 12,
  Component = 13,
  Search = 14,
  Favourite = 15,
  Electrical = 16,
  Fun = 17,
}

export enum ItemRarity {
  None = 0,
  Common = 1,
  Uncommon = 2,
  Rare = 3,
  VeryRare = 4,
}

export enum SpawnType {
  GENERIC = 0,
  PLAYER = 1,
  TOWN = 2,
  AIRDROP = 3,
  CRASHSITE = 4,
  ROADSIDE = 5,
}

// Helper functions
export const getItemFlagText = (flag: number): string[] => {
  const flags: string[] = []
  if (flag & ItemFlag.NoDropping) flags.push('NoDropping')
  if (flag & ItemFlag.NotStraightToBelt) flags.push('NotStraightToBelt')
  if (flag & ItemFlag.NotAllowedInBelt) flags.push('NotAllowedInBelt')
  if (flag & ItemFlag.Backpack) flags.push('Backpack')
  return flags
}

export const getItemCategoryText = (category: ItemCategory): string => {
  return ItemCategory[category]
}

export const getItemRarityText = (rarity: ItemRarity): string => {
  return ItemRarity[rarity]
}

export const getSpawnTypeText = (type: SpawnType): string => {
  return SpawnType[type]
}

// Color mappings
export const RARITY_COLORS = {
  [ItemRarity.None]: 'gray',
  [ItemRarity.Common]: 'blue',
  [ItemRarity.Uncommon]: 'green',
  [ItemRarity.Rare]: 'purple',
  [ItemRarity.VeryRare]: 'orange',
} as const

export const CATEGORY_COLORS = {
  [ItemCategory.Weapon]: 'red',
  [ItemCategory.Construction]: 'brown',
  [ItemCategory.Items]: 'gray',
  [ItemCategory.Resources]: 'yellow',
  [ItemCategory.Attire]: 'blue',
  [ItemCategory.Tool]: 'orange',
  [ItemCategory.Medical]: 'green',
  [ItemCategory.Food]: 'purple',
  [ItemCategory.Ammunition]: 'red',
  [ItemCategory.Traps]: 'orange',
  [ItemCategory.Misc]: 'gray',
  [ItemCategory.All]: 'blue',
  [ItemCategory.Common]: 'gray',
  [ItemCategory.Component]: 'brown',
  [ItemCategory.Search]: 'blue',
  [ItemCategory.Favourite]: 'yellow',
  [ItemCategory.Electrical]: 'blue',
  [ItemCategory.Fun]: 'purple',
} as const 