<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnSprinklerSplashed
Called when a sprinkler sprays water (each time it splashes water on crops).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnSprinklerSplashed()
{
	Puts("OnSprinklerSplashed has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ Sprinkler]
public void DoSplash()
{
	using (TimeWarning.New("SprinklerSplash"))
	{
		int num = WaterPerSplash;
		if ((float)updateSplashableCache > SplashFrequency * 4f || forceUpdateSplashables)
		{
			cachedSplashables.Clear();
			forceUpdateSplashables = false;
			updateSplashableCache = 0f;
			UnityEngine.Vector3 position = Eyes.position;
			UnityEngine.Vector3 up = base.transform.up;
			float sprinklerEyeHeightOffset = ConVar.Server.sprinklerEyeHeightOffset;
			float value = UnityEngine.Vector3.Angle(up, UnityEngine.Vector3.up) / 180f;
			value = UnityEngine.Mathf.Clamp(value, 0.2f, 1f);
			sprinklerEyeHeightOffset *= value;
			UnityEngine.Vector3 startPosition = position + up * (ConVar.Server.sprinklerRadius * 0.5f);
			UnityEngine.Vector3 endPosition = position + up * sprinklerEyeHeightOffset;
			System.Collections.Generic.List<BaseEntity> obj = Facepunch.Pool.Get<System.Collections.Generic.List<BaseEntity>>();
			Vis.Entities(startPosition, endPosition, ConVar.Server.sprinklerRadius, obj, 1237003025);
			if (obj.Count > 0)
			{
				foreach (BaseEntity item in obj)
				{
					if (!item.isClient && item is ISplashable splashable && !cachedSplashables.Contains(splashable) && splashable.WantsSplash(currentFuelType, num) && item.IsVisible(position) && (!(item is IOEntity entity) || !IsConnectedTo(entity, IOEntity.backtracking)) && (!(item is BasePlayer) || !(currentFuelType.baseRadioactivity > 0f)))
					{
						cachedSplashables.Add(splashable);
					}
				}
			}
			Facepunch.Pool.FreeUnmanaged(ref obj);
		}
		if (cachedSplashables.Count > 0)
		{
			int num2 = num / cachedSplashables.Count;
			float num3 = (float)(num % cachedSplashables.Count) / (float)cachedSplashables.Count;
			foreach (ISplashable cachedSplashable in cachedSplashables)
			{
				int amount = num2 + ((UnityEngine.Random.value < num3) ? 1 : 0);
				if (!cachedSplashable.IsUnityNull() && cachedSplashable.WantsSplash(currentFuelType, amount))
				{
					int num4 = cachedSplashable.DoSplash(currentFuelType, amount);
					num -= num4;
					if (num <= 0)
					{
						break;
					}
				}
			}
		}
		if (DecayPerSplash > 0f)
		{
			Hurt(DecayPerSplash);
		}
	}
}

```
:::
