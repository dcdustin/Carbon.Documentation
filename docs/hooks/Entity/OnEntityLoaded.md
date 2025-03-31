<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnEntityLoaded
```csharp
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
