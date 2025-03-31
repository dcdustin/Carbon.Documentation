<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPlayerBanned
- Called when a player is banned from the server.
- Called when Easy Anti-Cheat (EAC) bans a player.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnPlayerBanned()
{
	Puts("OnPlayerBanned has been fired!");
}
```
:::
