# OnNpcConversationStart
<Badge type="info" text="NPC"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a conversation with an NPC begins.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnNpcConversationStart(NPCTalking nPCTalking, BasePlayer ply, ConversationData local0)
{
	Puts("OnNpcConversationStart has been fired!");
	return (object)default;
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
