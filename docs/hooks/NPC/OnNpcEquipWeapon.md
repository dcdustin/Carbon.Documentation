<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnNpcEquipWeapon [NPCPlayer]
```csharp
public virtual void EquipWeapon(bool skipDeployDelay = false)
{
	if (base.inventory == null || base.inventory.containerBelt == null)
	{
		return;
	}
	Item slot = base.inventory.containerBelt.GetSlot(0);
	if (slot == null)
	{
		return;
	}
	UpdateActiveItem(base.inventory.containerBelt.GetSlot(0).uid);
	BaseEntity heldEntity = slot.GetHeldEntity();
	if (!(heldEntity != null))
	{
		return;
	}
	AttackEntity component = heldEntity.GetComponent<AttackEntity>();
	if (component != null)
	{
		if (skipDeployDelay)
		{
			component.ResetAttackCooldown();
		}
		component.TopUpAmmo();
	}
}

```
