# CanPlaceOnRack
<Badge type="info" text="Global"/><Badge type="danger" text="Carbon Compatible"/>
Determines if a player can place an item onto a weapon rack.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanPlaceOnRack(WeaponRack rack, BasePlayer player, Item item, int gridCellIndex, int rotation)
{
	Puts("CanPlaceOnRack has been fired!");
	return (bool)default;
}
```
```csharp [Source — Assembly-CSharp @ WeaponRack]
public void MountWeapon(BasePlayer player, int gridCellIndex, int rotation)
{
	if (player == null)
	{
		return;
	}
	HeldEntity heldEntity = player.GetHeldEntity();
	if (!(heldEntity == null))
	{
		Item item = heldEntity.GetItem();
		if (item != null)
		{
			MountWeapon(item, player, gridCellIndex, rotation);
		}
	}
}

```
:::
