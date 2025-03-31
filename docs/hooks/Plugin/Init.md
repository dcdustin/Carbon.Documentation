# Init
<Badge type="info" text="Plugin"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a plugin initializes (setting up on plugin load).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void Init()
{
	Puts("Init has been fired!");
}
```
```csharp [Source — Carbon.Common @ Carbon.Core.ModLoader]
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
:::
