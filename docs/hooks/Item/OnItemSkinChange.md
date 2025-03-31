# OnItemSkinChange
<Badge type="info" text="Item"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when an item's skin is changed (e.g., via a repair bench).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnItemSkinChange(int local2, Item local6, RepairBench repairBench, BasePlayer local1)
{
	Puts("OnItemSkinChange has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ RepairBench]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void ChangeSkin(BaseEntity.RPCMessage msg)
{
	BasePlayer player = msg.player;
	int num = msg.read.Int32();
	ItemId itemId = new ItemId(msg.read.UInt64());
	bool isValid = itemId.IsValid;
	bool flag = !isValid || UnityEngine.Time.realtimeSinceStartup > nextSkinChangeAudioTime;
	Item slot = base.inventory.GetSlot(0);
	if (slot == null || (isValid && slot.uid != itemId))
	{
		return;
	}
	bool flag2 = false;
	if (msg.player.UnlockAllSkins)
	{
		flag2 = true;
	}
	if (num != 0 && !flag2 && !player.blueprints.CheckSkinOwnership(num, player.userID))
	{
		debugprint("RepairBench.ChangeSkin player does not have item :" + num + ":");
		return;
	}
	ulong Skin = ItemDefinition.FindSkin(slot.info.itemid, num);
	if (Skin == slot.skin && slot.info.isRedirectOf == null)
	{
		debugprint("RepairBench.ChangeSkin cannot apply same skin twice : " + Skin + ": " + slot.skin);
		return;
	}
	if (flag)
	{
		nextSkinChangeAudioTime = UnityEngine.Time.realtimeSinceStartup + 0.75f;
	}
	ItemSkinDirectory.Skin skin = System.Linq.Enumerable.FirstOrDefault(slot.info.skins, (ItemSkinDirectory.Skin x) => (ulong)x.id == Skin);
	if (slot.info.isRedirectOf != null)
	{
		Skin = ItemDefinition.FindSkin(slot.info.isRedirectOf.itemid, num);
		skin = System.Linq.Enumerable.FirstOrDefault(slot.info.isRedirectOf.skins, (ItemSkinDirectory.Skin x) => (ulong)x.id == Skin);
	}
	ItemSkin itemSkin = ((skin.id == 0) ? null : (skin.invItem as ItemSkin));
	if (((bool)itemSkin && (itemSkin.Redirect != null || slot.info.isRedirectOf != null)) || (!itemSkin && slot.info.isRedirectOf != null))
	{
		ItemDefinition template = ((itemSkin != null) ? itemSkin.Redirect : slot.info.isRedirectOf);
		bool flag3 = false;
		if (itemSkin != null && itemSkin.Redirect == null && slot.info.isRedirectOf != null)
		{
			template = slot.info.isRedirectOf;
			flag3 = num != 0;
		}
		float condition = slot.condition;
		float maxCondition = slot.maxCondition;
		int amount = slot.amount;
		int ammoCount = 0;
		int num2 = 0;
		ItemModContainerArmorSlot component = slot.info.GetComponent<ItemModContainerArmorSlot>();
		if (component != null && slot.contents != null)
		{
			num2 = slot.contents.capacity;
		}
		ItemDefinition ammoType = null;
		if (slot.GetHeldEntity() != null && slot.GetHeldEntity() is BaseProjectile { primaryMagazine: not null } baseProjectile)
		{
			ammoCount = baseProjectile.primaryMagazine.contents;
			ammoType = baseProjectile.primaryMagazine.ammoType;
		}
		System.Collections.Generic.List<Item> obj = Facepunch.Pool.Get<System.Collections.Generic.List<Item>>();
		if (slot.contents != null && slot.contents.itemList != null && slot.contents.itemList.Count > 0)
		{
			if (slot.contents.itemList.Count > obj.Capacity)
			{
				obj.Capacity = slot.contents.itemList.Count;
			}
			foreach (Item item2 in slot.contents.itemList)
			{
				obj.Add(item2);
			}
			foreach (Item item3 in obj)
			{
				item3.RemoveFromContainer();
			}
		}
		Item item = ItemManager.Create(template, 1, 0uL);
		item.ownershipShares = slot.ownershipShares;
		slot.ownershipShares = null;
		slot.Remove();
		ItemManager.DoRemoves();
		item.MoveToContainer(base.inventory, 0, allowStack: false);
		item.maxCondition = maxCondition;
		item.condition = condition;
		item.amount = amount;
		if (item.GetHeldEntity() != null && item.GetHeldEntity() is BaseProjectile baseProjectile2)
		{
			if (baseProjectile2.primaryMagazine != null)
			{
				baseProjectile2.SetAmmoCount(ammoCount);
				baseProjectile2.primaryMagazine.ammoType = ammoType;
			}
			baseProjectile2.ForceModsChanged();
		}
		if (num2 > 0)
		{
			component = item.info.GetComponent<ItemModContainerArmorSlot>();
			component.CreateAtCapacity(num2, item);
		}
		if (obj.Count > 0 && item.contents != null)
		{
			if (component != null)
			{
				for (int i = 0; i < obj.Count; i++)
				{
					obj[i]?.MoveToContainer(item.contents, i, allowStack: false);
				}
			}
			else
			{
				foreach (Item item4 in obj)
				{
					item4.MoveToContainer(item.contents);
				}
			}
		}
		Facepunch.Pool.Free(ref obj, freeElements: false);
		if (flag3)
		{
			ApplySkinToItem(item, Skin);
		}
		Facepunch.Rust.Analytics.Server.SkinUsed(item.info.shortname, num);
		Facepunch.Rust.Analytics.Azure.OnSkinChanged(player, this, item, Skin);
	}
	else
	{
		ApplySkinToItem(slot, Skin);
		Facepunch.Rust.Analytics.Server.SkinUsed(slot.info.shortname, num);
		Facepunch.Rust.Analytics.Azure.OnSkinChanged(player, this, slot, Skin);
	}
	if (flag && skinchangeEffect.isValid)
	{
		Effect.server.Run(skinchangeEffect.resourcePath, this, 0u, new UnityEngine.Vector3(0f, 1.5f, 0f), UnityEngine.Vector3.zero);
	}
}

```
:::
