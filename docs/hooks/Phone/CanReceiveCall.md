# CanReceiveCall
<Badge type="info" text="Phone"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called to check if a telephone can receive an incoming call (e.g., has power and conditions met).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanReceiveCall(PhoneController phoneController)
{
	Puts("CanReceiveCall has been fired!");
	return (bool)default;
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
