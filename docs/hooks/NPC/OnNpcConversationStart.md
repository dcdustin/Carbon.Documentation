<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnNpcConversationStart
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(3f)]
[BaseEntity.RPC_Server.CallsPerSecond(1uL)]
public void Server_BeginTalking(BaseEntity.RPCMessage msg)
{
	BasePlayer player = msg.player;
	Server_BeginTalking(player);
}

```
