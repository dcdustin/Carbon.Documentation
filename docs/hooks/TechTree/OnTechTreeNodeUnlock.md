# OnTechTreeNodeUnlock
<Badge type="info" text="TechTree"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnTechTreeNodeUnlock(Workbench workbench, TechTreeData.NodeInstance local4, BasePlayer local0)
{
	Puts("OnTechTreeNodeUnlock has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ Workbench]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void RPC_TechTreeUnlock(BaseEntity.RPCMessage msg)
{
	BasePlayer player = msg.player;
	int id = msg.read.Int32();
	int level = msg.read.Int32();
	TechTreeData techTreeForLevel = GetTechTreeForLevel(level);
	if (techTreeForLevel == null)
	{
		return;
	}
	TechTreeData.NodeInstance byID = techTreeForLevel.GetByID(id);
	if (byID == null)
	{
		UnityEngine.Debug.Log("Node for unlock not found :" + id);
	}
	else
	{
		if (!techTreeForLevel.PlayerCanUnlock(player, byID))
		{
			return;
		}
		if (byID.IsGroup())
		{
			foreach (int output in byID.outputs)
			{
				TechTreeData.NodeInstance byID2 = techTreeForLevel.GetByID(output);
				if (byID2 != null && byID2.itemDef != null)
				{
					player.blueprints.Unlock(byID2.itemDef);
					Facepunch.Rust.Analytics.Azure.OnBlueprintLearned(player, byID2.itemDef, "techtree", 0, this);
				}
			}
			UnityEngine.Debug.Log("Player unlocked group :" + byID.groupName);
		}
		else if (byID.itemDef != null)
		{
			int tax;
			int num = ScrapForResearch(byID.itemDef, techTreeForLevel.techTreeLevel, out tax);
			int itemid = ItemManager.FindItemDefinition("scrap").itemid;
			if (player.inventory.GetAmount(itemid) >= num + tax)
			{
				player.inventory.Take(null, itemid, num + tax);
				player.blueprints.Unlock(byID.itemDef);
				Facepunch.Rust.Analytics.Azure.OnBlueprintLearned(player, byID.itemDef, "techtree", num + tax, this);
			}
		}
	}
}

```
:::
