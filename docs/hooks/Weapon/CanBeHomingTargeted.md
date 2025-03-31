# CanBeHomingTargeted
<Badge type="info" text="Weapon"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanBeHomingTargeted(RoadFlare roadFlare)
{
	Puts("CanBeHomingTargeted has been fired!");
	return (bool)default;
}
```
```csharp [Source — Assembly-CSharp @ RoadFlare]
public bool IsValidHomingTarget()
{
	return true;
}

```
:::
