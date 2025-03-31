# OnEntityVisibilityCheck
<Badge type="info" text="Entity"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when verifying line-of-sight for an RPC call or attack (checks if target is visible). Plugins can override the visibility check.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool OnEntityVisibilityCheck()
{
	Puts("OnEntityVisibilityCheck has been fired!");
	return (System.Boolean)default;
}
```
:::
