<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnTurretAuthorize
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void AddSelfAuthorize(BaseEntity.RPCMessage rpc)
{
	AddSelfAuthorize(rpc.player);
}

```
