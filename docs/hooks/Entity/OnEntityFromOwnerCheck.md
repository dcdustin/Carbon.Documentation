<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnEntityFromOwnerCheck
Called when checking if an RPC request originates from the entity’s owner. Plugins can override this owner validation check.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool OnEntityFromOwnerCheck()
{
	Puts("OnEntityFromOwnerCheck has been fired!");
	return (System.Boolean)default;
}
```
:::
