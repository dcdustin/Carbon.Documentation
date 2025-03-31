<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnAmmoSwitch
```csharp
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
