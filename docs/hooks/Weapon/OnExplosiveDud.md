# OnExplosiveDud
<Badge type="info" text="Weapon"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnExplosiveDud()
{
	Puts("OnExplosiveDud has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ DudTimedExplosive]
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
:::
