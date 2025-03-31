# OnLoseCondition
<Badge type="info" text="Global"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)<Badge type="info" text="MetadataOnly"/>
Called when an item loses durability (condition).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnLoseCondition(Item item, float amount)
{
	Puts("OnLoseCondition has been fired!");
}
```
:::
