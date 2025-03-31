# CanCombineDroppedItem
<Badge type="info" text="Item"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Determines if a dropped item stack can merge with another on the ground.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object CanCombineDroppedItem(DroppedItem droppedItem, DroppedItem di)
{
	Puts("CanCombineDroppedItem has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ DroppedItem]
public void OnDroppedOn(DroppedItem di)
{
	if (item == null || di.item == null || di.item.info != item.info || (di.item.IsBlueprint() && di.item.blueprintTarget != item.blueprintTarget) || NeverCombine || di.NeverCombine || (di.item.hasCondition && di.item.condition != di.item.maxCondition) || (item.hasCondition && item.condition != item.maxCondition))
	{
		return;
	}
	if (di.item.info != null)
	{
		if (di.item.info.amountType == ItemDefinition.AmountType.Genetics)
		{
			int num = ((di.item.instanceData != null) ? di.item.instanceData.dataInt : (-1));
			int num2 = ((item.instanceData != null) ? item.instanceData.dataInt : (-1));
			if (num != num2)
			{
				return;
			}
		}
		if ((di.item.info.GetComponent<ItemModSign>() != null && ItemModAssociatedEntity<SignContent>.GetAssociatedEntity(di.item) != null) || (item.info != null && item.info.GetComponent<ItemModSign>() != null && ItemModAssociatedEntity<SignContent>.GetAssociatedEntity(item) != null))
		{
			return;
		}
	}
	int num3 = di.item.amount + item.amount;
	if (num3 <= item.MaxStackable() && num3 != 0)
	{
		if (di.DropReason == DroppedItem.DropReasonEnum.Player)
		{
			DropReason = DroppedItem.DropReasonEnum.Player;
		}
		di.item.MigrateItemOwnership(item, di.item.amount);
		di.DestroyItem();
		di.Kill();
		int worldModelIndex = item.info.GetWorldModelIndex(item.amount);
		item.amount = num3;
		item.MarkDirty();
		if (GetDespawnDuration() < float.PositiveInfinity)
		{
			Invoke(IdleDestroy, GetDespawnDuration());
		}
		Effect.server.Run("assets/bundled/prefabs/fx/notice/stack.world.fx.prefab", this, 0u, UnityEngine.Vector3.zero, UnityEngine.Vector3.zero);
		int worldModelIndex2 = item.info.GetWorldModelIndex(item.amount);
		if (worldModelIndex != worldModelIndex2)
		{
			item.Drop(base.transform.position, UnityEngine.Vector3.zero, base.transform.rotation);
		}
	}
}

```
:::
