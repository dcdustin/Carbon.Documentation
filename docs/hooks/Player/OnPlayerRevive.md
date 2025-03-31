# OnPlayerRevive
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a player is revived from a wounded state by another player.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnPlayerRevive()
{
	Puts("OnPlayerRevive has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ MedicalTool]
public void GiveEffectsTo(BasePlayer player)
{
	if (!player)
	{
		return;
	}
	ItemDefinition ownerItemDefinition = GetOwnerItemDefinition();
	ItemModConsumable component = ownerItemDefinition.GetComponent<ItemModConsumable>();
	if (!component)
	{
		UnityEngine.Debug.LogWarning("No consumable for medicaltool :" + base.name);
		return;
	}
	BasePlayer ownerPlayer = GetOwnerPlayer();
	Facepunch.Rust.Analytics.Azure.OnMedUsed(ownerItemDefinition.shortname, ownerPlayer, player);
	if (player != ownerPlayer && player.IsWounded() && canRevive)
	{
		player.StopWounded(ownerPlayer);
	}
	foreach (ItemModConsumable.ConsumableEffect effect in component.effects)
	{
		if (effect.type == MetabolismAttribute.Type.Health)
		{
			player.health += effect.amount;
			player.ProcessMissionEvent(BaseMission.MissionEventType.HEAL, prefabID, effect.amount);
		}
		else
		{
			player.metabolism.ApplyChange(effect.type, effect.amount, effect.time);
		}
	}
	if (player is BasePet)
	{
		player.SendNetworkUpdateImmediate();
	}
}

```
:::
