<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnMixingTableToggle
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(3f)]
public void SVSwitch(BaseEntity.RPCMessage msg)
{
	bool flag = msg.read.Bit();
	if (flag != IsOn() && !(msg.player == null))
	{
		if (flag)
		{
			StartMixing(msg.player);
		}
		else
		{
			StopMixing();
		}
	}
}

```
