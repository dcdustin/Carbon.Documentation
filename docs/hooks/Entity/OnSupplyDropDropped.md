# OnSupplyDropDropped
<Badge type="info" text="Entity"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a cargo plane releases a supply drop crate.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnSupplyDropDropped()
{
	Puts("OnSupplyDropDropped has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ CargoPlane]
public void Update()
{
	if (!base.isServer)
	{
		return;
	}
	secondsTaken += UnityEngine.Time.deltaTime;
	float num = UnityEngine.Mathf.InverseLerp(0f, secondsToTake, secondsTaken);
	if (!dropped && num >= 0.5f)
	{
		dropped = true;
		BaseEntity baseEntity = GameManager.server.CreateEntity(prefabDrop.resourcePath, base.transform.position);
		if ((bool)baseEntity)
		{
			baseEntity.globalBroadcast = true;
			baseEntity.Spawn();
		}
	}
	base.transform.position = UnityEngine.Vector3.Lerp(startPos, endPos, num);
	base.transform.hasChanged = true;
	if (num >= 1f)
	{
		Kill();
	}
}

```
:::
