<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnMaxStackable
```csharp
public int MaxStackable()
{
	int num = info.stackable;
	if (parent != null && parent.maxStackSize > 0)
	{
		num = UnityEngine.Mathf.Min(parent.maxStackSize, num);
	}
	return num;
}

```
