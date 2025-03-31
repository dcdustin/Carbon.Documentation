<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPlayerWound
```csharp
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
