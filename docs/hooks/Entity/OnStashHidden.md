<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnStashHidden
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void RPC_HideStash(BaseEntity.RPCMessage rpc)
{
	Facepunch.Rust.Analytics.Azure.OnStashHidden(rpc.player, this);
	SetHidden(isHidden: true);
}

```
