# OnRackedWeaponMounted
<Badge type="info" text="Item"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called after a weapon has been mounted on a rack.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnRackedWeaponMounted(Item item, BasePlayer player, WeaponRack weaponRack)
{
	Puts("OnRackedWeaponMounted has been fired!");
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
