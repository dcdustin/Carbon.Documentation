# OnTakeCurrencyItem
<Badge type="info" text="Vending"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnTakeCurrencyItem(NPCVendingMachine nPCVendingMachine, Item takenCurrencyItem)
{
	Puts("OnTakeCurrencyItem has been fired!");
	return (object)default;
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
