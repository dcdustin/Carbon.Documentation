# CanUpdateSign
<Badge type="info" text="Player"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a player tries to update a sign or similar object (signage, photo frame, carvable pumpkin).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanUpdateSign(BasePlayer player, CarvablePumpkin carvablePumpkin)
{
	Puts("CanUpdateSign has been fired!");
	return (bool)default;
}
```
```csharp [Source — Assembly-CSharp @ CarvablePumpkin]
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
:::
