# OnEntityControl
<Badge type="info" text="Electronic"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a player attempts to take remote control of an entity (e.g., AutoTurret or RC drone). Allows plugins to approve or deny the control attempt.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool OnEntityControl()
{
	Puts("OnEntityControl has been fired!");
	return (System.Boolean)default;
}
```
```csharp [Source — Assembly-CSharp @ RemoteControlEntity]
public virtual bool CanControl(ulong playerID)
{
	return true;
}

```
:::
