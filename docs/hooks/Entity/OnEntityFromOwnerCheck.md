# OnEntityFromOwnerCheck
<Badge type="info" text="Entity"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when checking if an RPC request originates from the entity’s owner. Plugins can override this owner validation check.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool OnEntityFromOwnerCheck(BaseEntity ent, BasePlayer player, uint id, string debugName, bool includeMounted)
{
	Puts("OnEntityFromOwnerCheck has been fired!");
	return (bool)default;
}
```
:::
