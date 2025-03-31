<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanClientLogin
Called when a client is logging in to the server, to determine if they are allowed to proceed.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanClientLogin()
{
	Puts("CanClientLogin has been fired!");
	return (System.Boolean)default;
}
```
:::
