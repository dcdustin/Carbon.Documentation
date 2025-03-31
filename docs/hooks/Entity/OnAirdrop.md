# OnAirdrop
<Badge type="info" text="Entity"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a cargo plane is spawned for an airdrop event (when an airdrop starts).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnAirdrop(CargoPlane cargoPlane)
{
	Puts("OnAirdrop has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ CargoPlane]
public void UpdateDropPosition(UnityEngine.Vector3 newDropPosition)
{
	float x = TerrainMeta.Size.x;
	float y = TerrainMeta.HighestPoint.y + 250f;
	startPos = UnityEngine.Vector3Ex.Range(-1f, 1f);
	startPos.y = 0f;
	startPos.Normalize();
	startPos *= x * 2f;
	startPos.y = y;
	endPos = startPos * -1f;
	endPos.y = startPos.y;
	startPos += newDropPosition;
	endPos += newDropPosition;
	secondsToTake = UnityEngine.Vector3.Distance(startPos, endPos) / 50f;
	secondsToTake *= UnityEngine.Random.Range(0.95f, 1.05f);
	base.transform.position = startPos;
	base.transform.rotation = UnityEngine.Quaternion.LookRotation(endPos - startPos);
	dropPosition = newDropPosition;
}

```
:::
