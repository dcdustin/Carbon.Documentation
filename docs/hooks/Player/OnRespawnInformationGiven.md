# OnRespawnInformationGiven
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when respawn information (spawn options) is given to a player (after they die or join).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnRespawnInformationGiven(BasePlayer basePlayer, System.Collections.Generic.List`1[[ProtoBuf.RespawnInformation.SpawnOptions, Rust.Data, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null]] local0)
{
	Puts("OnRespawnInformationGiven has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ BasePlayer]
public void SendRespawnOptions()
{
	if (NexusServer.Started && ZoneController.Instance.CanRespawnAcrossZones(this))
	{
		CollectExternalAndSend();
		return;
	}
	System.Collections.Generic.List<ProtoBuf.RespawnInformation.SpawnOptions> spawnOptions2 = Facepunch.Pool.Get<System.Collections.Generic.List<ProtoBuf.RespawnInformation.SpawnOptions>>();
	GetRespawnOptionsForPlayer(spawnOptions2, userID);
	SendToPlayer(spawnOptions2, loading: false);
	async void CollectExternalAndSend()
	{
		System.Collections.Generic.List<ProtoBuf.RespawnInformation.SpawnOptions> list = Facepunch.Pool.Get<System.Collections.Generic.List<ProtoBuf.RespawnInformation.SpawnOptions>>();
		GetRespawnOptionsForPlayer(list, userID);
		System.Collections.Generic.List<ProtoBuf.RespawnInformation.SpawnOptions> allSpawnOptions = Facepunch.Pool.Get<System.Collections.Generic.List<ProtoBuf.RespawnInformation.SpawnOptions>>();
		foreach (ProtoBuf.RespawnInformation.SpawnOptions item in list)
		{
			allSpawnOptions.Add(item.Copy());
		}
		SendToPlayer(list, loading: true);
		try
		{
			ProtoBuf.Nexus.Request request = Facepunch.Pool.Get<ProtoBuf.Nexus.Request>();
			request.spawnOptions = Facepunch.Pool.Get<ProtoBuf.Nexus.SpawnOptionsRequest>();
			request.spawnOptions.userId = userID;
			using (NexusRpcResult nexusRpcResult = await NexusServer.BroadcastRpc(request, 10f))
			{
				foreach (System.Collections.Generic.KeyValuePair<string, ProtoBuf.Nexus.Response> response in nexusRpcResult.Responses)
				{
					string key = response.Key;
					ProtoBuf.Nexus.SpawnOptionsResponse spawnOptions3 = response.Value.spawnOptions;
					if (spawnOptions3 != null && spawnOptions3.spawnOptions.Count != 0)
					{
						foreach (ProtoBuf.RespawnInformation.SpawnOptions spawnOption in spawnOptions3.spawnOptions)
						{
							ProtoBuf.RespawnInformation.SpawnOptions spawnOptions4 = spawnOption.Copy();
							spawnOptions4.nexusZone = key;
							allSpawnOptions.Add(spawnOptions4);
						}
					}
				}
			}
			SendToPlayer(allSpawnOptions, loading: false);
		}
		catch (System.Exception exception)
		{
			UnityEngine.Debug.LogException(exception);
		}
	}
	void SendToPlayer(System.Collections.Generic.List<ProtoBuf.RespawnInformation.SpawnOptions> spawnOptions, bool loading)
	{
		using ProtoBuf.RespawnInformation respawnInformation = Facepunch.Pool.Get<ProtoBuf.RespawnInformation>();
		respawnInformation.spawnOptions = spawnOptions;
		respawnInformation.loading = loading;
		if (LegacyShelter.max_shelters == LegacyShelter.FpShelterDefault && LegacyShelter.SheltersPerPlayer.ContainsKey(userID) && LegacyShelter.SheltersPerPlayer[userID].Count > 0)
		{
			respawnInformation.shelterPositions = Facepunch.Pool.Get<System.Collections.Generic.List<UnityEngine.Vector3>>();
			foreach (LegacyShelter item2 in LegacyShelter.SheltersPerPlayer[userID])
			{
				respawnInformation.shelterPositions.Add(item2.transform.position);
			}
		}
		if (IsDead())
		{
			respawnInformation.previousLife = previousLifeStory;
			if (!ConVar.Server.skipDeathScreenFade)
			{
				respawnInformation.fadeIn = previousLifeStory != null && previousLifeStory.timeDied > Facepunch.Math.Epoch.Current - 5;
			}
			else
			{
				respawnInformation.fadeIn = false;
			}
		}
		ClientRPC(RpcTarget.Player("OnRespawnInformation", this), respawnInformation);
	}
}

```
:::
