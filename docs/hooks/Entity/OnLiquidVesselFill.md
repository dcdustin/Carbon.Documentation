<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnLiquidVesselFill
```csharp
public void FillCheck()
{
	if (base.isClient)
	{
		return;
	}
	BasePlayer ownerPlayer = GetOwnerPlayer();
	if (!ownerPlayer)
	{
		return;
	}
	float f = (UnityEngine.Time.realtimeSinceStartup - lastFillTime) * fillMlPerSec;
	UnityEngine.Vector3 pos = ownerPlayer.transform.position - new UnityEngine.Vector3(0f, 1f, 0f);
	LiquidContainer facingLiquidContainer = GetFacingLiquidContainer();
	if (facingLiquidContainer == null && CanFillFromWorld())
	{
		Item contents = GetContents();
		ItemDefinition itemDefinition = WaterResource.SV_GetAtPoint(pos);
		if (contents != null && contents.info.itemid != itemDefinition.itemid)
		{
			if ((float)timeSinceLastToast > 5f)
			{
				UnityEngine.Debug.Log("pushing toast");
				timeSinceLastToast = 0f;
				ownerPlayer.ShowToast(GameTip.Styles.Red_Normal, DifferentLiquidType, false);
			}
			return;
		}
		AddLiquid(itemDefinition, UnityEngine.Mathf.FloorToInt(f));
	}
	else if (facingLiquidContainer != null && facingLiquidContainer.HasLiquidItem())
	{
		int num = UnityEngine.Mathf.CeilToInt((1f - HeldFraction()) * (float)MaxHoldable());
		if (num > 0)
		{
			GetContents();
			Item liquidItem = facingLiquidContainer.GetLiquidItem();
			int num2 = UnityEngine.Mathf.Min(UnityEngine.Mathf.CeilToInt(f), UnityEngine.Mathf.Min(liquidItem.amount, num));
			AddLiquid(liquidItem.info, num2);
			liquidItem.UseItem(num2);
			facingLiquidContainer.OpenTap(2f);
		}
	}
	lastFillTime = UnityEngine.Time.realtimeSinceStartup;
}

```
