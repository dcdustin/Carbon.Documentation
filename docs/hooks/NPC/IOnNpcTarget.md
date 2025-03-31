<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# IOnNpcTarget
Allows control over whether an NPC wants to target or attack a particular entity.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool IOnNpcTarget()
{
	Puts("IOnNpcTarget has been fired!");
	return (System.Boolean)default;
}
```
```csharp [Source — Assembly-CSharp @ Rust.Ai.Gen2.SenseComponent]
public bool CanTarget(BaseEntity entity)
{
	if (!entity.IsValid())
	{
		return false;
	}
	if (entity.IsTransferProtected())
	{
		return false;
	}
	if (entity.IsDestroyed)
	{
		return false;
	}
	if (!entity.IsNonNpcPlayer() && !entity.IsNpc)
	{
		return false;
	}
	if (entity.IsNpcPlayer())
	{
		return false;
	}
	if (entity is BaseCombatEntity baseCombatEntity && baseCombatEntity.IsDead())
	{
		return false;
	}
	if (base.baseEntity.InSameNpcTeam(entity))
	{
		return false;
	}
	if (entity is BasePlayer item)
	{
		if (ConVar.AI.ignoreplayers)
		{
			return false;
		}
		if (Rust.Ai.SimpleAIMemory.PlayerIgnoreList.Contains(item))
		{
			return false;
		}
	}
	return true;
}

```
:::
