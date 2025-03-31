# OnPlayerDeath
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Triggered when a player dies.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnPlayerDeath(BasePlayer basePlayer, HitInfo info)
{
	Puts("OnPlayerDeath has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ BasePlayer]
public override void Die(HitInfo info = null)
{
	using (TimeWarning.New("Player.Die"))
	{
		if (!IsDead())
		{
			Handcuffs restraintItem = Belt.GetRestraintItem();
			if (restraintItem != null)
			{
				restraintItem.HeldWhenOwnerDied(this);
			}
			if (InGesture)
			{
				Server_CancelGesture();
			}
			if (Belt != null && ShouldDropActiveItem())
			{
				UnityEngine.Vector3 vector = new UnityEngine.Vector3(UnityEngine.Random.Range(-2f, 2f), 0.2f, UnityEngine.Random.Range(-2f, 2f));
				Belt.DropActive(GetDropPosition(), GetInheritedDropVelocity() + vector.normalized * 3f);
				inventory.DropBackpackOnDeath();
			}
			if (!WoundInsteadOfDying(info))
			{
				SleepingBag.OnPlayerDeath(this);
				base.Die(info);
			}
		}
	}
}

```
:::
