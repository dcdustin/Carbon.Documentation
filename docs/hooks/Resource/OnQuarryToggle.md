# OnQuarryToggle
<Badge type="info" text="Resource"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a mining quarry is toggled on or off.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnQuarryToggle(MiningQuarry local0, BasePlayer player)
{
	Puts("OnQuarryToggle has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ EngineSwitch]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(3f)]
public void StopEngine(BaseEntity.RPCMessage msg)
{
	MiningQuarry miningQuarry = GetParentEntity() as MiningQuarry;
	if ((bool)miningQuarry)
	{
		miningQuarry.EngineSwitch(isOn: false);
	}
}

```
:::
