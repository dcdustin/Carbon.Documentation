<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# IOnPlayerChat
Called when a player sends a chat message (allows intercepting or modifying it).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void IOnPlayerChat()
{
	Puts("IOnPlayerChat has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ ConVar.Chat]
public static async System.Threading.Tasks.ValueTask<bool> sayAs(ConVar.Chat.ChatChannel targetChannel, ulong userId, string username, string message, BasePlayer player = null)
{
	if (!player)
	{
		player = null;
	}
	if (!enabled)
	{
		return false;
	}
	if (player != null && player.HasPlayerFlag(BasePlayer.PlayerFlags.ChatMute))
	{
		return false;
	}
	if ((ServerUsers.Get(userId)?.group ?? ServerUsers.UserGroup.None) == ServerUsers.UserGroup.Banned)
	{
		return false;
	}
	string strChatText = message.Replace("\n", "").Replace("\r", "").Trim();
	if (strChatText.Length > 128)
	{
		strChatText = strChatText.Substring(0, 128);
	}
	if (strChatText.Length <= 0)
	{
		return false;
	}
	if (strChatText.StartsWith("/") || strChatText.StartsWith("\\"))
	{
		return false;
	}
	strChatText = UnityEngine.StringEx.EscapeRichText(strChatText);
	if (ConVar.Server.emojiOwnershipCheck)
	{
		System.Collections.Generic.List<(TmProEmojiRedirector.EmojiSub, int)> obj = Facepunch.Pool.Get<System.Collections.Generic.List<(TmProEmojiRedirector.EmojiSub, int)>>();
		TmProEmojiRedirector.FindEmojiSubstitutions(strChatText, RustEmojiLibrary.Instance, obj, richText: false, isServer: true);
		bool flag = true;
		foreach (var item in obj)
		{
			if (!item.Item1.targetEmojiResult.CanBeUsedBy(player))
			{
				flag = false;
				break;
			}
		}
		Facepunch.Pool.FreeUnmanaged(ref obj);
		if (!flag)
		{
			UnityEngine.Debug.Log("player tried to use emoji they don't own, reject!");
			return false;
		}
	}
	if (serverlog)
	{
		ServerConsole.PrintColoured(System.ConsoleColor.DarkYellow, "[" + targetChannel.ToString() + "] " + username + ": ", System.ConsoleColor.DarkGreen, strChatText);
		string text = player?.ToString() ?? $"{username}[{userId}]";
		switch (targetChannel)
		{
		case ConVar.Chat.ChatChannel.Team:
			UnityEngine.DebugEx.Log("[TEAM CHAT] " + text + " : " + strChatText);
			break;
		case ConVar.Chat.ChatChannel.Cards:
			UnityEngine.DebugEx.Log("[CARDS CHAT] " + text + " : " + strChatText);
			break;
		case ConVar.Chat.ChatChannel.Clan:
			UnityEngine.DebugEx.Log("[CLAN CHAT] " + text + " : " + strChatText);
			break;
		default:
			UnityEngine.DebugEx.Log("[CHAT] " + text + " : " + strChatText);
			break;
		}
	}
	string strName = UnityEngine.StringEx.EscapeRichText(username);
	string nameColor = GetNameColor(userId, player);
	ConVar.Chat.ChatEntry ce = default(ConVar.Chat.ChatEntry);
	ce.Channel = targetChannel;
	ce.Message = strChatText;
	ce.UserId = ((player != null) ? player.UserIDString : userId.ToString());
	ce.Username = username;
	ce.Color = nameColor;
	ce.Time = Facepunch.Math.Epoch.Current;
	Record(ce);
	switch (targetChannel)
	{
	case ConVar.Chat.ChatChannel.Cards:
	{
		if (player == null)
		{
			return false;
		}
		if (!player.isMounted)
		{
			return false;
		}
		BaseCardGameEntity baseCardGameEntity = player.GetMountedVehicle() as BaseCardGameEntity;
		if (baseCardGameEntity == null || !(baseCardGameEntity.GameController?.IsAtTable(player) ?? false))
		{
			return false;
		}
		System.Collections.Generic.List<Network.Connection> obj2 = Facepunch.Pool.Get<System.Collections.Generic.List<Network.Connection>>();
		baseCardGameEntity.GameController?.GetConnectionsInGame(obj2);
		if (obj2.Count > 0)
		{
			ConsoleNetwork.SendClientCommand(obj2, "chat.add2", 3, userId, strChatText, strName, nameColor, 1f);
		}
		Facepunch.Pool.FreeUnmanaged(ref obj2);
		return true;
	}
	case ConVar.Chat.ChatChannel.Global:
		ConsoleNetwork.BroadcastToAllClients("chat.add2", 0, userId, strChatText, strName, nameColor, 1f);
		return true;
	case ConVar.Chat.ChatChannel.Local:
	{
		if (!(player != null))
		{
			break;
		}
		float num = localChatRange * localChatRange;
		foreach (BasePlayer activePlayer in BasePlayer.activePlayerList)
		{
			float sqrMagnitude = (activePlayer.transform.position - player.transform.position).sqrMagnitude;
			if (!(sqrMagnitude > num))
			{
				ConsoleNetwork.SendClientCommand(activePlayer.net.connection, "chat.add2", 4, userId, strChatText, strName, nameColor, UnityEngine.Mathf.Clamp01(sqrMagnitude / num + 0.2f));
			}
		}
		return true;
	}
	case ConVar.Chat.ChatChannel.Team:
	{
		RelationshipManager.PlayerTeam playerTeam = RelationshipManager.ServerInstance.FindPlayersTeam(userId);
		if (playerTeam == null)
		{
			return false;
		}
		System.Collections.Generic.List<Network.Connection> onlineMemberConnections = playerTeam.GetOnlineMemberConnections();
		if (onlineMemberConnections != null)
		{
			ConsoleNetwork.SendClientCommand(onlineMemberConnections, "chat.add2", 1, userId, strChatText, strName, nameColor, 1f);
		}
		CompanionServer.Util.BroadcastTeamChat(playerTeam, userId, strName, strChatText, nameColor);
		return true;
	}
	case ConVar.Chat.ChatChannel.Clan:
	{
		ClanManager serverInstance = ClanManager.ServerInstance;
		if (serverInstance == null)
		{
			return false;
		}
		if (player != null && player.clanId == 0L)
		{
			return false;
		}
		try
		{
			ClanValueResult<IClan> clanValueResult = ((!(player != null) || player.clanId == 0L) ? (await serverInstance.Backend.GetByMember(userId)) : (await serverInstance.Backend.Get(player.clanId)));
			ClanValueResult<IClan> clanValueResult2 = clanValueResult;
			if (!clanValueResult2.IsSuccess)
			{
				return false;
			}
			if (await clanValueResult2.Value.SendChatMessage(strName, strChatText, userId) != ClanResult.Success)
			{
				return false;
			}
			return true;
		}
		catch (System.Exception message2)
		{
			UnityEngine.Debug.LogError(message2);
			return false;
		}
	}
	}
	return false;
}

```
:::
