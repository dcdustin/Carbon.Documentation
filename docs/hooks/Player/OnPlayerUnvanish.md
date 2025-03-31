# OnPlayerUnvanish
<Badge type="info" text="Player"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a player comes out of vanish and becomes visible again.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnPlayerUnvanish(BasePlayer local0)
{
	Puts("OnPlayerUnvanish has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ ConVar.Debugging]
[ServerVar(Help = "Make admin invisibile")]
public static void invis(ConsoleSystem.Arg arg)
{
	BasePlayer basePlayer = UnityEngine.ArgEx.Player(arg);
	if (basePlayer == null)
	{
		return;
	}
	bool @bool = arg.GetBool(0, !invisiblePlayers.Contains(basePlayer));
	if (@bool && !invisiblePlayers.Contains(basePlayer))
	{
		invisiblePlayers.Add(basePlayer);
		basePlayer.limitNetworking = true;
		basePlayer.syncPosition = false;
		basePlayer.GetHeldEntity()?.SetHeld(bHeld: false);
		basePlayer.DisablePlayerCollider();
		Rust.Ai.SimpleAIMemory.AddIgnorePlayer(basePlayer);
		BaseEntity.Query.Server.RemovePlayer(basePlayer);
		if (!Rust.Global.Runner.IsInvoking(TickInvis))
		{
			Rust.Global.Runner.InvokeRepeating(TickInvis, 0f, 0f);
		}
	}
	else if (!@bool && invisiblePlayers.Contains(basePlayer))
	{
		invisiblePlayers.Remove(basePlayer);
		basePlayer.limitNetworking = false;
		basePlayer.syncPosition = true;
		basePlayer.EnablePlayerCollider();
		Rust.Ai.SimpleAIMemory.RemoveIgnorePlayer(basePlayer);
		BaseEntity.Query.Server.RemovePlayer(basePlayer);
		BaseEntity.Query.Server.AddPlayer(basePlayer);
		if (invisiblePlayers.Count == 0)
		{
			Rust.Global.Runner.CancelInvoke(TickInvis);
		}
	}
	arg.ReplyWith("Invis: " + basePlayer.limitNetworking);
}

```
:::
