<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanAccessVendingMachine
- Called when a player attempts to access a vending machine to check if they are allowed.
- Return false to prevent the player from accessing the vending machine.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanAccessVendingMachine()
{
	Puts("CanAccessVendingMachine has been fired!");
	return (System.Boolean)default;
}
```
```csharp [Source — Assembly-CSharp @ MarketTerminal]
[System.Runtime.CompilerServices.CompilerGenerated]
public bool <GetDeliveryEligibleVendingMachines>g__IsEligible|42_0(VendingMachine vendingMachine, UnityEngine.Vector3 offset, int n)
{
	if (vendingMachine is NPCVendingMachine)
	{
		return true;
	}
	if (!vendingMachine.IsBroadcasting())
	{
		return false;
	}
	if (!config.IsVendingMachineAccessible(vendingMachine, offset, out var _))
	{
		return false;
	}
	return true;
}

```
:::
