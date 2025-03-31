# OnItemUnlock
<Badge type="info" text="Item"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when an item is unlocked (unsealed).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnItemUnlock()
{
	Puts("OnItemUnlock has been fired!");
	return (System.Object)default;
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
