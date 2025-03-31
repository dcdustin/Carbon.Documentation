# OnExplosiveFuseSet
<Badge type="info" text="Weapon"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnExplosiveFuseSet()
{
	Puts("OnExplosiveFuseSet has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ TimedExplosive]
public virtual void SetFuse(float fuseLength)
{
	if (base.isServer)
	{
		Invoke(Explode, fuseLength);
		SetFlag(BaseEntity.Flags.Reserved2, b: true);
	}
}

```
:::
