# CanRecycle
<Badge type="info" text="Crafting"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when checking if a recycler can start recycling items. Plugins can allow or prevent the recycler from running.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanRecycle()
{
	Puts("CanRecycle has been fired!");
	return (System.Boolean)default;
}
```
```csharp [Source — Assembly-CSharp @ Recycler]
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
:::
