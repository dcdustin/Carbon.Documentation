# OnQuarryToggled
<Badge type="info" text="Resource"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called after a mining quarry's on/off state has been toggled.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnQuarryToggled()
{
	Puts("OnQuarryToggled has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ EngineSwitch]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(3f)]
public void StartEngine(BaseEntity.RPCMessage msg)
{
	MiningQuarry miningQuarry = GetParentEntity() as MiningQuarry;
	if ((bool)miningQuarry)
	{
		miningQuarry.EngineSwitch(isOn: true);
	}
}

```
:::
