# OnItemRemove
<Badge type="info" text="Item"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when an item is removed/destroyed (from inventory or world).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnItemRemove(Item item)
{
	Puts("OnItemRemove has been fired!");
	return (object)default;
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
