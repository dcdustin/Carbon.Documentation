# CanDemolish
<Badge type="info" text="Structure"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanDemolish(BasePlayer player, StabilityEntity stabilityEntity)
{
	Puts("CanDemolish has been fired!");
	return (bool)default;
}
```
```csharp [Source — Assembly-CSharp @ StabilityEntity]
public bool CanDemolish(BasePlayer player)
{
	if (CanBeDemolished && IsDemolishable())
	{
		return HasDemolishPrivilege(player);
	}
	return false;
}

```
:::
