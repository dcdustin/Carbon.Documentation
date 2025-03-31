# OnNpcEquipWeapon
<Badge type="info" text="NPC"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when an NPC equips a weapon.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnNpcEquipWeapon()
{
	Puts("OnNpcEquipWeapon has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ NPCPlayer]
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
:::
