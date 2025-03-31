# OnXmasGiftsDistribute
<Badge type="info" text="Seasonal"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when Christmas gifts are being spawned for a player during the Xmas event.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnXmasGiftsDistribute()
{
	Puts("OnXmasGiftsDistribute has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ XMasRefill]
public bool DistributeGiftsForPlayer(BasePlayer player)
{
	int num = GiftsPerPlayer();
	int num2 = GiftSpawnAttempts();
	for (int i = 0; i < num2; i++)
	{
		if (num <= 0)
		{
			break;
		}
		UnityEngine.Vector2 vector = UnityEngine.Random.insideUnitCircle * GiftRadius();
		UnityEngine.Vector3 pos = player.transform.position + new UnityEngine.Vector3(vector.x, 10f, vector.y);
		UnityEngine.Quaternion rot = UnityEngine.Quaternion.Euler(0f, UnityEngine.Random.Range(0f, 360f), 0f);
		if (DropToGround(ref pos))
		{
			string resourcePath = giftPrefabs[UnityEngine.Random.Range(0, giftPrefabs.Length)].resourcePath;
			BaseEntity baseEntity = GameManager.server.CreateEntity(resourcePath, pos, rot);
			if ((bool)baseEntity)
			{
				baseEntity.Spawn();
				num--;
			}
		}
	}
	return true;
}

```
:::
