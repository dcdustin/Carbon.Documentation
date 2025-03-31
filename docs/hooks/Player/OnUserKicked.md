# OnUserKicked
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Triggered when a user (player) is kicked from the server (generic user-level event).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnUserKicked()
{
	Puts("OnUserKicked has been fired!");
}
```
:::
