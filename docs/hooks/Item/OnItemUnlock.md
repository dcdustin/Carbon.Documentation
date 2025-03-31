<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnItemUnlock
```csharp
public void LockUnlock(bool bNewState)
{
	if (HasFlag(Item.Flag.IsLocked) != bNewState)
	{
		SetFlag(Item.Flag.IsLocked, bNewState);
		MarkDirty();
	}
}

```
