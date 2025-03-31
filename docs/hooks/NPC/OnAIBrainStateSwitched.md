<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnAIBrainStateSwitched
```csharp
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
