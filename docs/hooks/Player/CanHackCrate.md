<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanHackCrate
Called when a player tries to hack a locked crate (timed crate) to see if they can start the hack.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object CanHackCrate()
{
	Puts("CanHackCrate has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ HackableLockedCrate]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void RPC_Hack(BaseEntity.RPCMessage msg)
{
	if (!IsBeingHacked())
	{
		Facepunch.Rust.Analytics.Azure.OnLockedCrateStarted(msg.player, this);
		originalHackerPlayerId = msg.player.userID;
		originalHackerPlayer = msg.player;
		StartHacking();
	}
}

```
:::
