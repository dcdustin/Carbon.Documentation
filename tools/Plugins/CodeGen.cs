using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using Carbon.Extensions;
using Oxide.Core.Plugins;
using HarmonyLib;
using Newtonsoft.Json;
using Rust;
using UnityEngine;

namespace Carbon.Plugins;

[Info("CodeGen", "Carbon Community LTD.", "1.0.0")]
public class CodeGen : CarbonPlugin
{
	[AutoPatch, HarmonyPatch(typeof(Bootstrap), nameof(Bootstrap.StartServer), [typeof(bool), typeof(string), typeof(bool)])]
	public class GenPatch
	{
		public static void Prefix(bool doLoad, string saveFileOverride, bool allowOutOfDateSaves)
		{
			Generate();
			ConsoleSystem.Run(ConsoleSystem.Option.Server, "quit");
		}
	}

	private static void Generate()
	{
		// Items
		{
			var items = new List<Item>();

			foreach (var item in ItemManager.itemList)
			{
				items.Add(Item.Parse<Item>(item));
			}

			OsEx.File.Create(Path.Combine("items.json"), JsonConvert.SerializeObject(items, Formatting.Indented));
		}

		// Entities
		{
			var entities = new List<Entity>();

			foreach (var prefab in FileSystem.Backend.cache)
			{
				if (prefab.Value is GameObject go)
				{
					var entity = go.GetComponent<BaseNetworkable>();

					if (entity == null) continue;

					entities.Add(new Entity
					{
						Type = entity.GetType().FullName,
						Path = prefab.Key,
						Name = prefab.Value.name,
						ID = entity.prefabID,
						Components = entity.GetComponents<MonoBehaviour>().Where(x => x != null).Select(x => x.GetType().FullName).ToArray()
					});
				}
			}

			OsEx.File.Create(Path.Combine("entities.json"), JsonConvert.SerializeObject(entities, Formatting.Indented));
		}

		// Prefabs
		{
			var prefabs = new List<Entity>();

			foreach (var prefab in FileSystem.Backend.cache)
			{
				if (prefab.Value is GameObject go)
				{
					var entity = go.GetComponent<BaseEntity>();

					if (entity != null) continue;

					prefabs.Add(new Entity
					{
						Path = prefab.Key,
						Name = prefab.Value.name,
						ID = StringPool.Get(prefab.Key),
						Components = go.GetComponents<MonoBehaviour>().Where(x => x != null).Select(x => x.GetType().FullName).ToArray()
					});
				}
			}

			OsEx.File.Create(Path.Combine("prefabs.json"), JsonConvert.SerializeObject(prefabs, Formatting.Indented));
		}

		// Blueprints
		{
			var blueprints = new List<Blueprint>();

			foreach (var blueprint in ItemManager.bpList)
			{
				blueprints.Add(new Blueprint
				{
					Ingredients = blueprint.ingredients.Select(x => new Blueprint.Ingredient { Item = Item.Parse<Item> (x.itemDef), Amount = x.amount }).ToArray(),
					Item = Item.Parse<Item> (blueprint.targetItem),
					UserCraftable = blueprint.userCraftable,
					Rarity = blueprint.rarity,
					CraftAmount = blueprint.amountToCreate,
					ScrapRequired = blueprint.scrapRequired,
					WorkbenchLevelRequired = blueprint.workbenchLevelRequired,
					NeedsSteamItem = blueprint.NeedsSteamItem,
					NeedsSteamDLC = blueprint.NeedsSteamDLC,
				});
			}

			OsEx.File.Create(Path.Combine("blueprints.json"), JsonConvert.SerializeObject(blueprints, Formatting.Indented));
		}

		// Loot Tables
		{
			var lootTables = new List<LootTable>();

			foreach (var prefab in FileSystem.Backend.cache)
			{
				if (prefab.Value is GameObject go)
				{
					var container = go.GetComponent<LootContainer>();

					if (container == null) continue;

					var table = Entity.Parse<LootTable>(container);
					table.ScrapAmount = container.scrapAmount;
					table.SpawnType = container.SpawnType;

					if (container.lootDefinition != null)
					{
						table.Items = container.lootDefinition.items.Select(x =>
						{
							var item = Item.Parse<LootTable.RangeItem>(x.itemDef);
							item.Amount = x.amount;
							item.MaxAmount = x.maxAmount;

							return item;
						}).ToArray();
					}

					if (container.LootSpawnSlots != null)
					{
						table.SpawnSlotItems = container.LootSpawnSlots.Select(x => new LootTable.SpawnSlotItem
						{
							Items = x.definition.items.Select(y =>
							{
								var item = Item.Parse<LootTable.RangeItem>(y.itemDef);
								item.Amount = y.amount;
								item.MaxAmount = y.maxAmount;

								return item;
							}).ToArray(),
							NumberToSpawn = x.numberToSpawn,
							Probability = x.probability
						}).ToArray();
					}

					lootTables.Add(table);
				}
			}

			OsEx.File.Create(Path.Combine("loot-tables.json"), JsonConvert.SerializeObject(lootTables, Formatting.Indented));
		}
	}

	public class Item
	{
		public long Id { get; set; }
		public string DisplayName { get; set; }
		public string ShortName { get; set; }
		public string Description { get; set; }
		public int Stack { get; set; }
		public bool Hidden { get; set; }
		public ItemDefinition.Flag Flags { get; set; }
		public ItemCategory Category { get; set; }
		public Rust.Rarity Rarity { get; set; }

		public static T Parse<T>(ItemDefinition definition) where T : Item
		{
			var instance = Activator.CreateInstance<T>();

			instance.Id = definition.itemid;
			instance.DisplayName = definition.displayName.english;
			instance.Description = definition.displayDescription.english;
			instance.ShortName = definition.shortname;
			instance.Stack = definition.stackable;
			instance.Hidden = definition.hidden;
			instance.Flags = definition.flags;
			instance.Category = definition.category;
			instance.Rarity = definition.rarity;

			return instance;
		}
	}
	public class Entity : Prefab
	{
		public static T Parse<T>(BaseEntity entity) where T : Entity
		{
			var instance = Activator.CreateInstance<T>();

			instance.ID = entity.prefabID;
			instance.Path = entity.PrefabName;
			instance.Name = entity.name;
			instance.Type = entity.GetType().FullName;
			instance.Components = entity.GetComponents<MonoBehaviour>().Where(x => x != null).Select(x => x.GetType().FullName).ToArray();

			return instance;
		}
	}
	public class Prefab
	{
		public string Type { get; set; }
		public string Path { get; set; }
		public string Name { get; set; }
		public string[] Components { get; set; }
		public uint ID { get; set; }
	}
	public class Blueprint
	{
		public Ingredient[] Ingredients { get; set; }
		public Item Item { get; set; }
		public bool UserCraftable { get; set; }
		public Rarity Rarity { get; set; }
		public int CraftAmount { get; set; }
		public int ScrapRequired { get; set; }
		public int WorkbenchLevelRequired { get; set; }
		public bool NeedsSteamItem { get; set; }
		public bool NeedsSteamDLC { get; set; }

		public class Ingredient
		{
			public Item Item { get; set; }
			public float Amount { get; set; }
		}
	}
	public class LootTable : Entity
	{
		public RangeItem[] Items { get; set; } = [];
		public SpawnSlotItem[] SpawnSlotItems { get; set; } = [];
		public int ScrapAmount { get; set; }
		public LootContainer.spawnType SpawnType { get; set; }

		public class RangeItem : Item
		{
			public float Amount { get; set; }
			public float MaxAmount { get; set; }
		}
		public class SpawnSlotItem
		{
			public RangeItem[] Items { get; set; } = new RangeItem[0];
			public int NumberToSpawn { get; set; }
			public float Probability { get; set; }
		}
	}
	public class Changelog
	{
		public string Date { get; set; }
		public string Version { get; set; }
		public Change[] Changes { get; set; }

		public class Change
		{
			public string Message { get; set; }
			public ChangeTypes Type { get; set; } = ChangeTypes.Added;
		}

		public enum ChangeTypes
		{
			Added = 0,
			Updated = 1,
			Removed = 2,
			Fixed = 3,
			Miscellaneous = 4
		}
	}
	public class HookOverride
	{
		public string[] Info { get; set; }
		public string ReturnType { get; set; }
		public Parameter[] Parameters { get; set; }

		public class Parameter
		{
			public string Type { get; set; }
			public string Name { get; set; }
		}
	}
}
