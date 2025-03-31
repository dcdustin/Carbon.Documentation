<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnTrapTrigger [BearTrap]
```csharp
public override void ObjectEntered(UnityEngine.GameObject obj)
{
	if (Armed())
	{
		hurtTarget = obj;
		Invoke(DelayedFire, 0.05f);
	}
}

```
