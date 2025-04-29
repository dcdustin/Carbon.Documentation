// Reference: System.IO.Compression
// Reference: System.IO.Compression.FileSystem

using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.IO.Compression;
using System.Net;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using API.Commands;
using Carbon.Components;
using Carbon.Extensions;
using Carbon.Pooling;
using Oxide.Core.Plugins;
using HarmonyLib;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Rust;
using UnityEngine;

namespace Carbon.Plugins;

[Info("CodeGen", "Carbon Community LTD.", "1.0.0")]
public partial class CodeGen : CarbonPlugin
{
	private static WebClient _client = new();
	private static StringBuilder _builder = new();

	private void OnServerInitialized()
	{
		Generate();
	}

	public override async ValueTask OnAsyncServerShutdown()
	{
		await Generate();
		await base.OnAsyncServerShutdown();
	}

	[AutoPatch, HarmonyPatch(typeof(Bootstrap), nameof(Bootstrap.StartServer), typeof(bool), typeof(string), typeof(bool))]
	public class GenPatch
	{
		public static void Prefix(bool doLoad, string saveFileOverride, bool allowOutOfDateSaves)
		{
			ConsoleSystem.Run(ConsoleSystem.Option.Server, "quit");
		}
	}

	private static async ValueTask Generate()
	{
		Generate_Items();
		Generate_Entities();
		Generate_Prefabs();
		Generate_Blueprints();
		Generate_LootTables();
		await DownloadOxideToTemp();
		Generate_Hooks();
		Generate_Commands();
		Generate_ConVars();
		Generate_Rust_ConVars();
		Generate_Rust_Commands();
		Generate_Switches();
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

	private static void Generate_Commands()
	{
		var commands = new List<object>();

		foreach (var command in Community.Runtime.CommandManager.ClientConsole.OrderBy(x => x.Name, StringComparer.InvariantCultureIgnoreCase))
		{
			if (string.IsNullOrEmpty(command.Help) || !command.Name.StartsWith("c.") || command.HasFlag(CommandFlags.Protected))
			{
				continue;
			}

			var authedCommand = command as AuthenticatedCommand;
			commands.Add(new
			{
				Name = command.Name,
				Help = command.Help,
				AuthLevel = authedCommand?.Help == null ? 0 : authedCommand.Auth.AuthLevel
			});
		}

		OsEx.File.Create(Path.Combine("carbon", "results", "commands.json"), JsonConvert.SerializeObject(commands, Formatting.Indented));
	}

	private static void Generate_ConVars()
	{
		var conVars = new List<object>();

		foreach (var conVar in CarbonAuto.AutoCache)
		{
			conVars.Add(new
			{
				Name = conVar.Key,
				DisplayName = conVar.Value.Variable.DisplayName,
				Help = conVar.Value.Variable.Help,
				ForceModded = conVar.Value.Variable.ForceModded,
				Protected = conVar.Value.Variable.Protected
			});
		}

		OsEx.File.Create(Path.Combine("carbon", "results", "convars.json"), JsonConvert.SerializeObject(conVars, Formatting.Indented));
	}

	private static void Generate_Rust_ConVars()
	{
		OsEx.File.Create(Path.Combine("carbon", "results", "rust_convars.json"), JsonConvert.SerializeObject(ConVarSnapshots.Snapshots.Select(x => new
		{
			Name = x.Key.ToLower(),
			Help = x.Value.Field.Value.Help,
			Type = GetFriendlyType(x.Value.Value?.GetType().FullName, null),
			Saved = x.Value.Field.Value.Saved,
			ServerAdmin = x.Value.Field.Value.ServerAdmin,
			ServerUser = x.Value.Field.Value.ServerUser,
			Clientside = x.Value.Field.Value.Clientside,
			Serverside = x.Value.Field.Value.Serverside,
			DefaultValue = x.Value.Value
		}), Formatting.Indented));
	}

	private static void Generate_Rust_Commands()
	{
		OsEx.File.Create(Path.Combine("carbon", "results", "rust_commands.json"), JsonConvert.SerializeObject(ConsoleSystem.Index.All.Where(x => !x.Variable).Select<ConsoleSystem.Command, object>(x => new
		{
			Name = x.FullName,
			Help = x.Description,
			ServerUser = x.ServerUser,
			Client = x.Client,
			Server = x.Server
		}), Formatting.Indented));
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

	private static void Generate_Switches()
	{
		try
		{
			OsEx.File.Create(Path.Combine("carbon", "results", "switches.json"),
				JsonConvert.SerializeObject(
					typeof(Switches).GetMethods().Select(x => x.GetCustomAttribute<SwitchAttribute>()).Where(x => x != null)
						.Select(x => new { Name = x.Name, Help = x.Help }), Formatting.Indented));
		}
		catch(Exception ex)
		{
			Logger.Error("Fumbled", ex);
		}
	}

	#region Helpers

	private static async ValueTask DownloadOxideToTemp()
	{
		var core = Community.Runtime.Core;
		//var latest = JObject.Parse((await core.webrequest.EnqueueAsync("https://api.github.com/repos/OxideMod/Oxide.Rust/releases/latest", null, null, core)).ResponseObject as string);
		//var oxideLatest = latest["assets"][1]["browser_download_url"].ToObject<string>();
		var zip = (await core.webrequest.EnqueueDataAsync("https://downloads.oxidemod.com/artifacts/Oxide.Rust/staging/Oxide.Rust.zip", null, null, core)).ResponseObject as byte[];
		var oxideZipPath = Path.Combine(Carbon.Core.Defines.GetTempFolder(), "oxide.zip");
		File.WriteAllBytes(oxideZipPath, zip);
		ZipFile.ExtractToDirectory(oxideZipPath, Carbon.Core.Defines.GetTempFolder(), overwrite: true);
	}
	public static string GetFriendlyType(string type, string empty = "null")
	{
		if (type == null) return empty;

		if (type == typeof(void).FullName) return "void";
		if (type == typeof(string).FullName) return "string";
		if (type == typeof(uint).FullName) return "uint";
		if (type == typeof(int).FullName) return "int";
		if (type == typeof(double).FullName) return "double";
		if (type == typeof(float).FullName) return "float";
		if (type == typeof(ulong).FullName) return "ulong";
		if (type == typeof(object).FullName) return "object";
		if (type == typeof(bool).FullName) return "bool";
		if (type == typeof(string[]).FullName) return "string[]";

		return type.Replace("+", ".");
	}
	public static string GetParameterName(Type type)
	{
		return $"{char.ToLower(type.Name[0])}{type.Name.Substring(1)}";
	}
	public static string GetPrettyTypeName(Type type, bool fullName = true)
	{
		var name = fullName ? (type.FullName ?? type.Name) : type.Name;

		if (!type.IsGenericType)
			return name;

		_builder.Clear();
		_builder.Append(name.Substring(0, name.IndexOf('`')));
		_builder.Append("<");

		var genericArguments = type.GetGenericArguments();
		for (int i = 0; i < genericArguments.Length; i++)
		{
			if (i > 0)
				_builder.Append(", ");

			_builder.Append(GetFriendlyType(GetPrettyTypeName(genericArguments[i]), "T"));
		}

		_builder.Append(">");
		return _builder.ToString();
	}

	#endregion

	public class Item
	{
		public long Id;
		public string DisplayName;
		public string ShortName;
		public string Description;
		public int Stack;
		public bool Hidden;
		public ItemDefinition.Flag Flags;
		public ItemCategory Category;
		public Rarity Rarity;
		public SteamDlcItem SteamDlcItem;

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
		public string Name;
		public int AppId;
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
		public string Type;
		public string Path;
		public string Name;
		public string[] Components;
		public uint ID;
	}

	public class Blueprint
	{
		public Ingredient[] Ingredients;
		public Item Item;
		public bool UserCraftable;
		public Rarity Rarity;
		public float Time;
		public int CraftAmount;
		public int ScrapRequired;
		public int ScrapFromRecycle;
		public int WorkbenchLevelRequired;
		public Item RequireUnlockedItem;
		public bool NeedsSteamItem;
		public bool NeedsSteamDLC;

		public class Ingredient
		{
			public Item Item;
			public float Amount;
		}
	}

	public class LootTable : Entity
	{
		public RangeItem[] Items = [];
		public SpawnSlotItem[] SpawnSlotItems = [];
		public int ScrapAmount;
		public LootContainer.spawnType SpawnType;

		public class RangeItem : Item
		{
			public float Amount;
			public float MaxAmount;
		}
		public class SpawnSlotItem
		{
			public RangeItem[] Items = new RangeItem[0];
			public int NumberToSpawn;
			public float Probability;
		}
	}

	public class Changelog
	{
		public string Date;
		public string Version;
		public Change[] Changes;

		public class Change
		{
			public string Message;
			public ChangeTypes Type = ChangeTypes.Added;
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

		public uint id;
		public string name;
		public string fullName;
		public string category;
		public Parameter[] parameters;
		public string parametersText => string.Join(", ", parameters.Select(x => $"{GetFriendlyType(x.typeName)} {x.name}{(x.optional ? " = default" : string.Empty)}"));
		public HookFlags flags;
		public string[] descriptions;
		public bool carbonCompatible;
		public bool oxideCompatible;

		public string targetName => target?.FullName;
		public string methodName => method?.Name;
		public string assemblyName => assembly?.GetName().Name;
		public string returnTypeName => GetFriendlyType(returnType?.FullName, "void");
		public string methodSource;

		[JsonIgnore] public Type target;
		[JsonIgnore] public MethodInfo method;
		[JsonIgnore] public Assembly assembly;
		[JsonIgnore] public Type returnType;
		[JsonIgnore] public int iteration;
		[JsonIgnore] public readonly bool IsValid => !string.IsNullOrEmpty(name);

		public struct Parameter
		{
			public string name;
			public string typeName => type.FullName.Replace("+", ".");
			public string typeFriendly => GetFriendlyType(type.FullName);
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
			hook.id = HookStringPool.GetOrAdd(hook.name);
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
					var oxidePath = Path.Combine(Carbon.Core.Defines.GetTempFolder(), "RustDedicated_Data", "Managed", $"{hook.assemblyName}.dll");
					hook.methodSource = SourceCodeBank.Parse(File.Exists(oxidePath) ? oxidePath : hook.assembly.Location).ParseMethod(hook.target.FullName, hook.method.Name);
				}
			}

			return hook;
		}
	}

	public class HooksAIResearch
	{
		public static List<Hook> hooks;

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
