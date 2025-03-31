<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnCardSwipe
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void ServerCardSwiped(BaseEntity.RPCMessage msg)
{
	if (!IsPowered() || UnityEngine.Vector3Ex.Distance2D(msg.player.transform.position, base.transform.position) > 1f || IsInvoking(GrantCard) || IsInvoking(FailCard) || HasFlag(BaseEntity.Flags.On))
	{
		return;
	}
	NetworkableId uid = msg.read.EntityID();
	Keycard keycard = BaseNetworkable.serverEntities.Find(uid) as Keycard;
	Effect.server.Run(swipeEffect.resourcePath, audioPosition.position, UnityEngine.Vector3.up, msg.player.net.connection);
	if (keycard == null)
	{
		return;
	}
	Item item = keycard.GetItem();
	if (item != null && !(item.parent.playerOwner != msg.player))
	{
		if (keycard.accessLevel == accessLevel && item.conditionNormalized > 0f)
		{
			Facepunch.Rust.Analytics.Azure.OnKeycardSwiped(msg.player, this);
			Invoke(GrantCard, 0.5f);
			item.LoseCondition(1f);
		}
		else
		{
			Invoke(FailCard, 0.5f);
		}
	}
}

```
