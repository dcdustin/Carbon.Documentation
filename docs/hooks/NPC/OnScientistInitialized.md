# OnScientistInitialized
<Badge type="info" text="NPC"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a scientist NPC is initialized/spawned.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnScientistInitialized(BradleyAPC bradleyAPC, ScientistNPC scientist, UnityEngine.Vector3 spawnPos)
{
	Puts("OnScientistInitialized has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ BradleyAPC]
public void InitScientist(ScientistNPC scientist, UnityEngine.Vector3 spawnPos, BasePlayer triggerPlayer, bool roadSpawned, bool startChasing)
{
	if (scientist == null)
	{
		return;
	}
	scientist.transform.position = spawnPos;
	if (!scientist.Brain.Navigator.PlaceOnNavMesh(0.2f))
	{
		activeScientists.Remove(scientist);
		scientist.Kill();
	}
	else if (triggerPlayer != null)
	{
		scientist.Brain.Events.Memory.Entity.Set(triggerPlayer, 0);
		scientist.Brain.Senses.Memory.SetKnown(triggerPlayer, scientist, null);
		scientist.Brain.Events.Memory.Position.Set(scientist.Brain.Navigator.transform.position, 7);
		scientist.Brain.Events.Memory.Position.Set(scientist.Brain.Navigator.transform.position, 4);
		scientist.Brain.Events.Memory.Entity.Set(this, 7);
		AttackEntity attackEntity = scientist.GetAttackEntity();
		if (SetScientistChaseBasedOnWeapon && attackEntity != null && !attackEntity.CanUseAtLongRange)
		{
			startChasing = true;
		}
		scientist.Brain.Navigator.CanPathFindToChaseTargetIfNoMovePoint = startChasing;
		scientist.Brain.Navigator.CanUseRandomMovePointIfNonFound = !startChasing;
		if (startChasing)
		{
			scientist.Brain.SwitchToState(AIState.Chase, 6);
		}
		else
		{
			scientist.Brain.SwitchToState(AIState.TakeCover, 4);
		}
		scientist.Brain.Think(0f);
	}
}

```
:::
