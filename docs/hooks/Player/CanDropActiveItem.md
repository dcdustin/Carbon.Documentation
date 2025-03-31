# CanDropActiveItem
<Badge type="info" text="Player"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called to determine if a player can drop their currently active (held) item.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanDropActiveItem(BasePlayer basePlayer)
{
	Puts("CanDropActiveItem has been fired!");
	return (bool)default;
}
```
```csharp [Source — Assembly-CSharp @ BasePlayer]
public virtual bool ShouldDropActiveItem()
{
	return true;
}

```
:::
