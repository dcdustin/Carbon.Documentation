<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanPickupLock
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(3f, CheckParent = true)]
public void RPC_TakeLock(BaseEntity.RPCMessage rpc)
{
	if (rpc.player.CanInteract() && CanRemove && !IsLocked())
	{
		Item item = ItemManager.Create(itemType, 1, skinID);
		if (item != null)
		{
			rpc.player.GiveItem(item);
		}
		Facepunch.Rust.Analytics.Azure.OnEntityPickedUp(rpc.player, this);
		BaseEntity baseEntity = GetParentEntity();
		if (baseEntity != null && baseEntity.GetSlot(BaseEntity.Slot.Lock) == this)
		{
			baseEntity.SetSlot(BaseEntity.Slot.Lock, null);
		}
		Kill();
	}
}

```
