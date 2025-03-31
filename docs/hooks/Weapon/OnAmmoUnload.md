# OnAmmoUnload
<Badge type="info" text="Weapon"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnAmmoUnload(BaseProjectile local0, Item item, BasePlayer player)
{
	Puts("OnAmmoUnload has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ BaseProjectile]
public void UnloadAmmo(Item item, BasePlayer player)
{
	BaseProjectile component = item.GetHeldEntity().GetComponent<BaseProjectile>();
	if (!component.canUnloadAmmo || !component)
	{
		return;
	}
	int num = component.primaryMagazine.contents;
	if (num <= 0)
	{
		return;
	}
	component.SetAmmoCount(0);
	item.MarkDirty();
	SendNetworkUpdateImmediate();
	int stackable = component.primaryMagazine.ammoType.stackable;
	if (num > stackable)
	{
		int num2 = UnityEngine.Mathf.FloorToInt(num / component.primaryMagazine.ammoType.stackable);
		num %= stackable;
		for (int i = 0; i < num2; i++)
		{
			Item item2 = ItemManager.Create(component.primaryMagazine.ammoType, stackable, 0uL);
			player.GiveItem(item2);
		}
	}
	if (num > 0)
	{
		Item item3 = ItemManager.Create(component.primaryMagazine.ammoType, num, 0uL);
		player.GiveItem(item3);
	}
}

```
:::
