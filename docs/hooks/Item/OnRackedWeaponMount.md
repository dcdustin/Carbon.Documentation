# OnRackedWeaponMount
<Badge type="info" text="Item"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a weapon is being placed onto a weapon rack.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool OnRackedWeaponMount(Item item, BasePlayer player, WeaponRack weaponRack)
{
	Puts("OnRackedWeaponMount has been fired!");
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
