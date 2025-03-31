<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnWireClear
```csharp
public static bool AttemptClearSlot(BaseNetworkable clearEnt, BasePlayer ply, int clearIndex, bool isInput)
{
	IOEntity iOEntity = ((clearEnt != null) ? clearEnt.GetComponent<IOEntity>() : null);
	if (iOEntity == null)
	{
		return false;
	}
	if (ply != null && !CanModifyEntity(ply, iOEntity))
	{
		return false;
	}
	return iOEntity.Disconnect(clearIndex, isInput);
}

```
