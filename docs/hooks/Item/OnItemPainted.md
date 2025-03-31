<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnItemPainted
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.CallsPerSecond(3uL)]
public void Server_UpdateImage(BaseEntity.RPCMessage msg)
{
	if (msg.player == null || (ulong)msg.player.userID != base.OwnerID)
	{
		return;
	}
	foreach (Item item2 in msg.player.inventory.containerWear.itemList)
	{
		if (item2.instanceData != null && item2.instanceData.subEntity == net.ID)
		{
			return;
		}
	}
	Item item = msg.player.inventory.FindBySubEntityID(net.ID);
	if (item == null || item.isBroken)
	{
		return;
	}
	byte[] array = msg.read.BytesWithSize();
	if (array == null)
	{
		if (_currentImageCrc != 0)
		{
			FileStorage.server.RemoveExact(_currentImageCrc, FileStorage.Type.png, net.ID, 0u);
		}
		_currentImageCrc = 0u;
	}
	else
	{
		if (!ImageProcessing.IsValidPNG(array, 512, 512))
		{
			return;
		}
		uint currentImageCrc = _currentImageCrc;
		if (_currentImageCrc != 0)
		{
			FileStorage.server.RemoveExact(_currentImageCrc, FileStorage.Type.png, net.ID, 0u);
		}
		_currentImageCrc = FileStorage.server.Store(array, FileStorage.Type.png, net.ID);
		if (_currentImageCrc != currentImageCrc)
		{
			item.LoseCondition(0.25f);
		}
		lastEditedBy = msg.player.userID;
	}
	SendNetworkUpdate();
}

```
