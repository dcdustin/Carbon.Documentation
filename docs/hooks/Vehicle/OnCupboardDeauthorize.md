# OnCupboardDeauthorize
<Badge type="info" text="Vehicle"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a player is deauthorized from a tool cupboard (removed from auth list).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnCupboardDeauthorize(VehiclePrivilege vehiclePrivilege, BasePlayer player)
{
	Puts("OnCupboardDeauthorize has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ VehiclePrivilege]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(3f)]
public void RemoveSelfAuthorize(BaseEntity.RPCMessage rpc)
{
	if (rpc.player.CanInteract() && IsDriver(rpc.player))
	{
		authorizedPlayers.RemoveAll((ProtoBuf.PlayerNameID x) => x.userid == (ulong)rpc.player.userID);
		Facepunch.Rust.Analytics.Azure.OnEntityAuthChanged(this, rpc.player, System.Linq.Enumerable.Select(authorizedPlayers, (ProtoBuf.PlayerNameID x) => x.userid), "removed", rpc.player.userID);
		UpdateMaxAuthCapacity();
		SendNetworkUpdate();
	}
}

```
:::
