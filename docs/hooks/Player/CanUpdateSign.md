<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanUpdateSign [CarvablePumpkin]
```csharp
public virtual bool CanUpdateSign(BasePlayer player)
{
	if (player.IsAdmin || player.IsDeveloper)
	{
		return true;
	}
	if (!player.CanBuild())
	{
		return false;
	}
	if (IsLocked())
	{
		return (ulong)player.userID == base.OwnerID;
	}
	return true;
}

```
