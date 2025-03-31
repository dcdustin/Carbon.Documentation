<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnEngineStartFinished
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnEngineStartFinished()
{
	Puts("OnEngineStartFinished has been fired!");
	return (System.Object)default;
}
```
:::
