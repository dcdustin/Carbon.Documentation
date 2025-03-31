<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPlayerMarkersSend
Called when the server is sending map/team markers to a player (marker update).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnPlayerMarkersSend()
{
	Puts("OnPlayerMarkersSend has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ BasePlayer]
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
:::
