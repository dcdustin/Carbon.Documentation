<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPlayerPingsSend
```csharp
public void SendPingsToClient()
{
	using ProtoBuf.MapNoteList mapNoteList = Facepunch.Pool.Get<ProtoBuf.MapNoteList>();
	mapNoteList.notes = Facepunch.Pool.Get<System.Collections.Generic.List<ProtoBuf.MapNote>>();
	mapNoteList.notes.AddRange(State.pings);
	ClientRPC(RpcTarget.Player("Client_ReceivePings", this), mapNoteList);
	mapNoteList.notes.Clear();
}

```
