<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnMapMarkersCleared
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.FromOwner(false)]
[BaseEntity.RPC_Server.CallsPerSecond(1uL)]
public void Server_ClearMapMarkers(BaseEntity.RPCMessage msg)
{
	ServerCurrentDeathNote?.Dispose();
	ServerCurrentDeathNote = null;
	if (State.pointsOfInterest != null)
	{
		foreach (ProtoBuf.MapNote item in State.pointsOfInterest)
		{
			item?.Dispose();
		}
		State.pointsOfInterest.Clear();
	}
	DirtyPlayerState();
	TeamUpdate();
}

```
