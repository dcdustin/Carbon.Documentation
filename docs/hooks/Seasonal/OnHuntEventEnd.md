# OnHuntEventEnd
<Badge type="info" text="Seasonal"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when an Egg Hunt event ends (time is up and winners are determined).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnHuntEventEnd(EggHuntEvent eggHuntEvent)
{
	Puts("OnHuntEventEnd has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ EggHuntEvent]
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
:::
