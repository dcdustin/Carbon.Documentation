<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnFireworkStarted
```csharp
public virtual void Begin()
{
	SetFlag(BaseEntity.Flags.OnFire, b: false);
	SetFlag(BaseEntity.Flags.On, b: true, recursive: false, networkupdate: false);
	SendNetworkUpdate_Flags();
	Invoke(OnExhausted, activityLength);
}

```
