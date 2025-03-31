# OnUserApprove
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a user is connecting, to decide if they are allowed (e.g., whitelist/ban check).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnUserApprove()
{
	Puts("OnUserApprove has been fired!");
}
```
:::
