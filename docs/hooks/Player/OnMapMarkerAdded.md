# OnMapMarkerAdded
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called after a map marker has been added.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnMapMarkerAdded()
{
	Puts("OnMapMarkerAdded has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ BasePlayer]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.FromOwner(false)]
[BaseEntity.RPC_Server.CallsPerSecond(8uL)]
public void Server_AddMarker(BaseEntity.RPCMessage msg)
{
	if (State.pointsOfInterest == null)
	{
		State.pointsOfInterest = Facepunch.Pool.Get<System.Collections.Generic.List<ProtoBuf.MapNote>>();
	}
	if (State.pointsOfInterest.Count >= ConVar.Server.maximumMapMarkers)
	{
		msg.player.ShowToast(GameTip.Styles.Blue_Short, MarkerLimitPhrase, false, ConVar.Server.maximumMapMarkers.ToString());
		return;
	}
	ProtoBuf.MapNote mapNote = ProtoBuf.MapNote.Deserialize(msg.read);
	if (mapNote.label == "auto-name")
	{
		int num = FindUnusedNumberName();
		if (num != -1)
		{
			mapNote.label = num.ToString();
		}
	}
	ValidateMapNote(mapNote);
	if (mapNote.colourIndex == -1)
	{
		mapNote.colourIndex = FindUnusedPointOfInterestColour();
	}
	State.pointsOfInterest.Add(mapNote);
	DirtyPlayerState();
	SendMarkersToClient();
	TeamUpdate();
}

```
:::
