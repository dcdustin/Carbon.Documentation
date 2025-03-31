<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnEntityLoaded
Called when an entity’s data has been loaded from storage (e.g., during server startup or entity spawning from a save).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnEntityLoaded()
{
	Puts("OnEntityLoaded has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ BaseNetworkable]
public virtual void Load(BaseNetworkable.LoadInfo info)
{
	if (info.msg.baseNetworkable != null)
	{
		ProtoBuf.BaseNetworkable baseNetworkable = info.msg.baseNetworkable;
		if (prefabID != baseNetworkable.prefabID)
		{
			UnityEngine.Debug.LogError("Prefab IDs don't match! " + prefabID + "/" + baseNetworkable.prefabID + " -> " + base.gameObject, base.gameObject);
		}
	}
}

```
:::
