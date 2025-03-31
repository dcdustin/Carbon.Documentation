# OnNpcRadioChatter
<Badge type="info" text="NPC"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when an NPC (e.g., a scientist) plays a radio chatter voice line.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnNpcRadioChatter()
{
	Puts("OnNpcRadioChatter has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ ScientistNPC]
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
:::
