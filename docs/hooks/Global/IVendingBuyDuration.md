<Badge type="danger" text="Carbon Compatible"/>
# IVendingBuyDuration
Allows modifying the duration of a vending machine purchase transaction.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void IVendingBuyDuration()
{
	Puts("IVendingBuyDuration has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ InvisibleVendingMachine]
public override float GetBuyDuration()
{
	return 0.5f;
}

```
:::
