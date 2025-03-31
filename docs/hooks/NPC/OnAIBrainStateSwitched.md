# OnAIBrainStateSwitched
<Badge type="info" text="NPC"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called after an AI brain has switched to a new state/behavior.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnAIBrainStateSwitched(BaseAIBrain baseAIBrain, BaseAIBrain self1)
{
	Puts("OnAIBrainStateSwitched has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ BaseAIBrain]
public bool SwitchToState(AIState newState, int stateContainerID = -1)
{
	if (!HasState(newState))
	{
		return false;
	}
	bool num = SwitchToState(states[newState], stateContainerID);
	if (num)
	{
		OnStateChanged();
	}
	return num;
}

```
:::
