# CanDesignFirework
<Badge type="info" text="Firework"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Determines if a player is allowed to design a firework pattern.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanDesignFirework(BasePlayer player, PatternFirework patternFirework)
{
	Puts("CanDesignFirework has been fired!");
	return (bool)default;
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
