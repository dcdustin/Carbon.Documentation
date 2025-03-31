# OnPlayerHandcuff
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a player is being handcuffed (restrained).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnPlayerHandcuff()
{
	Puts("OnPlayerHandcuff has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ Handcuffs]
public void SV_HandcuffVictim(BasePlayer victim, BasePlayer handcuffer)
{
	if (victim == null || handcuffer == null || victim.IsRestrained || (!victim.CurrentGestureIsSurrendering && !victim.IsWounded()) || UnityEngine.Vector3.Distance(victim.transform.position, handcuffer.transform.position) > UseDistance)
	{
		return;
	}
	Item ownerItem = GetOwnerItem();
	if (ownerItem == null)
	{
		return;
	}
	victim.SetPlayerFlag(BasePlayer.PlayerFlags.IsRestrained, b: true);
	victim.SendNetworkUpdateImmediate();
	ownerItem.SetFlag(Item.Flag.IsOn, b: true);
	bool flag = true;
	if (!ownerItem.MoveToContainer(victim.inventory.containerBelt))
	{
		Item slot = victim.inventory.containerBelt.GetSlot(0);
		if (slot != null)
		{
			if (!slot.MoveToContainer(victim.inventory.containerMain))
			{
				slot.DropAndTossUpwards(victim.transform.position);
			}
			if (!ownerItem.MoveToContainer(victim.inventory.containerBelt))
			{
				flag = false;
			}
		}
	}
	if (!flag)
	{
		ownerItem.SetFlag(Item.Flag.IsOn, b: false);
		victim.SetPlayerFlag(BasePlayer.PlayerFlags.IsRestrained, b: false);
	}
	ownerItem.MarkDirty();
	if (flag)
	{
		victim.Server_CancelGesture();
		if (victim.IsBot)
		{
			ConVar.Inventory.EquipItemInSlot(victim, 0);
		}
		victim.ClientRPC(RpcTarget.Player("SetActiveBeltSlot", victim), ownerItem.position, ownerItem.uid);
		SetLocked(flag: true, victim, ownerItem);
		Effect.server.Run(lockEffect.resourcePath, victim, 0u, UnityEngine.Vector3.zero, UnityEngine.Vector3.zero);
	}
}

```
:::
