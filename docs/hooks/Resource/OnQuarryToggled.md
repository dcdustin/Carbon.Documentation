<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnQuarryToggled [on] [patch]
```csharp
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
