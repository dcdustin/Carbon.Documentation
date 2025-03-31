<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanBeRecycled
```csharp
public bool CanBeRecycled(Item item)
{
	if (item != null)
	{
		return item.info.Blueprint != null;
	}
	return false;
}

```
