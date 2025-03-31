# OnNpcAlert
<Badge type="info" text="NPC"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when an NPC becomes alerted (notices a threat).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnNpcAlert(ScientistNPC scientistNPC)
{
	Puts("OnNpcAlert has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ ScientistNPC]
public void Alert()
{
	lastAlertedTime = UnityEngine.Time.time;
	SetChatterType(ScientistNPC.RadioChatterType.Alert);
}

```
:::
