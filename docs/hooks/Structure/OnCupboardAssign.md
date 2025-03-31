<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnCupboardAssign
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnCupboardAssign()
{
	Puts("OnCupboardAssign has been fired!");
	return (System.Object)default;
}
```
:::
