# OnSignUpdated
<Badge type="info" text="Structure"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a player finishes editing a sign or painting, and it’s updated in the world.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnSignUpdated()
{
	Puts("OnSignUpdated has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ CarvablePumpkin]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.CallsPerSecond(5uL)]
[BaseEntity.RPC_Server.MaxDistance(5f)]
public void UpdateSign(BaseEntity.RPCMessage msg)
{
	if (msg.player == null || !CanUpdateSign(msg.player))
	{
		return;
	}
	int num = msg.read.Int32();
	if (num < 0 || num >= paintableSources.Length)
	{
		return;
	}
	byte[] array = msg.read.BytesWithSize();
	if (msg.read.Unread > 0 && msg.read.Bit() && !msg.player.IsAdmin)
	{
		UnityEngine.Debug.LogWarning($"{msg.player} tried to upload a sign from a file but they aren't admin, ignoring");
		return;
	}
	EnsureInitialized();
	if (array == null)
	{
		if (textureIDs[num] != 0)
		{
			FileStorage.server.RemoveExact(textureIDs[num], FileStorage.Type.png, net.ID, (uint)num);
		}
		textureIDs[num] = 0u;
	}
	else
	{
		if (!ImageProcessing.IsValidPNG(array, 1024, 1024))
		{
			return;
		}
		if (textureIDs[num] != 0)
		{
			FileStorage.server.RemoveExact(textureIDs[num], FileStorage.Type.png, net.ID, (uint)num);
		}
		textureIDs[num] = FileStorage.server.Store(array, FileStorage.Type.png, net.ID, (uint)num);
	}
	LogEdit(msg.player);
	SendNetworkUpdate();
}

```
:::
