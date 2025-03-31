<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanHelicopterStrafe
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanHelicopterStrafe()
{
	Puts("CanHelicopterStrafe has been fired!");
	return (System.Boolean)default;
}
```
```csharp [Source — Assembly-CSharp @ PatrolHelicopterAI]
public bool CanStrafe()
{
	if (UnityEngine.Time.realtimeSinceStartup - lastStrafeTime >= UnityEngine.Random.Range(15f, 25f))
	{
		return CanInterruptState();
	}
	return false;
}

```
:::
