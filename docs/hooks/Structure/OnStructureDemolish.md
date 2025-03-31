# OnStructureDemolish
<Badge type="info" text="Structure"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnStructureDemolish(StabilityEntity stabilityEntity, BasePlayer player)
{
	Puts("OnStructureDemolish has been fired!");
	return (object)default;
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
