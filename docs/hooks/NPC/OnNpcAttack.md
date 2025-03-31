# OnNpcAttack
<Badge type="info" text="NPC"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when an NPC initiates an attack.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnNpcAttack()
{
	Puts("OnNpcAttack has been fired!");
	return (System.Object)default;
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
