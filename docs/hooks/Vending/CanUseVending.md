# CanUseVending
<Badge type="info" text="Vending"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanUseVending()
{
	Puts("CanUseVending has been fired!");
	return (System.Boolean)default;
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
