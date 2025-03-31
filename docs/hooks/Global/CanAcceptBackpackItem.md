# CanAcceptBackpackItem
<Badge type="info" text="Global"/><Badge type="danger" text="Carbon Compatible"/>
Determines if an item can be added to a player's backpack.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanAcceptBackpackItem(Item backpack, Item item)
{
	Puts("CanAcceptBackpackItem has been fired!");
	return (bool)default;
}
```
```csharp [Source — Assembly-CSharp @ ItemModBackpack]
public bool CanAcceptItem(Item backpack, Item item, int slot)
{
	if (backpack.parent == null)
	{
		return true;
	}
	if (backpack.parent.HasFlag(ItemContainer.Flag.Clothing))
	{
		return true;
	}
	return false;
}

```
:::
