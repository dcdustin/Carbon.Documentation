<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnDoorClosed
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnDoorClosed()
{
	Puts("OnDoorClosed has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ Door]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(3f)]
public void RPC_CloseDoor(BaseEntity.RPCMessage rpc)
{
	if (!rpc.player.CanInteract(usableWhileCrawling: true) || !canHandOpen || !IsOpen() || IsBusy() || IsLocked())
	{
		return;
	}
	if (rpc.player.IsWounded())
	{
		if (!woundedCloses.ContainsKey(rpc.player) || !((float)woundedCloses[rpc.player] > 2.5f))
		{
			return;
		}
		woundedCloses.Remove(rpc.player);
	}
	BaseLock baseLock = GetSlot(BaseEntity.Slot.Lock) as BaseLock;
	if (!(baseLock != null) || baseLock.OnTryToClose(rpc.player))
	{
		SetFlag(BaseEntity.Flags.Open, b: false);
		SendNetworkUpdateImmediate();
		if (isSecurityDoor && NavMeshLink != null)
		{
			SetNavMeshLinkEnabled(wantsOn: false);
		}
		Facepunch.Rust.Analytics.Azure.OnBaseInteract(rpc.player, this);
		StartCheckingForBlockages(isOpening: false);
	}
}

```
:::
