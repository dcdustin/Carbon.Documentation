<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnExplosiveDud
```csharp
public override void Explode()
{
	if (creatorEntity != null && creatorEntity.IsNpc)
	{
		base.Explode();
	}
	else if (UnityEngine.Random.Range(0f, 1f) < dudChance)
	{
		BecomeDud();
	}
	else
	{
		base.Explode();
	}
}

```
