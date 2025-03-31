# OnPlayerInput
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a player's input is processed each frame (movement, view, etc.).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnPlayerInput(BasePlayer basePlayer, BasePlayer self1)
{
	Puts("OnPlayerInput has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ BasePlayer]
public void OnReceiveTick(PlayerTick msg, bool wasPlayerStalled)
{
	if (msg.inputState != null)
	{
		serverInput.Flip(msg.inputState);
	}
	if (serverInput.current.buttons != serverInput.previous.buttons)
	{
		ResetInputIdleTime();
	}
	if (IsReceivingSnapshot)
	{
		return;
	}
	if (IsSpectating())
	{
		using (TimeWarning.New("Tick_Spectator"))
		{
			Tick_Spectator();
			return;
		}
	}
	if (IsDead())
	{
		return;
	}
	if (IsSleeping())
	{
		if (serverInput.WasJustPressed(BUTTON.FIRE_PRIMARY) || serverInput.WasJustPressed(BUTTON.FIRE_SECONDARY) || serverInput.WasJustPressed(BUTTON.JUMP) || serverInput.WasJustPressed(BUTTON.DUCK))
		{
			EndSleeping();
			SendNetworkUpdateImmediate();
		}
		UpdateActiveItem(default(ItemId));
		return;
	}
	if (IsRestrained && restraintItemId.HasValue && restraintItemId.HasValue)
	{
		UpdateActiveItem(restraintItemId.Value);
	}
	else if (!Belt.CanHoldItem())
	{
		UpdateActiveItem(default(ItemId));
	}
	else
	{
		UpdateActiveItem(msg.activeItem);
	}
	UpdateModelStateFromTick(msg);
	if (float.IsNaN(modelState.ducking) || float.IsInfinity(modelState.ducking))
	{
		Kick("Kicked: invalid modelstate");
		return;
	}
	modelState.ducking = UnityEngine.Mathf.Clamp01(modelState.ducking);
	if (IsIncapacitated())
	{
		return;
	}
	if (isMounted)
	{
		GetMounted().PlayerServerInput(serverInput, this);
	}
	UpdatePositionFromTick(msg, wasPlayerStalled);
	UpdateRotationFromTick(msg);
	int activeMission = GetActiveMission();
	if (activeMission >= 0 && activeMission < missions.Count)
	{
		BaseMission.MissionInstance missionInstance = missions[activeMission];
		if (missionInstance.status == BaseMission.MissionStatus.Active && missionInstance.NeedsPlayerInput())
		{
			ProcessMissionEvent(BaseMission.MissionEventType.PLAYER_TICK, net.ID, 0f);
		}
	}
	if (!TutorialIsland.EnforceTrespassChecks || IsAdmin || IsNpc || net == null || net.group == null)
	{
		return;
	}
	if (net.group.restricted)
	{
		bool flag = false;
		if (!IsInTutorial)
		{
			flag = true;
		}
		else
		{
			TutorialIsland currentTutorialIsland = GetCurrentTutorialIsland();
			if (currentTutorialIsland == null || currentTutorialIsland.net.group != net.group)
			{
				flag = true;
			}
		}
		if (flag)
		{
			tutorialKickTime += UnityEngine.Time.deltaTime;
			if (tutorialKickTime > 3f)
			{
				UnityEngine.Debug.LogWarning($"Killing player {displayName}/{userID.Get()} as they are on a tutorial island that doesn't belong them");
				Hurt(999f);
				tutorialKickTime = 0f;
			}
		}
		else
		{
			tutorialKickTime = 0f;
		}
	}
	else
	{
		if (!IsInTutorial || net.group.restricted)
		{
			return;
		}
		bool flag2 = false;
		TutorialIsland currentTutorialIsland2 = GetCurrentTutorialIsland();
		if (currentTutorialIsland2 == null || currentTutorialIsland2.net.group != net.group)
		{
			flag2 = true;
		}
		if (flag2)
		{
			tutorialKickTime += UnityEngine.Time.deltaTime;
			if (tutorialKickTime > 3f)
			{
				UnityEngine.Debug.LogWarning($"Killing player {displayName}/{userID.Get()} as they are no longer on a tutorial island and are marked as being in a tutorial");
				Hurt(999f);
				tutorialKickTime = 0f;
			}
		}
		else
		{
			tutorialKickTime = 0f;
		}
	}
}

```
:::
