<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnItemSubmit [patch]
```csharp
public void SubmitInputItems(BasePlayer fromPlayer)
{
	for (int i = 0; i < InputContainer.capacity; i++)
	{
		Item slot = InputContainer.GetSlot(i);
		if (slot != null && slot.MoveToContainer(base.inventory))
		{
			Effect.server.Run(mailDropSound.resourcePath, GetDropPosition());
			if (fromPlayer != null && !PlayerIsOwner(fromPlayer))
			{
				SetFlag(BaseEntity.Flags.On, b: true);
			}
		}
	}
}

```
