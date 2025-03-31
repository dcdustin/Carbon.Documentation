# CanUseVending
<Badge type="info" text="Vending"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanUseVending(BasePlayer player, VendingMachine vendingMachine)
{
	Puts("CanUseVending has been fired!");
	return (bool)default;
}
```
```csharp [Source — Assembly-CSharp @ VendingMachine]
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
:::
