# OnPlayerSleepEnd
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a sleeping player is about to wake up.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnPlayerSleepEnd()
{
	Puts("OnPlayerSleepEnd has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ BasePlayer]
public virtual void EndSleeping()
{
	if (IsSleeping())
	{
		if (IsRestrained)
		{
			inventory.SetLockedByRestraint(flag: true);
		}
		SetPlayerFlag(BasePlayer.PlayerFlags.Sleeping, b: false);
		sleepStartTime = -1f;
		sleepingPlayerList.Remove(this);
		if ((ulong)userID < 10000000 && !bots.Contains(this))
		{
			bots.Add(this);
		}
		CancelInvoke(ScheduledDeath);
		InvokeRepeating(InventoryUpdate, 1f, 0.1f * UnityEngine.Random.Range(0.99f, 1.01f));
		if (RelationshipManager.TeamsEnabled())
		{
			InvokeRandomized(TeamUpdate, 1f, 4f, 1f);
		}
		InvokeRandomized(UpdateClanLastSeen, 300f, 300f, 60f);
		EnablePlayerCollider();
		AddPlayerRigidbody();
		SetServerFall(wantsOn: false);
		if (HasParent())
		{
			SetParent(null, worldPositionStays: true);
			RemoveFromTriggers();
			ForceUpdateTriggers();
		}
		inventory.containerMain.OnChanged();
		inventory.containerBelt.OnChanged();
		inventory.containerWear.OnChanged();
		EACServer.LogPlayerSpawn(this);
		if (TotalPingCount > 0)
		{
			SendPingsToClient();
		}
		if (TutorialIsland.ShouldPlayerBeAskedToStartTutorial(this))
		{
			ClientRPC(RpcTarget.Player("PromptToStartTutorial", this));
		}
		if (AntiHack.TestNoClipping(this, base.transform.position, base.transform.position, NoClipRadius(ConVar.AntiHack.noclip_margin), ConVar.AntiHack.noclip_backtracking, out var _))
		{
			ForceCastNoClip();
		}
	}
}

```
:::
