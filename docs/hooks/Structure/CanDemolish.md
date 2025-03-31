<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanDemolish
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanDemolish()
{
	Puts("CanDemolish has been fired!");
	return (System.Boolean)default;
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
