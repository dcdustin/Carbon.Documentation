<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# FixAIBrainTryThinkNRE [patch]
```csharp
public virtual void TryThink()
{
	if (brain != null && brain.ShouldServerThink())
	{
		brain.DoThink();
	}
	else if (brain == null && (float)lastBrainError > 10f)
	{
		lastBrainError = 0f;
		UnityEngine.Debug.LogWarning(base.gameObject.name + " is missing a brain");
	}
}

```
