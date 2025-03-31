# OnAmmoSwitch
<Badge type="info" text="Weapon"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnAmmoSwitch(BaseProjectile baseProjectile, BasePlayer local0, ItemDefinition local2)
{
	Puts("OnAmmoSwitch has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ BaseProjectile]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsActiveItem]
public void SwitchAmmoTo(BaseEntity.RPCMessage msg)
{
	BasePlayer ownerPlayer = GetOwnerPlayer();
	if (!ownerPlayer)
	{
		return;
	}
	int num = msg.read.Int32();
	if (num == primaryMagazine.ammoType.itemid)
	{
		return;
	}
	ItemDefinition itemDefinition = ItemManager.FindItemDefinition(num);
	if (itemDefinition == null)
	{
		return;
	}
	ItemModProjectile component = itemDefinition.GetComponent<ItemModProjectile>();
	if ((bool)component && component.IsAmmo(primaryMagazine.definition.ammoTypes))
	{
		if (primaryMagazine.contents > 0)
		{
			ownerPlayer.GiveItem(ItemManager.CreateByItemID(primaryMagazine.ammoType.itemid, primaryMagazine.contents, 0uL));
			SetAmmoCount(0);
		}
		primaryMagazine.ammoType = itemDefinition;
		SendNetworkUpdateImmediate();
		ItemManager.DoRemoves();
		ownerPlayer.inventory.ServerUpdate(0f);
	}
}

```
:::
