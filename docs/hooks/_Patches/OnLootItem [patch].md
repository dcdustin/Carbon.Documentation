<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnLootItem [patch]
```csharp
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
