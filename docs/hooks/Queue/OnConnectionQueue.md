<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnConnectionQueue
```csharp
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
