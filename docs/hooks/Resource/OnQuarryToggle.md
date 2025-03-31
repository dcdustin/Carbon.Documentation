<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnQuarryToggle [off]
```csharp
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
