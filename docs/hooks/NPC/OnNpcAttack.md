<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnNpcAttack [BaseNpc]
```csharp
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
