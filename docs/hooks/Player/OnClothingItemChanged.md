<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnClothingItemChanged
```csharp
public void OnClothingChanged(Item item, bool bAdded)
{
	base.baseEntity.SV_ClothingChanged();
	if (ItemManager.EnablePooling)
	{
		if (!IsInvoking(DeferredServerUpdateAction))
		{
			Invoke(DeferredServerUpdateAction, 0f);
		}
	}
	else
	{
		ItemManager.DoRemoves();
		ServerUpdate(0f);
	}
	if (item.position == 7)
	{
		item.RecalulateParentEntity(children: true);
		Invoke(UpdatedVisibleHolsteredItems, 0.1f);
		if (base.baseEntity.GetHeldEntity() != null)
		{
			base.baseEntity.GetHeldEntity().UpdateShieldState(bHeld: true);
		}
		item?.contents?.onItemAddedRemoved?.Invoke(item, bAdded);
	}
	base.baseEntity.ProcessMissionEvent(BaseMission.MissionEventType.CLOTHINGCHANGED, 0, 0f);
}

```
