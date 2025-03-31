<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnRemoteIdentifierUpdate
```csharp
public void UpdateIdentifier(string newID, bool clientSend = false)
{
	_ = rcIdentifier;
	if (base.isServer)
	{
		if (!RemoteControlEntity.IDInUse(newID))
		{
			rcIdentifier = newID;
		}
		if (!Rust.Application.isLoadingSave)
		{
			SendNetworkUpdate();
		}
	}
}

```
