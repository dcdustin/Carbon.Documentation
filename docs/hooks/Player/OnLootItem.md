# OnLootItem
<Badge type="info" text="Player"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when an item is looted from a container.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnLootItem(PlayerLoot playerLoot, Item item)
{
	Puts("OnLootItem has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ PlayerLoot]
public void StartLootingItem(Item item)
{
	Clear();
	if (item != null && item.contents != null)
	{
		PositionChecks = true;
		containers.Add(item.contents);
		item.contents.onDirty += MarkDirty;
		itemSource = item;
		entitySource = item.GetWorldEntity();
		MarkDirty();
	}
}

```
:::
