<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnEntityDistanceCheck
Called when validating the maximum distance for an RPC call (ensures the caller is within allowed range). Plugins can override the distance check.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool OnEntityDistanceCheck()
{
	Puts("OnEntityDistanceCheck has been fired!");
	return (System.Boolean)default;
}
```
:::
