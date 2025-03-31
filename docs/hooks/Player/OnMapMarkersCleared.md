# OnMapMarkersCleared
<Badge type="info" text="Player"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called after all map markers have been cleared.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnMapMarkersCleared(BasePlayer basePlayer)
{
	Puts("OnMapMarkersCleared has been fired!");
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
