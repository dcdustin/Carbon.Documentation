# OnCupboardAssign
<Badge type="info" text="Structure"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)<Badge type="info" text="MetadataOnly"/>
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnCupboardAssign(BuildingPrivlidge priv, ulong targetId, BasePlayer player)
{
	Puts("OnCupboardAssign has been fired!");
	return (object)default;
}
```
:::
