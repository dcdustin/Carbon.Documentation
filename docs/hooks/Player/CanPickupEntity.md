<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanPickupEntity
Called to determine if a deployable or entity can be picked up by a player.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanPickupEntity()
{
	Puts("CanPickupEntity has been fired!");
	return (System.Boolean)default;
}
```
```csharp [Source — Assembly-CSharp @ BaseCombatEntity]
public virtual bool CanPickup(BasePlayer player)
{
	if (pickup.enabled && (!pickup.requireBuildingPrivilege || player.CanBuild()) && (!pickup.requireHammer || player.IsHoldingEntity<Hammer>()))
	{
		if (player != null)
		{
			return !player.IsInTutorial;
		}
		return false;
	}
	return false;
}

```
:::
