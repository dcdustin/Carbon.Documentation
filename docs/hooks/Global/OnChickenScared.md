# OnChickenScared
<Badge type="info" text="Global"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)
Called when a chicken (or similar animal) becomes scared and flees.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnChickenScared(Chicken chicken, BaseEntity threat)
{
	Puts("OnChickenScared has been fired!");
}
```
:::
