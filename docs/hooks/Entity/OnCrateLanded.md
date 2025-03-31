# OnCrateLanded
<Badge type="info" text="Entity"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a dropped supply crate or locked crate lands on the ground.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnCrateLanded(HackableLockedCrate hackableLockedCrate)
{
	Puts("OnCrateLanded has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ HackableLockedCrate]
public void LandCheck()
{
	if (!hasLanded && UnityEngine.Physics.Raycast(new UnityEngine.Ray(base.transform.position + UnityEngine.Vector3.up * 0.5f, UnityEngine.Vector3.down), out var hitInfo, 1f, 1084293377))
	{
		Effect.server.Run(landEffect.resourcePath, hitInfo.point, UnityEngine.Vector3.up);
		hasLanded = true;
		CancelInvoke(LandCheck);
	}
}

```
:::
