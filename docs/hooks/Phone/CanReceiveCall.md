# CanReceiveCall
<Badge type="info" text="Phone"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called to check if a telephone can receive an incoming call (e.g., has power and conditions met).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanReceiveCall()
{
	Puts("CanReceiveCall has been fired!");
	return (System.Boolean)default;
}
```
```csharp [Source — Assembly-CSharp @ PhoneController]
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
:::
