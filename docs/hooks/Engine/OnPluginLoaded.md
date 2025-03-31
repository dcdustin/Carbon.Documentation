<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPluginLoaded
Called when a plugin has been successfully loaded.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnPluginLoaded()
{
	Puts("OnPluginLoaded has been fired!");
}
```
:::
