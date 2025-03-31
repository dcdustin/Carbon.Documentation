<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPlayerHealthChange
```csharp
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
