# OnActiveTelephoneUpdated
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when an active telephone call's details are updated (e.g., the active call target or state changes).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnActiveTelephoneUpdated(BasePlayer basePlayer)
{
	Puts("OnActiveTelephoneUpdated has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ BasePlayer]
public void SetActiveTelephone(PhoneController t)
{
	activeTelephone = t;
}

```
:::
