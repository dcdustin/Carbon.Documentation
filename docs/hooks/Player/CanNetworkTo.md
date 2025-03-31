<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanNetworkTo [BasePlayer]
```csharp
public override bool ShouldNetworkTo(BasePlayer player)
{
	if (player == this)
	{
		return true;
	}
	if (IsSpectating() && player != this)
	{
		return false;
	}
	bool flag = base.ShouldNetworkTo(player);
	if (ServerOcclusion.OcclusionEnabled && flag)
	{
		bool flag2 = IsBot || IsNpc;
		bool flag3 = player.GetMounted() is ComputerStation;
		flag = OcclusionLineOfSight(player, flag3 || flag2);
	}
	return flag;
}

```
