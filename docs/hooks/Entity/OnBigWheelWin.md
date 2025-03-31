<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnBigWheelWin
```csharp
public void Payout()
{
	HitNumber currentHitType = GetCurrentHitType();
	System.Guid value = System.Guid.NewGuid();
	foreach (BigWheelBettingTerminal terminal in terminals)
	{
		if (terminal.isClient)
		{
			continue;
		}
		bool flag = false;
		bool flag2 = false;
		Item slot = terminal.inventory.GetSlot((int)currentHitType.hitType);
		if (slot != null)
		{
			int num = currentHitType.ColorToMultiplier(currentHitType.hitType);
			int amount = slot.amount;
			slot.amount += slot.amount * num;
			slot.RemoveFromContainer();
			slot.MoveToContainer(terminal.inventory, 5);
			flag = true;
			Facepunch.Rust.Analytics.Azure.OnGamblingResult(terminal.lastPlayer, terminal, amount, slot.amount, value);
		}
		for (int i = 0; i < 5; i++)
		{
			Item slot2 = terminal.inventory.GetSlot(i);
			if (slot2 != null)
			{
				Facepunch.Rust.Analytics.Azure.OnGamblingResult(terminal.lastPlayer, terminal, slot2.amount, 0, value);
				slot2.Remove();
				flag2 = true;
			}
		}
		if (flag || flag2)
		{
			terminal.ClientRPC(RpcTarget.NetworkGroup("WinOrLoseSound"), flag);
		}
	}
	ItemManager.DoRemoves();
	SetTerminalsLocked(isLocked: false);
}

```
