<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnEngineStopped
Called after an engine has stopped.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnEngineStopped()
{
	Puts("OnEngineStopped has been fired!");
	return (System.Object)default;
}
```
:::
