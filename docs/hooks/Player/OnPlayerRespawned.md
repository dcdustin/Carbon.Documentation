# OnPlayerRespawned
<Badge type="info" text="Player"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called after a player has respawned in the world.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnPlayerRespawned(BasePlayer basePlayer)
{
	Puts("OnPlayerRespawned has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ BasePlayer]
public void RespawnAt(UnityEngine.Vector3 position, UnityEngine.Quaternion rotation, BaseEntity spawnPointEntity = null)
{
	BaseGameMode activeGameMode = BaseGameMode.GetActiveGameMode(serverside: true);
	if ((bool)activeGameMode && !activeGameMode.CanPlayerRespawn(this))
	{
		return;
	}
	SetPlayerFlag(BasePlayer.PlayerFlags.Wounded, b: false);
	SetPlayerFlag(BasePlayer.PlayerFlags.Unused2, b: false);
	SetPlayerFlag(BasePlayer.PlayerFlags.Unused1, b: false);
	SetPlayerFlag(BasePlayer.PlayerFlags.ReceivingSnapshot, b: true);
	SetPlayerFlag(BasePlayer.PlayerFlags.DisplaySash, b: false);
	respawnId = System.Guid.NewGuid().ToString("N");
	ServerPerformance.spawns++;
	SetParent(null, worldPositionStays: true);
	base.transform.SetPositionAndRotation(position, rotation);
	tickInterpolator.Reset(position);
	tickHistory.Reset(position);
	eyeHistory.Clear();
	estimatedVelocity = UnityEngine.Vector3.zero;
	estimatedSpeed = 0f;
	estimatedSpeed2D = 0f;
	lastTickTime = 0f;
	StopWounded();
	ResetWoundingVars();
	StopSpectating();
	UpdateNetworkGroup();
	EnablePlayerCollider();
	RemovePlayerRigidbody();
	StartSleeping();
	LifeStoryStart();
	metabolism.Reset();
	if (modifiers != null)
	{
		modifiers.RemoveAll();
	}
	InitializeHealth(StartHealth(), StartMaxHealth());
	bool flag = false;
	if (ConVar.Server.respawnWithLoadout)
	{
		string infoString = GetInfoString("client.respawnloadout", string.Empty);
		if (!string.IsNullOrEmpty(infoString) && ConVar.Inventory.LoadLoadout(infoString, out var so))
		{
			so.LoadItemsOnTo(this);
			flag = true;
		}
	}
	if (!flag)
	{
		inventory.GiveDefaultItems();
	}
	SendNetworkUpdateImmediate();
	ClientRPC(RpcTarget.Player("StartLoading", this));
	Facepunch.Rust.Analytics.Azure.OnPlayerRespawned(this, spawnPointEntity);
	if ((bool)activeGameMode)
	{
		BaseGameMode.GetActiveGameMode(serverside: true).OnPlayerRespawn(this);
	}
	if (IsConnected)
	{
		EACServer.OnStartLoading(net.connection);
	}
	ProcessMissionEvent(BaseMission.MissionEventType.RESPAWN, 0, 0f);
}

```
:::
