# CanHelicopterTarget
<Badge type="info" text="Vehicle"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanHelicopterTarget()
{
	Puts("CanHelicopterTarget has been fired!");
	return (System.Boolean)default;
}
```
```csharp [Source — Assembly-CSharp @ PatrolHelicopterAI]
public bool PlayerVisible(BasePlayer ply)
{
	using (TimeWarning.New("PatrolHelicoperAI.PlayerVisible"))
	{
		UnityEngine.Vector3 position = ply.eyes.position;
		if (ply.eyes.position.y < WaterSystem.OceanLevel && UnityEngine.Mathf.Abs(WaterSystem.OceanLevel - ply.eyes.position.y) > oceanDepthTargetCutoff)
		{
			return false;
		}
		if (TOD_Sky.Instance.IsNight && UnityEngine.Vector3.Distance(position, interestZoneOrigin) > 40f)
		{
			return false;
		}
		UnityEngine.Vector3 vector = base.transform.position - UnityEngine.Vector3.up * 6f;
		float num = UnityEngine.Vector3.Distance(position, vector);
		UnityEngine.Vector3 normalized = (position - vector).normalized;
		if (GamePhysics.Trace(new UnityEngine.Ray(vector + normalized * 5f, normalized), 0f, out var hitInfo, num * 1.1f, 1218652417) && UnityEngine.GameObjectEx.ToBaseEntity(hitInfo.collider.gameObject) == ply)
		{
			return true;
		}
		return false;
	}
}

```
:::
