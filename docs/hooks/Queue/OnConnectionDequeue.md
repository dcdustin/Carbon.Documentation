<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnConnectionDequeue
```csharp
public void RemoveConnection(Network.Connection connection)
{
	if (queue.Remove(connection))
	{
		nextMessageTime = 0f;
	}
	joining.Remove(connection);
}

```
