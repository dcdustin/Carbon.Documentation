# OnTurretDeauthorize
<Badge type="info" text="Turret"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a player is removed from a turret's authorization.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnTurretDeauthorize(AutoTurret autoTurret, BasePlayer player)
{
	Puts("OnTurretDeauthorize has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ AutoTurret]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void RemoveSelfAuthorize(BaseEntity.RPCMessage rpc)
{
	if (!booting && !IsOnline() && IsAuthed(rpc.player))
	{
		authorizedPlayers.RemoveWhere((ProtoBuf.PlayerNameID x) => x.userid == (ulong)rpc.player.userID);
		authDirty = true;
		Facepunch.Rust.Analytics.Azure.OnEntityAuthChanged(this, rpc.player, System.Linq.Enumerable.Select(authorizedPlayers, (ProtoBuf.PlayerNameID x) => x.userid), "removed", rpc.player.userID);
		UpdateMaxAuthCapacity();
		SendNetworkUpdate();
	}
}

```
:::
