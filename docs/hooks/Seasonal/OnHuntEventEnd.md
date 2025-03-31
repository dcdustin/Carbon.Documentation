<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnHuntEventEnd
```csharp
public void Update()
{
	timeAlive += UnityEngine.Time.deltaTime;
	if (base.isServer && !base.IsDestroyed)
	{
		if (timeAlive - warmupTime > durationSeconds - warnTime)
		{
			SetFlag(BaseEntity.Flags.Reserved1, b: true);
		}
		if (timeAlive - warmupTime > durationSeconds && !IsInvoking(Cooldown))
		{
			SetFlag(BaseEntity.Flags.Reserved2, b: true);
			CleanupEggs();
			PrintWinnersAndAward();
			Invoke(Cooldown, 10f);
		}
	}
}

```
