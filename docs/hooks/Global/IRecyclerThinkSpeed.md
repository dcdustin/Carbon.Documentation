<Badge type="danger" text="Carbon Compatible"/>
# IRecyclerThinkSpeed
Allows modifying the processing speed of recyclers.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void IRecyclerThinkSpeed()
{
	Puts("IRecyclerThinkSpeed has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ Recycler]
public float GetRecycleThinkDuration()
{
	if (IsSafezoneRecycler())
	{
		return 8f;
	}
	return 5f;
}

```
:::
