# OnClientDisconnected
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called after a client has fully disconnected from the server.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnClientDisconnected(Network.Connection cn, string strReason)
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
