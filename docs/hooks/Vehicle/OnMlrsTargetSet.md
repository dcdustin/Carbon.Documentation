# OnMlrsTargetSet
<Badge type="info" text="Vehicle"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnMlrsTargetSet(MLRS mLRS, MLRS self1, MLRS self2)
{
	Puts("OnMlrsTargetSet has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ MLRS]
public void SetUserTargetHitPos(UnityEngine.Vector3 worldPos)
{
	if (UserTargetHitPos == worldPos)
	{
		return;
	}
	if (base.isServer)
	{
		UnityEngine.Vector3 position = TerrainMeta.Position;
		UnityEngine.Vector3 vector = position + TerrainMeta.Size;
		worldPos.x = UnityEngine.Mathf.Clamp(worldPos.x, position.x, vector.x);
		worldPos.z = UnityEngine.Mathf.Clamp(worldPos.z, position.z, vector.z);
		worldPos.y = GetSurfaceHeight(worldPos);
	}
	UserTargetHitPos = worldPos;
	if (!base.isServer)
	{
		return;
	}
	trueTargetHitPos = UserTargetHitPos;
	foreach (TriggerSafeZone allSafeZone in TriggerSafeZone.allSafeZones)
	{
		UnityEngine.Vector3 center = allSafeZone.triggerCollider.bounds.center;
		center.y = 0f;
		float num = UnityEngine.ColliderEx.GetRadius(allSafeZone.triggerCollider, allSafeZone.transform.localScale) + targetAreaRadius;
		trueTargetHitPos.y = 0f;
		if (UnityEngine.Vector3.Distance(center, trueTargetHitPos) < num)
		{
			UnityEngine.Vector3 vector2 = trueTargetHitPos - center;
			trueTargetHitPos = center + vector2.normalized * num;
			trueTargetHitPos.y = GetSurfaceHeight(trueTargetHitPos);
			break;
		}
	}
}

```
:::
