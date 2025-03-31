# OnPluginOutdated
<Badge type="info" text="Plugin"/><Badge type="danger" text="Carbon Compatible"/>
Triggered if a plugin is detected to be outdated (version mismatch).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnPluginOutdated()
{
	Puts("OnPluginOutdated has been fired!");
}
```
:::
