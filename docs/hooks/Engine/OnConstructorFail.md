<Badge type="danger" text="Carbon Compatible"/>
# OnConstructorFail
```csharp
public static Oxide.Plugins.RustPlugin InitializePlugin(System.Reflection.Assembly assembly, Carbon.Core.ModLoader.Package package = default(Carbon.Core.ModLoader.Package), System.Action<Oxide.Plugins.RustPlugin> preInit = null, bool precompiled = false)
{
	System.Type[] types = assembly.GetTypes();
	foreach (System.Type type in types)
	{
		if (!(type.BaseType == null) && IsValidPlugin(type.BaseType, recursive: false) && InitializePlugin(type, out var plugin, package, preInit, precompiled))
		{
			return plugin;
		}
	}
	return null;
}

```
