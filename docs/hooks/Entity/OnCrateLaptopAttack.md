# OnCrateLaptopAttack
<Badge type="info" text="Entity"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a hackable crate triggers an armed response upon being hacked (e.g., NPCs or defenses activate due to hacking).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnCrateLaptopAttack()
{
	Puts("OnCrateLaptopAttack has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ HackableLockedCrate]
public override void OnAttacked(HitInfo info)
{
	if (base.isServer)
	{
		if (StringPool.Get(info.HitBone) == "laptopcollision")
		{
			Effect.server.Run(shockEffect.resourcePath, info.HitPositionWorld, UnityEngine.Vector3.up);
			hackSeconds -= 8f * (info.damageTypes.Total() / 50f);
			if (hackSeconds < 0f)
			{
				hackSeconds = 0f;
			}
		}
		RefreshDecay();
	}
	base.OnAttacked(info);
}

```
:::
