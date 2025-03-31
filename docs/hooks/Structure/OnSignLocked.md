# OnSignLocked
<Badge type="info" text="Structure"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnSignLocked(PhotoFrame photoFrame, BasePlayer player)
{
	Puts("OnSignLocked has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ PhotoFrame]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(3f)]
public void LockSign(BaseEntity.RPCMessage msg)
{
	if (msg.player.CanInteract() && CanUpdateSign(msg.player))
	{
		SetFlag(BaseEntity.Flags.Locked, b: true);
		SendNetworkUpdate();
		base.OwnerID = msg.player.userID;
	}
}

```
:::
