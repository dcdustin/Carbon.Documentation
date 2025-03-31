# CanAffordToPlace
<Badge type="info" text="Structure"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanAffordToPlace(BasePlayer local0, Planner planner, Construction component)
{
	Puts("CanAffordToPlace has been fired!");
	return (bool)default;
}
```
```csharp [Source — Assembly-CSharp @ Planner]
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
:::
