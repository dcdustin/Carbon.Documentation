# OnItemUse
<Badge type="info" text="Item"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when an item is used (e.g., eaten, drunk, or activated).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnItemUse(Item item, int amountToConsume)
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
