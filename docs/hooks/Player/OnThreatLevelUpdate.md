# OnThreatLevelUpdate
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a player's threat level is updated (for AI targeting or aggression mechanics).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnThreatLevelUpdate()
{
	Puts("OnThreatLevelUpdate has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ BasePlayer]
public void EnsureUpdated()
{
	if (UnityEngine.Time.realtimeSinceStartup - lastUpdateTime < 30f)
	{
		return;
	}
	lastUpdateTime = UnityEngine.Time.realtimeSinceStartup;
	cachedThreatLevel = 0f;
	if (IsSleeping())
	{
		return;
	}
	if (inventory.containerWear.itemList.Count > 2)
	{
		cachedThreatLevel += 1f;
	}
	foreach (Item item in inventory.containerBelt.itemList)
	{
		BaseEntity heldEntity = item.GetHeldEntity();
		if ((bool)heldEntity && heldEntity is BaseProjectile && !(heldEntity is BowWeapon))
		{
			cachedThreatLevel += 2f;
			break;
		}
	}
}

```
:::
