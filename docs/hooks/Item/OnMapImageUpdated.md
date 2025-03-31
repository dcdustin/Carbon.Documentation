# OnMapImageUpdated
<Badge type="info" text="Item"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a map item's image is updated (e.g., after exploration).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnMapImageUpdated()
{
	Puts("OnMapImageUpdated has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ MapEntity]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.CallsPerSecond(1uL)]
[BaseEntity.RPC_Server.FromOwner(false)]
public void ImageUpdate(BaseEntity.RPCMessage msg)
{
	if (msg.player == null)
	{
		return;
	}
	byte b = msg.read.UInt8();
	byte b2 = msg.read.UInt8();
	uint num = msg.read.UInt32();
	if ((b == 0 && fogImages[b2] == num) || (b == 1 && paintImages[b2] == num))
	{
		return;
	}
	uint num2 = (uint)(b * 1000 + b2);
	byte[] array = msg.read.BytesWithSize();
	if (array != null)
	{
		FileStorage.server.RemoveEntityNum(net.ID, num2);
		uint num3 = FileStorage.server.Store(array, FileStorage.Type.png, net.ID, num2);
		if (b == 0)
		{
			fogImages[b2] = num3;
		}
		if (b == 1)
		{
			paintImages[b2] = num3;
		}
		InvalidateNetworkCache();
	}
}

```
:::
