# OnNpcRadioChatter
<Badge type="info" text="NPC"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when an NPC (e.g., a scientist) plays a radio chatter voice line.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnNpcRadioChatter(ScientistNPC scientistNPC)
{
	Puts("OnNpcRadioChatter has been fired!");
	return (object)default;
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
