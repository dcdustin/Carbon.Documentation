# CanClientLogin
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a client is logging in to the server, to determine if they are allowed to proceed.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanClientLogin(Network.Connection connection)
{
	Puts("CanClientLogin has been fired!");
	return (bool)default;
}
```
:::
