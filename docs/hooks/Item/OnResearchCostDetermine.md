<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnResearchCostDetermine
Called when determining the scrap cost to research an item.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private int OnResearchCostDetermine()
{
	Puts("OnResearchCostDetermine has been fired!");
	return (System.Int32)default;
}
```
```csharp [Source — Assembly-CSharp @ ResearchTable]
public static int ScrapForResearch(Item item)
{
	return ScrapForResearch(item.info);
}

```
:::
