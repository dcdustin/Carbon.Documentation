<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnHelicopterOutOfCrates
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool OnHelicopterOutOfCrates()
{
	Puts("OnHelicopterOutOfCrates has been fired!");
	return (System.Boolean)default;
}
```
```csharp [Source — Assembly-CSharp @ CH47HelicopterAIController]
public bool OutOfCrates()
{
	return numCrates <= 0;
}

```
:::
