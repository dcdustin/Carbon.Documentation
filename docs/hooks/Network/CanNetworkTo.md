<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanNetworkTo
```csharp
public virtual bool ShouldNetworkTo(BasePlayer player)
{
	if (net.group == null)
	{
		return true;
	}
	return player.net.subscriber.IsSubscribed(net.group);
}

```
