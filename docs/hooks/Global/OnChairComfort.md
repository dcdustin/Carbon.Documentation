<Badge type="danger" text="Carbon Compatible"/>
# OnChairComfort
Called when calculating the comfort bonus provided by a chair.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private float OnChairComfort()
{
	Puts("OnChairComfort has been fired!");
	return (System.Single)default;
}
```
```csharp [Source — Assembly-CSharp @ BaseChair]
public override float GetComfort()
{
	return 1f;
}

```
:::
