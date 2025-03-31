# OnDestroyUI
<Badge type="info" text="CUI"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a custom UI element is being destroyed/removed from a player’s screen.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnDestroyUI()
{
	Puts("OnDestroyUI has been fired!");
}
```
```csharp [Source — Carbon.Common @ Oxide.Game.Rust.Cui.CuiHelper]
public static bool DestroyUi(BasePlayer player, string name)
{
	//IL_0047: Unknown result type (might be due to invalid IL or missing references)
	if (((BaseNetworkable)(player?)).net != null)
	{
		System.Collections.Generic.HashSet<string> activePanelList = GetActivePanelList(player);
		if (activePanelList.Contains(name))
		{
			activePanelList.Remove(name);
		}
		Carbon.HookCaller.CallStaticHook(503981600u, player, name);
		((BaseEntity)CommunityEntity.ServerInstance).ClientRPC<string>(RpcTarget.Player("DestroyUI", player), name);
		return true;
	}
	return false;
}

```
:::
