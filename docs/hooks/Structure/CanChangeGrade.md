<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanChangeGrade
```csharp
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
