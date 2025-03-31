<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnItemUse
Called when an item is used (e.g., eaten, drunk, or activated).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnItemUse()
{
	Puts("OnItemUse has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ Item]
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
:::
