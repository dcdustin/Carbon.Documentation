# CanNetworkTo
<Badge type="info" text="Network"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Determines if an entity's network data should be sent to a specific player.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanNetworkTo(BaseNetworkable baseNetworkable)
{
	Puts("CanNetworkTo has been fired!");
	return (bool)default;
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
