<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnClientDisconnected
Called after a client has fully disconnected from the server.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnClientDisconnected()
{
	Puts("OnClientDisconnected has been fired!");
}
```
```csharp [Source — Facepunch.Network @ Network.Server]
public void OnDisconnected(string strReason, Network.Connection cn)
{
	if (cn != null)
	{
		RecordDisconnection(cn);
		cn.connected = false;
		cn.active = false;
		if (callbackHandler != null)
		{
			callbackHandler.OnDisconnected(strReason, cn);
		}
		RemoveConnection(cn);
	}
}

```
:::
