<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnTrapDisarm
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(3f)]
public void RPC_Disarm(BaseEntity.RPCMessage rpc)
{
	if ((ulong)rpc.player.userID != triggerPlayerID && Armed() && Triggered())
	{
		if (UnityEngine.Random.Range(0, 100) < 15)
		{
			Invoke(TryExplode, 0.05f);
			return;
		}
		SetFlag(BaseEntity.Flags.On, b: false);
		rpc.player.GiveItem(ItemManager.CreateByName("trap.landmine", 1, 0uL), BaseEntity.GiveItemReason.PickedUp);
		Kill();
	}
}

```
