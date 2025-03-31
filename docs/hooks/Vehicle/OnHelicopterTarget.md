# OnHelicopterTarget
<Badge type="info" text="Vehicle"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnHelicopterTarget(HelicopterTurret helicopterTurret)
{
	Puts("OnHelicopterTarget has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ HelicopterTurret]
public void SetTarget(BaseCombatEntity newTarget)
{
	_target = newTarget;
	UpdateTargetVisibility();
}

```
:::
