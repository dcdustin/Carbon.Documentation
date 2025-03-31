# OnSupplyDropLanded
<Badge type="info" text="Entity"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a supply drop crate has landed on the ground (after descending by parachute).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnSupplyDropLanded()
{
	Puts("OnSupplyDropLanded has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ SupplyDrop]
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
:::
