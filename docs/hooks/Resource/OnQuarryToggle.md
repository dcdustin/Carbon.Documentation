<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnQuarryToggle
Called when a mining quarry is toggled on or off.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnQuarryToggle()
{
	Puts("OnQuarryToggle has been fired!");
	return (System.Object)default;
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
