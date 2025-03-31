# OnRemoteIdentifierUpdate
<Badge type="info" text="Entity"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a remote control entity’s identifier is changed (e.g., updating the ID/channel of an RC device).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnRemoteIdentifierUpdate()
{
	Puts("OnRemoteIdentifierUpdate has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ PoweredRemoteControlEntity]
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
:::
