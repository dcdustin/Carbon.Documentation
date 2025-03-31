# OnBoomboxToggle
<Badge type="info" text="Radio"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Triggered when a boombox is toggled on or off (play or stop).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnBoomboxToggle(BoomBox boomBox, BasePlayer player, bool local0)
{
	Puts("OnBoomboxToggle has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ BoomBox]
public void ServerTogglePlay(BaseEntity.RPCMessage msg, bool bypassPower = false)
{
	if (IsPowered() || bypassPower)
	{
		bool play = msg.read.ReadByte() == 1;
		ServerTogglePlay(play);
	}
}

```
:::
