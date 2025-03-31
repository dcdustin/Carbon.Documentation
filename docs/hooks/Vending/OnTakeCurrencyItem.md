<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnTakeCurrencyItem [NPC]
```csharp
public override void TakeCurrencyItem(Item takenCurrencyItem)
{
	takenCurrencyItem.MoveToContainer(base.inventory);
	takenCurrencyItem.RemoveFromContainer();
	takenCurrencyItem.Remove();
}

```
