<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnItemDespawn
```csharp
public void IdleDestroy()
{
	Facepunch.Rust.Analytics.Azure.OnItemDespawn(this, item, (int)DropReason, DroppedBy);
	DestroyItem();
	Kill();
}

```
