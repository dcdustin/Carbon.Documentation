<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnNpcConversationRespond
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(3f)]
[BaseEntity.RPC_Server.CallsPerSecond(5uL)]
public void Server_ResponsePressed(BaseEntity.RPCMessage msg)
{
	BasePlayer player = msg.player;
	int num = msg.read.Int32();
	int num2 = msg.read.Int32();
	ConversationData conversationFor = GetConversationFor(player);
	if (conversationFor == null)
	{
		return;
	}
	ConversationData.ResponseNode responseNode = conversationFor.speeches[num].responses[num2];
	if (responseNode == null)
	{
		return;
	}
	if (responseNode.conditions.Length != 0)
	{
		UpdateFlags();
	}
	bool flag = responseNode.PassesConditions(player, this);
	if (flag)
	{
		string actionString = responseNode.GetActionString();
		if (!string.IsNullOrEmpty(actionString))
		{
			OnConversationAction(player, actionString);
		}
	}
	int speechNodeIndex = conversationFor.GetSpeechNodeIndex(flag ? responseNode.resultingSpeechNode : responseNode.GetFailedSpeechNode(player, this));
	if (speechNodeIndex == -1)
	{
		ForceEndConversation(player);
	}
	else
	{
		ForceSpeechNode(player, speechNodeIndex);
	}
}

```
