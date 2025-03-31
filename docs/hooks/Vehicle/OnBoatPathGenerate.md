<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnBoatPathGenerate
```csharp
public static System.Collections.Generic.List<UnityEngine.Vector3> GenerateOceanPatrolPath(float minDistanceFromShore = 50f, float minWaterDepth = 8f)
{
	float x = TerrainMeta.Size.x;
	float num = x * 2f * System.MathF.PI;
	float num2 = 30f;
	int num3 = UnityEngine.Mathf.CeilToInt(num / num2);
	System.Collections.Generic.List<UnityEngine.Vector3> list = new System.Collections.Generic.List<UnityEngine.Vector3>();
	float num4 = x;
	float y = 0f;
	for (int i = 0; i < num3; i++)
	{
		float num5 = (float)i / (float)num3 * 360f;
		list.Add(new UnityEngine.Vector3(UnityEngine.Mathf.Sin(num5 * (System.MathF.PI / 180f)) * num4, y, UnityEngine.Mathf.Cos(num5 * (System.MathF.PI / 180f)) * num4));
	}
	float num6 = 4f;
	float num7 = 200f;
	bool flag = true;
	for (int j = 0; j < ConVar.AI.ocean_patrol_path_iterations && flag; j++)
	{
		flag = false;
		for (int k = 0; k < num3; k++)
		{
			UnityEngine.Vector3 vector = list[k];
			int index = ((k == 0) ? (num3 - 1) : (k - 1));
			int index2 = ((k != num3 - 1) ? (k + 1) : 0);
			UnityEngine.Vector3 b = list[index2];
			UnityEngine.Vector3 b2 = list[index];
			UnityEngine.Vector3 origin = vector;
			UnityEngine.Vector3 normalized = (UnityEngine.Vector3.zero - vector).normalized;
			UnityEngine.Vector3 vector2 = vector + normalized * num6;
			if (UnityEngine.Vector3.Distance(vector2, b) > num7 || UnityEngine.Vector3.Distance(vector2, b2) > num7)
			{
				continue;
			}
			bool flag2 = true;
			int num8 = 16;
			for (int l = 0; l < num8; l++)
			{
				float num9 = (float)l / (float)num8 * 360f;
				UnityEngine.Vector3 normalized2 = new UnityEngine.Vector3(UnityEngine.Mathf.Sin(num9 * (System.MathF.PI / 180f)), y, UnityEngine.Mathf.Cos(num9 * (System.MathF.PI / 180f))).normalized;
				UnityEngine.Vector3 vector3 = vector2 + normalized2 * 1f;
				UnityEngine.Vector3 direction = normalized;
				if (vector3 != UnityEngine.Vector3.zero)
				{
					direction = (vector3 - vector2).normalized;
				}
				if (UnityEngine.Physics.SphereCast(origin, 3f, direction, out var _, minDistanceFromShore, 1084293377))
				{
					flag2 = false;
					break;
				}
			}
			if (flag2)
			{
				flag = true;
				list[k] = vector2;
			}
		}
	}
	if (flag)
	{
		UnityEngine.Debug.LogWarning("Failed to generate ocean patrol path");
		return null;
	}
	System.Collections.Generic.List<int> list2 = new System.Collections.Generic.List<int>();
	UnityEngine.LineUtility.Simplify(list, 5f, list2);
	System.Collections.Generic.List<UnityEngine.Vector3> list3 = list;
	list = new System.Collections.Generic.List<UnityEngine.Vector3>();
	foreach (int item in list2)
	{
		list.Add(list3[item]);
	}
	UnityEngine.Debug.Log("Generated ocean patrol path with node count: " + list.Count);
	return list;
}

```
