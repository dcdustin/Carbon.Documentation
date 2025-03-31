# OnCupboardAssign
<Badge type="info" text="Structure"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnCupboardAssign(BuildingPrivlidge priv, ulong targetId, BasePlayer player)
{
	Puts("OnCupboardAssign has been fired!");
	return (object)default;
}
```
:::
