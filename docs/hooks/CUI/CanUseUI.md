<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanUseUI
Called when a custom UI is about to be shown to a player. Plugins can return false to block showing the UI element.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanUseUI()
{
	Puts("CanUseUI has been fired!");
	return (System.Boolean)default;
}
```
```csharp [Source — Carbon.Common @ Oxide.Game.Rust.Cui.CuiHelper]
public static bool AddUi(BasePlayer player, string json)
{
	//IL_0041: Unknown result type (might be due to invalid IL or missing references)
	if ((Object)(object)player == (Object)null || ((BaseNetworkable)player).net == null)
	{
		return false;
	}
	if (Carbon.HookCaller.CallStaticHook(1307002116u, player, json) != null)
	{
		return false;
	}
	((BaseEntity)CommunityEntity.ServerInstance).ClientRPC<string>(RpcTarget.Player("AddUI", player), json);
	return true;
}

```
:::
