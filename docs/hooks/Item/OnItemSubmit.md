<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnItemSubmit
Called when a player submits items into a mailbox (e.g., for a mission objective).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnItemSubmit()
{
	Puts("OnItemSubmit has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ Mailbox]
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
:::
