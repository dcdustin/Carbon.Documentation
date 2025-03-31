# OnDefaultItemsReceived
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called after a player has been given their default starter items.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnDefaultItemsReceived(PlayerInventory playerInventory)
{
	Puts("OnDefaultItemsReceived has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ PlayerInventory]
public void GiveDefaultItems()
{
	Strip();
	BaseGameMode activeGameMode = BaseGameMode.GetActiveGameMode(serverside: true);
	if (activeGameMode != null && activeGameMode.HasLoadouts())
	{
		BaseGameMode.GetActiveGameMode(serverside: true).LoadoutPlayer(base.baseEntity);
		return;
	}
	GiveDefaultItemWithSkin("client.rockskin", "rock");
	GiveDefaultItemWithSkin("client.torchskin", "torch");
	if (IsBirthday() && !base.baseEntity.IsInTutorial)
	{
		GiveItem(ItemManager.CreateByName("cakefiveyear", 1, 0uL).SetItemOwnership(base.baseEntity, ItemOwnershipPhrases.BornPhrase), containerBelt);
		GiveItem(ItemManager.CreateByName("partyhat", 1, 0uL).SetItemOwnership(base.baseEntity, ItemOwnershipPhrases.BornPhrase), containerWear);
	}
	if (IsChristmas() && !base.baseEntity.IsInTutorial)
	{
		GiveItem(ItemManager.CreateByName("snowball", 1, 0uL).SetItemOwnership(base.baseEntity, ItemOwnershipPhrases.BornPhrase), containerBelt);
		GiveItem(ItemManager.CreateByName("snowball", 1, 0uL).SetItemOwnership(base.baseEntity, ItemOwnershipPhrases.BornPhrase), containerBelt);
		GiveItem(ItemManager.CreateByName("snowball", 1, 0uL).SetItemOwnership(base.baseEntity, ItemOwnershipPhrases.BornPhrase), containerBelt);
	}
	void GiveDefaultItemWithSkin(string convarSkinName, string itemShortName)
	{
		ulong num = 0uL;
		int infoInt = base.baseEntity.GetInfoInt(convarSkinName, 0);
		bool flag = false;
		bool flag2 = false;
		flag2 = base.baseEntity?.UnlockAllSkins ?? false;
		if (infoInt > 0 && (base.baseEntity.blueprints.CheckSkinOwnership(infoInt, base.baseEntity.userID) || flag2))
		{
			ItemDefinition itemDefinition = ItemManager.FindItemDefinition(itemShortName);
			if (itemDefinition != null && ItemDefinition.FindSkin(itemDefinition.itemid, infoInt) != 0L)
			{
				IPlayerItemDefinition itemDefinition2 = PlatformService.Instance.GetItemDefinition(infoInt);
				if (itemDefinition2 != null)
				{
					num = itemDefinition2.WorkshopDownload;
				}
				if (num == 0L && itemDefinition.skins != null)
				{
					ItemSkinDirectory.Skin[] skins = itemDefinition.skins;
					for (int i = 0; i < skins.Length; i++)
					{
						ItemSkinDirectory.Skin skin = skins[i];
						if (skin.id == infoInt && skin.invItem != null && skin.invItem is ItemSkin itemSkin && itemSkin.Redirect != null)
						{
							GiveItem(ItemManager.CreateByName(itemSkin.Redirect.shortname, 1, 0uL).SetItemOwnership(base.baseEntity, ItemOwnershipPhrases.BornPhrase), containerBelt);
							flag = true;
							break;
						}
					}
				}
			}
		}
		if (!flag)
		{
			GiveItem(ItemManager.CreateByName(itemShortName, 1, num).SetItemOwnership(base.baseEntity, ItemOwnershipPhrases.BornPhrase), containerBelt);
		}
	}
}

```
:::
