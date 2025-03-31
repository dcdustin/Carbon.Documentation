<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnMapMarkerRemove
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.FromOwner(false)]
[BaseEntity.RPC_Server.CallsPerSecond(10uL)]
public void Server_RemovePointOfInterest(BaseEntity.RPCMessage msg)
{
	int num = msg.read.Int32();
	if (State.pointsOfInterest != null && State.pointsOfInterest.Count > num && num >= 0)
	{
		State.pointsOfInterest[num].Dispose();
		State.pointsOfInterest.RemoveAt(num);
		DirtyPlayerState();
		SendMarkersToClient();
		TeamUpdate();
	}
}

```
