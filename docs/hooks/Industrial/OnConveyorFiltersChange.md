# OnConveyorFiltersChange
<Badge type="info" text="Industrial"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when the filter settings of an industrial conveyor are changed.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnConveyorFiltersChange()
{
	Puts("OnConveyorFiltersChange has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ IndustrialConveyor]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(3f)]
[BaseEntity.RPC_Server.CallsPerSecond(1uL)]
public void RPC_ChangeFilters(BaseEntity.RPCMessage msg)
{
	if (msg.player == null || !msg.player.CanBuild())
	{
		return;
	}
	mode = (IndustrialConveyor.ConveyorMode)msg.read.Int32();
	filterItems.Clear();
	ProtoBuf.IndustrialConveyor.ItemFilterList itemFilterList = ProtoBuf.IndustrialConveyor.ItemFilterList.Deserialize(msg.read);
	if (itemFilterList.filters == null)
	{
		return;
	}
	int num = UnityEngine.Mathf.Min(itemFilterList.filters.Count, 60);
	for (int i = 0; i < num; i++)
	{
		if (filterItems.Count >= 30)
		{
			break;
		}
		IndustrialConveyor.ItemFilter item = new IndustrialConveyor.ItemFilter(itemFilterList.filters[i]);
		if (item.TargetItem != null || item.TargetCategory.HasValue)
		{
			filterItems.Add(item);
		}
	}
	SendNetworkUpdate();
}

```
:::
