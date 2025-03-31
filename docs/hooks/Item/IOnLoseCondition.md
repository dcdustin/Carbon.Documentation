<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# IOnLoseCondition
```csharp
public void LoseCondition(float amount)
{
	if (hasCondition && !ConVar.Debugging.disablecondition)
	{
		float num = condition;
		condition -= amount;
		if (ConVar.Global.developer > 0)
		{
			UnityEngine.Debug.Log(info.shortname + " was damaged by: " + amount + "cond is: " + condition + "/" + maxCondition);
		}
		if (condition <= 0f && condition < num)
		{
			OnBroken();
		}
	}
}

```
