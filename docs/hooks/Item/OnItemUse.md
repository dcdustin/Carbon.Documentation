<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnItemUse
```csharp
public void UseItem(int amountToConsume = 1)
{
	if (amountToConsume > 0)
	{
		amount -= amountToConsume;
		ReduceItemOwnership(amountToConsume);
		if (amount <= 0)
		{
			amount = 0;
			Remove();
		}
		else
		{
			MarkDirty();
		}
	}
}

```
