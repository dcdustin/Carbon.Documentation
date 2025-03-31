<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnBackpackDrop
```csharp
public void TryDropBackpack()
{
	Item anyBackpack = GetAnyBackpack();
	if (anyBackpack != null && base.baseEntity.isServer)
	{
		anyBackpack.Drop(base.baseEntity.GetDropPosition(), base.baseEntity.GetDropVelocity());
	}
}

```
