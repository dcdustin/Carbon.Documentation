# OnUserRespawned
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called after a user (player) has respawned.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnUserRespawned(Oxide.Core.Libraries.Covalence.IPlayer player)
{
	Puts("OnUserRespawned has been fired!");
}
```
:::
