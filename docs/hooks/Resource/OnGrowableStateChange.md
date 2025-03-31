<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnGrowableStateChange
Called whenever a growable plant changes its growth state (e.g., growing, fruiting, dying).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnGrowableStateChange()
{
	Puts("OnGrowableStateChange has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ GrowableEntity]
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
:::
