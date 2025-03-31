# OnEntityControl
<Badge type="info" text="Electronic"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a player attempts to take remote control of an entity (e.g., AutoTurret or RC drone). Allows plugins to approve or deny the control attempt.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool OnEntityControl(RemoteControlEntity remoteControlEntity)
{
	Puts("OnEntityControl has been fired!");
	return (bool)default;
}
```
```csharp [Source — Assembly-CSharp @ RemoteControlEntity]
public virtual bool CanControl(ulong playerID)
{
	return true;
}

```
:::
