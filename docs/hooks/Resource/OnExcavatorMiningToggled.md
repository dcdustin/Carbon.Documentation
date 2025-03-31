# OnExcavatorMiningToggled
<Badge type="info" text="Resource"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
- Called when the excavator's mining engine is started.

- Called when the excavator's mining engine is stopped.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnExcavatorMiningToggled()
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
