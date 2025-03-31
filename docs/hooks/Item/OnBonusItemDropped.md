# OnBonusItemDropped
<Badge type="info" text="Item"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called after bonus items have been dropped from a resource node.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnBonusItemDropped(Item local5, BasePlayer local0)
{
	Puts("OnBonusItemDropped has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ LootContainer]
public override void DropBonusItems(BaseEntity initiator, ItemContainer container)
{
	base.DropBonusItems(initiator, container);
	if (initiator == null || container == null)
	{
		return;
	}
	BasePlayer basePlayer = initiator as BasePlayer;
	if (basePlayer == null || scrapAmount <= 0 || !(scrapDef != null))
	{
		return;
	}
	float num = ((basePlayer.modifiers != null) ? (1f + basePlayer.modifiers.GetValue(Modifier.ModifierType.Scrap_Yield)) : 0f);
	if (!(num > 1f))
	{
		return;
	}
	float variableValue = basePlayer.modifiers.GetVariableValue(Modifier.ModifierType.Scrap_Yield, 0f);
	float num2 = UnityEngine.Mathf.Max((float)scrapAmount * num - (float)scrapAmount, 0f);
	variableValue += num2;
	int num3 = 0;
	if (variableValue >= 1f)
	{
		num3 = (int)variableValue;
		variableValue -= (float)num3;
	}
	basePlayer.modifiers.SetVariableValue(Modifier.ModifierType.Scrap_Yield, variableValue);
	if (num3 > 0)
	{
		Item item = ItemManager.Create(scrapDef, num3, 0uL);
		if (item != null)
		{
			(item.Drop(GetDropPosition() + new UnityEngine.Vector3(0f, 0.5f, 0f), GetInheritedDropVelocity()) as DroppedItem).DropReason = DroppedItem.DropReasonEnum.Loot;
		}
	}
}

```
:::
