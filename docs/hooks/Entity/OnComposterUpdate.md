<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnComposterUpdate
```csharp
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
