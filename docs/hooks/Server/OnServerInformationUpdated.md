<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnServerInformationUpdated
Called when the server's information (name, player count, map) is updated (for server listings).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnServerInformationUpdated()
{
	Puts("OnServerInformationUpdated has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ ServerMgr]
public void UpdateServerInformation()
{
	if (!Steamworks.SteamServer.IsValid)
	{
		return;
	}
	using (TimeWarning.New("UpdateServerInformation"))
	{
		Steamworks.SteamServer.ServerName = ConVar.Server.hostname;
		Steamworks.SteamServer.MaxPlayers = ConVar.Server.maxplayers;
		Steamworks.SteamServer.Passworded = false;
		Steamworks.SteamServer.MapName = World.GetServerBrowserMapName();
		string value = "stok";
		if (Restarting)
		{
			value = "strst";
		}
		string text = $"born{Facepunch.Math.Epoch.FromDateTime(SaveRestore.SaveCreatedTime)}";
		string text2 = $"gm{GamemodeName()}";
		string text3 = (ConVar.Server.pve ? ",pve" : string.Empty);
		string text4 = ConVar.Server.tags?.Trim(',') ?? "";
		string text5 = ((!string.IsNullOrWhiteSpace(text4)) ? ("," + text4) : "");
		string text6 = Facepunch.BuildInfo.Current?.Scm?.ChangeId ?? "0";
		string text7 = (ConVar.Server.premium ? ",premium" : "");
		string text8 = Facepunch.Ping.PingEstimater.GetCachedClosestRegion().Code;
		if (!string.IsNullOrEmpty(ConVar.Server.ping_region_code_override))
		{
			text8 = ConVar.Server.ping_region_code_override;
		}
		Steamworks.SteamServer.GameTags = ServerTagCompressor.CompressTags($"mp{ConVar.Server.maxplayers},cp{BasePlayer.activePlayerList.Count},pt{Network.Net.sv.ProtocolId},qp{SingletonComponent<ServerMgr>.Instance.connectionQueue.Queued},$r{text8},v{2583}{text3}{text5},{text},{text2},cs{text6}{text7}");
		if (ConVar.Server.description != null && ConVar.Server.description.Length > 100)
		{
			string[] array = System.Linq.Enumerable.ToArray(UnityEngine.StringEx.SplitToChunks(ConVar.Server.description, 100));
			for (int i = 0; i < 16; i++)
			{
				if (i < array.Length)
				{
					Steamworks.SteamServer.SetKey($"description_{i:00}", array[i]);
				}
				else
				{
					Steamworks.SteamServer.SetKey($"description_{i:00}", string.Empty);
				}
			}
		}
		else
		{
			Steamworks.SteamServer.SetKey("description_0", ConVar.Server.description);
			for (int j = 1; j < 16; j++)
			{
				Steamworks.SteamServer.SetKey($"description_{j:00}", string.Empty);
			}
		}
		Steamworks.SteamServer.SetKey("hash", AssemblyHash);
		Steamworks.SteamServer.SetKey("status", value);
		string value2 = World.Seed.ToString();
		BaseGameMode activeGameMode = BaseGameMode.GetActiveGameMode(serverside: true);
		if (activeGameMode != null && !activeGameMode.ingameMap)
		{
			value2 = "0";
		}
		Steamworks.SteamServer.SetKey("world.seed", value2);
		Steamworks.SteamServer.SetKey("world.size", World.Size.ToString());
		Steamworks.SteamServer.SetKey("pve", ConVar.Server.pve.ToString());
		Steamworks.SteamServer.SetKey("headerimage", ConVar.Server.headerimage);
		Steamworks.SteamServer.SetKey("logoimage", ConVar.Server.logoimage);
		Steamworks.SteamServer.SetKey("url", ConVar.Server.url);
		if (!string.IsNullOrWhiteSpace(ConVar.Server.favoritesEndpoint))
		{
			Steamworks.SteamServer.SetKey("favendpoint", ConVar.Server.favoritesEndpoint);
		}
		Steamworks.SteamServer.SetKey("gmn", GamemodeName());
		Steamworks.SteamServer.SetKey("gmt", GamemodeTitle());
		Steamworks.SteamServer.SetKey("uptime", ((int)UnityEngine.Time.realtimeSinceStartup).ToString());
		Steamworks.SteamServer.SetKey("gc_mb", Performance.report.memoryAllocations.ToString());
		Steamworks.SteamServer.SetKey("gc_cl", Performance.report.memoryCollections.ToString());
		Steamworks.SteamServer.SetKey("ram_sys", (Performance.report.memoryUsageSystem / 1000000).ToString());
		Steamworks.SteamServer.SetKey("fps", Performance.report.frameRate.ToString());
		Steamworks.SteamServer.SetKey("fps_avg", Performance.report.frameRateAverage.ToString("0.00"));
		Steamworks.SteamServer.SetKey("ent_cnt", BaseNetworkable.serverEntities.Count.ToString());
		Steamworks.SteamServer.SetKey("build", Facepunch.BuildInfo.Current.Scm.ChangeId);
	}
}

```
:::
