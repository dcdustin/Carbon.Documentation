<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPluginUnloaded
```csharp
public static bool UninitializePlugin(Oxide.Plugins.RustPlugin plugin, bool premature = false, bool unloadDependantPlugins = true)
{
	if (!premature && !plugin.IsLoaded)
	{
		return true;
	}
	plugin.UnapplyOrderedPatches(Oxide.Core.Plugins.AutoPatchAttribute.Orders.Delayed);
	plugin.UnapplyOrderedPatches(Oxide.Core.Plugins.AutoPatchAttribute.Orders.AfterOnServerInitialized);
	plugin.UnapplyOrderedPatches(Oxide.Core.Plugins.AutoPatchAttribute.Orders.AfterPluginLoad);
	plugin.UnapplyOrderedPatches(Oxide.Core.Plugins.AutoPatchAttribute.Orders.AfterPluginInit);
	if (unloadDependantPlugins)
	{
		plugin.IUnloadDependantPlugins();
	}
	if (!premature)
	{
		plugin.CallHook("Unload");
	}
	RemoveCommands(plugin);
	plugin.IUnload();
	if (!premature)
	{
		Carbon.HookCaller.CallStaticHook(1250294368u, plugin);
	}
	plugin.Dispose();
	if (!premature)
	{
		Carbon.Logger.Log("Unloaded plugin " + plugin.ToPrettyString());
		Oxide.Core.Interface.Oxide.RootPluginManager.RemovePlugin(plugin);
		Oxide.Core.Plugins.Plugin.InternalApplyAllPluginReferences();
	}
	return true;
}

```
