# OnUserApprove
<Badge type="info" text="Player"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)<Badge type="info" text="MetadataOnly"/>
Called when a user is connecting, to decide if they are allowed (e.g., whitelist/ban check).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnUserApprove(Network.Connection connection)
{
	Puts("OnUserApprove has been fired!");
}
```
:::
