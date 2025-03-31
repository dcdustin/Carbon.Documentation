<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnRefreshVendingStock
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnRefreshVendingStock()
{
	Puts("OnRefreshVendingStock has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ VendingMachine]
public void RefreshSellOrderStockLevel(ItemDefinition itemDef = null)
{
	int num = 0;
	foreach (ProtoBuf.VendingMachine.SellOrder sellOrder in sellOrders.sellOrders)
	{
		if (!(itemDef == null) && itemDef.itemid != sellOrder.itemToSellID)
		{
			continue;
		}
		System.Collections.Generic.List<Item> obj = Facepunch.Pool.Get<System.Collections.Generic.List<Item>>();
		GetItemsToSell(sellOrder, obj);
		int num2 = sellOrder.itemToSellAmount;
		if (ItemManager.FindItemDefinition(sellOrder.itemToSellID) == NPCVendingMachine.ScrapItem && sellOrder.receivedQuantityMultiplier != 1f)
		{
			num2 = GetTotalPriceForOrder(num2, sellOrder.receivedQuantityMultiplier);
		}
		sellOrder.inStock = ((obj.Count >= 0) ? (System.Linq.Enumerable.Sum(obj, (Item x) => x.amount) / num2) : 0);
		float itemCondition = 0f;
		float itemConditionMax = 0f;
		int instanceData = 0;
		System.Collections.Generic.List<int> list = Facepunch.Pool.Get<System.Collections.Generic.List<int>>();
		int totalAttachmentSlots = 0;
		int ammoType = 0;
		int ammoCount = 0;
		if (obj.Count > 0)
		{
			if (obj[0].hasCondition)
			{
				itemCondition = obj[0].condition;
				itemConditionMax = obj[0].maxCondition;
			}
			if (obj[0].info != null && (obj[0].info.amountType == ItemDefinition.AmountType.Genetics || obj[0].info.amountType == ItemDefinition.AmountType.NucleusGrades) && obj[0].instanceData != null)
			{
				instanceData = obj[0].instanceData.dataInt;
				sellOrder.inStock = obj[0].amount;
			}
			if (obj[0].contents != null && obj[0].contents.capacity > 0 && obj[0].contents.HasFlag(ItemContainer.Flag.ShowSlotsOnIcon))
			{
				foreach (Item item in obj[0].contents.itemList)
				{
					list.Add(item.info.itemid);
				}
				totalAttachmentSlots = obj[0].contents.capacity;
			}
			if (obj[0].ammoCount.HasValue)
			{
				ammoCount = obj[0].ammoCount.Value;
				BaseEntity heldEntity = obj[0].GetHeldEntity();
				if ((bool)heldEntity)
				{
					BaseProjectile component = heldEntity.GetComponent<BaseProjectile>();
					if ((bool)component)
					{
						ammoType = component.primaryMagazine.ammoType.itemid;
					}
				}
			}
		}
		sellOrder.ammoType = ammoType;
		sellOrder.ammoCount = ammoCount;
		sellOrder.itemCondition = itemCondition;
		sellOrder.itemConditionMax = itemConditionMax;
		sellOrder.instanceData = instanceData;
		if (sellOrder.attachmentsList != null)
		{
			Facepunch.Pool.FreeUnmanaged(ref sellOrder.attachmentsList);
		}
		sellOrder.attachmentsList = list;
		sellOrder.totalAttachmentSlots = totalAttachmentSlots;
		sellOrder.priceMultiplier = GetDiscountForSlot(num, sellOrder);
		sellOrder.receivedQuantityMultiplier = GetReceivedQuantityMultiplier(num, sellOrder);
		num++;
		Facepunch.Pool.Free(ref obj, freeElements: false);
	}
}

```
:::
