<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnInventoryNetworkUpdate
```csharp
public void SendUpdatedInventoryInternal(PlayerInventory.Type type, ItemContainer container, PlayerInventory.NetworkInventoryMode mode)
{
	using ProtoBuf.UpdateItemContainer updateItemContainer = Facepunch.Pool.Get<ProtoBuf.UpdateItemContainer>();
	updateItemContainer.type = (int)type;
	if (container != null)
	{
		container.dirty = false;
		updateItemContainer.container = Facepunch.Pool.Get<System.Collections.Generic.List<ProtoBuf.ItemContainer>>();
		bool bIncludeContainer = type != PlayerInventory.Type.Wear || mode == PlayerInventory.NetworkInventoryMode.LocalPlayer;
		updateItemContainer.container.Add(container.Save(bIncludeContainer));
	}
	switch (mode)
	{
	case PlayerInventory.NetworkInventoryMode.Everyone:
		base.baseEntity.ClientRPC(RpcTarget.NetworkGroup("UpdatedItemContainer"), updateItemContainer);
		break;
	case PlayerInventory.NetworkInventoryMode.LocalPlayer:
		base.baseEntity.ClientRPC(RpcTarget.Player("UpdatedItemContainer", base.baseEntity), updateItemContainer);
		break;
	case PlayerInventory.NetworkInventoryMode.EveryoneButLocal:
		if (base.baseEntity.net?.group?.subscribers == null)
		{
			break;
		}
		{
			foreach (Network.Connection subscriber in base.baseEntity.net.group.subscribers)
			{
				if (subscriber.player is BasePlayer basePlayer && basePlayer != base.baseEntity)
				{
					base.baseEntity.ClientRPC(RpcTarget.Player("UpdatedItemContainer", basePlayer), updateItemContainer);
				}
			}
			break;
		}
	}
}

```
