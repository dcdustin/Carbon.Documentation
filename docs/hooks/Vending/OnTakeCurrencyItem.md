<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnTakeCurrencyItem
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnTakeCurrencyItem()
{
	Puts("OnTakeCurrencyItem has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ NPCVendingMachine]
public override void TakeCurrencyItem(Item takenCurrencyItem)
{
	takenCurrencyItem.MoveToContainer(base.inventory);
	takenCurrencyItem.RemoveFromContainer();
	takenCurrencyItem.Remove();
}

```
:::
