# OnTrapDisarm
<Badge type="info" text="Traps"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnTrapDisarm(Landmine landmine, BasePlayer player)
{
	Puts("OnTrapDisarm has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ Landmine]
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
:::
