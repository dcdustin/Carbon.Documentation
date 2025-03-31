# OnResearchCostDetermine
<Badge type="info" text="Item"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when determining the scrap cost to research an item.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private int OnResearchCostDetermine(ItemDefinition info)
{
	Puts("OnResearchCostDetermine has been fired!");
	return (int)default;
}
```
```csharp [Source — Assembly-CSharp @ ResearchTable]
public static int ScrapForResearch(Item item)
{
	return ScrapForResearch(item.info);
}

```
:::
