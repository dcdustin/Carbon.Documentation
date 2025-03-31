<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# AllowNpcNonAdminHeliUse [patch]
```csharp
public override void AttemptMount(BasePlayer player, bool doMountChecks = true)
{
	if (player.IsNpc || player.IsAdmin)
	{
		base.AttemptMount(player, doMountChecks);
	}
}

```
