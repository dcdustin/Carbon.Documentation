# OnHelicopterAttack
<Badge type="info" text="Vehicle"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnHelicopterAttack(CH47HelicopterAIController cH47HelicopterAIController)
{
	Puts("OnHelicopterAttack has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ CH47HelicopterAIController]
public override void OnAttacked(HitInfo info)
{
	base.OnAttacked(info);
	InitiateAnger();
	SetFlag(BaseEntity.Flags.Reserved9, base.healthFraction <= 0.8f);
	SetFlag(BaseEntity.Flags.OnFire, base.healthFraction <= 0.33f);
}

```
:::
