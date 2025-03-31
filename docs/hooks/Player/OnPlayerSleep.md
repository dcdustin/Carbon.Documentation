# OnPlayerSleep
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Triggered when a player goes to sleep (becomes a sleeper in the world).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnPlayerSleep()
{
	Puts("OnPlayerSleep has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ BasePlayer]
public virtual void StartSleeping()
{
	if (!IsSleeping())
	{
		if (IsRestrained)
		{
			inventory.SetLockedByRestraint(flag: false);
		}
		if (InSafeZone() && !IsInvoking(ScheduledDeath))
		{
			Invoke(ScheduledDeath, NPCAutoTurret.sleeperhostiledelay);
		}
		BaseMountable baseMountable = GetMounted();
		if (baseMountable != null && !AllowSleeperMounting(baseMountable))
		{
			EnsureDismounted();
		}
		SetPlayerFlag(BasePlayer.PlayerFlags.Sleeping, b: true);
		sleepStartTime = UnityEngine.Time.time;
		sleepingPlayerList.TryAdd(this);
		bots.Remove(this);
		CancelInvoke(InventoryUpdate);
		CancelInvoke(TeamUpdate);
		CancelInvoke(UpdateClanLastSeen);
		inventory.loot.Clear();
		inventory.containerMain.OnChanged();
		inventory.containerBelt.OnChanged();
		inventory.containerWear.OnChanged();
		EnablePlayerCollider();
		if (!IsLoadingAfterTransfer())
		{
			RemovePlayerRigidbody();
			TurnOffAllLights();
		}
		SetServerFall(wantsOn: true);
	}
}

```
:::
