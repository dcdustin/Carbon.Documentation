# OnUserConnected
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a user (player) connects to the server (generic user-level connect event).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnUserConnected()
{
	Puts("OnUserConnected has been fired!");
}
```
:::
