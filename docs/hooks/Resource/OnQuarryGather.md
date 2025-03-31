# OnQuarryGather
<Badge type="info" text="Resource"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Triggered when a mining quarry produces resources (each processing cycle).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnQuarryGather()
{
	Puts("OnQuarryGather has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ MiningQuarry]
public void ProcessResources()
{
	if (_linkedDeposit == null || hopperPrefab.instance == null)
	{
		return;
	}
	if (!FuelCheck())
	{
		SetOn(isOn: false);
	}
	float num = UnityEngine.Mathf.Min(workToAdd, pendingWork);
	pendingWork -= num;
	foreach (ResourceDepositManager.ResourceDeposit.ResourceDepositEntry resource in _linkedDeposit._resources)
	{
		if ((!canExtractLiquid && resource.isLiquid) || (!canExtractSolid && !resource.isLiquid))
		{
			continue;
		}
		float workNeeded = resource.workNeeded;
		int num2 = UnityEngine.Mathf.FloorToInt(resource.workDone / workNeeded);
		resource.workDone += num;
		int num3 = UnityEngine.Mathf.FloorToInt(resource.workDone / workNeeded);
		if (resource.workDone > workNeeded)
		{
			resource.workDone %= workNeeded;
		}
		if (num2 != num3)
		{
			int iAmount = num3 - num2;
			Item item = ItemManager.Create(resource.type, iAmount, 0uL);
			Facepunch.Rust.Analytics.Azure.OnQuarryItem(Facepunch.Rust.Analytics.Azure.ResourceMode.Produced, item.info.shortname, item.amount, this);
			if (!item.MoveToContainer(hopperPrefab.instance.GetComponent<StorageContainer>().inventory))
			{
				item.Remove();
				SetOn(isOn: false);
			}
		}
	}
}

```
:::
