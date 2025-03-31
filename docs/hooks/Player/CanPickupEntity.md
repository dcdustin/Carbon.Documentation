<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanPickupEntity
```csharp
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
