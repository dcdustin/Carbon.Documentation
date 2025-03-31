# CanHelicopterDropCrate
<Badge type="info" text="Vehicle"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanHelicopterDropCrate()
{
	Puts("CanHelicopterDropCrate has been fired!");
	return (System.Boolean)default;
}
```
```csharp [Source — Assembly-CSharp @ CH47HelicopterAIController]
public bool CanDropCrate()
{
	return numCrates > 0;
}

```
:::
