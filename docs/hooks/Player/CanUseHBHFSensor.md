# CanUseHBHFSensor
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when an HBHF sensor detects a player, to check if that player should trigger it.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanUseHBHFSensor()
{
	Puts("CanUseHBHFSensor has been fired!");
	return (System.Boolean)default;
}
```
```csharp [Source — Assembly-CSharp @ HBHFSensor]
public bool CanUse(BasePlayer player)
{
	return player.CanBuild();
}

```
:::
