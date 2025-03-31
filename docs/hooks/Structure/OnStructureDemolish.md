<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnStructureDemolish [immediate = false]
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(3f)]
public void DoDemolish(BaseEntity.RPCMessage msg)
{
	if (msg.player.CanInteract() && CanDemolish(msg.player))
	{
		Facepunch.Rust.Analytics.Azure.OnBuildingBlockDemolished(msg.player, this);
		Kill(BaseNetworkable.DestroyMode.Gib);
	}
}

```
