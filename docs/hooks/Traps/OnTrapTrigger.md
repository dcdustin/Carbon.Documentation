# OnTrapTrigger
<Badge type="info" text="Traps"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnTrapTrigger()
{
	Puts("OnTrapTrigger has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ BearTrap]
public override void ObjectEntered(UnityEngine.GameObject obj)
{
	if (Armed())
	{
		hurtTarget = obj;
		Invoke(DelayedFire, 0.05f);
	}
}

```
:::
