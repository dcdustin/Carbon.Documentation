# OnUserRespawn
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a user (player) respawns.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnUserRespawn(Oxide.Core.Libraries.Covalence.IPlayer player)
{
	Puts("OnUserRespawn has been fired!");
}
```
:::
