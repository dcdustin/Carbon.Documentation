<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnExplosiveFuseSet
```csharp
public virtual void SetFuse(float fuseLength)
{
	if (base.isServer)
	{
		Invoke(Explode, fuseLength);
		SetFlag(BaseEntity.Flags.Reserved2, b: true);
	}
}

```
