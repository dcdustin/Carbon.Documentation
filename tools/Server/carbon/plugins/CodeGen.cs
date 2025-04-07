using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.IO;
using System.Net;
using System.Reflection;
using Carbon.Components;
using Carbon.Extensions;
using Oxide.Core.Plugins;
using HarmonyLib;
using Newtonsoft.Json;
using Rust;
using UnityEngine;

namespace Carbon.Plugins;

[Info("CodeGen", "Carbon Community LTD.", "1.0.0")]
public partial class CodeGen : CarbonPlugin
{
	private static WebClient _client = new();

	private void OnServerInitialized()
	{
		Generate();
	}

	[AutoPatch, HarmonyPatch(typeof(Bootstrap), nameof(Bootstrap.StartServer), typeof(bool), typeof(string), typeof(bool))]
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
		Generate_Items();
		Generate_Entities();
		Generate_Prefabs();
		Generate_Blueprints();
		Generate_LootTables();
		Generate_Hooks();
	}

	private static void Generate_Items()
	{
		var items = new List<Item>();

		foreach (var item in ItemManager.itemList)
		{
			items.Add(Item.Parse<Item>(item));
		}

		OsEx.File.Create(Path.Combine("carbon", "results", "items.json"), JsonConvert.SerializeObject(items, Formatting.Indented));
	}

	private static void Generate_Entities()
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

		OsEx.File.Create(Path.Combine("carbon", "results", "entities.json"), JsonConvert.SerializeObject(entities, Formatting.Indented));
	}

	private static void Generate_Prefabs()
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

		OsEx.File.Create(Path.Combine("carbon", "results", "prefabs.json"), JsonConvert.SerializeObject(prefabs, Formatting.Indented));
	}

	private static void Generate_Blueprints()
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
				ScrapFromRecycle = blueprint.scrapFromRecycle,
				WorkbenchLevelRequired = blueprint.workbenchLevelRequired,
				NeedsSteamItem = blueprint.NeedsSteamItem,
				NeedsSteamDLC = blueprint.NeedsSteamDLC,
				Time = blueprint.time,
				RequireUnlockedItem = blueprint.RequireUnlockedItem != null ? Item.Parse<Item>(blueprint.RequireUnlockedItem) : null
			});
		}

		OsEx.File.Create(Path.Combine("carbon", "results", "blueprints.json"), JsonConvert.SerializeObject(blueprints, Formatting.Indented));
	}

	private static void Generate_LootTables()
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

		OsEx.File.Create(Path.Combine("carbon", "results", "loot-tables.json"), JsonConvert.SerializeObject(lootTables, Formatting.Indented));
	}

	private static void Generate_Hooks()
	{
		HooksAIResearch.LoadResearch();

		var hooks = new List<CarbonHook>();

		foreach (var assembly in AppDomain.CurrentDomain.GetAssemblies())
		{
			try
			{
				var name = assembly.GetName().Name;
				foreach (var type in assembly.GetTypes())
				{
					var hookAttributes = type.GetCustomAttributes();
					if (!hookAttributes.Any())
					{
						continue;
					}

					var hook = CarbonHook.Parse(hookAttributes, name.Equals("Carbon.Hooks.Oxide"));
					if (!hook.IsValid)
					{
						continue;
					}

					hooks.Add(hook);
				}
			}
			catch
			{
				var name = assembly.GetName();
				Logger.Warn($"Skipped '{name.Name} {name.Version}'");
			}
		}

		OsEx.File.Create(Path.Combine("carbon", "results", "hooks.json"),
			JsonConvert.SerializeObject(
				hooks.Where(x => !x.category.Equals("_patches", StringComparison.CurrentCultureIgnoreCase) &&
						(!x.name.StartsWith("i", StringComparison.CurrentCultureIgnoreCase)) || (x.name.Equals("Init") || x.name.Equals("InitLogging"))).GroupBy(x => x.category)
					.ToDictionary(key => key.Key, value => value.ToArray()), Formatting.Indented));
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
		public Rarity Rarity { get; set; }
		public SteamDlcItem SteamDlcItem { get; set; }

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
			if (definition.steamDlc != null)
			{
				instance.SteamDlcItem = new()
				{
					Name = definition.steamDlc.dlcName.english,
					AppId = definition.steamDlc.dlcAppID
				};
			}

			return instance;
		}
	}

	public class SteamDlcItem
	{
		public string Name { get; set; }
		public int AppId { get; set; }
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
		public float Time { get; set; }
		public int CraftAmount { get; set; }
		public int ScrapRequired { get; set; }
		public int ScrapFromRecycle { get; set; }
		public int WorkbenchLevelRequired { get; set; }
		public Item RequireUnlockedItem { get; set; }
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

	public struct CarbonHook
	{
		public static Dictionary<string, int> iterations = new();

		[Flags]
		public enum HookFlags
		{
			None = 0,
			Static = 1,
			Patch = 2,
			Hidden = 4,
			IgnoreChecksum = 8,
			MetadataOnly = 16
		}

		public string name;
		public string fullName;
		public string category;
		public Parameter[] parameters;
		public HookFlags flags;
		public string[] descriptions;
		[JsonIgnore] public Type target;
		[JsonIgnore] public MethodInfo method;
		[JsonIgnore] public Assembly assembly;
		[JsonIgnore] public Type returnType;
		public bool carbonCompatible;
		public bool oxideCompatible;
		public string methodSource;
		[JsonIgnore] public int iteration;

		public string targetName => target?.FullName;
		public string methodName => method?.Name;
		public string assemblyName => assembly?.GetName().Name;
		public string returnTypeName => returnType?.FullName ?? "void";

		[JsonIgnore] public readonly bool IsValid => !string.IsNullOrEmpty(name);

		public struct Parameter
		{
			public string name;
			public string typeName => type.FullName.Replace("+", ".");
			[JsonIgnore]
			public Type type;
			public bool optional;
		}

		public static CarbonHook Parse(IEnumerable<Attribute> attributes, bool isOxideHooks)
		{
			var patch = attributes.FirstOrDefault(x => x.GetType().Name.Equals("Patch"));
			if (patch == null)
			{
				return default;
			}

			var category = attributes.FirstOrDefault(x => x.GetType().Name.Equals("Category"));
			var returnType = attributes.FirstOrDefault(x => x.GetType().Name.Equals("Return"));
			var optionsType = attributes.FirstOrDefault(x => x.GetType().Name.Equals("Options"));
			var parameters = attributes.Where(x => x.GetType().Name.Equals("Parameter"));
			var isOxideCompatbile = attributes.FirstOrDefault(x => x.GetType().Name.Equals("OxideCompatible")) != null;

			Type patchType = patch.GetType();
			Type parametersType = parameters.FirstOrDefault()?.GetType();
			CarbonHook hook = default;
			string methodName = patchType?.GetProperty("Method").GetValue(patch) as string;
			Type[] methodArgs = patchType?.GetProperty("MethodArgs").GetValue(patch) as Type[];
			hook.name = patchType.GetProperty("Name").GetValue(patch) as string;
			hook.fullName = patchType.GetProperty("FullName").GetValue(patch) as string;
			if (iterations.TryGetValue(hook.fullName, out var iteration))
			{
				hook.fullName += $" [{iteration:n0}]";
				iterations[hook.fullName] = iteration + 1;
			}
			else iterations[hook.fullName] = 1;

			hook.target = patchType.GetProperty("Target").GetValue(patch) as Type;
			hook.assembly = hook.target?.Assembly;
			hook.returnType = returnType?.GetType().GetProperty("Type").GetValue(returnType) as Type;
			hook.carbonCompatible = true;
			hook.oxideCompatible = isOxideHooks || isOxideCompatbile;
			if (optionsType != null)
			{
				hook.flags = (HookFlags)optionsType.GetType().GetProperty("Value").GetValue(optionsType);
			}

			hook.parameters = parameters.Select(x =>
			{
				var name = parametersType.GetProperty("Name").GetValue(x) as string;
				var type = parametersType.GetProperty("Type").GetValue(x) as Type;
				if (name.Equals("self", StringComparison.CurrentCultureIgnoreCase))
				{
					name = char.ToLower(type.Name[0]) + type.Name.Substring(1, type.Name.Length - 1);
				}

				return new Parameter
				{
					name = name, type = type, optional = (bool)parametersType.GetProperty("Optional").GetValue(x)
				};
			}).ToArray();
			var researchedHook = HooksAIResearch.hooks.FirstOrDefault(x => x.hook.Equals(hook.name));
			if (!string.IsNullOrEmpty(researchedHook.hook))
			{
				hook.descriptions = researchedHook.descriptions;
			}

			if (!string.IsNullOrEmpty(methodName))
			{
				if (methodArgs == null)
				{
					hook.method = hook.target?.GetMethod(methodName, 0) ??
					              hook.target?.GetMethods().FirstOrDefault(x => x.Name.Equals(methodName));
				}
				else
				{
					hook.method = hook.target?.GetMethod(methodName, methodArgs) ??
					              hook.target?.GetMethods().FirstOrDefault(x => x.Name.Equals(methodName));
				}
			}

			hook.category = category?.GetType().GetProperty("Name").GetValue(category) as string ?? "Global";
			if (hook.assembly != null && hook.target != null && hook.method != null)
			{
				if (!string.IsNullOrEmpty(hook.assembly.Location))
				{
					hook.methodSource = SourceCodeBank.Parse(hook.assembly.Location).ParseMethod(hook.target.FullName, hook.method.Name);
				}
			}

			return hook;
		}
	}

	public class HooksAIResearch
	{
		public static List<Hook>? hooks;

		public static void LoadResearch()
		{
			hooks = JsonConvert.DeserializeObject<List<Hook>>(_client.DownloadString("https://carbonmod.gg/redist/metadata/carbon/hooks_research.json"));
			Console.WriteLine($"Loaded {hooks.Count:n0} researched hooks");
		}

		public struct Hook
		{
			public string hook;
			public string[] descriptions;
		}
	}
}
