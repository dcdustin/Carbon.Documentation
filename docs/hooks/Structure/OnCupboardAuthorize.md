<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnCupboardAuthorize
- Called when a player is authorized on a tool cupboard.
- Use this to track or restrict cupboard authorizations.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnCupboardAuthorize()
{
	Puts("OnCupboardAuthorize has been fired!");
	return (System.Object)default;
}
```
:::
