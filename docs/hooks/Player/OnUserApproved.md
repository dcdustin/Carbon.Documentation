# OnUserApproved
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called after a user has been approved to join the server.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnUserApproved(string username, string userid, string ip)
{
	Puts("OnUserApproved has been fired!");
}
```
:::
