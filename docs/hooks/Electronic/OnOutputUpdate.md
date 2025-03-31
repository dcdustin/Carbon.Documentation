# OnOutputUpdate
<Badge type="info" text="Electronic"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when an IOEntity updates its outputs (e.g., an electrical device sends power out to connected devices).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnOutputUpdate(IOEntity iOEntity)
{
	Puts("OnOutputUpdate has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ IOEntity]
public virtual void UpdateOutputs()
{
	if (!ShouldUpdateOutputs() || !ensureOutputsUpdated)
	{
		return;
	}
	ensureOutputsUpdated = false;
	using (TimeWarning.New("ProcessIOOutputs"))
	{
		for (int i = 0; i < outputs.Length; i++)
		{
			IOEntity.IOSlot iOSlot = outputs[i];
			bool flag = true;
			IOEntity iOEntity = iOSlot.connectedTo.Get();
			if (!(iOEntity != null))
			{
				continue;
			}
			if (ioType == IOEntity.IOType.Fluidic && !DisregardGravityRestrictionsOnLiquid && !iOEntity.DisregardGravityRestrictionsOnLiquid)
			{
				using (TimeWarning.New("FluidOutputProcessing"))
				{
					if (!iOEntity.AllowLiquidPassthrough(this, base.transform.TransformPoint(iOSlot.handlePosition)))
					{
						flag = false;
					}
				}
			}
			int passthroughAmount = GetPassthroughAmount(i);
			iOEntity.UpdateFromInput(flag ? passthroughAmount : 0, iOSlot.connectedToSlot);
		}
	}
}

```
:::
