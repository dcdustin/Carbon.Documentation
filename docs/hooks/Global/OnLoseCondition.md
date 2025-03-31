# OnLoseCondition
<Badge type="info" text="Global"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
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
