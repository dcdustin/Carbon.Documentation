# OnCupboardAuthorize
<Badge type="info" text="Structure"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
- Called when a player is authorized on a tool cupboard.

- Use this to track or restrict cupboard authorizations.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnCupboardAuthorize(BuildingPrivlidge priv, BasePlayer player)
{
	Puts("OnCupboardAuthorize has been fired!");
	return (object)default;
}
```
:::
