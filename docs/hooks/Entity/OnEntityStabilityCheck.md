# OnEntityStabilityCheck
<Badge type="info" text="Entity"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called during a stability check for a building entity (to determine if it should collapse). Plugins can adjust or override stability outcome.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnEntityStabilityCheck(StabilityEntity stabilityEntity)
{
	Puts("OnEntityStabilityCheck has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ StabilityEntity]
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
:::
