# OnHelicopterDropCrate
<Badge type="info" text="Vehicle"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnHelicopterDropCrate(CH47HelicopterAIController cH47HelicopterAIController)
{
	Puts("OnHelicopterDropCrate has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ CH47HelicopterAIController]
public void DropCrate()
{
	if (numCrates > 0)
	{
		UnityEngine.Vector3 pos = base.transform.position + UnityEngine.Vector3.down * 5f;
		UnityEngine.Quaternion rot = UnityEngine.Quaternion.Euler(0f, UnityEngine.Random.Range(0f, 360f), 0f);
		BaseEntity baseEntity = GameManager.server.CreateEntity(lockedCratePrefab.resourcePath, pos, rot);
		if ((bool)baseEntity)
		{
			baseEntity.SendMessage("SetWasDropped");
			baseEntity.Spawn();
		}
		numCrates--;
	}
}

```
:::
