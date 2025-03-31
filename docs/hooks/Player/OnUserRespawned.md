<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnUserRespawned
Called after a user (player) has respawned.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnUserRespawned()
{
	Puts("OnUserRespawned has been fired!");
}
```
:::
