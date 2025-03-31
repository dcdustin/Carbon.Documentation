# OnCupboardDeauthorize
<Badge type="info" text="Structure"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a player is deauthorized from a tool cupboard (removed from auth list).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnCupboardDeauthorize(BuildingPrivlidge buildingPrivlidge, BasePlayer player)
{
	Puts("OnCupboardDeauthorize has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ BuildingPrivlidge]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void RemoveSelfAuthorize(BaseEntity.RPCMessage rpc)
{
	if (rpc.player.CanInteract() && CanAdministrate(rpc.player))
	{
		authorizedPlayers.RemoveWhere((ProtoBuf.PlayerNameID x) => x.userid == (ulong)rpc.player.userID);
		Facepunch.Rust.Analytics.Azure.OnEntityAuthChanged(this, rpc.player, System.Linq.Enumerable.Select(authorizedPlayers, (ProtoBuf.PlayerNameID x) => x.userid), "removed", rpc.player.userID);
		UpdateMaxAuthCapacity();
		SendNetworkUpdate();
	}
}

```
:::
