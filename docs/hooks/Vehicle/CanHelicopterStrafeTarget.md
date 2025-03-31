<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanHelicopterStrafeTarget
```csharp
public bool ValidRocketTarget(BasePlayer ply)
{
	if (ply == null)
	{
		return false;
	}
	return !ply.IsNearEnemyBase();
}

```
