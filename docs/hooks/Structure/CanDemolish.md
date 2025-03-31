<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanDemolish
```csharp
public bool CanDemolish(BasePlayer player)
{
	if (CanBeDemolished && IsDemolishable())
	{
		return HasDemolishPrivilege(player);
	}
	return false;
}

```
