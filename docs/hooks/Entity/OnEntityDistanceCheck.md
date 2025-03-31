# OnEntityDistanceCheck
<Badge type="info" text="Entity"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when validating the maximum distance for an RPC call (ensures the caller is within allowed range). Plugins can override the distance check.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool OnEntityDistanceCheck(BaseEntity ent, BasePlayer player, uint id, string debugName, float maximumDistance, bool checkParent)
{
	Puts("OnEntityDistanceCheck has been fired!");
	return (bool)default;
}
```
:::
