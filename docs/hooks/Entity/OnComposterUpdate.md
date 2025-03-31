# OnComposterUpdate
<Badge type="info" text="Entity"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a composter processes materials (each cycle of converting compostable items into fertilizer).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnComposterUpdate(Composter composter)
{
	Puts("OnComposterUpdate has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ Composter]
public void UpdateComposting()
{
	for (int i = 0; i < base.inventory.capacity; i++)
	{
		Item slot = base.inventory.GetSlot(i);
		if (slot != null)
		{
			CompostItem(slot);
		}
	}
}

```
:::
