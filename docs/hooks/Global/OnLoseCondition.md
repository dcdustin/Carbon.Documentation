<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnLoseCondition
Called when an item loses durability (condition).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnLoseCondition()
{
	Puts("OnLoseCondition has been fired!");
}
```
:::
