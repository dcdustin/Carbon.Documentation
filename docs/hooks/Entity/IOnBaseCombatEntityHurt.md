<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# IOnBaseCombatEntityHurt
Called when a BaseCombatEntity (any entity with health, like a player or NPC) takes damage. Allows plugins to react to damage events.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object IOnBaseCombatEntityHurt()
{
	Puts("IOnBaseCombatEntityHurt has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ BaseCombatEntity]
public void Hurt(float amount)
{
	Hurt(UnityEngine.Mathf.Abs(amount), Rust.DamageType.Generic);
}

```
:::
