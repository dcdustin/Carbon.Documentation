# OnWireClear
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when an electrical wire is cleared (disconnected).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnWireClear(BasePlayer ply, IOEntity local0, int clearIndex, bool isInput)
{
	Puts("OnWireClear has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ WireTool]
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
:::
