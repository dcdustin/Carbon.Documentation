<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnBookmarkInput
Called on each input tick while a player is remotely controlling an entity (camera or turret). Allows plugins to process or override player input during remote control.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnBookmarkInput()
{
	Puts("OnBookmarkInput has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ ComputerStation]
public override void PlayerServerInput(InputState inputState, BasePlayer player)
{
	base.PlayerServerInput(inputState, player);
	if (HasFlag(BaseEntity.Flags.Reserved2) && currentlyControllingEnt.IsValid(serverside: true))
	{
		currentlyControllingEnt.Get(serverside: true).GetComponent<IRemoteControllable>().UserInput(inputState, new CameraViewerId(player.userID, 0L));
	}
}

```
:::
