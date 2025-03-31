<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPlayerConnected
Called when a player successfully connects and joins the server.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnPlayerConnected()
{
	Puts("OnPlayerConnected has been fired!");
}
```
:::
