# OnCupboardClearList
<Badge type="info" text="Structure"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a tool cupboard's authorized list is cleared.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnCupboardClearList(BuildingPrivlidge buildingPrivlidge, BasePlayer player)
{
	Puts("OnCupboardClearList has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ BuildingPrivlidge]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void ClearList(BaseEntity.RPCMessage rpc)
{
	if (rpc.player.CanInteract() && CanAdministrate(rpc.player))
	{
		authorizedPlayers.Clear();
		UpdateMaxAuthCapacity();
		SendNetworkUpdate();
	}
}

```
:::
