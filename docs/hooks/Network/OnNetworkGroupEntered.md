# OnNetworkGroupEntered
<Badge type="info" text="Network"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when an entity or player enters a network group (area of visibility).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnNetworkGroupEntered(BaseNetworkable baseNetworkable)
{
	Puts("OnNetworkGroupEntered has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ BaseNetworkable]
public virtual void OnNetworkGroupEnter(Network.Visibility.Group group)
{
}

```
:::
