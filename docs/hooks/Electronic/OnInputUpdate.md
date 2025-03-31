# OnInputUpdate
<Badge type="info" text="Electronic"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when an IOEntity updates based on an input change (e.g., an electrical device receives power input).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnInputUpdate(IOEntity iOEntity)
{
	Puts("OnInputUpdate has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ IOEntity]
public virtual void UpdateFromInput(int inputAmount, int inputSlot)
{
	if (inputs[inputSlot].type != ioType || inputs[inputSlot].type == IOEntity.IOType.Industrial)
	{
		IOStateChanged(inputAmount, inputSlot);
		return;
	}
	UpdateHasPower(inputAmount, inputSlot);
	lastEnergy = currentEnergy;
	currentEnergy = CalculateCurrentEnergy(inputAmount, inputSlot);
	int num = GetPassthroughAmount();
	if (infiniteIoPower && GetQueueType() == IOEntity.QueueType.ElectricLowPriority)
	{
		num = 999;
	}
	bool flag = lastPassthroughEnergy != num;
	lastPassthroughEnergy = num;
	if (currentEnergy != lastEnergy || flag)
	{
		IOStateChanged(inputAmount, inputSlot);
		ensureOutputsUpdated = true;
	}
	_processQueues[GetQueueType()].Enqueue(this);
}

```
:::
