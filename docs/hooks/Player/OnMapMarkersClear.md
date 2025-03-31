# OnMapMarkersClear
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when all map markers are about to be cleared.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnMapMarkersClear(BasePlayer basePlayer, BasePlayer self1)
{
	Puts("OnMapMarkersClear has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ BasePlayer]
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
:::
