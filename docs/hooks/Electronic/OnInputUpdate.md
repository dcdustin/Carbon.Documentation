<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnInputUpdate
```csharp
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
