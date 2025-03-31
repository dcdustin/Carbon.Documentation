# OnDoorOpened
<Badge type="info" text="Structure"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnDoorOpened(Door door, BasePlayer player)
{
	Puts("OnDoorOpened has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ Door]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(3f)]
public void RPC_OpenDoor(BaseEntity.RPCMessage rpc)
{
	if (!rpc.player.CanInteract(usableWhileCrawling: true) || !canHandOpen || IsOpen() || IsBusy() || IsLocked() || IsInvoking(DelayedDoorOpening))
	{
		return;
	}
	if (rpc.player.IsWounded())
	{
		if (!woundedOpens.ContainsKey(rpc.player) || !((float)woundedOpens[rpc.player] > 2.5f))
		{
			return;
		}
		woundedOpens.Remove(rpc.player);
	}
	BaseLock baseLock = GetSlot(BaseEntity.Slot.Lock) as BaseLock;
	if (baseLock != null)
	{
		if (!baseLock.OnTryToOpen(rpc.player))
		{
			return;
		}
		if (baseLock.IsLocked() && UnityEngine.Time.realtimeSinceStartup - decayResetTimeLast > 60f)
		{
			BuildingBlock buildingBlock = FindLinkedEntity<BuildingBlock>();
			if ((bool)buildingBlock)
			{
				Decay.BuildingDecayTouch(buildingBlock);
			}
			else
			{
				Decay.RadialDecayTouch(base.transform.position, 40f, 2097408);
			}
			decayResetTimeLast = UnityEngine.Time.realtimeSinceStartup;
		}
	}
	if (canReverseOpen)
	{
		SetFlag(BaseEntity.Flags.Reserved1, base.transform.InverseTransformPoint(rpc.player.transform.position).x > 0f, recursive: false, networkupdate: false);
	}
	if (ShouldDelayOpen(rpc.player, out var delay))
	{
		Invoke(DelayedDoorOpening, delay);
	}
	else
	{
		SetFlag(BaseEntity.Flags.Open, b: true);
		SendNetworkUpdateImmediate();
	}
	if (isSecurityDoor && NavMeshLink != null)
	{
		SetNavMeshLinkEnabled(wantsOn: true);
	}
	if (checkPhysBoxesOnOpen)
	{
		StartCheckingForBlockages(isOpening: true);
	}
	Facepunch.Rust.Analytics.Azure.OnBaseInteract(rpc.player, this);
	OnPlayerOpenedDoor(rpc.player);
}

```
:::
