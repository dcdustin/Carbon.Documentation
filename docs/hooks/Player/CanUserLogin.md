# CanUserLogin
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called to determine if a user (player) can log in/connect to the server (e.g., whitelist check).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanUserLogin(string username, string userid, string ip)
{
	Puts("CanUserLogin has been fired!");
	return (bool)default;
}
```
:::
