<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnClientDisconnected
```csharp
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
