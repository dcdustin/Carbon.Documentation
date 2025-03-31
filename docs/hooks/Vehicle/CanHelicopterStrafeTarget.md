<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanHelicopterStrafeTarget
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanHelicopterStrafeTarget()
{
	Puts("CanHelicopterStrafeTarget has been fired!");
	return (System.Boolean)default;
}
```
```csharp [Source — Assembly-CSharp @ PatrolHelicopterAI]
public bool ValidRocketTarget(BasePlayer ply)
{
	if (ply == null)
	{
		return false;
	}
	return !ply.IsNearEnemyBase();
}

```
:::
