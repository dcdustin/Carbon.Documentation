<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanTakeCutting
```csharp
public void TakeClones(BasePlayer player)
{
	if (player == null || !CanClone())
	{
		return;
	}
	int num = Properties.BaseCloneCount + Genes.GetGeneTypeCount(GrowableGenetics.GeneType.Yield) / 2;
	if (num > 0)
	{
		Item item = ItemManager.Create(Properties.CloneItem, num, 0uL);
		item.SetItemOwnership(player, ItemOwnershipPhrases.Cloned);
		GrowableGeneEncoding.EncodeGenesToItem(this, item);
		Facepunch.Rust.Analytics.Azure.OnGatherItem(item.info.shortname, item.amount, this, player);
		player.GiveItem(item, BaseEntity.GiveItemReason.ResourceHarvested);
		if (Properties.pickEffect.isValid)
		{
			Effect.server.Run(Properties.pickEffect.resourcePath, base.transform.position, UnityEngine.Vector3.up);
		}
		TellPlanter();
		Die();
	}
}

```
