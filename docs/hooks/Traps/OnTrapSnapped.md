<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnTrapSnapped
```csharp
public override void OnObjectAdded(UnityEngine.GameObject obj, UnityEngine.Collider col)
{
	base.OnObjectAdded(obj, col);
	_trap.ObjectEntered(obj);
}

```
