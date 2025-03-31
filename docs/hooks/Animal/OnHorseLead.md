<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnHorseLead [RidableHorse2]
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
[BaseEntity.RPC_Server.CallsPerSecond(1uL)]
public void SERVER_Lead(BaseEntity.RPCMessage msg)
{
	BasePlayer player = msg.player;
	if (player == null)
	{
		return;
	}
	bool flag = msg.read.Bool();
	if (flag)
	{
		if (!CanLead(player))
		{
			return;
		}
	}
	else if (!CanStopLead(player))
	{
		return;
	}
	SetLeading(flag ? player : null);
}

```
