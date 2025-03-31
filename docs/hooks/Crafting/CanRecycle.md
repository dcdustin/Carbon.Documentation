<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanRecycle
```csharp
public bool HasRecyclable()
{
	for (int i = 0; i < 6; i++)
	{
		Item slot = base.inventory.GetSlot(i);
		if (slot != null && slot.info.Blueprint != null)
		{
			return true;
		}
	}
	return false;
}

```
