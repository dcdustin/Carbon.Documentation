<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# IOnLoseCondition
Called when an item's durability is about to decrease (allows modifying the loss).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object IOnLoseCondition()
{
	Puts("IOnLoseCondition has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ Item]
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
:::
