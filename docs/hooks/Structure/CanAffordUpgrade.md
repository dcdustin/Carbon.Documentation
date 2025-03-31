<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanAffordUpgrade
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanAffordUpgrade()
{
	Puts("CanAffordUpgrade has been fired!");
	return (System.Boolean)default;
}
```
```csharp [Source — Assembly-CSharp @ BuildingBlock]
public bool CanAffordUpgrade(BuildingGrade.Enum iGrade, ulong iSkin, BasePlayer player)
{
	if (player != null && player.IsInCreativeMode && ConVar.Creative.freeBuild)
	{
		return true;
	}
	if (!ConVar.Decay.CanUpgradeToGrade(iGrade))
	{
		return false;
	}
	foreach (ItemAmount item in blockDefinition.GetGrade(iGrade, iSkin).CostToBuild(grade))
	{
		if ((float)player.inventory.GetAmount(item.itemid) < item.amount)
		{
			return false;
		}
	}
	return true;
}

```
:::
