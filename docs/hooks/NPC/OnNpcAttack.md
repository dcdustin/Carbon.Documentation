# OnNpcAttack
<Badge type="info" text="NPC"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when an NPC initiates an attack.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnNpcAttack(BaseNpc baseNpc, BaseNpc self1)
{
	Puts("OnNpcAttack has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ BaseNpc]
public virtual void StartAttack()
{
	if ((bool)AttackTarget && AttackReady() && !((AttackTarget.ServerPosition - ServerPosition).magnitude > AttackRange))
	{
		nextAttackTime = UnityEngine.Time.realtimeSinceStartup + AttackRate;
		BaseCombatEntity combatTarget = CombatTarget;
		if ((bool)combatTarget)
		{
			combatTarget.Hurt(AttackDamage, AttackDamageType, this);
			Stamina.Use(AttackCost);
			BusyTimer.Activate(0.5f);
			SignalBroadcast(BaseEntity.Signal.Attack);
			ClientRPC(RpcTarget.NetworkGroup("Attack"), AttackTarget.ServerPosition);
		}
	}
}

```
:::
