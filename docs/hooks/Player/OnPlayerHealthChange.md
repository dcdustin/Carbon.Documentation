<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPlayerHealthChange
Triggered when a player's health changes (damage or healing occurs).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnPlayerHealthChange()
{
	Puts("OnPlayerHealthChange has been fired!");
	return (System.Object)default;
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
