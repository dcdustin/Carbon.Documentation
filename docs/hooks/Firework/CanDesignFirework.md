<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanDesignFirework
```csharp
public bool PlayerCanModify(BasePlayer player)
{
	if (player == null || !player.CanInteract())
	{
		return false;
	}
	BuildingPrivlidge buildingPrivilege = GetBuildingPrivilege();
	if (buildingPrivilege != null && !buildingPrivilege.CanAdministrate(player))
	{
		return false;
	}
	return true;
}

```
