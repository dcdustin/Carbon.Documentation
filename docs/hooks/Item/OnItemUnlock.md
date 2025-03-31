# OnItemUnlock
<Badge type="info" text="Item"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when an item is unlocked (unsealed).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnItemUnlock()
{
	Puts("OnItemUnlock has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ Item]
public void LockUnlock(bool bNewState)
{
	if (HasFlag(Item.Flag.IsLocked) != bNewState)
	{
		SetFlag(Item.Flag.IsLocked, bNewState);
		MarkDirty();
	}
}

```
:::
