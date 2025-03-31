<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnIORefCleared
Called when an IO connection reference is cleared (for example, a wire is disconnected from an electrical IO slot).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnIORefCleared()
{
	Puts("OnIORefCleared has been fired!");
}
```
:::
