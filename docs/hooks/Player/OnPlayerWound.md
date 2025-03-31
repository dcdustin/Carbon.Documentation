# OnPlayerWound
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Triggered when a player goes into the wounded state (downed but not dead).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnPlayerWound(BasePlayer basePlayer, HitInfo info)
{
	Puts("OnPlayerWound has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ BasePlayer]
public void BecomeWounded(HitInfo info = null)
{
	if (IsWounded())
	{
		return;
	}
	bool flag = info != null && info.damageTypes.GetMajorityDamageType() == Rust.DamageType.Fall;
	if (IsCrawling())
	{
		woundedByFallDamage |= flag;
		GoToIncapacitated(info);
		return;
	}
	woundedByFallDamage = flag;
	if (flag || !ConVar.Server.crawlingenabled)
	{
		GoToIncapacitated(info);
	}
	else
	{
		GoToCrawling(info);
	}
}

```
:::
