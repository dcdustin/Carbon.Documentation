# OnItemDespawn
<Badge type="info" text="Item"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a dropped item despawns after its lifetime expires.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnItemDespawn(DroppedItem droppedItem)
{
	Puts("OnItemDespawn has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ DroppedItem]
public void IdleDestroy()
{
	Facepunch.Rust.Analytics.Azure.OnItemDespawn(this, item, (int)DropReason, DroppedBy);
	DestroyItem();
	Kill();
}

```
:::
