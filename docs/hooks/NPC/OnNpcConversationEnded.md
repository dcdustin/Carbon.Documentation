<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnNpcConversationEnded
Called when a conversation with an NPC ends.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnNpcConversationEnded()
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
