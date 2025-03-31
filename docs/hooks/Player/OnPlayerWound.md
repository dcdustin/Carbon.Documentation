<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPlayerWound
Triggered when a player goes into the wounded state (downed but not dead).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnPlayerWound()
{
	Puts("OnPlayerWound has been fired!");
	return (System.Object)default;
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
