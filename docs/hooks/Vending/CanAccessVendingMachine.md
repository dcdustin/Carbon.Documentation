<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanAccessVendingMachine
```csharp
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
