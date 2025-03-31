# OnRemoveDying
<Badge type="info" text="Resource"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Triggered when a dying plant is removed, yielding a final item (like when picking up a withered plant).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnRemoveDying(GrowableEntity growableEntity, BasePlayer receiver)
{
	Puts("OnRemoveDying has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ GrowableEntity]
public void RemoveDying(BasePlayer receiver)
{
	if (State == PlantProperties.State.Dying && !(Properties.removeDyingItem == null))
	{
		if (Properties.removeDyingEffect.isValid)
		{
			Effect.server.Run(Properties.removeDyingEffect.resourcePath, base.transform.position, UnityEngine.Vector3.up);
		}
		Item item = ItemManager.Create(Properties.removeDyingItem, 1, 0uL);
		if (receiver != null)
		{
			receiver.GiveItem(item, BaseEntity.GiveItemReason.PickedUp);
		}
		else
		{
			item.Drop(base.transform.position + UnityEngine.Vector3.up * 0.5f, UnityEngine.Vector3.up * 1f);
		}
		TellPlanter();
		Die();
	}
}

```
:::
