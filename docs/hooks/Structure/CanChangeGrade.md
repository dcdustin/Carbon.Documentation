# CanChangeGrade
<Badge type="info" text="Structure"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanChangeGrade(BasePlayer player, BuildingBlock buildingBlock, BuildingGrade.Enum iGrade, ulong iSkin)
{
	Puts("CanChangeGrade has been fired!");
	return (bool)default;
}
```
```csharp [Source — Assembly-CSharp @ BuildingBlock]
public bool CanChangeToGrade(BuildingGrade.Enum iGrade, ulong iSkin, BasePlayer player)
{
	if (player.IsInCreativeMode && ConVar.Creative.freeBuild)
	{
		return true;
	}
	if (HasUpgradePrivilege(iGrade, iSkin, player))
	{
		return !IsUpgradeBlocked();
	}
	return false;
}

```
:::
