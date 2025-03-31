<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnStructureDemolish [true, patch]
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(3f)]
public void DoImmediateDemolish(BaseEntity.RPCMessage msg)
{
	if (msg.player.CanInteract() && msg.player.IsAdmin)
	{
		Facepunch.Rust.Analytics.Azure.OnBuildingBlockDemolished(msg.player, this);
		Kill(BaseNetworkable.DestroyMode.Gib);
	}
}

```
