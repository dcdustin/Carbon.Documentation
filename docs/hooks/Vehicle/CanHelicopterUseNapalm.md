# CanHelicopterUseNapalm
<Badge type="info" text="Vehicle"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanHelicopterUseNapalm()
{
	Puts("CanHelicopterUseNapalm has been fired!");
	return (System.Boolean)default;
}
```
```csharp [Source — Assembly-CSharp @ PatrolHelicopterAI]
public bool CanUseNapalm()
{
	return UnityEngine.Time.realtimeSinceStartup - lastNapalmTime >= UnityEngine.Random.Range(25f, 35f);
}

```
:::
