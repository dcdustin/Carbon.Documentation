<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanAffordToPlace
```csharp
public bool CanAffordToPlace(Construction component)
{
	if (isTypeDeployable)
	{
		return true;
	}
	BasePlayer ownerPlayer = GetOwnerPlayer();
	if (!ownerPlayer)
	{
		return false;
	}
	if (ownerPlayer.IsInCreativeMode && ConVar.Creative.freeBuild)
	{
		return true;
	}
	foreach (ItemAmount item in component.defaultGrade.CostToBuild())
	{
		if ((float)ownerPlayer.inventory.GetAmount(item.itemDef.itemid) < item.amount)
		{
			return false;
		}
	}
	return true;
}

```
