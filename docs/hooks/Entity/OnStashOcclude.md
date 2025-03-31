<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnStashOcclude
```csharp
public void DoOccludedCheck()
{
	if (UnityEngine.Physics.SphereCast(new UnityEngine.Ray(base.transform.position + UnityEngine.Vector3.up * 5f, UnityEngine.Vector3.down), 0.25f, 5f, 2097152))
	{
		DropItems();
		Kill();
	}
}

```
