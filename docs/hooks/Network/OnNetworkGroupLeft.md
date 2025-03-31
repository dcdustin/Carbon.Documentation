# OnNetworkGroupLeft
<Badge type="info" text="Network"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when an entity or player leaves a network group.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnNetworkGroupLeft(BaseNetworkable baseNetworkable)
{
	Puts("OnNetworkGroupLeft has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ BaseNetworkable]
public virtual void OnNetworkGroupLeave(Network.Visibility.Group group)
{
}

```
:::
