# CanPickupLock
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a player attempts to remove a lock (e.g., code lock or key lock) from an object.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object CanPickupLock(BasePlayer player, BaseLock baseLock)
{
	Puts("CanPickupLock has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ BaseLock]
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
:::
