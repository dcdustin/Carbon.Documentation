# OnFireworkExhausted
<Badge type="info" text="Firework"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a firework has burned out (finished its effect).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnFireworkExhausted()
{
	Puts("OnFireworkExhausted has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ BaseFirework]
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
:::
