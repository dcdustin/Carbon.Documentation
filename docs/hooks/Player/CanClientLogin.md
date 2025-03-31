# CanClientLogin
<Badge type="info" text="Player"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)<Badge type="info" text="MetadataOnly"/>
Called when a client is logging in to the server, to determine if they are allowed to proceed.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanClientLogin(Network.Connection connection)
{
	Puts("CanClientLogin has been fired!");
	return (bool)default;
}
```
:::
