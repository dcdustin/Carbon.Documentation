<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnShopCompleteTrade
```csharp
public void CompleteTrade()
{
	if (vendorPlayer != null && customerPlayer != null && HasFlag(BaseEntity.Flags.Reserved1) && HasFlag(BaseEntity.Flags.Reserved2))
	{
		try
		{
			swappingItems = true;
			for (int num = vendorInventory.capacity - 1; num >= 0; num--)
			{
				Item slot = vendorInventory.GetSlot(num);
				Item slot2 = customerInventory.GetSlot(num);
				if ((bool)customerPlayer && slot != null)
				{
					customerPlayer.GiveItem(slot);
				}
				if ((bool)vendorPlayer && slot2 != null)
				{
					vendorPlayer.GiveItem(slot2);
				}
			}
		}
		finally
		{
			swappingItems = false;
		}
		Effect.server.Run(transactionCompleteEffect.resourcePath, this, 0u, new UnityEngine.Vector3(0f, 1f, 0f), UnityEngine.Vector3.zero);
	}
	ResetTrade();
	SendNetworkUpdate();
}

```
