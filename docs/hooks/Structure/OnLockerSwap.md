# OnLockerSwap
<Badge type="info" text="Structure"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnLockerSwap()
{
	Puts("OnLockerSwap has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ Locker]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void RPC_Equip(BaseEntity.RPCMessage msg)
{
	int num = msg.read.Int32();
	if (num < 0 || num >= 3 || IsEquipping())
	{
		return;
	}
	BasePlayer player = msg.player;
	int num2 = num * 14;
	bool flag = false;
	for (int i = 0; i < clothingBuffer.Length; i++)
	{
		Item slot = player.inventory.containerWear.GetSlot(i);
		if (slot != null)
		{
			slot.RemoveFromContainer();
			clothingBuffer[i] = slot;
		}
	}
	for (int j = 0; j < 8; j++)
	{
		int num3 = num2 + j;
		Item slot2 = base.inventory.GetSlot(num3);
		Item item = clothingBuffer[j];
		if (slot2 != null)
		{
			flag = true;
			if (slot2.info.category != ItemCategory.Attire || !slot2.MoveToContainer(player.inventory.containerWear, j))
			{
				slot2.Drop(GetDropPosition(), GetDropVelocity());
			}
		}
		if (item != null)
		{
			flag = true;
			if (!item.MoveToContainer(base.inventory, num3) && !item.MoveToContainer(player.inventory.containerWear, j))
			{
				item.Drop(GetDropPosition(), GetDropVelocity());
			}
		}
		clothingBuffer[j] = null;
	}
	for (int k = 0; k < 6; k++)
	{
		int num4 = num2 + k + 8;
		int iTargetPos = k;
		Item slot3 = base.inventory.GetSlot(num4);
		Item slot4 = player.inventory.containerBelt.GetSlot(k);
		slot4?.RemoveFromContainer();
		if (slot3 != null)
		{
			flag = true;
			if (!slot3.MoveToContainer(player.inventory.containerBelt, iTargetPos))
			{
				slot3.Drop(GetDropPosition(), GetDropVelocity());
			}
		}
		if (slot4 != null)
		{
			flag = true;
			if (!slot4.MoveToContainer(base.inventory, num4))
			{
				slot4.Drop(GetDropPosition(), GetDropVelocity());
			}
		}
	}
	if (flag)
	{
		Effect.server.Run(equipSound.resourcePath, player, StringPool.Get("spine3"), UnityEngine.Vector3.zero, UnityEngine.Vector3.zero);
		SetFlag(BaseEntity.Flags.Reserved1, b: true);
		Invoke(ClearEquipping, 1.5f);
	}
}

```
:::
