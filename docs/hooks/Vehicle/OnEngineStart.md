<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnEngineStart
Called when an engine (vehicle engine) starts running.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnEngineStart()
{
	Puts("OnEngineStart has been fired!");
	return (System.Object)default;
}
```
:::
