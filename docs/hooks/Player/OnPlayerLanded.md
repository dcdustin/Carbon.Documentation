# OnPlayerLanded
<Badge type="info" text="Player"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called after a player has landed on the ground from a fall or jump.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnPlayerLanded(BasePlayer basePlayer, float local0)
{
	Puts("OnPlayerLanded has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ BasePlayer]
public void ApplyFallDamageFromVelocity(float velocity)
{
	if (IsGod())
	{
		return;
	}
	float num = UnityEngine.Mathf.InverseLerp(-15f, -100f, velocity);
	if (num != 0f)
	{
		float num2 = ((modifiers != null) ? UnityEngine.Mathf.Clamp01(1f - modifiers.GetValue(Modifier.ModifierType.Clotting)) : 1f);
		metabolism.bleeding.Add(num * 0.5f * num2);
		float num3 = num * 500f;
		Facepunch.Rust.Analytics.Azure.OnFallDamage(this, velocity, num3);
		Hurt(num3, Rust.DamageType.Fall);
		if (num3 > 20f && fallDamageEffect.isValid)
		{
			Effect.server.Run(fallDamageEffect.resourcePath, base.transform.position, UnityEngine.Vector3.zero);
		}
	}
}

```
:::
