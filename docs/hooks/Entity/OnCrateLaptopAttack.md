<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnCrateLaptopAttack
```csharp
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
