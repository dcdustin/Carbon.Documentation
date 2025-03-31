# OnEngineStop
<Badge type="info" text="Vehicle"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when an engine stops running (shuts off).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnEngineStop()
{
	Puts("OnEngineStop has been fired!");
	return (System.Object)default;
}
```
:::
