# OnItemRemove
<Badge type="info" text="Item"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when an item is removed/destroyed (from inventory or world).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnItemRemove()
{
	Puts("OnItemRemove has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ Item]
public void Remove(float fTime = 0f)
{
	if (removeTime > 0f)
	{
		return;
	}
	if (isServer)
	{
		ItemMod[] itemMods = info.itemMods;
		for (int i = 0; i < itemMods.Length; i++)
		{
			itemMods[i].OnRemove(this);
		}
	}
	this.onCycle = null;
	removeTime = UnityEngine.Time.time + fTime;
	this.OnDirty = null;
	position = -1;
	ItemManager.RemoveItem(this, fTime);
}

```
:::
