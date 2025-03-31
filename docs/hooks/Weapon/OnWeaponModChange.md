# OnWeaponModChange
<Badge type="info" text="Weapon"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnWeaponModChange(BaseProjectile baseProjectile, BaseProjectile self1)
{
	Puts("OnWeaponModChange has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ BaseProjectile]
public void DelayedModsChanged()
{
	int num = UnityEngine.Mathf.CeilToInt(ProjectileWeaponMod.Mult(this, (ProjectileWeaponMod x) => x.magazineCapacity, (ProjectileWeaponMod.Modifier y) => y.scalar, 1f) * (float)primaryMagazine.definition.builtInSize);
	if (num == primaryMagazine.capacity)
	{
		return;
	}
	if (primaryMagazine.contents > 0 && primaryMagazine.contents > num)
	{
		_ = primaryMagazine.ammoType;
		int contents = primaryMagazine.contents;
		BasePlayer ownerPlayer = GetOwnerPlayer();
		ItemContainer itemContainer = null;
		if (ownerPlayer != null)
		{
			itemContainer = ownerPlayer.inventory.containerMain;
		}
		else if (GetCachedItem() != null)
		{
			itemContainer = GetCachedItem().parent;
		}
		SetAmmoCount(0);
		if (itemContainer != null)
		{
			Item item = ItemManager.Create(primaryMagazine.ammoType, contents, 0uL);
			if (!item.MoveToContainer(itemContainer))
			{
				UnityEngine.Vector3 vPos = base.transform.position;
				if (itemContainer.entityOwner != null)
				{
					vPos = itemContainer.entityOwner.transform.position + UnityEngine.Vector3.up * 0.25f;
				}
				item.Drop(vPos, UnityEngine.Vector3.up * 5f);
			}
		}
	}
	primaryMagazine.capacity = num;
	SendNetworkUpdate();
}

```
:::
