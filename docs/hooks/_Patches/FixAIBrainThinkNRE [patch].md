<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# FixAIBrainThinkNRE [patch]
```csharp
public virtual void Think(float delta)
{
	if (!ConVar.AI.think)
	{
		return;
	}
	lastThinkTime = UnityEngine.Time.time;
	if (sleeping || disabled)
	{
		return;
	}
	Age += delta;
	if (UseAIDesign)
	{
		Senses.Update();
		UpdateGroup();
	}
	if (CurrentState != null)
	{
		UpdateAgressionTimer(delta);
		StateStatus stateStatus = CurrentState.StateThink(delta, this, GetBaseEntity());
		if (Events != null)
		{
			Events.Tick(delta, stateStatus);
		}
	}
	if (UseAIDesign || (CurrentState != null && !CurrentState.CanLeave()))
	{
		return;
	}
	float num = 0f;
	BaseAIBrain.BasicAIState basicAIState = null;
	foreach (BaseAIBrain.BasicAIState value in states.Values)
	{
		if (value != null && value.CanEnter())
		{
			float weight = value.GetWeight();
			if (weight > num)
			{
				num = weight;
				basicAIState = value;
			}
		}
	}
	if (basicAIState != CurrentState)
	{
		SwitchToState(basicAIState);
	}
}

```
