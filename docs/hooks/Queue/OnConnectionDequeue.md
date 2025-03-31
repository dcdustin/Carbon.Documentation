<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnConnectionDequeue
Triggered when a connection is removed from the queue (e.g., a player leaves the queue or begins joining).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnConnectionDequeue()
{
	Puts("OnConnectionDequeue has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ ConnectionQueue]
public void RemoveConnection(Network.Connection connection)
{
	if (queue.Remove(connection))
	{
		nextMessageTime = 0f;
	}
	joining.Remove(connection);
}

```
:::
