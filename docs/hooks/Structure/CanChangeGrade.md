<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanChangeGrade
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanChangeGrade()
{
	Puts("CanChangeGrade has been fired!");
	return (System.Boolean)default;
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
