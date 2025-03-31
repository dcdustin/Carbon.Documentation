# CanDesignFirework
<Badge type="info" text="Firework"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Determines if a player is allowed to design a firework pattern.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanDesignFirework()
{
	Puts("CanDesignFirework has been fired!");
	return (System.Boolean)default;
}
```
```csharp [Source — Assembly-CSharp @ PatternFirework]
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
:::
