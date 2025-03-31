# OnCupboardClearList
<Badge type="info" text="Vehicle"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a tool cupboard's authorized list is cleared.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnCupboardClearList()
{
	Puts("OnCupboardClearList has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ VehiclePrivilege]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(3f)]
public void ClearList(BaseEntity.RPCMessage rpc)
{
	if (rpc.player.CanInteract() && IsDriver(rpc.player))
	{
		authorizedPlayers.Clear();
		UpdateMaxAuthCapacity();
		SendNetworkUpdate();
	}
}

```
:::
