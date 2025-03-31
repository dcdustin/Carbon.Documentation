# OnContainerDropItems
<Badge type="info" text="Entity"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a container’s items are dropped, for example when a storage container is destroyed and its contents spill out.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnContainerDropItems(ItemContainer container)
{
	Puts("OnContainerDropItems has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ DropUtil]
public static void DropItems(ItemContainer container, UnityEngine.Vector3 position)
{
	if (!ConVar.Server.dropitems || container == null || container.itemList == null)
	{
		return;
	}
	float num = 0.25f;
	Item[] array = container.itemList.ToArray();
	foreach (Item item in array)
	{
		float num2 = UnityEngine.Random.Range(0f, 2f);
		item.RemoveFromContainer();
		BaseEntity baseEntity = item.CreateWorldObject(position + new UnityEngine.Vector3(UnityEngine.Random.Range(0f - num, num), 1f, UnityEngine.Random.Range(0f - num, num)));
		if (baseEntity == null)
		{
			item.Remove();
			continue;
		}
		if (baseEntity is DroppedItem droppedItem && container.entityOwner is LootContainer)
		{
			droppedItem.DropReason = DroppedItem.DropReasonEnum.Loot;
		}
		if (num2 > 0f)
		{
			baseEntity.SetVelocity(new UnityEngine.Vector3(UnityEngine.Random.Range(-1f, 1f), UnityEngine.Random.Range(0f, 1f), UnityEngine.Random.Range(-1f, 1f)) * num2);
			baseEntity.SetAngularVelocity(new UnityEngine.Vector3(UnityEngine.Random.Range(-10f, 10f), UnityEngine.Random.Range(-10f, 10f), UnityEngine.Random.Range(-10f, 10f)) * num2);
		}
	}
}

```
:::
