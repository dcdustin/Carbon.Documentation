<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnTreeMarkerHit
Called when a tree’s marked spot is hit during chopping (player hit the “X” mark on a tree for bonus).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool OnTreeMarkerHit()
{
	Puts("OnTreeMarkerHit has been fired!");
	return (System.Boolean)default;
}
```
```csharp [Source — Assembly-CSharp @ TreeEntity]
public bool DidHitMarker(HitInfo info)
{
	if (xMarker == null)
	{
		return false;
	}
	if (PrefabAttribute.server.Find<TreeMarkerData>(prefabID) != null)
	{
		if (new UnityEngine.Bounds(xMarker.transform.position, UnityEngine.Vector3.one * 0.2f).Contains(info.HitPositionWorld))
		{
			return true;
		}
	}
	else
	{
		UnityEngine.Vector3 lhs = UnityEngine.Vector3Ex.Direction2D(base.transform.position, xMarker.transform.position);
		UnityEngine.Vector3 attackNormal = info.attackNormal;
		float num = UnityEngine.Vector3.Dot(lhs, attackNormal);
		float num2 = UnityEngine.Vector3.Distance(xMarker.transform.position, info.HitPositionWorld);
		if (num >= 0.3f && num2 <= 0.2f)
		{
			return true;
		}
	}
	return false;
}

```
:::
