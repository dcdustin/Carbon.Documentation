# OnReactiveTargetReset
<Badge type="info" text="Entity"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a reactive target (shooting range target) resets to its upright position.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnReactiveTargetReset(ReactiveTarget reactiveTarget)
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
