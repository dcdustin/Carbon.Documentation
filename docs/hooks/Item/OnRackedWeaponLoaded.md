# OnRackedWeaponLoaded
<Badge type="info" text="Item"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called after a racked weapon has been loaded with ammo.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnRackedWeaponLoaded(Item local4, ItemDefinition local7, BasePlayer local0, WeaponRack weaponRack)
{
	Puts("OnRackedWeaponLoaded has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ WeaponRack]
[BaseEntity.RPC_Server]
public void LoadWeaponAmmo(BaseEntity.RPCMessage msg)
{
	BasePlayer player = msg.player;
	if (!player)
	{
		return;
	}
	int gridIndex = msg.read.Int32();
	int num = msg.read.Int32();
	WeaponRackSlot weaponAtIndex = GetWeaponAtIndex(gridIndex);
	if (weaponAtIndex == null || !weaponAtIndex.CanBeReloadedAtWeaponRack())
	{
		return;
	}
	Item slot = base.inventory.GetSlot(weaponAtIndex.InventoryIndex);
	if (slot == null)
	{
		return;
	}
	BaseEntity heldEntity = slot.GetHeldEntity();
	if (heldEntity == null)
	{
		return;
	}
	BaseProjectile component = heldEntity.GetComponent<BaseProjectile>();
	if (component == null)
	{
		return;
	}
	ItemDefinition itemDefinition = ItemManager.FindItemDefinition(num);
	if (itemDefinition == null)
	{
		return;
	}
	if (itemDefinition == SnowballGun.SnowballInventoryItem)
	{
		itemDefinition = SnowballGun.SnowballAmmoItem;
		if (!(itemDefinition != null))
		{
			return;
		}
		num = itemDefinition.itemid;
	}
	if (itemDefinition == null)
	{
		return;
	}
	ItemModProjectile component2 = itemDefinition.GetComponent<ItemModProjectile>();
	if (!(component2 == null) && component2.IsAmmo(component.primaryMagazine.definition.ammoTypes))
	{
		if (num != component.primaryMagazine.ammoType.itemid && component.primaryMagazine.contents > 0)
		{
			player.GiveItem(ItemManager.CreateByItemID(component.primaryMagazine.ammoType.itemid, component.primaryMagazine.contents, 0uL));
			component.SetAmmoCount(0);
		}
		component.primaryMagazine.ammoType = itemDefinition;
		component.TryReloadMagazine(player.inventory);
		SetSlotAmmoDetails(weaponAtIndex, slot);
		SendNetworkUpdateImmediate();
		ClientRPC(RpcTarget.Player("PlayAmmoSound", player), itemDefinition.itemid, 0);
	}
}

```
:::
