<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnResourceDepositCreated
```csharp
public ResourceDepositManager.ResourceDeposit CreateFromPosition(UnityEngine.Vector3 pos)
{
	Vector2i indexFrom = GetIndexFrom(pos);
	UnityEngine.Random.State state = UnityEngine.Random.state;
	UnityEngine.Random.InitState((int)new UnityEngine.Vector2(indexFrom.x, indexFrom.y).Seed(World.Seed + World.Salt));
	ResourceDepositManager.ResourceDeposit resourceDeposit = new ResourceDepositManager.ResourceDeposit
	{
		origin = new UnityEngine.Vector3(indexFrom.x * 20, 0f, indexFrom.y * 20)
	};
	if (UnityEngine.Random.Range(0f, 1f) < 0.5f)
	{
		resourceDeposit.Add(ItemManager.FindItemDefinition("stones"), 1f, 100, 1f, ResourceDepositManager.ResourceDeposit.surveySpawnType.ITEM);
	}
	else
	{
		bool flag = false;
		float num = 0f;
		if (World.Procedural)
		{
			if (TerrainMeta.BiomeMap.GetBiome(pos, 1) > 0.5f)
			{
				num += 0.25f;
			}
		}
		else
		{
			num += 0.15f;
		}
		if (UnityEngine.Random.Range(0f, 1f) >= 1f - num)
		{
			resourceDeposit.Add(ItemManager.FindItemDefinition("crude.oil"), 1f, UnityEngine.Random.Range(5000, 10000), UnityEngine.Random.Range(8f, 10f), ResourceDepositManager.ResourceDeposit.surveySpawnType.ITEM, liquid: true);
			flag = true;
		}
		if (!flag)
		{
			resourceDeposit.Add(ItemManager.FindItemDefinition("stones"), 1f, UnityEngine.Random.Range(30000, 100000), UnityEngine.Random.Range(0.3f, 0.5f), ResourceDepositManager.ResourceDeposit.surveySpawnType.ITEM);
			float num2 = 0f;
			num2 = ((!World.Procedural) ? 0.1f : (((TerrainMeta.BiomeMap.GetBiome(pos, 2) > 0.5f) ? 1f : 0f) * 0.25f));
			if (UnityEngine.Random.Range(0f, 1f) >= 1f - num2)
			{
				resourceDeposit.Add(ItemManager.FindItemDefinition("metal.ore"), 1f, UnityEngine.Random.Range(10000, 100000), UnityEngine.Random.Range(2f, 4f), ResourceDepositManager.ResourceDeposit.surveySpawnType.ITEM);
			}
			float num3 = 0f;
			num3 = ((!World.Procedural) ? 0.1f : (((TerrainMeta.BiomeMap.GetBiome(pos, 1) > 0.5f) ? 1f : 0f) * (0.25f + 0.25f * (TerrainMeta.TopologyMap.GetTopology(pos, 8) ? 1f : 0f) + 0.25f * (TerrainMeta.TopologyMap.GetTopology(pos, 1) ? 1f : 0f))));
			if (UnityEngine.Random.Range(0f, 1f) >= 1f - num3)
			{
				resourceDeposit.Add(ItemManager.FindItemDefinition("sulfur.ore"), 1f, UnityEngine.Random.Range(10000, 100000), UnityEngine.Random.Range(4f, 4f), ResourceDepositManager.ResourceDeposit.surveySpawnType.ITEM);
			}
			float num4 = 0f;
			if (World.Procedural)
			{
				if (TerrainMeta.BiomeMap.GetBiome(pos, 8) > 0.5f || TerrainMeta.BiomeMap.GetBiome(pos, 4) > 0.5f)
				{
					num4 += 0.25f;
				}
			}
			else
			{
				num4 += 0.15f;
			}
			if (UnityEngine.Random.Range(0f, 1f) >= 1f - num4)
			{
				resourceDeposit.Add(ItemManager.FindItemDefinition("hq.metal.ore"), 1f, UnityEngine.Random.Range(5000, 10000), UnityEngine.Random.Range(30f, 50f), ResourceDepositManager.ResourceDeposit.surveySpawnType.ITEM);
			}
		}
	}
	_deposits.Add(indexFrom, resourceDeposit);
	UnityEngine.Random.state = state;
	return resourceDeposit;
}

```
