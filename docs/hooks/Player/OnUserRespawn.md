<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnUserRespawn
Called when a user (player) respawns.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnUserRespawn()
{
	Puts("OnUserRespawn has been fired!");
}
```
:::
