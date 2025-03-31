<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnRemoveDying
```csharp
public void RemoveDying(BasePlayer receiver)
{
	if (State == PlantProperties.State.Dying && !(Properties.removeDyingItem == null))
	{
		if (Properties.removeDyingEffect.isValid)
		{
			Effect.server.Run(Properties.removeDyingEffect.resourcePath, base.transform.position, UnityEngine.Vector3.up);
		}
		Item item = ItemManager.Create(Properties.removeDyingItem, 1, 0uL);
		if (receiver != null)
		{
			receiver.GiveItem(item, BaseEntity.GiveItemReason.PickedUp);
		}
		else
		{
			item.Drop(base.transform.position + UnityEngine.Vector3.up * 0.5f, UnityEngine.Vector3.up * 1f);
		}
		TellPlanter();
		Die();
	}
}

```
