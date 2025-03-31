<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanCatchFish
Determines if a caught fish should be allowed (whether the catch succeeds).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object CanCatchFish()
{
	Puts("CanCatchFish has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ BaseFishingRod]
public void CatchProcessBudgeted()
{
	inQueue = false;
	FishingBobber fishingBobber = currentBobber.Get(serverside: true);
	BasePlayer ownerPlayer = GetOwnerPlayer();
	if (ownerPlayer == null || ownerPlayer.IsSleeping() || ownerPlayer.IsWounded() || ownerPlayer.IsDead() || fishingBobber == null)
	{
		Server_Cancel(BaseFishingRod.FailReason.UserRequested);
		return;
	}
	UnityEngine.Vector3 position = ownerPlayer.transform.position;
	float num = UnityEngine.Vector3.Angle((UnityEngine.Vector3Ex.WithY(fishingBobber.transform.position, 0f) - UnityEngine.Vector3Ex.WithY(position, 0f)).normalized, UnityEngine.Vector3Ex.WithY(ownerPlayer.eyes.HeadForward(), 0f));
	float num2 = UnityEngine.Vector3.Distance(position, UnityEngine.Vector3Ex.WithY(fishingBobber.transform.position, position.y));
	if (num > ((num2 > 1.2f) ? 60f : 180f))
	{
		Server_Cancel(BaseFishingRod.FailReason.BadAngle);
		return;
	}
	if (num2 > 1.2f && (float)lastSightCheck > 0.4f)
	{
		if (!GamePhysics.LineOfSight(ownerPlayer.eyes.position, fishingBobber.transform.position, 1084293377))
		{
			Server_Cancel(BaseFishingRod.FailReason.Obstructed);
			return;
		}
		lastSightCheck = 0f;
	}
	if (UnityEngine.Vector3.Distance(position, fishingBobber.transform.position) > MaxCastDistance * 2f)
	{
		Server_Cancel(BaseFishingRod.FailReason.TooFarAway);
		return;
	}
	if (UnityEngine.Vector3.Distance(playerStartPosition, position) > 1f)
	{
		Server_Cancel(BaseFishingRod.FailReason.PlayerMoved);
		return;
	}
	if (CurrentState == BaseFishingRod.CatchState.Waiting)
	{
		if ((float)catchTime < 0f)
		{
			ClientRPC(RpcTarget.NetworkGroup("Client_HookedSomething"));
			CurrentState = BaseFishingRod.CatchState.Catching;
			fishingBobber.SetFlag(BaseEntity.Flags.Reserved1, b: true);
			nextFishStateChange = 0f;
			fishCatchDuration = 0f;
			strainTimer = 0f;
		}
		return;
	}
	BaseFishingRod.FishState fishState = currentFishState;
	if ((float)nextFishStateChange < 0f)
	{
		float num3 = Mathx.RemapValClamped(fishingBobber.TireAmount, 0f, 20f, 0f, 1f);
		if (currentFishState != 0)
		{
			currentFishState = (BaseFishingRod.FishState)0;
			nextFishStateChange = UnityEngine.Random.Range(2f, 4f) * (num3 + 1f);
		}
		else
		{
			nextFishStateChange = UnityEngine.Random.Range(3f, 7f) * (1f - num3);
			if (UnityEngine.Random.Range(0, 100) < 50)
			{
				currentFishState = BaseFishingRod.FishState.PullingLeft;
			}
			else
			{
				currentFishState = BaseFishingRod.FishState.PullingRight;
			}
			if (UnityEngine.Random.Range(0, 100) > 60 && UnityEngine.Vector3.Distance(fishingBobber.transform.position, ownerPlayer.transform.position) < MaxCastDistance - 2f)
			{
				currentFishState |= BaseFishingRod.FishState.PullingBack;
			}
		}
	}
	if ((float)fishCatchDuration > 120f)
	{
		Server_Cancel(BaseFishingRod.FailReason.TimeOut);
		return;
	}
	bool flag = ownerPlayer.serverInput.IsDown(BUTTON.RIGHT);
	bool flag2 = ownerPlayer.serverInput.IsDown(BUTTON.LEFT);
	bool flag3 = HasReelInInput(ownerPlayer.serverInput);
	if (flag2 && flag)
	{
		flag2 = (flag = false);
	}
	UpdateFlags(flag2, flag, flag3);
	if (CurrentState == BaseFishingRod.CatchState.Waiting)
	{
		flag = (flag2 = (flag3 = false));
	}
	if (flag2 && !AllowPullInDirection(-ownerPlayer.eyes.HeadRight(), fishingBobber.transform.position))
	{
		flag2 = false;
	}
	if (flag && !AllowPullInDirection(ownerPlayer.eyes.HeadRight(), fishingBobber.transform.position))
	{
		flag = false;
	}
	float value = ownerPlayer.modifiers.GetValue(Modifier.ModifierType.FishingBoost, 1f);
	fishingBobber.ServerMovementUpdate(flag2, flag, flag3, ref currentFishState, position, fishableModifier, value);
	bool flag4 = false;
	float num4 = 0f;
	if (flag3 || flag2 || flag)
	{
		flag4 = true;
		num4 = 0.5f;
	}
	if (currentFishState != 0 && flag4)
	{
		if (currentFishState.Contains(BaseFishingRod.FishState.PullingBack) && flag3)
		{
			num4 = 1.5f;
		}
		else if ((currentFishState.Contains(BaseFishingRod.FishState.PullingLeft) || currentFishState.Contains(BaseFishingRod.FishState.PullingRight)) && flag3)
		{
			num4 = 1.2f;
		}
		else if (currentFishState.Contains(BaseFishingRod.FishState.PullingLeft) && flag)
		{
			num4 = 0.8f;
		}
		else if (currentFishState.Contains(BaseFishingRod.FishState.PullingRight) && flag2)
		{
			num4 = 0.8f;
		}
	}
	if (flag3 && currentFishState != 0)
	{
		num4 += 1f;
	}
	num4 *= fishableModifier.StrainModifier * GlobalStrainSpeedMultiplier;
	num4 -= ownerPlayer.modifiers.GetValue(Modifier.ModifierType.FishingBoost, 1f) - 1f;
	if (flag4)
	{
		strainTimer += UnityEngine.Time.deltaTime * num4;
	}
	else
	{
		strainTimer = UnityEngine.Mathf.MoveTowards(strainTimer, 0f, UnityEngine.Time.deltaTime * 1.5f);
	}
	float num5 = strainTimer / 6f;
	SetFlag(BaseEntity.Flags.Reserved1, flag4 && num5 > 0.25f);
	if ((float)lastStrainUpdate > 0.4f || fishState != currentFishState)
	{
		ClientRPC(RpcTarget.NetworkGroup("Client_UpdateFishState"), (int)currentFishState, num5);
		lastStrainUpdate = 0f;
	}
	if (strainTimer > 7f || ForceFail)
	{
		Server_Cancel(BaseFishingRod.FailReason.TensionBreak);
	}
	else
	{
		if (!(num2 <= FishCatchDistance) && !ForceSuccess)
		{
			return;
		}
		CurrentState = BaseFishingRod.CatchState.Caught;
		if (currentFishTarget != null)
		{
			Item item = ItemManager.Create(currentFishTarget, 1, 0uL);
			item.SetItemOwnership(ownerPlayer, ItemOwnershipPhrases.Fishing);
			ownerPlayer.GiveItem(item, BaseEntity.GiveItemReason.Crafted);
			if (currentFishTarget.shortname == "skull.human")
			{
				item.name = Facepunch.RandomUsernames.Get(UnityEngine.Random.Range(0, 1000));
			}
			if (Rust.GameInfo.HasAchievements && !string.IsNullOrEmpty(fishableModifier.SteamStatName))
			{
				ownerPlayer.stats.Add(fishableModifier.SteamStatName, 1);
				ownerPlayer.stats.Save(forceSteamSave: true);
				FishLookup.Instance.CheckCatchAllAchievement(ownerPlayer);
			}
			Facepunch.Rust.Analytics.Azure.OnCaughtFish(ownerPlayer, item);
		}
		Facepunch.Rust.Analytics.Server.FishCaught(currentFishTarget);
		ClientRPC(RpcTarget.NetworkGroup("Client_OnCaughtFish"), currentFishTarget.itemid);
		ownerPlayer.SignalBroadcast(BaseEntity.Signal.Alt_Attack);
		Invoke(ResetLine, 6f);
		fishingBobber.Kill();
		currentBobber.Set(null);
		CancelInvoke(CatchProcess);
	}
}

```
:::
