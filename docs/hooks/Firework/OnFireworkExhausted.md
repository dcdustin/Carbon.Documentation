<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnFireworkExhausted
```csharp
public virtual void OnExhausted()
{
	SetFlag(BaseEntity.Flags.Reserved8, b: true, recursive: false, networkupdate: false);
	SetFlag(BaseEntity.Flags.OnFire, b: false, recursive: false, networkupdate: false);
	SetFlag(BaseEntity.Flags.On, b: false, recursive: false, networkupdate: false);
	EnableGlobalBroadcast(wants: false);
	SendNetworkUpdate_Flags();
	Invoke(Cleanup, corpseDuration);
	_activeFireworks.Remove(this);
}

```
