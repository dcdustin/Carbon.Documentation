<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnNpcConversationEnded
```csharp
public virtual void OnConversationEnded(BasePlayer player)
{
	if (conversingPlayers.Contains(player))
	{
		conversingPlayers.Remove(player);
	}
}

```
