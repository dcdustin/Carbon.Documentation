<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanUserLogin
Called to determine if a user (player) can log in/connect to the server (e.g., whitelist check).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanUserLogin()
{
	Puts("CanUserLogin has been fired!");
	return (System.Boolean)default;
}
```
:::
