# OnConnectionQueue
<Badge type="info" text="Queue"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a player is added to the connection queue (joining the queue to connect).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnConnectionQueue()
{
	Puts("OnConnectionQueue has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ ConnectionQueue]
public void Join(Network.Connection connection)
{
	nextMessageTime = 0f;
	if ((Queued == 0 && !IsServerFull) || CanJumpQueue(connection))
	{
		JoinGame(connection);
		return;
	}
	connection.state = Network.Connection.State.InQueue;
	queue.Add(connection);
}

```
:::
