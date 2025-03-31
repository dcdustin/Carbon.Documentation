# OnPlayerHealthChange
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Triggered when a player's health changes (damage or healing occurs).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnPlayerHealthChange(BasePlayer basePlayer, float oldvalue, float newvalue)
{
	Puts("OnPlayerHealthChange has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ BasePlayer]
public override void OnHealthChanged(float oldvalue, float newvalue)
{
	base.OnHealthChanged(oldvalue, newvalue);
	if (base.isServer)
	{
		if (oldvalue > newvalue)
		{
			LifeStoryHurt(oldvalue - newvalue);
		}
		else
		{
			LifeStoryHeal(newvalue - oldvalue);
		}
		metabolism.isDirty = true;
	}
}

```
:::
