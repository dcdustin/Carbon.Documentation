# OnMaxStackable
<Badge type="info" text="Item"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when determining the maximum stack size of an item.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private int OnMaxStackable(Item item)
{
	Puts("OnMaxStackable has been fired!");
	return (int)default;
}
```
```csharp [Source — Assembly-CSharp @ Item]
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
:::
