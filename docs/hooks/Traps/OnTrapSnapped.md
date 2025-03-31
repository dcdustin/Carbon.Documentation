# OnTrapSnapped
<Badge type="info" text="Traps"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnTrapSnapped()
{
	Puts("OnTrapSnapped has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ BaseTrapTrigger]
public override void OnObjectAdded(UnityEngine.GameObject obj, UnityEngine.Collider col)
{
	base.OnObjectAdded(obj, col);
	_trap.ObjectEntered(obj);
}

```
:::
