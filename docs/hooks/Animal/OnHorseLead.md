# OnHorseLead
<Badge type="info" text="Animal"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a player leads a ridable animal (e.g., starts or stops leading a horse with a lead rope).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnHorseLead(RidableHorse2 ridableHorse2, BasePlayer local0)
{
	Puts("OnHorseLead has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ RidableHorse2]
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
:::
