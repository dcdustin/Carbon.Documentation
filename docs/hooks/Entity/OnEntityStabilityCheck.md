<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnEntityStabilityCheck
```csharp
public virtual void StabilityCheck()
{
	if (base.IsDestroyed)
	{
		return;
	}
	if (supports == null)
	{
		InitializeSupports();
	}
	bool flag = false;
	int num = DistanceFromGround();
	if (num != cachedDistanceFromGround)
	{
		cachedDistanceFromGround = num;
		flag = true;
	}
	float num2 = SupportValue();
	if (UnityEngine.Mathf.Abs(cachedStability - num2) > ConVar.Stability.accuracy)
	{
		cachedStability = num2;
		flag = true;
	}
	if (flag)
	{
		dirty = true;
		UpdateConnectedEntities();
		UpdateStability();
	}
	else if (dirty)
	{
		dirty = false;
		SendNetworkUpdate();
	}
	if (num2 < ConVar.Stability.collapse)
	{
		if (stabilityStrikes < ConVar.Stability.strikes)
		{
			UpdateStability();
			stabilityStrikes++;
		}
		else
		{
			Kill(BaseNetworkable.DestroyMode.Gib);
		}
	}
	else
	{
		stabilityStrikes = 0;
	}
}

```
