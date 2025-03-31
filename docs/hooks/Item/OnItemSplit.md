<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnItemSplit
Called when an item stack is split into two stacks.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private Item OnItemSplit()
{
	Puts("OnItemSplit has been fired!");
	return (Item)default;
}
```
```csharp [Source — Assembly-CSharp @ Item]
#define UNITY_ASSERTIONS
public Item SplitItem(int split_Amount)
{
	UnityEngine.Assertions.Assert.IsTrue(split_Amount > 0, "split_Amount <= 0");
	if (split_Amount <= 0)
	{
		return null;
	}
	if (split_Amount >= amount)
	{
		return null;
	}
	amount -= split_Amount;
	Item item = ItemManager.CreateByItemID(info.itemid, 1, 0uL);
	item.amount = split_Amount;
	item.skin = skin;
	MigrateItemOwnership(item, split_Amount);
	if (IsBlueprint())
	{
		item.blueprintTarget = blueprintTarget;
	}
	if (info.amountType == ItemDefinition.AmountType.Genetics && instanceData != null && instanceData.dataInt != 0)
	{
		item.instanceData = new ProtoBuf.Item.InstanceData();
		item.instanceData.dataInt = instanceData.dataInt;
		item.instanceData.ShouldPool = false;
	}
	if (instanceData != null && instanceData.dataInt > 0 && info != null && info.Blueprint != null && info.Blueprint.GetWorkbenchLevel() == 3)
	{
		item.instanceData = new ProtoBuf.Item.InstanceData();
		item.instanceData.dataInt = instanceData.dataInt;
		item.instanceData.ShouldPool = false;
		item.SetFlag(Item.Flag.IsOn, IsOn());
	}
	if (instanceData != null && (bool)info.GetComponent<ItemModFoodSpoiling>())
	{
		item.instanceData = new ProtoBuf.Item.InstanceData();
		item.instanceData.dataFloat = instanceData.dataFloat;
		item.instanceData.ShouldPool = false;
	}
	MarkDirty();
	return item;
}

```
:::
