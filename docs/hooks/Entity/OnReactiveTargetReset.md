<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnReactiveTargetReset
```csharp
public void ResetTarget()
{
	if (IsLowered() && CanToggle() && CanReset())
	{
		CancelInvoke(ResetTarget);
		SetFlag(BaseEntity.Flags.On, b: true);
		SetFlag(BaseEntity.Flags.Reserved1, b: false);
		knockdownHealth = 100f;
		SendPowerBurst();
	}
}

```
