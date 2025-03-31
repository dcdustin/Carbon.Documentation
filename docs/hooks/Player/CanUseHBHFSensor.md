# CanUseHBHFSensor
<Badge type="info" text="Player"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when an HBHF sensor detects a player, to check if that player should trigger it.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanUseHBHFSensor(BasePlayer player, HBHFSensor hBHFSensor)
{
	Puts("CanUseHBHFSensor has been fired!");
	return (bool)default;
}
```
```csharp [Source — Assembly-CSharp @ HBHFSensor]
public bool CanUse(BasePlayer player)
{
	return player.CanBuild();
}

```
:::
