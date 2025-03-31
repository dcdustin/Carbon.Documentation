# OnExperimentEnded
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called after a blueprint experiment has finished (result determined).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnExperimentEnded()
{
	Puts("OnExperimentEnded has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ Workbench]
public void ExperimentComplete()
{
	Item experimentResourceItem = GetExperimentResourceItem();
	int scrapForExperiment = GetScrapForExperiment();
	if (pendingBlueprint == null)
	{
		UnityEngine.Debug.LogWarning("Pending blueprint was null!");
	}
	if (experimentResourceItem != null && experimentResourceItem.amount >= scrapForExperiment && pendingBlueprint != null)
	{
		experimentResourceItem.UseItem(scrapForExperiment);
		Item item = ItemManager.Create(GetBlueprintTemplate(), 1, 0uL);
		item.blueprintTarget = pendingBlueprint.itemid;
		creatingBlueprint = true;
		if (!item.MoveToContainer(base.inventory, 0))
		{
			item.Drop(GetDropPosition(), GetDropVelocity());
		}
		creatingBlueprint = false;
		if (experimentSuccessEffect.isValid)
		{
			Effect.server.Run(experimentSuccessEffect.resourcePath, this, 0u, UnityEngine.Vector3.zero, UnityEngine.Vector3.zero);
		}
	}
	SetFlag(BaseEntity.Flags.On, b: false);
	pendingBlueprint = null;
	base.inventory.SetLocked(isLocked: false);
	SendNetworkUpdate();
}

```
:::
