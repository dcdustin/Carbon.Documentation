<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPlayerMarkersSend
```csharp
public void SendMarkersToClient()
{
	using ProtoBuf.MapNoteList mapNoteList = Facepunch.Pool.Get<ProtoBuf.MapNoteList>();
	mapNoteList.notes = Facepunch.Pool.Get<System.Collections.Generic.List<ProtoBuf.MapNote>>();
	if (ServerCurrentDeathNote != null)
	{
		mapNoteList.notes.Add(ServerCurrentDeathNote);
	}
	if (State.pointsOfInterest != null)
	{
		mapNoteList.notes.AddRange(State.pointsOfInterest);
	}
	ClientRPC(RpcTarget.Player("Client_ReceiveMarkers", this), mapNoteList);
	mapNoteList.notes.Clear();
}

```
