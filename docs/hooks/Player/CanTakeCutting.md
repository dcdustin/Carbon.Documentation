# CanTakeCutting
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a player attempts to take a plant cutting, to decide if they are allowed.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object CanTakeCutting()
{
	Puts("CanTakeCutting has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ GrowableEntity]
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
:::
