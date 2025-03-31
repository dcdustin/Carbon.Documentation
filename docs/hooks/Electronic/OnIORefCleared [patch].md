<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnIORefCleared [patch]
Called when an IO connection reference is cleared (patched hook variant for wire disconnection).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnIORefCleared [patch]()
{
	Puts("OnIORefCleared [patch] has been fired!");
	return (System.Object)default;
}
```
:::
