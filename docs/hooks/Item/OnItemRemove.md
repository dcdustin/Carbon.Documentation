<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnItemRemove
```csharp
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
