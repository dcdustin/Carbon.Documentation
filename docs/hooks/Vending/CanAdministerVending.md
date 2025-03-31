# CanAdministerVending
<Badge type="info" text="Vending"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanAdministerVending(BasePlayer player, NPCVendingMachine nPCVendingMachine)
{
	Puts("CanAdministerVending has been fired!");
	return (bool)default;
}
```
```csharp [Source — Assembly-CSharp @ NPCVendingMachine]
public override bool CanPlayerAdmin(BasePlayer player)
{
	return false;
}

```
:::
