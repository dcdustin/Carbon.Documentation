<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanBradleyApcTarget
```csharp
public bool VisibilityTest(BaseEntity ent)
{
	if (ent == null)
	{
		return false;
	}
	if (!(UnityEngine.Vector3.Distance(ent.transform.position, base.transform.position) < viewDistance))
	{
		return false;
	}
	bool flag = false;
	if (ent is BasePlayer)
	{
		BasePlayer basePlayer = ent as BasePlayer;
		UnityEngine.Vector3 position = mainTurret.transform.position;
		flag = IsVisible(basePlayer.eyes.position, position) || IsVisible(basePlayer.transform.position + UnityEngine.Vector3.up * 0.1f, position);
		if (!flag && basePlayer.isMounted && basePlayer.GetMounted().VehicleParent() != null && basePlayer.GetMounted().VehicleParent().AlwaysAllowBradleyTargeting)
		{
			flag = IsVisible(basePlayer.GetMounted().VehicleParent().bounds.center, position);
		}
		if (flag)
		{
			flag = !UnityEngine.Physics.SphereCast(new UnityEngine.Ray(position, UnityEngine.Vector3Ex.Direction(basePlayer.eyes.position, position)), 0.05f, UnityEngine.Vector3.Distance(basePlayer.eyes.position, position), 10551297);
		}
	}
	else
	{
		UnityEngine.Debug.LogWarning("Standard vis test!");
		flag = IsVisible(ent.CenterPoint());
	}
	return flag;
}

```
