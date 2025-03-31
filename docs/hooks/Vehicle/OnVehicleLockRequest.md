# OnVehicleLockRequest
<Badge type="info" text="Vehicle"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnVehicleLockRequest(ModularCarGarage modularCarGarage, BasePlayer local0, string local1)
{
	Puts("OnVehicleLockRequest has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ ModularCarGarage]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(3f)]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void RPC_RequestAddLock(BaseEntity.RPCMessage msg)
{
	if (!HasOccupant || carOccupant.CarLock.HasALock)
	{
		return;
	}
	BasePlayer player = msg.player;
	if (!(player == null))
	{
		string code = msg.read.String();
		ItemAmount itemAmount = lockResourceCost;
		if ((float)player.inventory.GetAmount(itemAmount.itemDef.itemid) >= itemAmount.amount && carOccupant.CarLock.TryAddALock(code, player.userID))
		{
			player.inventory.Take(null, itemAmount.itemDef.itemid, UnityEngine.Mathf.CeilToInt(itemAmount.amount));
			Effect.server.Run(addRemoveLockEffect.resourcePath, this, 0u, UnityEngine.Vector3.zero, UnityEngine.Vector3.zero);
		}
	}
}

```
:::
