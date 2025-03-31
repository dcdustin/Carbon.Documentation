# OnCupboardAuthorize
<Badge type="info" text="Structure"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)<Badge type="info" text="MetadataOnly"/>
- Called when a player is authorized on a tool cupboard.

- Use this to track or restrict cupboard authorizations.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnCupboardAuthorize(BuildingPrivlidge priv, BasePlayer player)
{
	Puts("OnCupboardAuthorize has been fired!");
	return (object)default;
}
```
:::
