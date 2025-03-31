# CanUseMailbox
<Badge type="info" text="Player"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a player attempts to use a mailbox (e.g., leave or retrieve mail), to decide if it's allowed.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanUseMailbox(BasePlayer player, Mailbox mailbox)
{
	Puts("CanUseMailbox has been fired!");
	return (bool)default;
}
```
```csharp [Source — Assembly-CSharp @ Mailbox]
public virtual bool PlayerIsOwner(BasePlayer player)
{
	return player.CanBuild();
}

```
:::
