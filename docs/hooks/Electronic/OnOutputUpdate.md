<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnOutputUpdate
```csharp
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
