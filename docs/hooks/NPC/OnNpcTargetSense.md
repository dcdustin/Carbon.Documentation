<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnNpcTargetSense
```csharp
public void SetKnown(BaseEntity ent, BaseEntity owner, AIBrainSenses brainSenses)
{
	IAISenses iAISenses = owner as IAISenses;
	BasePlayer basePlayer = ent as BasePlayer;
	if (basePlayer != null && PlayerIgnoreList.Contains(basePlayer))
	{
		return;
	}
	bool flag = false;
	if (iAISenses != null && iAISenses.IsThreat(ent))
	{
		flag = true;
		if (brainSenses != null)
		{
			brainSenses.LastThreatTimestamp = UnityEngine.Time.realtimeSinceStartup;
		}
	}
	for (int i = 0; i < All.Count; i++)
	{
		if (All[i].Entity == ent)
		{
			Rust.Ai.SimpleAIMemory.SeenInfo value = All[i];
			value.Position = ent.transform.position;
			value.Timestamp = UnityEngine.Mathf.Max(UnityEngine.Time.realtimeSinceStartup, value.Timestamp);
			All[i] = value;
			return;
		}
	}
	if (basePlayer != null)
	{
		if (ConVar.AI.ignoreplayers && !basePlayer.IsNpc)
		{
			return;
		}
		Players.Add(ent);
	}
	if (iAISenses != null)
	{
		if (iAISenses.IsTarget(ent))
		{
			Targets.Add(ent);
		}
		if (iAISenses.IsFriendly(ent))
		{
			Friendlies.Add(ent);
		}
		if (flag)
		{
			Threats.Add(ent);
		}
	}
	All.Add(new Rust.Ai.SimpleAIMemory.SeenInfo
	{
		Entity = ent,
		Position = ent.transform.position,
		Timestamp = UnityEngine.Time.realtimeSinceStartup
	});
}

```
