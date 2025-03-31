# OnItemPickup
<Badge type="info" text="Item"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a player picks up an item from the ground.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnItemPickup(WorldItem worldItem, BasePlayer player)
{
	Puts("OnItemPickup has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ WorldItem]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void Pickup(BaseEntity.RPCMessage msg)
{
	if (msg.player.CanInteract() && this.item != null && allowPickup && CanOpenInSafeZone(msg.player))
	{
		ItemModContainer component = this.item.info.GetComponent<ItemModContainer>();
		if (!(component != null) || !component.canLootInWorld || !(component.pickupInWorldDelay > 0f) || !(UnityEngine.Mathf.Abs(pickupStartTime + component.pickupInWorldDelay - UnityEngine.Time.realtimeSinceStartup) > ConVar.AntiHack.rpc_timer_forgiveness))
		{
			ClientRPC(RpcTarget.NetworkGroup("PickupSound"));
			Item item = this.item;
			Facepunch.Rust.Analytics.Azure.OnItemPickup(msg.player, this);
			RemoveItem();
			TryApplyOwnershipOnPickup(msg.player, item);
			msg.player.GiveItem(item, BaseEntity.GiveItemReason.PickedUp);
			msg.player.SignalBroadcast(BaseEntity.Signal.Gesture, "pickup_item");
		}
	}
}

```
:::
