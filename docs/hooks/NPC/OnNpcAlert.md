# OnNpcAlert
<Badge type="info" text="NPC"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when an NPC becomes alerted (notices a threat).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnNpcAlert()
{
	Puts("OnNpcAlert has been fired!");
	return (System.Object)default;
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
