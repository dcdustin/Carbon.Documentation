<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnExcavatorResourceSet
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(3f)]
public void RPC_SetResourceTarget(BaseEntity.RPCMessage msg)
{
	switch (msg.read.String())
	{
	case "HQM":
		resourceMiningIndex = 0;
		break;
	case "Sulfur":
		resourceMiningIndex = 1;
		break;
	case "Stone":
		resourceMiningIndex = 2;
		break;
	case "Metal":
		resourceMiningIndex = 3;
		break;
	}
	if (!IsOn())
	{
		BeginMining();
	}
}

```
