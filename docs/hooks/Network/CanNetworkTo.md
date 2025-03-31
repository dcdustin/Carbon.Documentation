<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanNetworkTo
Determines if an entity's network data should be sent to a specific player.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanNetworkTo()
{
	Puts("CanNetworkTo has been fired!");
	return (System.Boolean)default;
}
```
```csharp [Source — Assembly-CSharp @ BaseNetworkable]
public virtual bool ShouldNetworkTo(BasePlayer player)
{
	if (net.group == null)
	{
		return true;
	}
	return player.net.subscriber.IsSubscribed(net.group);
}

```
:::
