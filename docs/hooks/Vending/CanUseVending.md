<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanUseVending
```csharp
public override bool CanOpenLootPanel(BasePlayer player, string panelName)
{
	if (panelName == customerPanel)
	{
		return true;
	}
	if (base.CanOpenLootPanel(player, panelName))
	{
		return CanPlayerAdmin(player);
	}
	return false;
}

```
