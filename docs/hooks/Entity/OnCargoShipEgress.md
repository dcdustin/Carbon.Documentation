<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnCargoShipEgress
```csharp
public void StartEgress()
{
	if (!isDoingHarborApproach && !egressing)
	{
		egressing = true;
		CancelInvoke(PlayHorn);
		radiation.SetActive(value: true);
		SetFlag(BaseEntity.Flags.Reserved8, b: true);
		InvokeRepeating(UpdateRadiation, 10f, 1f);
		Invoke(DelayedDestroy, 60f * egress_duration_minutes);
	}
}

```
