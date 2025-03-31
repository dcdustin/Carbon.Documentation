# OnPlayerLootEnd
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Triggered when a player finishes looting an entity or container.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnPlayerLootEnd()
{
	Puts("OnPlayerLootEnd has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ PlayerLoot]
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
:::
