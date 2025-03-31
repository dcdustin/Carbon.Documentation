# OnQuarryToggled
<Badge type="info" text="Resource"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called after a mining quarry's on/off state has been toggled.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnQuarryToggled()
{
	Puts("OnQuarryToggled has been fired!");
	return (System.Object)default;
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
