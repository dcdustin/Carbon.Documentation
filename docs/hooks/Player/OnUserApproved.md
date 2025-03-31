<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnUserApproved
Called after a user has been approved to join the server.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnUserApproved()
{
	Puts("OnUserApproved has been fired!");
}
```
:::
