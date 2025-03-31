<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnSprayRemove
```csharp
[BaseEntity.RPC_Server]
public void Server_RequestWaterClear(BaseEntity.RPCMessage msg)
{
	BasePlayer player = msg.player;
	if (!(player == null) && Menu_WaterClear_ShowIf(player))
	{
		Kill();
	}
}

```
