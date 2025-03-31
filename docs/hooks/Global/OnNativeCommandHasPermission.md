<Badge type="danger" text="Carbon Compatible"/>
# OnNativeCommandHasPermission
Called when checking if a player has permission to run a native console command.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool OnNativeCommandHasPermission()
{
	Puts("OnNativeCommandHasPermission has been fired!");
	return (System.Boolean)default;
}
```
:::
