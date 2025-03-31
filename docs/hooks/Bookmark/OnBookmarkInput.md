<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnBookmarkInput
```csharp
public override void PlayerServerInput(InputState inputState, BasePlayer player)
{
	base.PlayerServerInput(inputState, player);
	if (HasFlag(BaseEntity.Flags.Reserved2) && currentlyControllingEnt.IsValid(serverside: true))
	{
		currentlyControllingEnt.Get(serverside: true).GetComponent<IRemoteControllable>().UserInput(inputState, new CameraViewerId(player.userID, 0L));
	}
}

```
