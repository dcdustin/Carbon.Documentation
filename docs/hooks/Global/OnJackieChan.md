<Badge type="danger" text="Carbon Compatible"/>
# OnJackieChan
Called when a player entity is fully initialized on the server.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnJackieChan()
{
	Puts("OnJackieChan has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ BasePlayer]
public void PlayerInit(Network.Connection c)
{
	using (TimeWarning.New("PlayerInit", 10))
	{
		CancelInvoke(base.KillMessage);
		SetPlayerFlag(BasePlayer.PlayerFlags.Connected, b: true);
		activePlayerList.Add(this);
		bots.Remove(this);
		userID = c.userid;
		UserIDString = userID.Get().ToString();
		displayName = c.username;
		c.player = this;
		secondsConnected = 0;
		currentTeam = RelationshipManager.ServerInstance.FindPlayersTeam(userID)?.teamID ?? 0;
		SingletonComponent<ServerMgr>.Instance.persistance.SetPlayerName(userID, displayName);
		tickInterpolator.Reset(base.transform.position);
		tickHistory.Reset(base.transform.position);
		eyeHistory.Clear();
		lastTickTime = 0f;
		lastInputTime = 0f;
		SetPlayerFlag(BasePlayer.PlayerFlags.ReceivingSnapshot, b: true);
		stats.Init();
		InvokeRandomized(StatSave, UnityEngine.Random.Range(5f, 10f), 30f, UnityEngine.Random.Range(0f, 6f));
		previousLifeStory = SingletonComponent<ServerMgr>.Instance.persistance.GetLastLifeStory(userID);
		SetPlayerFlag(BasePlayer.PlayerFlags.IsAdmin, c.authLevel != 0);
		SetPlayerFlag(BasePlayer.PlayerFlags.IsDeveloper, DeveloperList.IsDeveloper(this));
		if (IsDead() && net.SwitchGroup(BaseNetworkable.LimboNetworkGroup))
		{
			SendNetworkGroupChange();
		}
		net.OnConnected(c);
		net.StartSubscriber();
		SendAsSnapshot(net.connection);
		GlobalNetworkHandler.server.StartSendingSnapshot(this);
		ClientRPC(RpcTarget.Player("StartLoading", this));
		if ((bool)BaseGameMode.GetActiveGameMode(serverside: true))
		{
			BaseGameMode.GetActiveGameMode(serverside: true).OnPlayerConnected(this);
		}
		if (net != null)
		{
			EACServer.OnStartLoading(net.connection);
		}
		if (IsAdmin)
		{
			if (ConVar.AntiHack.noclip_protection <= 0)
			{
				ChatMessage("antihack.noclip_protection is disabled!");
			}
			if (ConVar.AntiHack.speedhack_protection <= 0)
			{
				ChatMessage("antihack.speedhack_protection is disabled!");
			}
			if (ConVar.AntiHack.flyhack_protection <= 0)
			{
				ChatMessage("antihack.flyhack_protection is disabled!");
			}
			if (ConVar.AntiHack.projectile_protection <= 0)
			{
				ChatMessage("antihack.projectile_protection is disabled!");
			}
			if (ConVar.AntiHack.melee_protection <= 0)
			{
				ChatMessage("antihack.melee_protection is disabled!");
			}
			if (ConVar.AntiHack.eye_protection <= 0)
			{
				ChatMessage("antihack.eye_protection is disabled!");
			}
		}
		inventory.crafting.SendToOwner();
		if (TerrainMeta.Path != null && TerrainMeta.Path.OceanPatrolFar != null)
		{
			SendCargoPatrolPath();
		}
	}
}

```
:::
