# OnFireworkStarted
<Badge type="info" text="Firework"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a firework is lit/started.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnFireworkStarted(BaseFirework baseFirework)
{
	Puts("OnFireworkStarted has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ BaseFirework]
public virtual void Begin()
{
	SetFlag(BaseEntity.Flags.OnFire, b: false);
	SetFlag(BaseEntity.Flags.On, b: true, recursive: false, networkupdate: false);
	SendNetworkUpdate_Flags();
	Invoke(OnExhausted, activityLength);
}

```
:::
