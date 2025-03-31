<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnExcavatorMiningToggled [stop]
```csharp
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
