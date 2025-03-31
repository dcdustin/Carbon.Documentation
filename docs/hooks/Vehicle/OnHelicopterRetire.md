<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnHelicopterRetire
```csharp
public void Retire()
{
	if (!isRetiring)
	{
		Invoke(DestroyMe, 240f);
		float x = TerrainMeta.Size.x;
		float y = 200f;
		UnityEngine.Vector3 newPos = UnityEngine.Vector3Ex.Range(-1f, 1f);
		newPos.y = 0f;
		newPos.Normalize();
		newPos *= x * 20f;
		newPos.y = y;
		ExitCurrentState();
		isRetiring = true;
		State_Move_Enter(newPos);
	}
}

```
