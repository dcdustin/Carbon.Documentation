# OnSamSiteModeToggle
<Badge type="info" text="Entity"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a SAM site toggles its mode (Peacekeeper mode on/off for the SAM site).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnSamSiteModeToggle(SamSite samSite, BasePlayer local0, bool local1)
{
	Puts("OnSamSiteModeToggle has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ SamSite]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
[BaseEntity.RPC_Server.CallsPerSecond(1uL)]
public void ToggleDefenderMode(BaseEntity.RPCMessage msg)
{
	if (staticRespawn)
	{
		return;
	}
	BasePlayer player = msg.player;
	if (!(player == null) && player.CanBuild())
	{
		bool flag = msg.read.Bit();
		if (flag != IsInDefenderMode())
		{
			SetFlag(Flag_ManuallySetMode, flag);
			SetFlag(Flag_TargetMode, flag);
		}
	}
}

```
:::
