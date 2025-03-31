<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnItemLock
Called when an item is locked (for example, sealing a note).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnItemLock()
{
	Puts("OnItemLock has been fired!");
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
