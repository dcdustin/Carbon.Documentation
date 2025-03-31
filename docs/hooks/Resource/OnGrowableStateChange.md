<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnGrowableStateChange
```csharp
public void ChangeState(PlantProperties.State state, bool resetAge, bool loading = false)
{
	if (base.isServer && State == state)
	{
		return;
	}
	State = state;
	if (!base.isServer)
	{
		return;
	}
	if (!loading)
	{
		if (currentStage.resources > 0f)
		{
			yieldPool = currentStage.yield;
		}
		if (state == PlantProperties.State.Crossbreed)
		{
			if (Properties.CrossBreedEffect.isValid)
			{
				Effect.server.Run(Properties.CrossBreedEffect.resourcePath, base.transform.position, UnityEngine.Vector3.up);
			}
			GrowableGenetics.CrossBreed(this);
		}
		SendNetworkUpdate();
	}
	if (resetAge)
	{
		stageAge = 0f;
	}
}

```
