<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnReactiveTargetReset
Called when a reactive target (shooting range target) resets to its upright position.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnReactiveTargetReset()
{
	Puts("OnReactiveTargetReset has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ ReactiveTarget]
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
:::
