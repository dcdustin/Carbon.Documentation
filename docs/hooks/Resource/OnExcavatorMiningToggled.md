# OnExcavatorMiningToggled
<Badge type="info" text="Resource"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
- Called when the excavator's mining engine is started.

- Called when the excavator's mining engine is stopped.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnExcavatorMiningToggled(ExcavatorArm excavatorArm)
{
	Puts("OnExcavatorMiningToggled has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ ExcavatorArm]
public void StopMining()
{
	ExcavatorServerEffects.SetMining(isMining: false);
	CancelInvoke(ProduceResources);
	if (HasFlag(BaseEntity.Flags.On))
	{
		Facepunch.Rust.Analytics.Server.ExcavatorStopped(GetNetworkTime() - excavatorStartTime);
	}
	SetFlag(BaseEntity.Flags.On, b: false);
}

```
:::
