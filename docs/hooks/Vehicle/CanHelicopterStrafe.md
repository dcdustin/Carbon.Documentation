# CanHelicopterStrafe
<Badge type="info" text="Vehicle"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanHelicopterStrafe(PatrolHelicopterAI patrolHelicopterAI)
{
	Puts("CanHelicopterStrafe has been fired!");
	return (bool)default;
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
