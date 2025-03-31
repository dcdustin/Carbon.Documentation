<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnToggleVendingBroadcast
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnToggleVendingBroadcast()
{
	Puts("OnToggleVendingBroadcast has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ VendingMachine]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void RPC_Broadcast(BaseEntity.RPCMessage msg)
{
	BasePlayer player = msg.player;
	bool b = msg.read.Bit();
	if (CanPlayerAdmin(player))
	{
		SetFlag(BaseEntity.Flags.Reserved4, b);
		UpdateMapMarker();
	}
}

```
:::
