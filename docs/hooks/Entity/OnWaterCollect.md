<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnWaterCollect [WaterPump]
```csharp
public void CreateWater()
{
	if (!IsFull())
	{
		ItemDefinition itemDefinition = WaterResource.SV_GetAtPoint(WaterResourceLocation.position);
		if (itemDefinition != null)
		{
			base.inventory.AddItem(itemDefinition, AmountPerPump, 0uL);
			UpdateOnFlag();
		}
	}
}

```
