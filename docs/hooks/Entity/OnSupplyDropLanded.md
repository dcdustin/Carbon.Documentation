<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnSupplyDropLanded
```csharp
public void OnCollisionEnter(UnityEngine.Collision collision)
{
	bool flag = ((1 << collision.collider.gameObject.layer) & 0x40A10111) > 0;
	if (((1 << collision.collider.gameObject.layer) & 0x8000000) > 0 && UnityEngine.CollisionEx.GetEntity(collision) is Tugboat)
	{
		flag = true;
	}
	if (flag)
	{
		RemoveParachute();
		MakeLootable();
	}
}

```
