<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanReceiveCall
```csharp
public bool CanReceiveCall()
{
	if (RequirePower && !IsPowered())
	{
		return false;
	}
	if (RequireParent && !base.baseEntity.HasParent())
	{
		return false;
	}
	return true;
}

```
