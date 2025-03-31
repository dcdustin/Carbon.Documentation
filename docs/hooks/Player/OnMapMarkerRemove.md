<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnMapMarkerRemove
Called when a map marker is being removed.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnMapMarkerRemove()
{
	Puts("OnMapMarkerRemove has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ BasePlayer]
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
:::
