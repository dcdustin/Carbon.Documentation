# OnEntityVisibilityCheck
<Badge type="info" text="Entity"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when verifying line-of-sight for an RPC call or attack (checks if target is visible). Plugins can override the visibility check.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool OnEntityVisibilityCheck(BaseEntity ent, BasePlayer player, uint id, string debugName, float maximumDistance)
{
	Puts("OnEntityVisibilityCheck has been fired!");
	return (bool)default;
}
```
:::
