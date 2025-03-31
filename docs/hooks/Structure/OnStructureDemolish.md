# OnStructureDemolish
<Badge type="info" text="Structure"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnStructureDemolish()
{
	Puts("OnStructureDemolish has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ StabilityEntity]
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
:::
