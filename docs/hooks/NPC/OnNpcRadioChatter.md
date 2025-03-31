<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnNpcRadioChatter [ScientistNPC]
```csharp
public void PlayRadioChatter()
{
	if (RadioChatterEffects.Length != 0)
	{
		if (base.IsDestroyed || base.transform == null)
		{
			CancelInvoke(PlayRadioChatter);
			return;
		}
		Effect.server.Run(RadioChatterEffects[UnityEngine.Random.Range(0, RadioChatterEffects.Length)].resourcePath, this, StringPool.Get("head"), UnityEngine.Vector3.zero, UnityEngine.Vector3.zero);
		QueueRadioChatter();
	}
}

```
