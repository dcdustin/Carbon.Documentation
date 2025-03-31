<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPlayerLootEnd
```csharp
public void Clear()
{
	if (!IsLooting())
	{
		return;
	}
	base.baseEntity.HasClosedLoot();
	MarkDirty();
	if ((bool)entitySource)
	{
		entitySource.SendMessage("PlayerStoppedLooting", base.baseEntity, UnityEngine.SendMessageOptions.DontRequireReceiver);
	}
	foreach (ItemContainer container in containers)
	{
		if (container != null)
		{
			container.onDirty -= MarkDirty;
		}
	}
	ClearContainers();
	entitySource = null;
	itemSource = null;
}

```
