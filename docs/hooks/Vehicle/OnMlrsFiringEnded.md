<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnMlrsFiringEnded
```csharp
public void EndFiring()
{
	CancelInvoke(FireNextRocket);
	rocketOwnerRef.Set(null);
	if (TryGetAimingModule(out var item))
	{
		item.LoseCondition(1f);
	}
	SetFlag(BaseEntity.Flags.Reserved6, b: false, recursive: false, networkupdate: false);
	SetFlag(BaseEntity.Flags.Broken, b: true, recursive: false, networkupdate: false);
	SendNetworkUpdate_Flags();
	timeSinceBroken = 0f;
}

```
