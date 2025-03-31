# OnWaterCollect
<Badge type="info" text="Entity"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a water catcher or water pump collects water.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnWaterCollect(WaterPump waterPump, ItemDefinition local0)
{
	Puts("OnWaterCollect has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ WaterPump]
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
:::
