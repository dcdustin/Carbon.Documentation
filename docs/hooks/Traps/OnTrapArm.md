<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnTrapArm
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(3f)]
public void RPC_Arm(BaseEntity.RPCMessage rpc)
{
	if (!Armed())
	{
		Arm();
	}
}

```
