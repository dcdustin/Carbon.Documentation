# OnHelicopterRetire
<Badge type="info" text="Vehicle"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnHelicopterRetire()
{
	Puts("OnHelicopterRetire has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ PatrolHelicopterAI]
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
:::
