<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnNpcConversationStart
Called when a conversation with an NPC begins.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnNpcConversationStart()
{
	Puts("OnNpcConversationStart has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ NPCTalking]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(3f)]
[BaseEntity.RPC_Server.CallsPerSecond(1uL)]
public void Server_BeginTalking(BaseEntity.RPCMessage msg)
{
	BasePlayer player = msg.player;
	Server_BeginTalking(player);
}

```
:::
