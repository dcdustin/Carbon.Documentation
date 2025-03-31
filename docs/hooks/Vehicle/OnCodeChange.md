<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnCodeChange
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnCodeChange()
{
	Puts("OnCodeChange has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ ModularCarGarage]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(3f)]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void RPC_RequestNewCode(BaseEntity.RPCMessage msg)
{
	if (!HasOccupant || !carOccupant.CarLock.HasALock)
	{
		return;
	}
	BasePlayer player = msg.player;
	if (!(player == null))
	{
		string newCode = msg.read.String();
		if (carOccupant.CarLock.TrySetNewCode(newCode, player.userID))
		{
			Effect.server.Run(changeLockCodeEffect.resourcePath, this, 0u, UnityEngine.Vector3.zero, UnityEngine.Vector3.zero);
		}
	}
}

```
:::
