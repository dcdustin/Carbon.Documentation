<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# IOnCupboardAuthorize
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object IOnCupboardAuthorize()
{
	Puts("IOnCupboardAuthorize has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ BuildingPrivlidge]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void AddAuthorize(BaseEntity.RPCMessage rpc)
{
	if (rpc.player.CanInteract() && CanAdministrate(rpc.player))
	{
		ulong targetPlayerId = rpc.read.UInt64();
		AddPlayer(rpc.player, targetPlayerId);
		SendNetworkUpdate();
	}
}

```
:::
