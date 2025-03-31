<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# ICanPickupEntity [DoorCloser]
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(3f)]
public void RPC_Take(BaseEntity.RPCMessage rpc)
{
	if (!rpc.player.CanInteract() || !rpc.player.CanBuild())
	{
		return;
	}
	Door door = GetDoor();
	if (!(door == null) && door.GetPlayerLockPermission(rpc.player))
	{
		Item item = ItemManager.Create(itemType, 1, skinID);
		if (item != null)
		{
			rpc.player.GiveItem(item);
		}
		Kill();
	}
}

```
