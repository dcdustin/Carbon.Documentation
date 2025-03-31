<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnSamSiteModeToggle
Called when a SAM site toggles its mode (Peacekeeper mode on/off for the SAM site).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnSamSiteModeToggle()
{
	Puts("OnSamSiteModeToggle has been fired!");
	return (System.Object)default;
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
