# OnPlayerAddModifiers
<Badge type="info" text="Player"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when status modifiers (like modifiers from items or equipment) are applied to a player.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnPlayerAddModifiers()
{
	Puts("OnPlayerAddModifiers has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ ItemModConsume]
public override void DoAction(Item item, BasePlayer player)
{
	if (item.amount < 1)
	{
		return;
	}
	GameObjectRef gameObjectRef = GetConsumeEffect();
	if (gameObjectRef.isValid)
	{
		UnityEngine.Vector3 posLocal = (player.IsDucked() ? new UnityEngine.Vector3(0f, 1f, 0f) : new UnityEngine.Vector3(0f, 2f, 0f));
		Effect.server.Run(gameObjectRef.resourcePath, player, 0u, posLocal, UnityEngine.Vector3.zero);
	}
	player.metabolism.MarkConsumption();
	ItemModConsumable consumable = GetConsumable();
	if (!string.IsNullOrEmpty(consumable.achievementWhenEaten))
	{
		player.GiveAchievement(consumable.achievementWhenEaten);
	}
	Facepunch.Rust.Analytics.Azure.OnConsumableUsed(player, item);
	float num = UnityEngine.Mathf.Max(consumable.amountToConsume, 1);
	float num2 = UnityEngine.Mathf.Min(item.amount, num);
	float num3 = num2 / num;
	float num4 = item.conditionNormalized;
	if (consumable.conditionFractionToLose > 0f)
	{
		num4 = consumable.conditionFractionToLose;
	}
	foreach (ItemModConsumable.ConsumableEffect effect in consumable.effects)
	{
		if (UnityEngine.Mathf.Clamp01(player.healthFraction + player.metabolism.pending_health.Fraction()) > effect.onlyIfHealthLessThan)
		{
			continue;
		}
		if (effect.type == MetabolismAttribute.Type.Health)
		{
			if (effect.amount < 0f)
			{
				player.OnAttacked(new HitInfo(player, player, Rust.DamageType.Generic, (0f - effect.amount) * num3 * num4, player.transform.position + player.transform.forward * 1f));
			}
			else
			{
				player.health += effect.amount * num3 * num4;
			}
		}
		else
		{
			player.metabolism.ApplyChange(effect.type, effect.amount * num3 * num4, effect.time * num3 * num4);
		}
	}
	player.ProcessMissionEvent(BaseMission.MissionEventType.CONSUME, item.info.itemid, 1f);
	if (player.modifiers != null)
	{
		player.modifiers.Add(consumable.modifiers);
	}
	if (product != null)
	{
		ItemAmountRandom[] array = product;
		foreach (ItemAmountRandom itemAmountRandom in array)
		{
			int num5 = UnityEngine.Mathf.RoundToInt((float)itemAmountRandom.RandomAmount() * num4);
			if (num5 > 0)
			{
				Item item2 = ItemManager.Create(itemAmountRandom.itemDef, num5, 0uL);
				player.GiveItem(item2);
			}
		}
	}
	if (string.IsNullOrEmpty(eatGesture))
	{
		player.SignalBroadcast(BaseEntity.Signal.Gesture, eatGesture);
	}
	Facepunch.Rust.Analytics.Server.Consume(base.gameObject.name);
	if (consumable.conditionFractionToLose > 0f)
	{
		item.LoseCondition(consumable.conditionFractionToLose * item.maxCondition);
	}
	else
	{
		item.UseItem((int)num2);
	}
}

```
:::
