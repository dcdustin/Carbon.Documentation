# OnItemCraft
<Badge type="info" text="Industrial"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when an item is crafted by a player or an industrial crafter.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnItemCraft()
{
	Puts("OnItemCraft has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ IndustrialCrafter]
public override void RunJob()
{
	base.RunJob();
	if (ConVar.Server.industrialCrafterFrequency <= 0f || HasFlag(BaseEntity.Flags.Reserved1) || currentlyCrafting != null)
	{
		return;
	}
	for (int i = 0; i <= 3; i++)
	{
		Item targetBlueprint = GetTargetBlueprint(i);
		if (targetBlueprint == null || GetWorkbench() == null || GetWorkbench().Workbenchlevel < targetBlueprint.blueprintTargetDef.Blueprint.GetWorkbenchLevel())
		{
			continue;
		}
		ItemBlueprint blueprint = targetBlueprint.blueprintTargetDef.Blueprint;
		bool flag = true;
		foreach (ItemAmount ingredient in blueprint.GetIngredients())
		{
			if ((float)GetInputAmount(ingredient.itemDef) < ingredient.amount)
			{
				flag = false;
				break;
			}
		}
		if (!flag)
		{
			continue;
		}
		flag = false;
		for (int j = 8; j <= 11; j++)
		{
			Item slot = _inventory.GetSlot(j);
			if (slot == null || (slot.info == targetBlueprint.blueprintTargetDef && slot.amount + blueprint.amountToCreate <= slot.MaxStackable()))
			{
				flag = true;
				break;
			}
		}
		if (!flag)
		{
			SetFlag(BaseEntity.Flags.Reserved2, b: true);
			continue;
		}
		SetFlag(BaseEntity.Flags.Reserved2, b: false);
		foreach (ItemAmount ingredient2 in blueprint.GetIngredients())
		{
			ConsumeInputIngredient(ingredient2);
		}
		currentlyCrafting = targetBlueprint.blueprintTargetDef;
		currentlyCraftingAmount = blueprint.amountToCreate;
		float craftTime = blueprint.GetCraftTime();
		Invoke(CompleteCraft, craftTime);
		jobFinishes = craftTime;
		SetFlag(BaseEntity.Flags.Reserved1, b: true);
		ClientRPC(RpcTarget.NetworkGroup("ClientUpdateCraftTimeRemaining"), (float)jobFinishes, jobFinishes.Duration);
		break;
	}
}

```
:::
