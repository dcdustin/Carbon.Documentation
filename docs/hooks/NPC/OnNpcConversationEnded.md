# OnNpcConversationEnded
<Badge type="info" text="NPC"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a conversation with an NPC ends.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnNpcConversationEnded(NPCTalking nPCTalking)
{
	Puts("OnNpcConversationEnded has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ NPCTalking]
public virtual void OnConversationEnded(BasePlayer player)
{
	if (conversingPlayers.Contains(player))
	{
		conversingPlayers.Remove(player);
	}
}

```
:::
