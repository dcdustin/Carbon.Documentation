<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnEventCollectablePickup
Triggered when a player picks up a seasonal event collectible (like an Easter egg).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnEventCollectablePickup()
{
	Puts("OnEventCollectablePickup has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ CollectableEasterEgg]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void RPC_PickUp(BaseEntity.RPCMessage msg)
{
	if (msg.player == null)
	{
		return;
	}
	float num = UnityEngine.Time.realtimeSinceStartup - lastPickupStartTime;
	if (!(msg.player.GetHeldEntity() as EasterBasket) && (num > 2f || num < 0.8f))
	{
		return;
	}
	if ((bool)EggHuntEvent.serverEvent)
	{
		if (!EggHuntEvent.serverEvent.IsEventActive())
		{
			return;
		}
		EggHuntEvent.serverEvent.OnEggCollected(msg.player, this);
		int iAmount = 1;
		msg.player.GiveItem(ItemManager.Create(itemToGive, iAmount, 0uL));
	}
	Effect.server.Run(pickupEffect.resourcePath, base.transform.position + UnityEngine.Vector3.up * 0.3f, UnityEngine.Vector3.up);
	Kill();
}

```
:::
