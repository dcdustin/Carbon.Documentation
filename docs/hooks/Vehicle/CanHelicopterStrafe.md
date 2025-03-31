<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanHelicopterStrafe
```csharp
public bool CanStrafe()
{
	if (UnityEngine.Time.realtimeSinceStartup - lastStrafeTime >= UnityEngine.Random.Range(15f, 25f))
	{
		return CanInterruptState();
	}
	return false;
}

```
